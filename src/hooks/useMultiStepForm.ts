import { useState, useCallback } from 'react';
import { emailService } from '../services/emailService';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  interventionArea: string;
  mainCompetitors: string;
  proposedServices: string;
  specificityPositioning: string;
  typesOfClients: string;
  communicationTone: string;
  visualFiles: File[];
  textFiles: File[];
  otherFiles: File[];
  existingContentLinks: string;
  miscellaneousInfo: string;
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
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    interventionArea: '',
    mainCompetitors: '',
    proposedServices: '',
    specificityPositioning: '',
    typesOfClients: 'particuliers',
    communicationTone: '',
    visualFiles: [],
    textFiles: [],
    otherFiles: [],
    existingContentLinks: '',
    miscellaneousInfo: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const totalSteps = 6;

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0: // Informations personnelles
        if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
        if (!formData.email.trim()) newErrors.email = 'Email requis';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Email invalide';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
        break;

      case 1: // Informations entreprise
        if (!formData.company.trim()) newErrors.company = 'Nom d\'entreprise requis';
        if (!formData.sector.trim()) newErrors.sector = 'Secteur requis';
        break;

      case 2: // Adresse
        if (!formData.address.trim()) newErrors.address = 'Adresse requise';
        if (!formData.city.trim()) newErrors.city = 'Ville requise';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Code postal requis';
        break;

      // Les autres étapes sont optionnelles
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

      // Envoi des emails
      const emailResult = await emailService.sendFormSubmissionEmails(formData);
      
      if (emailResult.success) {
        // Réinitialiser le formulaire en cas de succès
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
          message: 'Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.'
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
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.',
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