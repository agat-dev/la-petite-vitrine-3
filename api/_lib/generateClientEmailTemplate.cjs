// Template client JS compatible Vercel API (CommonJS)
module.exports = function generateClientEmailTemplate(emailData) {
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Bonjour ${emailData.client.firstName} ${emailData.client.lastName},</h2>
      <p>Merci pour votre demande auprès de <strong>${emailData.client.company}</strong>.</p>
      <p><strong>Sujet :</strong> ${emailData.subject}</p>
      <p><strong>Message :</strong><br/>${emailData.message}</p>
      <hr/>
      <p style="font-size: 0.9em; color: #888;">Ceci est un email de test généré par La Petite Vitrine.</p>
    </div>
  `;
};
