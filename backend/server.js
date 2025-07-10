const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration multer pour les fichiers
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// Middleware
app.use(cors());
app.use(express.json());

// Configuration email
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Route pour l'envoi des emails
app.post('/api/send-form-emails', upload.fields([
  { name: 'visualFiles', maxCount: 10 },
  { name: 'textFiles', maxCount: 10 },
  { name: 'otherFiles', maxCount: 5 }
]), async (req, res) => {
  try {
    const emailData = JSON.parse(req.body.emailData);
    
    // Préparer les attachments
    const attachments = [];
    
    if (req.files) {
      ['visualFiles', 'textFiles', 'otherFiles'].forEach(category => {
        if (req.files[category]) {
          req.files[category].forEach(file => {
            attachments.push({
              filename: file.originalname,
              content: file.buffer
            });
          });
        }
      });
    }

    // Email à l'admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Nouvelle demande de devis - ${emailData.client.company}`,
      html: generateAdminEmailTemplate(emailData),
      attachments: attachments
    };

    // Email au client
    const clientMailOptions = {
      from: process.env.SMTP_USER,
      to: emailData.client.email,
      subject: 'Confirmation de votre demande - La Petite Vitrine',
      html: generateClientEmailTemplate(emailData)
    };

    // Envoi des emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    res.json({
      success: true,
      message: 'Emails envoyés avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi des emails',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});