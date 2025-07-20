import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import { Resend } from 'resend';

export const config = {
  api: { bodyParser: false },
};

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderToNotion(order: any) {
  const token = process.env.NOTION_TOKEN as string | undefined;
  const databaseId = process.env.NOTION_ORDER_DATABASE_ID as string | undefined;
  if (!token || !databaseId) return;

  const name = `${order.formData?.firstName ?? ''} ${order.formData?.lastName ?? ''}`.trim();

  const formProperties: Record<string, any> = {};
  Object.entries(order.formData ?? {}).forEach(([key, value]) => {
    formProperties[key] = {
      rich_text: [{ text: { content: String(value) } }],
    };
  });
  if (order.attachmentNames?.length) {
    formProperties['attachments'] = {
      rich_text: [{ text: { content: order.attachmentNames.join(', ') } }],
    };
  }

  try {
    await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: { title: [{ text: { content: name || 'Nouvelle commande' } }] },
          Pack: { rich_text: [{ text: { content: order.pack?.title ?? '' } }] },
          Maintenance: { rich_text: [{ text: { content: order.maintenance?.title ?? '' } }] },
          Total: { number: order.total ?? 0 },
          ...formProperties,
        },
      }),
    });
  } catch (err) {
    console.error('[API] Notion error:', err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[API] Reçu une requête:', req.method, req.body);
  if (req.method !== 'POST') {
    console.log('[API] Mauvaise méthode:', req.method);
    return res.status(405).end();
  }

  const form = new IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors du parsing du formulaire' });
    }

    const to = Array.isArray(fields.to) ? fields.to[0] : fields.to;
    const subject = Array.isArray(fields.subject) ? fields.subject[0] : fields.subject;
    const html = Array.isArray(fields.html) ? fields.html[0] : fields.html;
    const orderDataRaw = Array.isArray(fields.orderData) ? fields.orderData[0] : fields.orderData;
    let orderData: any;
    if (orderDataRaw) {
      try {
        orderData = JSON.parse(orderDataRaw as string);
      } catch {
        orderData = undefined;
      }
    }

    // Récupération des fichiers (supporte visualFiles[], textFiles[], otherFiles[] ou files[])
    let attachments: any[] = [];
    const allFiles: FormidableFile[] = [];
    let cids: string[] = [];
    if (fields.cids) {
      try {
        const cidData = Array.isArray(fields.cids) ? fields.cids[0] : fields.cids;
        cids = JSON.parse(cidData as string);
      } catch {
        cids = [];
      }
    }

    // Ajoute tous les fichiers des différents champs attendus
    ['visualFiles', 'textFiles', 'otherFiles', 'files'].forEach((key) => {
      const fileField = files[key];
      if (fileField) {
        if (Array.isArray(fileField)) {
          allFiles.push(...fileField);
        } else {
          allFiles.push(fileField);
        }
      }
    });

    // Prépare les pièces jointes pour Resend et récupère leurs noms
    const attachmentNames = allFiles.map(
      (file) => file.originalFilename || file.newFilename,
    );
    attachments = await Promise.all(
      allFiles.map(async (file, idx) => ({
        filename: file.originalFilename || file.newFilename,
        content: await fs.promises.readFile(file.filepath),
        cid: cids[idx],
      }))
    );

    try {
      await resend.emails.send({
        from: 'contact@lapetitevitrine.com',
        to,
        subject,
        html,
        attachments,
      });
      if (orderData) {
        await sendOrderToNotion({ ...orderData, attachmentNames });
      }
      res.status(200).json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}