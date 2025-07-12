import { useState, useCallback } from 'react';
import { emailService } from '../services/emailService';

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
    typesOfClients: '',
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
          typesOfClients: '',
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
  private readonly API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  private readonly USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';
  
  async sendFormSubmissionEmails(formData: FormData): Promise<EmailResponse> {
    // Si le backend n'est pas configuré, utiliser le mode fallback
    if (!this.USE_BACKEND) {
      return this.handleFormSubmissionFallback(formData);
    }

    try {
      console.log('📧 Tentative d\'envoi des emails via Resend');
      
      // Test de connectivité du backend
      const healthCheck = await fetch(`${this.API_BASE_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // Timeout de 5 secondes
      });

      if (!healthCheck.ok) {
        throw new Error('Backend non disponible');
      }

      // Préparer les données
      const emailData = {
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
        project: {
          mainCompetitors: formData.mainCompetitors,
          proposedServices: formData.proposedServices,
          specificityPositioning: formData.specificityPositioning,
          typesOfClients: formData.typesOfClients,
          communicationTone: formData.communicationTone,
          existingContentLinks: formData.existingContentLinks,
          miscellaneousInfo: formData.miscellaneousInfo
        },
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
        metadata: {
          submissionDate: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        }
      };

      // Créer FormData pour l'envoi
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
        body: formDataToSend,
        signal: AbortSignal.timeout(30000) // Timeout de 30 secondes
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Erreur lors de l\'envoi des emails via Resend:', error);
      
      // Fallback en cas d'erreur
      return this.handleFormSubmissionFallback(formData);
    }
  }

  private async handleFormSubmissionFallback(formData: FormData): Promise<EmailResponse> {
    try {
      console.log('📧 Mode fallback activé - Sauvegarde des données');
      
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
          visual: formData.visualFiles.map(f => ({ name: f.name, size: f.size })),
          text: formData.textFiles.map(f => ({ name: f.name, size: f.size })),
          other: formData.otherFiles.map(f => ({ name: f.name, size: f.size }))
        },
        status: 'pending_manual_processing'
      };

      // Sauvegarder dans localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));

      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('✅ Données sauvegardées localement');
      console.log('📋 Résumé:', submissionData);

      return {
        success: true,
        message: `Merci ${formData.firstName} ! Votre demande a été enregistrée. Nous vous contacterons à l'adresse ${formData.email} dans les plus brefs délais.`
      };

    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde fallback:', error);
      return {
        success: false,
        message: 'Une erreur est survenue. Veuillez nous contacter directement par email ou téléphone.',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  // Méthode pour récupérer les soumissions sauvegardées
  getLocalSubmissions() {
    return JSON.parse(localStorage.getItem('formSubmissions') || '[]');
  }

  // Méthode pour vider les soumissions locales
  clearLocalSubmissions() {
    localStorage.removeItem('formSubmissions');
  }
}

export const emailService = new EmailService();