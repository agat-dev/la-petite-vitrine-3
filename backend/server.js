const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { sendBulkEmailsWithResend, testResendConnection } = require('./resendService');
const { generateAdminEmailTemplate, generateClientEmailTemplate } = require('../src/templates/emailTemplates');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration multer pour les fichiers
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB max par fichier
    files: 25 // Maximum 25 fichiers
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf', 'text/plain', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Type de fichier non autorisé: ${file.mimetype}`), false);
    }
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Test de connexion Resend au démarrage
testResendConnection();

// Route de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'La Petite Vitrine Backend - Resend',
    resendConfigured: !!process.env.RESEND_API_KEY
  });
});

// Route pour l'envoi des emails via Resend
app.post('/api/send-resend-emails', upload.fields([
  { name: 'visualFiles', maxCount: 10 },
  { name: 'textFiles', maxCount: 10 },
  { name: 'otherFiles', maxCount: 5 }
]), async (req, res) => {
  try {
    console.log('📧 Nouvelle demande de devis reçue (Resend)');
    
    const emailData = JSON.parse(req.body.emailData);
    console.log(`👤 Client: ${emailData.client.firstName} ${emailData.client.lastName}`);
    console.log(`🏢 Entreprise: ${emailData.client.company}`);
    
    // Préparer les attachments pour Resend
    const attachments = [];
    let totalSize = 0;
    
    if (req.files) {
      ['visualFiles', 'textFiles', 'otherFiles'].forEach(category => {
        if (req.files[category]) {
          req.files[category].forEach(file => {
            totalSize += file.size;
            attachments.push({
              filename: file.originalname,
              content: file.buffer.toString('base64'),
              type: file.mimetype,
              disposition: 'attachment'
            });
          });
        }
      });
    }

    console.log(`📎 ${attachments.length} fichiers joints (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);

    // Préparer les emails à envoyer via Resend
    const emailsToSend = [
      {
        to: process.env.ADMIN_EMAIL,
        subject: `Nouvelle demande de devis - ${emailData.client.company}`,
        html: generateAdminEmailTemplate(emailData),
        attachments: attachments,
        tags: [
          { name: 'category', value: 'devis' },
          { name: 'client', value: emailData.client.company.toLowerCase().replace(/\s+/g, '-') }
        ]
      },
      {
        to: emailData.client.email,
        subject: 'Confirmation de votre demande - La Petite Vitrine',
        html: generateClientEmailTemplate(emailData),
        replyTo: process.env.ADMIN_EMAIL,
        tags: [
          { name: 'category', value: 'confirmation' },
          { name: 'client', value: emailData.client.company.toLowerCase().replace(/\s+/g, '-') }
        ]
      }
    ];

    // Envoi des emails avec Resend
    console.log('📤 Envoi des emails via Resend...');
    const results = await sendBulkEmailsWithResend(emailsToSend, 2);
    
    const adminResult = results[0];
    const clientResult = results[1];

    if (adminResult.success && clientResult.success) {
      console.log('✅ Tous les emails ont été envoyés avec succès via Resend');
      res.json({
        success: true,
        message: 'Emails envoyés avec succès via Resend',
        data: {
          adminMessageId: adminResult.messageId,
          clientMessageId: clientResult.messageId,
          filesProcessed: attachments.length,
          totalSize: totalSize,
          provider: 'Resend'
        }
      });
    } else {
      console.error('❌ Erreur lors de l\'envoi des emails via Resend');
      throw new Error(`Admin: ${adminResult.success ? 'OK' : adminResult.error}, Client: ${clientResult.success ? 'OK' : clientResult.error}`);
    }

  } catch (error) {
    console.error('❌ Erreur lors du traitement de la demande (Resend):', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi des emails via Resend',
      error: error.message,
      provider: 'Resend'
    });
  }
});

// Route de test Resend
app.get('/api/test-resend', async (req, res) => {
  try {
    const result = await testResendConnection();
    res.json({ 
      success: result, 
      message: result ? 'Test Resend réussi' : 'Test Resend échoué',
      timestamp: new Date().toISOString(),
      provider: 'Resend'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      provider: 'Resend'
    });
  }
});

// Gestion des erreurs globales
app.use((error, req, res, next) => {
  console.error('Erreur serveur:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Fichier trop volumineux (max 10MB par fichier)'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Trop de fichiers (max 25 fichiers)'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur La Petite Vitrine (Resend) démarré sur le port ${PORT}`);
  console.log(`🌐 Frontend attendu sur: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`📧 Emails envoyés via Resend depuis: ${process.env.FROM_EMAIL}`);
});