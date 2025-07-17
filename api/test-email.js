// Route API Vercel pour test email avec Resend et template client
const sendResendTestEmail = require('./_lib/sendResendTestEmail');
const path = require('path');
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
  const html = generateClientEmailTemplate(emailData);
  const replyTo = process.env.ADMIN_EMAIL;
  const tags = [
    { name: 'category', value: 'confirmation' },
    { name: 'client', value: 'test-company' }
  ];

  try {
    const result = await sendResendTestEmail({
      to: email,
      subject,
      html,
      replyTo,
      tags
    });
    if (result.success) {
      res.status(200).json({ success: true, info: 'Email envoyé via Resend', messageId: result.messageId });
    } else {
      res.status(500).json({ success: false, error: result.error || 'Erreur inconnue Resend' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
