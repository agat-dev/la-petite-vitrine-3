import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import { Resend } from 'resend';

// Enregistre la commande dans une base Notion
async function sendOrderToNotion(subject: string, to: string) {
  const token = process.env.NOTION_TOKEN as string;
  const databaseId = process.env.NOTION_ORDER_DATABASE_ID as string;
  if (!token || !databaseId) return;

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: subject } }] },
        Email: { rich_text: [{ text: { content: to } }] },
      },
    }),
  });

  if (!res.ok) {
    console.log('[sendOrderToNotion] Notion error:', res.status, await res.text());
    return;
  }
}

export const config = {
  api: { bodyParser: false },
};

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Prépare les pièces jointes pour Resend
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
      await sendOrderToNotion(subject as string, to as string);
      res.status(200).json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}