// Fonction utilitaire pour envoyer un email de test via Resend
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function sendResendTestEmail({ to, subject, html, replyTo, tags }) {
  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
      reply_to: replyTo,
      tags
    });
    return {
      success: true,
      messageId: response.id || null,
      info: response
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Erreur inconnue Resend',
      info: error
    };
  }
};
