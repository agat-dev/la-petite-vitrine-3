interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  interventionArea: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  mainCompetitors: string;
  proposedServices: string;
  specificityPositioning: string;
  typesOfClients: string;
  communicationTone: string;
  existingContentLinks: string;
  miscellaneousInfo: string;
  visualFiles: File[];
  textFiles: File[];
  otherFiles: File[];
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

class EmailService {
  async sendFormSubmissionEmails(formData: FormData): Promise<EmailResponse> {
    try {
      console.log('📧 Mode simulation activé - Traitement des données du formulaire');
      console.log('Données reçues:', {
        client: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        filesCount: formData.visualFiles.length + formData.textFiles.length + formData.otherFiles.length
      });

      // Créer un résumé des données pour sauvegarde
      const submissionData = {
        id: `submission_${Date.now()}`,
        timestamp: new Date().toISOString(),
        client: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          sector: formData.sector,
          address: `${formData.address}, ${formData.city} ${formData.postalCode}, ${formData.country}`,
          interventionArea: formData.interventionArea
        },
        project: {
          typesOfClients: formData.typesOfClients,
          communicationTone: formData.communicationTone,
          proposedServices: formData.proposedServices,
          specificityPositioning: formData.specificityPositioning,
          mainCompetitors: formData.mainCompetitors,
          existingContentLinks: formData.existingContentLinks,
          miscellaneousInfo: formData.miscellaneousInfo
        },
        files: {
          total: formData.visualFiles.length + formData.textFiles.length + formData.otherFiles.length,
          visual: formData.visualFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
          text: formData.textFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
          other: formData.otherFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
        },
        status: 'pending_manual_processing'
      };

      // Sauvegarder dans localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));

      // Aussi sauvegarder la dernière soumission séparément pour l'affichage
      localStorage.setItem('lastSubmission', JSON.stringify(submissionData));

      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('✅ Données sauvegardées avec succès');
      console.log('📋 ID de soumission:', submissionData.id);

      return {
        success: true,
        message: `Merci ${formData.firstName} ! Votre demande a été enregistrée avec succès. Nous vous contacterons à l'adresse ${formData.email} dans les plus brefs délais.`
      };

    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      return {
        success: false,
        message: 'Une erreur est survenue lors de l\'enregistrement. Veuillez nous contacter directement par email ou téléphone.',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  // Méthode pour récupérer les soumissions sauvegardées
  getLocalSubmissions() {
    try {
      return JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    } catch {
      return [];
    }
  }

  // Méthode pour récupérer la dernière soumission
  getLastSubmission() {
    try {
      return JSON.parse(localStorage.getItem('lastSubmission') || 'null');
    } catch {
      return null;
    }
  }

  // Méthode pour vider les soumissions locales
  clearLocalSubmissions() {
    localStorage.removeItem('formSubmissions');
    localStorage.removeItem('lastSubmission');
  }

  // Méthode pour exporter les données en CSV
  exportSubmissionsAsCSV() {
    const submissions = this.getLocalSubmissions();
    if (submissions.length === 0) return null;

    const headers = ['Date', 'ID', 'Nom', 'Email', 'Téléphone', 'Entreprise', 'Secteur', 'Adresse', 'Fichiers'];
    const rows = submissions.map((sub: any) => [
      new Date(sub.timestamp).toLocaleDateString('fr-FR'),
      sub.id,
      sub.client.name,
      sub.client.email,
      sub.client.phone,
      sub.client.company,
      sub.client.sector || '',
      sub.client.address,
      sub.files.total
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `soumissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }
}

export const emailService = new EmailService();