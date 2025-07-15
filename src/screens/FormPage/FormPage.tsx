import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon } from 'lucide-react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { StepIndicator } from '../../components/forms/StepIndicator';
import { FormNavigation } from '../../components/forms/FormNavigation';
import { PersonalInfoStep } from '../../components/forms/steps/PersonalInfoStep';
import { CompanyInfoStep } from '../../components/forms/steps/CompanyInfoStep';
import { AddressStep } from '../../components/forms/steps/AddressStep';
import { BusinessDetailsStep } from '../../components/forms/steps/BusinessDetailsStep';
import { CommunicationStep } from '../../components/forms/steps/CommunicationStep';
import { FilesStep } from '../../components/forms/steps/FilesStep';
import { usePageSEO } from '../../components/metadata';

export const FormPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
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
  } = useMultiStepForm();

  const stepTitles = [
    'Contact',
    'Entreprise',
    'Adresse',
    'Activité',
    'Communication',
    'Fichiers'
  ];

  const steps = [
    <PersonalInfoStep formData={formData} setFormData={setFormData} errors={errors} />,
    <CompanyInfoStep formData={formData} setFormData={setFormData} errors={errors} />,
    <AddressStep formData={formData} setFormData={setFormData} errors={errors} />,
    <BusinessDetailsStep formData={formData} setFormData={setFormData} errors={errors} />,
    <CommunicationStep formData={formData} setFormData={setFormData} errors={errors} />,
    <FilesStep formData={formData} setFormData={setFormData} errors={errors} />
  ];

  const handleNext = () => {
    if (validateStep(currentStep)) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitForm();
      if (result.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Merci pour votre demande !
          </h2>
          <p className="text-gray-600 mb-6">
            Nous avons bien reçu vos informations et nous vous contacterons dans les plus brefs délais.
          </p>
          <Link
            to="/"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {usePageSEO("contact")}
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Retour
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                Demande de devis personnalisé
              </h1>
              <div className="w-16"></div> {/* Spacer */}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Indicateur d'étapes */}
            <div className="px-6 py-4 border-b border-gray-200">
              <StepIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepTitles={stepTitles}
                onStepClick={goToStep}
              />
            </div>

            {/* Contenu de l'étape */}
            <div className="px-6 py-8">
              {steps[currentStep]}
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-gray-200">
              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrevious={prevStep}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                canProceed={Object.keys(errors).length === 0}
              />
            </div>
          </div>

          {/* Information additionnelle */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              Vos informations sont sécurisées et ne seront utilisées que pour vous contacter.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};