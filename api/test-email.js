// Vercel Serverless API route for test email avec Resend et template client
const path = require('path');
const { sendBulkEmailsWithResend } = require(path.resolve(__dirname, '../backend/resendService'));
const { generateClientEmailTemplate } = require(path.resolve(__dirname, '../src/templates/emailTemplates'));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Méthode non autorisée' });
    return;
  }

  const { email, subject, message } = req.body;
  if (!email || !subject || !message) {
    res.status(400).json({ success: false, error: 'Champs manquants' });
    return;
  }

  // Construction de l'objet emailData pour le template
  const emailData = {
    client: {
      email,
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company'
    },
    subject,
    message
  };

  // Préparation de l'email à envoyer via Resend
  const emailsToSend = [
    {
      to: email,
      subject: subject,
      html: generateClientEmailTemplate(emailData),
      replyTo: process.env.ADMIN_EMAIL,
      tags: [
        { name: 'category', value: 'confirmation' },
        { name: 'client', value: 'test-company' }
      ]
    }
  ];

  try {
    const results = await sendBulkEmailsWithResend(emailsToSend, 1);
    const clientResult = results[0];
    if (clientResult.success) {
      res.status(200).json({ success: true, info: 'Email envoyé via Resend', messageId: clientResult.messageId });
    } else {
      res.status(500).json({ success: false, error: clientResult.error || 'Erreur inconnue Resend' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
