// Route API Vercel pour test email avec Resend et template client (CommonJS)
// Version avec débogage amélioré

let sendResendTestEmail, generateClientEmailTemplate;

// Gestion des imports avec try/catch
try {
  sendResendTestEmail = require('./_lib/sendResendTestEmail.cjs');
  generateClientEmailTemplate = require('./_lib/generateClientEmailTemplate.cjs');
} catch (error) {
  console.error('Erreur lors du chargement des modules:', error);
}

module.exports = async (req, res) => {
  console.log('=== DEBUT test-email.cjs ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  // Vérification des modules
  if (!sendResendTestEmail || !generateClientEmailTemplate) {
    console.error('Modules manquants');
    return res.status(500).json({ 
      success: false, 
      error: 'Modules requis manquants' 
    });
  }

  // Test: réponse JSON minimale pour valider l'exécution
  if (req.method === 'GET') {
    console.log('GET request - retour info');
    return res.status(200).json({ 
      success: true, 
      info: 'API test-email.cjs GET OK',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    console.log('Méthode non autorisée:', req.method);
    return res.status(405).json({ 
      success: false, 
      error: 'Méthode non autorisée' 
    });
  }

  const { email, subject, message } = req.body;
  console.log('Données reçues:', { email, subject, message });
  
  if (!email || !subject || !message) {
    console.log('Champs manquants');
    return res.status(400).json({ 
      success: false, 
      error: 'Champs manquants',
      received: { email: !!email, subject: !!subject, message: !!message }
    });
  }

  // Vérification des variables d'environnement
  const adminEmail = process.env.ADMIN_EMAIL;
  console.log('ADMIN_EMAIL défini:', !!adminEmail);
  
  if (!adminEmail) {
    console.error('ADMIN_EMAIL non défini');
    return res.status(500).json({ 
      success: false, 
      error: 'Configuration manquante: ADMIN_EMAIL' 
    });
  }

  try {
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
    console.log('emailData créé:', emailData);

    // Génération du template HTML
    console.log('Génération du template HTML...');
    const html = generateClientEmailTemplate(emailData);
    console.log('Template généré, longueur:', html?.length || 0);

    // Préparation de l'email à envoyer via Resend
    const emailConfig = {
      to: email,
      subject,
      html,
      replyTo: adminEmail,
      tags: [
        { name: 'category', value: 'confirmation' },
        { name: 'client', value: 'test-company' }
      ]
    };
    console.log('Configuration email:', emailConfig);

    console.log('Envoi email via Resend...');
    const result = await sendResendTestEmail(emailConfig);
    console.log('Résultat Resend:', result);

    if (result.success) {
      console.log('Email envoyé avec succès');
      return res.status(200).json({ 
        success: true, 
        info: 'Email envoyé via Resend', 
        messageId: result.messageId 
      });
    } else {
      console.error('Erreur Resend:', result.error);
      return res.status(500).json({ 
        success: false, 
        error: result.error || 'Erreur inconnue Resend' 
      });
    }
  } catch (error) {
    console.error('Exception dans test-email.cjs:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};