export const generateAdminEmailTemplate = (formData: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nouvelle demande de devis - La Petite Vitrine</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; background: #F9FAFB; color: #222; }
        .container { max-width: 600px; margin: 0 auto; padding: 32px 0 24px 0; background: #F9FAFB; border-radius: 18px; border: 1px solid #E0E7EF; box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); }
        .header { text-align: center; margin-bottom: 32px; }
        .header img { height: 60px; margin-bottom: 12px; }
        .header h1 { font-size: 2rem; color: #2E66C1; margin: 0; font-weight: 700; letter-spacing: -1px; }
        .section { background: #FFF8E1; border-radius: 12px; padding: 20px 24px; margin: 0 24px 24px 24px; border: 1px solid #FCD34D; }
        .recap { background: #fff; border-radius: 12px; padding: 24px 24px 16px 24px; margin: 0 24px 24px 24px; border: 1px solid #E0E7EF; }
        .recap h2 { color: #2E66C1; font-size: 1.2rem; margin-bottom: 12px; font-weight: 700; }
        .recap h3 { color: #F59E42; font-size: 1rem; margin-bottom: 6px; font-weight: 600; }
        ul { margin: 0 0 12px 0; padding-left: 18px; }
        li { color: #2E66C1; }
        .footer { text-align: center; color: #B0B7C3; font-size: 0.9rem; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://lapetitevitrine.com/logo-pv.png" alt="La Petite Vitrine" />
          <h1>Nouvelle demande de devis</h1>
        </div>
        <div class="section">
          <p style="font-size:1.05rem;color:#2E66C1;margin:0 0 8px 0;font-weight:600;">
            ⚡ Action requise : Contacter le client sous 24h pour confirmer la réception et planifier un échange.
          </p>
        </div>
        <div class="recap">
          <h2>Récapitulatif de la demande</h2>
          <h3>Informations client</h3>
          <ul>
            <li><strong style="color:#2E66C1;">Nom :</strong> <span style="color:#222;">${formData.client.firstName} ${formData.client.lastName}</span></li>
            <li><strong style="color:#2E66C1;">Email :</strong> <span style="color:#222;">${formData.client.email}</span></li>
            <li><strong style="color:#2E66C1;">Téléphone :</strong> <span style="color:#222;">${formData.client.phone}</span></li>
            <li><strong style="color:#2E66C1;">Entreprise :</strong> <span style="color:#222;">${formData.client.company}</span></li>
            <li><strong style="color:#2E66C1;">Secteur :</strong> <span style="color:#222;">${formData.client.sector}</span></li>
            <li><strong style="color:#2E66C1;">Zone d'intervention :</strong> <span style="color:#222;">${formData.client.interventionArea || 'Non spécifiée'}</span></li>
          </ul>
          <h3>Adresse</h3>
          <ul>
            <li><strong style="color:#2E66C1;">Adresse :</strong> <span style="color:#222;">${formData.client.address}</span></li>
            <li><strong style="color:#2E66C1;">Ville :</strong> <span style="color:#222;">${formData.client.city}</span></li>
            <li><strong style="color:#2E66C1;">Code postal :</strong> <span style="color:#222;">${formData.client.postalCode}</span></li>
            <li><strong style="color:#2E66C1;">Pays :</strong> <span style="color:#222;">${formData.client.country}</span></li>
          </ul>
          <h3>Détails du projet</h3>
          <ul>
            <li><strong style="color:#2E66C1;">Type de clients :</strong> <span style="color:#222;">${formData.project.typesOfClients}</span></li>
            <li><strong style="color:#2E66C1;">Ton de communication :</strong> <span style="color:#222;">${formData.project.communicationTone}</span></li>
            ${formData.project.proposedServices ? `<li><strong style="color:#2E66C1;">Services proposés :</strong> <span style="color:#222;">${formData.project.proposedServices.replace(/\n/g, '<br>')}</span></li>` : ''}
            ${formData.project.specificityPositioning ? `<li><strong style="color:#2E66C1;">Spécificité / Positionnement :</strong> <span style="color:#222;">${formData.project.specificityPositioning.replace(/\n/g, '<br>')}</span></li>` : ''}
            ${formData.project.mainCompetitors ? `<li><strong style="color:#2E66C1;">Concurrents principaux :</strong> <span style="color:#222;">${formData.project.mainCompetitors.replace(/\n/g, '<br>')}</span></li>` : ''}
            ${formData.project.existingContentLinks ? `<li><strong style="color:#2E66C1;">Contenus existants :</strong> <span style="color:#222;">${formData.project.existingContentLinks.replace(/\n/g, '<br>')}</span></li>` : ''}
            ${formData.project.miscellaneousInfo ? `<li><strong style="color:#2E66C1;">Informations diverses :</strong> <span style="color:#222;">${formData.project.miscellaneousInfo.replace(/\n/g, '<br>')}</span></li>` : ''}
          </ul>
          ${(formData.files.visualFiles.length > 0 || formData.files.textFiles.length > 0 || formData.files.otherFiles.length > 0) ? `
            <h3>Fichiers joints</h3>
            <ul>
              ${formData.files.visualFiles.length > 0 ? `<li><strong style="color:#2E66C1;">🎨 Éléments visuels :</strong> ${formData.files.visualFiles.map((file: any) => `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`).join(', ')}</li>` : ''}
              ${formData.files.textFiles.length > 0 ? `<li><strong style="color:#2E66C1;">📄 Documents texte :</strong> ${formData.files.textFiles.map((file: any) => `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`).join(', ')}</li>` : ''}
              ${formData.files.otherFiles.length > 0 ? `<li><strong style="color:#2E66C1;">📋 Autres fichiers :</strong> ${formData.files.otherFiles.map((file: any) => `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`).join(', ')}</li>` : ''}
            </ul>
          ` : ''}
          <h3>Prochaines étapes</h3>
          <ol>
            <li><strong>Confirmer la réception</strong> par email ou téléphone</li>
            <li><strong>Analyser les besoins</strong> et télécharger les fichiers joints</li>
            <li><strong>Préparer le devis</strong> personnalisé</li>
            <li><strong>Planifier un échange</strong> pour affiner le projet</li>
          </ol>
        </div>
        <div class="footer">
          La Petite Vitrine &mdash; contact@lapetitevitrine.com
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
        body { font-family: 'Inter', Arial, sans-serif; background: #F9FAFB; color: #222; }
        .container { max-width: 600px; margin: 0 auto; padding: 32px 0 24px 0; background: #F9FAFB; border-radius: 18px; border: 1px solid #E0E7EF; box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); }
        .header { text-align: center; margin-bottom: 32px; }
        .header img { height: 60px; margin-bottom: 12px; }
        .header h1 { font-size: 2rem; color: #2E66C1; margin: 0; font-weight: 700; letter-spacing: -1px; }
        .section { background: #FFF8E1; border-radius: 12px; padding: 20px 24px; margin: 0 24px 24px 24px; border: 1px solid #FCD34D; }
        .recap { background: #fff; border-radius: 12px; padding: 24px 24px 16px 24px; margin: 0 24px 24px 24px; border: 1px solid #E0E7EF; }
        .recap h2 { color: #2E66C1; font-size: 1.2rem; margin-bottom: 12px; font-weight: 700; }
        .recap h3 { color: #F59E42; font-size: 1rem; margin-bottom: 6px; font-weight: 600; }
        ul { margin: 0 0 12px 0; padding-left: 18px; }
        li { color: #2E66C1; }
        .footer { text-align: center; color: #B0B7C3; font-size: 0.9rem; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://lapetitevvitra