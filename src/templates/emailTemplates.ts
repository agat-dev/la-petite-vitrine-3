export const generateAdminEmailTemplate = (formData: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nouvelle demande de devis - La Petite Vitrine</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .section { background: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .section h3 { color: #d97706; margin-top: 0; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .full-width { grid-column: 1 / -1; }
        .files-list { background: #e5e7eb; padding: 10px; border-radius: 5px; }
        .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 10px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Nouvelle demande de devis</h1>
          <p>Reçue le ${new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div class="urgent">
          <strong>⚡ Action requise :</strong> Contacter le client sous 24h pour confirmer la réception et planifier un échange.
        </div>

        <div class="section">
          <h3>👤 Informations client</h3>
          <div class="info-grid">
            <div><strong>Nom :</strong> ${formData.client.firstName} ${formData.client.lastName}</div>
            <div><strong>Email :</strong> <a href="mailto:${formData.client.email}">${formData.client.email}</a></div>
            <div><strong>Téléphone :</strong> <a href="tel:${formData.client.phone}">${formData.client.phone}</a></div>
            <div><strong>Entreprise :</strong> ${formData.client.company}</div>
            <div><strong>Secteur :</strong> ${formData.client.sector}</div>
            <div><strong>Zone d'intervention :</strong> ${formData.client.interventionArea || 'Non spécifiée'}</div>
          </div>
        </div>

        <div class="section">
          <h3>📍 Adresse</h3>
          <div class="info-grid">
            <div class="full-width"><strong>Adresse :</strong> ${formData.client.address}</div>
            <div><strong>Ville :</strong> ${formData.client.city}</div>
            <div><strong>Code postal :</strong> ${formData.client.postalCode}</div>
            <div><strong>Pays :</strong> ${formData.client.country}</div>
          </div>
        </div>

        <div class="section">
          <h3>🏢 Détails du projet</h3>
          <div>
            <div><strong>Type de clients :</strong> ${formData.project.typesOfClients}</div>
            <div><strong>Ton de communication :</strong> ${formData.project.communicationTone}</div>
          </div>
          
          ${formData.project.proposedServices ? `
            <div style="margin-top: 15px;">
              <strong>Services proposés :</strong>
              <div style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">
                ${formData.project.proposedServices.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}

          ${formData.project.specificityPositioning ? `
            <div style="margin-top: 15px;">
              <strong>Spécificité / Positionnement :</strong>
              <div style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">
                ${formData.project.specificityPositioning.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}

          ${formData.project.mainCompetitors ? `
            <div style="margin-top: 15px;">
              <strong>Concurrents principaux :</strong>
              <div style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">
                ${formData.project.mainCompetitors.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}

          ${formData.project.existingContentLinks ? `
            <div style="margin-top: 15px;">
              <strong>Contenus existants :</strong>
              <div style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">
                ${formData.project.existingContentLinks.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}

          ${formData.project.miscellaneousInfo ? `
            <div style="margin-top: 15px;">
              <strong>Informations diverses :</strong>
              <div style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">
                ${formData.project.miscellaneousInfo.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}
        </div>

        ${(formData.files.visualFiles.length > 0 || formData.files.textFiles.length > 0 || formData.files.otherFiles.length > 0) ? `
          <div class="section">
            <h3>📎 Fichiers joints</h3>
            
            ${formData.files.visualFiles.length > 0 ? `
              <div class="files-list">
                <strong>🎨 Éléments visuels (${formData.files.visualFiles.length}) :</strong>
                <ul>
                  ${formData.files.visualFiles.map((file: any) => `
                    <li>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}

            ${formData.files.textFiles.length > 0 ? `
              <div class="files-list">
                <strong>📄 Documents texte (${formData.files.textFiles.length}) :</strong>
                <ul>
                  ${formData.files.textFiles.map((file: any) => `
                    <li>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}

            ${formData.files.otherFiles.length > 0 ? `
              <div class="files-list">
                <strong>📋 Autres fichiers (${formData.files.otherFiles.length}) :</strong>
                <ul>
                  ${formData.files.otherFiles.map((file: any) => `
                    <li>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div class="section">
          <h3>🔄 Prochaines étapes</h3>
          <ol>
            <li><strong>Confirmer la réception</strong> par email ou téléphone</li>
            <li><strong>Analyser les besoins</strong> et télécharger les fichiers joints</li>
            <li><strong>Préparer le devis</strong> personnalisé</li>
            <li><strong>Planifier un échange</strong> pour affiner le projet</li>
          </ol>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
          <p><strong>La Petite Vitrine</strong> - Création de sites web pour professionnels</p>
          <p>📧 contact@lapetitevitrine.com | 📞 01 23 45 67 89</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateClientEmailTemplate = (formData: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmation de votre demande - La Petite Vitrine</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .section { background: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .section h3 { color: #d97706; margin-top: 0; }
        .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; }
        .next-steps { background: #e0f2fe; padding: 15px; border-radius: 8px; }
        .contact-info { background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Demande bien reçue !</h1>
          <p>Merci ${formData.client.firstName} pour votre confiance</p>
        </div>

        <div class="success">
          <strong>🎉 Parfait !</strong> Nous avons bien reçu votre demande de devis pour votre projet de site web.
        </div>

        <div class="section">
          <h3>📋 Récapitulatif de votre demande</h3>
          <div>
            <strong>Entreprise :</strong> ${formData.client.company}<br>
            <strong>Secteur :</strong> ${formData.client.sector}<br>
            <strong>Ton de communication :</strong> ${formData.project.communicationTone}<br>
            <strong>Type de clients :</strong> ${formData.project.typesOfClients}<br>
            <strong>Date de soumission :</strong> ${new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>

        <div class="next-steps">
          <h3>🚀 Prochaines étapes</h3>
          <ol>
            <li><strong>Sous 24h :</strong> Nous vous confirmons la réception par email</li>
            <li><strong>Sous 48h :</strong> Analyse de vos besoins et préparation du devis</li>
            <li><strong>Sous 72h :</strong> Envoi de votre devis personnalisé</li>
            <li><strong>Ensuite :</strong> Échange téléphonique pour finaliser le projet</li>
          </ol>
        </div>

        <div class="section">
          <h3>💡 En attendant notre retour</h3>
          <p>Vous pouvez :</p>
          <ul>
            <li>Réfléchir aux fonctionnalités spécifiques souhaitées</li>
            <li>Rassembler d'autres éléments visuels si nécessaire</li>
            <li>Préparer les textes que vous souhaitez intégrer</li>
            <li>Noter vos questions pour notre échange téléphonique</li>
          </ul>
        </div>

        <div class="contact-info">
          <h3>📞 Besoin d'aide ?</h3>
          <p>Notre équipe est là pour vous accompagner :</p>
          <p><strong>Email :</strong> contact@lapetitevitrine.com</p>
          <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
          <p><strong>Horaires :</strong> Lundi - Vendredi : 9h - 18h</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
          <p><strong>La Petite Vitrine</strong></p>
          <p>Votre partenaire pour une présence web professionnelle</p>
          <p style="font-size: 0.9em; color: #666;">
            Cet email a été envoyé automatiquement suite à votre demande de devis.<br>
            Si vous avez des questions, n'hésitez pas à nous contacter.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};