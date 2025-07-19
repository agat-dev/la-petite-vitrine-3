import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import { Resend } from 'resend';
import fs from 'fs';

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

  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Erreur parsing' });

    const to = fields.to;
    const subject = fields.subject;
    const html = fields.html;

    // Prépare les pièces jointes pour Resend
    let attachments: any[] = [];
    if (files.files) {
      const fileArray = Array.isArray(files.files) ? files.files : [files.files];
      attachments = await Promise.all(
        fileArray.map(async (file: FormidableFile) => ({
          filename: file.originalFilename || file.newFilename,
          content: await fs.promises.readFile(file.filepath),
        }))
      );
    }

    try {
      await resend.emails.send({
        from: 'La Petite Vitrine <contact@lapetitevitrine.com>',
        to,
        subject,
        html,
        attachments,
      });
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erreur lors de l\'envoi de l\'email' });
    }
  });
}