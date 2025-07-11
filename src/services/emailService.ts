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
      console.log('📧 Simulation d\'envoi d\'emails');
      console.log('Données du formulaire:', {
        client: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        filesCount: formData.visualFiles.length + formData.textFiles.length + formData.otherFiles.length
      });
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler un succès
      return {
        success: true,
        message: 'Votre demande a été enregistrée. Nous vous contacterons dans les plus brefs délais.'
      };
      
    } catch (error) {
      console.error('Erreur lors de la simulation d\'envoi:', error);
      return {
        success: false,
        message: 'Une erreur est survenue lors de l\'enregistrement de votre demande.',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }
}

export const emailService = new EmailService();