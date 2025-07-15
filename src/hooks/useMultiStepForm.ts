import { useState, useCallback } from 'react';
import type { FormData } from '../types/formTypes';


interface FormErrors {
  [key: string]: string;
}

interface SubmitResult {
  success: boolean;
  message: string;
  error?: string;
}

export const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    interventionArea: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    mainCompetitors: '',
    proposedServices: '',
    specificityPositioning: '',
    typesOfClients: 'particuliers',
    communicationTone: '',
    existingContentLinks: '',
    miscellaneousInfo: '',
    visualFiles: [],
    textFiles: [],
    otherFiles: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const totalSteps = 6;

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0: // Personal Info
        if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
        if (!formData.email.trim()) newErrors.email = 'Email requis';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Email invalide';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
        break;

      case 1: // Company Info
        if (!formData.company.trim()) newErrors.company = 'Nom d\'entreprise requis';
        if (!formData.sector.trim()) newErrors.sector = 'Secteur requis';
        break;

      case 2: // Address
        if (!formData.address.trim()) newErrors.address = 'Adresse requise';
        if (!formData.city.trim()) newErrors.city = 'Ville requise';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Code postal requis';
        break;

      case 3: // Business Details
      case 4: // Communication
      case 5: // Files
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const submitForm = useCallback(async (): Promise<SubmitResult> => {
    try {
      // Validation finale
      let isValid = true;
      for (let i = 0; i < totalSteps; i++) {
        if (!validateStep(i)) {
          isValid = false;
        }
      }

      if (!isValid) {
        return {
          success: false,
          message: 'Veuillez corriger les erreurs dans le formulaire'
        };
      }

      // Sauvegarde locale des données
      localStorage.setItem('formSubmission', JSON.stringify({
        ...formData,
        submissionDate: new Date().toISOString(),
        id: Date.now().toString()
      }));

      // Simulation d'envoi
      const emailResult = await emailService.sendFormSubmissionEmails(formData);
      
      if (emailResult.success) {
        // Réinitialiser le formulaire
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          sector: '',
          interventionArea: '',
          address: '',
          city: '',
          postalCode: '',
          country: 'France',
          mainCompetitors: '',
          proposedServices: '',
          specificityPositioning: '',
          typesOfClients: 'particuliers',
          communicationTone: '',
          existingContentLinks: '',
          miscellaneousInfo: '',
          visualFiles: [],
          textFiles: [],
          otherFiles: []
        });
        
        setCurrentStep(0);
        setErrors({});
        
        return {
          success: true,
          message: emailResult.message
        };
      } else {
        return {
          success: false,
          message: emailResult.message,
          error: emailResult.error
        };
      }
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      return {
        success: false,
        message: 'Une erreur est survenue. Vos données ont été sauvegardées localement.',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }, [formData, validateStep, totalSteps]);

  return {
    currentStep,
    formData,
    setFormData,
    errors,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    validateStep,
    submitForm
  };
};

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

class EmailService {
  // Utilise l'API Resend pour envoyer l'email directement
  async sendFormSubmissionEmails(formData: FormData): Promise<EmailResponse> {
    try {
      console.log('📧 Tentative d\'envoi des emails via Resend API');
      // Préparer le contenu de l'email
      const htmlContent = [
        `<h2>Nouvelle demande via La Petite Vitrine</h2>`,
        `<p><strong>Nom:</strong> ${formData.firstName} ${formData.lastName}</p>`,
        `<p><strong>Email:</strong> ${formData.email}</p>`,
        `<p><strong>Téléphone:</strong> ${formData.phone}</p>`,
        `<p><strong>Entreprise:</strong> ${formData.company}</p>`,
        `<p><strong>Secteur:</strong> ${formData.sector}</p>`,
        `<p><strong>Zone d'intervention:</strong> ${formData.interventionArea}</p>`,
        `<p><strong>Adresse:</strong> ${formData.address}, ${formData.city} ${formData.postalCode}, ${formData.country}</p>`,
        `<p><strong>Clients:</strong> ${formData.typesOfClients}</p>`,
        `<p><strong>Services proposés:</strong> ${formData.proposedServices}</p>`,
        `<p><strong>Positionnement:</strong> ${formData.specificityPositioning}</p>`,
        `<p><strong>Concurrents principaux:</strong> ${formData.mainCompetitors}</p>`,
        `<p><strong>Ton de communication:</strong> ${formData.communicationTone}</p>`,
        `<p><strong>Liens contenus existants:</strong> ${formData.existingContentLinks}</p>`,
        `<p><strong>Infos diverses:</strong> ${formData.miscellaneousInfo}</p>`,
        `<p><strong>Date de soumission:</strong> ${new Date().toLocaleString()}</p>`
      ].join('');

      // Appel à l'API Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@la-petite-vitrine.fr',
          to: 'contact@la-petite-vitrine.fr',
          subject: `Nouvelle demande - ${formData.firstName} ${formData.lastName}`,
          html: htmlContent
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: `Merci ${formData.firstName} ! Votre demande a été envoyée. Nous vous contacterons à l'adresse ${formData.email} dans les plus brefs délais.`
      };

    } catch (error) {
      console.error('Erreur lors de l\'envoi des emails via Resend:', error);
      // Fallback en cas d'erreur
      return this.handleFormSubmissionFallback(formData);
    }
  }

  private async handleFormSubmissionFallback(formData: FormData): Promise<EmailResponse> {
    try {
      // Sauvegarde simple en cas d'échec Resend
      localStorage.setItem('formSubmissionFallback', JSON.stringify({
        ...formData,
        submissionDate: new Date().toISOString(),
        id: Date.now().toString()
      }));
      return {
        success: true,
        message: `Merci ${formData.firstName} ! Votre demande a été enregistrée localement. Nous vous contacterons à l'adresse ${formData.email} dès que possible.`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Une erreur est survenue. Veuillez nous contacter directement par email ou téléphone.',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }
}

const emailService = new EmailService();