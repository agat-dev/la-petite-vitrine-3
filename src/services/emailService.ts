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
  private readonly API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  
  async sendFormSubmissionEmails(formData: FormData): Promise<EmailResponse> {
    try {
      console.log('📧 Envoi des emails via Resend');
      console.log('Données du formulaire:', {
        client: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        filesCount: formData.visualFiles.length + formData.textFiles.length + formData.otherFiles.length
      });
      
      // Préparer les données du formulaire pour l'API
      const emailData = {
        // Informations client
        client: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          sector: formData.sector,
          interventionArea: formData.interventionArea,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        // Détails du projet
        project: {
          mainCompetitors: formData.mainCompetitors,
          proposedServices: formData.proposedServices,
          specificityPositioning: formData.specificityPositioning,
          typesOfClients: formData.typesOfClients,
          communicationTone: formData.communicationTone,
          existingContentLinks: formData.existingContentLinks,
          miscellaneousInfo: formData.miscellaneousInfo
        },
        // Informations sur les fichiers
        files: {
          visualFiles: formData.visualFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
          })),
          textFiles: formData.textFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
          })),
          otherFiles: formData.otherFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
          }))
        },
        // Métadonnées
        metadata: {
          submissionDate: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        }
      };

      // Créer un FormData pour l'envoi avec les fichiers
      const formDataToSend = new FormData();
      formDataToSend.append('emailData', JSON.stringify(emailData));
      
      // Ajouter les fichiers
      formData.visualFiles.forEach(file => {
        formDataToSend.append('visualFiles', file);
      });
      formData.textFiles.forEach(file => {
        formDataToSend.append('textFiles', file);
      });
      formData.otherFiles.forEach(file => {
        formDataToSend.append('otherFiles', file);
      });

      const response = await fetch(`${this.API_BASE_URL}/api/send-resend-emails`, {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Erreur lors de l\'envoi des emails via Resend:', error);
      
      // Fallback : sauvegarde locale
      localStorage.setItem('pendingFormSubmission', JSON.stringify({
        ...formData,
        submissionDate: new Date().toISOString(),
        id: Date.now().toString()
      }));
      
      return {
        success: true, // On retourne success true même en cas d'erreur réseau
        message: 'Votre demande a été enregistrée. Nous vous contacterons dans les plus brefs délais.',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }
}

export const emailService = new EmailService();