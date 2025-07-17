// Vercel Serverless API route for test email
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Méthode non autorisée' });
    return;
  }

  const { email, subject, message } = req.body;
  if (!email || !subject || !message) {
    res.status(400).json({ success: false, error: 'Champs manquants' });
    return;
  }

  // Remplacez par votre config SMTP ou service d'email (ex: Resend, SendGrid, etc)
  // Exemple avec nodemailer (pour test local, pas en prod Vercel):
  try {
    // Ici, vous pouvez intégrer Resend ou tout autre service
    // Pour la démo, on simule une réussite
    res.status(200).json({ success: true, info: 'Email simulé envoyé (remplacez par votre logique)' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
