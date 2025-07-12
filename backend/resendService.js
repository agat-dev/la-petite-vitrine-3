const { Resend } = require('resend');
require('dotenv').config();

// Initialiser Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction pour envoyer un email via Resend
const sendEmailWithResend = async (emailOptions) => {
  try {
    console.log(`📤 Envoi email via Resend vers: ${emailOptions.to}`);
    console.log(`📝 Sujet: ${emailOptions.subject}`);

    const data = await resend.emails.send({
      from: emailOptions.from || `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: emailOptions.to,
      subject: emailOptions.subject,
      html: emailOptions.html,
      text: emailOptions.text,
      attachments: emailOptions.attachments || [],
      tags: emailOptions.tags || [],
      reply_to: emailOptions.replyTo,
    });
    
    console.log('✅ Email envoyé avec succès via Resend');
    console.log(`📧 Message ID: ${data.id}`);
    
    return { 
      success: true, 
      messageId: data.id,
      data: data
    };
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi via Resend:', error);
    
    // Gestion des erreurs spécifiques Resend
    let errorMessage = error.message;
    
    if (error.name === 'validation_error') {
      errorMessage = 'Erreur de validation des données email.';
    } else if (error.name === 'missing_required_field') {
      errorMessage = 'Champs requis manquants dans l\'email.';
    } else if (error.name === 'invalid_from_address') {
      errorMessage = 'Adresse expéditeur invalide. Vérifiez votre domaine Resend.';
    }
    
    return { 
      success: false, 
      error: errorMessage,
      originalError: error.message 
    };
  }
};

// Test de la connexion Resend
const testResendConnection = async () => {
  try {
    // Test simple avec un email vers l'admin
    const result = await sendEmailWithResend({
      to: process.env.ADMIN_EMAIL,
      subject: 'Test de configuration Resend - La Petite Vitrine',
      html: `
        <h2>✅ Test Resend réussi !</h2>
        <p>Votre configuration Resend fonctionne correctement.</p>
        <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
        <p><strong>API Key :</strong> ${process.env.RESEND_API_KEY ? 'Configurée' : 'Manquante'}</p>
      `,
      tags: [{ name: 'category', value: 'test' }]
    });
    
    if (result.success) {
      console.log('✅ Test de connexion Resend réussi');
      console.log(`📧 Email de test envoyé à: ${process.env.ADMIN_EMAIL}`);
      return true;
    } else {
      console.error('❌ Échec du test Resend:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur lors du test Resend:', error.message);
    return false;
  }
};

// Fonction pour envoyer des emails en lot
const sendBulkEmailsWithResend = async (emailsArray, maxRetries = 2) => {
  const results = [];
  
  for (const emailData of emailsArray) {
    let attempts = 0;
    let result = null;
    
    while (attempts < maxRetries) {
      result = await sendEmailWithResend(emailData);
      
      if (result.success) {
        break;
      }
      
      attempts++;
      if (attempts < maxRetries) {
        console.log(`🔄 Nouvelle tentative ${attempts + 1}/${maxRetries} pour ${emailData.to}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
    
    results.push({
      to: emailData.to,
      ...result,
      attempts
    });
  }
  
  return results;
};

module.exports = { 
  sendEmailWithResend,
  testResendConnection,
  sendBulkEmailsWithResend,
  resend
};