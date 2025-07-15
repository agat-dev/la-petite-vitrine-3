import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, ShoppingCartIcon, CreditCardIcon } from 'lucide-react';
import { useMultiStepForm } from './../hooks/useMultiStepForm';
import { StepIndicator } from './../components/forms/StepIndicator';
import { FormNavigation } from './../components/forms/FormNavigation';
import { PersonalInfoStep } from './../components/forms/steps/PersonalInfoStep';
import { CompanyInfoStep } from './../components/forms/steps/CompanyInfoStep';
import { AddressStep } from './../components/forms/steps/AddressStep';
import { BusinessDetailsStep } from './../components/forms/steps/BusinessDetailsStep';
import { CommunicationStep } from './../components/forms/steps/CommunicationStep';
import { FilesStep } from './../components/forms/steps/FilesStep';

interface Pack {
  id: string;
  title: string;
  price: string;
  icon: string;
}

interface MaintenanceService {
  id: string;
  title: string;
  price: string;
  icon: string;
}

export const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const isStripeEnabled = import.meta.env.VITE_STRIPE_ENABLED === 'false';

  useEffect(() => {
    // Si Stripe est désactivé, rediriger vers le formulaire de devis
    if (!isStripeEnabled) {
      navigate('/devis', { replace: true });
    }
  }, [isStripeEnabled, navigate]);

  // Si Stripe est désactivé, ne rien afficher (redirection en cours)
  if (!isStripeEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Redirection en cours...</h2>
          <p className="text-gray-600">Vous allez être redirigé vers le formulaire de devis.</p>
        </div>
      </div>
    );
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceService | null>(null);
  
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
    <PersonalInfoStep key="step-0" formData={formData} setFormData={setFormData} errors={errors} />,
    <CompanyInfoStep key="step-1" formData={formData} setFormData={setFormData} errors={errors} />,
    <AddressStep key="step-2" formData={formData} setFormData={setFormData} errors={errors} />,
    <BusinessDetailsStep key="step-3" formData={formData} setFormData={setFormData} errors={errors} />,
    <CommunicationStep key="step-4" formData={formData} setFormData={setFormData} errors={errors} />,
    <FilesStep key="step-5" formData={formData} setFormData={setFormData} errors={errors} />
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

  // Récupération des paramètres de commande
  useEffect(() => {
    try {
      const savedPack = localStorage.getItem('selectedPack');
      const savedMaintenance = localStorage.getItem('selectedMaintenance');
      
      if (savedPack) {
        setSelectedPack(JSON.parse(savedPack));
      }
      if (savedMaintenance) {
        setSelectedMaintenance(JSON.parse(savedMaintenance));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des sélections:', error);
    }
  }, []);

  const calculateTotal = () => {
    if (!selectedPack) return 0;
    
    const packPrice = parseInt(selectedPack.price.replace('€', ''));
    const maintenancePrice = selectedMaintenance ? parseInt(selectedMaintenance.price.replace('€', '')) : 0;
    
    return packPrice + maintenancePrice;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Commande enregistrée !
          </h2>
          <p className="text-gray-600 mb-6">
            Nous avons bien reçu votre commande et nous vous contacterons dans les plus brefs délais pour finaliser votre projet.
          </p>
          <div className="space-y-3">
            <Link
              to="/"
              className="block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Retour
              </Link>
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="w-5 h-5 text-amber-600" />
                <h1 className="text-xl font-bold text-gray-900">
                  Finaliser votre commande
                </h1>
              </div>
              <div className="w-16"></div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Formulaire - 2/3 */}
            <div className="lg:col-span-2">
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
            </div>

            {/* Résumé de commande - 1/3 */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Récapitulatif de commande */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCardIcon className="w-5 h-5 text-amber-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Récapitulatif de commande
                    </h3>
                  </div>

                  {selectedPack ? (
                    <div className="space-y-4">
                      {/* Pack sélectionné */}
                      <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-amber-900">
                            {selectedPack.title}
                          </h4>
                          <span className="text-lg font-bold text-amber-900">
                            {selectedPack.price}
                          </span>
                        </div>
                        <p className="text-sm text-amber-700">
                          Paiement unique - Site web complet
                        </p>
                      </div>

                      {/* Maintenance sélectionnée */}
                      {selectedMaintenance && (
                        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-blue-900">
                              {selectedMaintenance.title}
                            </h4>
                            <span className="text-lg font-bold text-blue-900">
                              {selectedMaintenance.price}/mois
                            </span>
                          </div>
                          <p className="text-sm text-blue-700">
                            Abonnement mensuel sans engagement
                          </p>
                        </div>
                      )}

                      {/* Total */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Pack initial :</span>
                          <span className="font-medium">{selectedPack.price}</span>
                        </div>
                        {selectedMaintenance && (
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Maintenance (1er mois) :</span>
                            <span className="font-medium">{selectedMaintenance.price}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t border-gray-200 pt-2">
                          <span>Total à payer :</span>
                          <span>{calculateTotal()}€</span>
                        </div>
                        {selectedMaintenance && (
                          <p className="text-sm text-gray-500 mt-2">
                            Puis {selectedMaintenance.price}/mois
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        Aucun pack sélectionné
                      </p>
                      <Link
                        to="/"
                        className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Choisir un pack
                      </Link>
                    </div>
                  )}
                </div>

                {/* Avantages */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Vos avantages
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        Devis gratuit et sans engagement
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        Livraison selon planning convenu
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        Support client dédié
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        Garantie satisfaction
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Besoin d'aide ?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Notre équipe est disponible pour vous accompagner
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      📞 <strong>Téléphone :</strong> 01 23 45 67 89
                    </p>
                    <p className="text-gray-700">
                      ✉️ <strong>Email :</strong> contact@lapetitevitrine.com
                    </p>
                    <p className="text-gray-700">
                      🕒 <strong>Horaires :</strong> Lun-Ven 9h-18h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information sécurité */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              🔒 Vos informations sont sécurisées et ne seront utilisées que pour traiter votre commande.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};