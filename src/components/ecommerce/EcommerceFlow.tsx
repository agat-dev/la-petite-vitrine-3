import React, { useState } from 'react';
import { useEcommerce } from '../../hooks/useEcommerce';
import { PackSelector } from './PackSelector';
import { StepForm } from './StepForm';
import { OrderSummary } from './OrderSummary';
import { OrderEmailSender } from './OrderEmailSender';
import { MaintenanceSelector } from './MaintenanceSelector';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';
import { PACKS, MAINTENANCE_OPTIONS } from '../../data/ecommerce-data';
import { useEffect } from 'react';

type FlowStep = 'pack-selection' | 'maintenance-selection' | 'form' | 'summary';

interface EcommerceFlowProps {
  initialFlow?: FlowStep;
  preSelectedPackId?: string;
  preSelectedMaintenanceId?: string | null;
}

export const EcommerceFlow: React.FC<EcommerceFlowProps> = ({ 
  initialFlow = 'pack-selection',
  preSelectedPackId,
  preSelectedMaintenanceId
}) => {
  const [currentFlow, setCurrentFlow] = useState<FlowStep>(initialFlow);



  const {
    stepFormData,
    selectPack,
    selectMaintenance,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    createOrder,
    isFormValid,
    isLastStep,
    isFirstStep
  } = useEcommerce();

  // Pré-sélection du pack si spécifié
  useEffect(() => {
    if (preSelectedPackId && !stepFormData.selectedPack) {
      const pack = PACKS.find(p => p.id === preSelectedPackId);
      if (pack) {
        selectPack(pack);
      }
    }
  }, [preSelectedPackId, stepFormData.selectedPack, selectPack]);

  // Pré-sélection de la maintenance si spécifiée
  useEffect(() => {
    if (preSelectedMaintenanceId !== undefined) {
      const option = preSelectedMaintenanceId ? MAINTENANCE_OPTIONS.find(m => m.id === preSelectedMaintenanceId) : null;
      if (option && !stepFormData.selectedMaintenance) {
        selectMaintenance(option);
      }
    }
  }, [preSelectedMaintenanceId, stepFormData.selectedMaintenance, selectMaintenance]);


  // Finaliser la commande
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailResult, setEmailResult] = useState<string | null>(null);

  const handleCompleteOrder = async () => {
    setSending(true);
    setEmailResult(null);
    try {
      await createOrder();
      setEmailSent(true);
    } catch (error) {
      setEmailResult('Erreur lors de la création de la commande');
    } finally {
      setSending(false);
    }
  };

  // Navigation entre les étapes
  const handlePackSelected = () => {
    setCurrentFlow('maintenance-selection');
  };

  const handleFormCompleted = () => {
    setCurrentFlow('summary');
  };

  const goBack = () => {
    switch (currentFlow) {
      case 'maintenance-selection':
        setCurrentFlow('pack-selection');
        break;
      case 'form':
        setCurrentFlow('maintenance-selection');
        break;
      case 'summary':
        setCurrentFlow('form');
        break;
      default:
        break;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="flex justify-center items-center mb-8 bg-amber-900 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50">
          <div className="flex flex-col items-center space-4 gap-6">
            <div className='flex justify-start gap-2'>
            {/* Bouton retour à l'accueil */}
            <Button
              variant="default"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 border-blue-gray-300 text-blue-gray-100 hover:bg-blue-gray-50"
            >
              <HomeIcon className="w-4 h-4" />
              Accueil
            </Button>
            
            {currentFlow !== 'pack-selection' && (
              <Button
                variant="outline"
                onClick={goBack}
                className="flex items-center gap-2 border-amber-300 text-amber-900 hover:bg-amber-50"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Retour
              </Button>
            )}
            </div>
            <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-gray100 font-heading-2">
              Commande en ligne
            </h1>
            <p className="text-blue-gray200 text-center font-body-l">
              48h avant validation de votre commande. <br />Nous vous recontactons pour affiner votre demande et démarrer la production le plus rapidement possible.
            </p>
            </div>
          </div>
        </div>


        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {currentFlow === 'pack-selection' && (
              <PackSelector
                selectedPack={stepFormData.selectedPack}
                onSelectPack={(pack) => {
                  console.log('Pack selected:', pack.title);
                  selectPack(pack);
                  handlePackSelected();
                }}
              />
            )}

            {currentFlow === 'maintenance-selection' && (
              <>
                <MaintenanceSelector
                  maintenanceOptions={MAINTENANCE_OPTIONS}
                  selectedMaintenance={stepFormData.selectedMaintenance ?? null}
                  onSelectMaintenance={selectMaintenance}
                  className="mb-8"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      console.log('Maintenance continue button clicked');
                      setCurrentFlow('form');
                    }}
                    disabled={!stepFormData.selectedMaintenance}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded-xl shadow-md"
                  >
                    Continuer
                  </Button>
                </div>
              </>
            )}

            {currentFlow === 'form' && (
              <StepForm
                steps={stepFormData.steps}
                currentStep={stepFormData.currentStep}
                formData={stepFormData.formData}
                onUpdateFormData={updateFormData}
                onNextStep={() => {
                  if (isLastStep && isFormValid) {
                    handleFormCompleted();
                  } else {
                    nextStep();
                  }
                }}
                onPrevStep={prevStep}
                onGoToStep={goToStep}
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
                className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl"
              />
            )}

            {currentFlow === 'summary' && (
              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-100 to-blue-gray-100 p-8">
                    <h2 className="text-3xl font-bold text-blue-gray900 mb-2 font-heading-2 text-center">
                      Finaliser votre commande
                    </h2>
                  </CardHeader>
                  <CardContent className="p-8">
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-green-800 mb-2">
                          ✅ Votre commande est prête !
                        </h3>
                        <p className="text-green-700 text-sm">
                          Vérifiez les détails ci-contre et cliquez sur "Confirmer la commande" 
                          pour finaliser votre achat.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-blue-800 mb-2">
                          📧 Prochaines étapes
                        </h3>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Vous recevrez un email de confirmation</li>
                          <li>• Notre équipe vous contactera sous 24h</li>
                          <li>• Accès à votre espace client pour suivre l'avancement</li>
                        </ul>
                      </div>
                    </div>


                    {/* Envoi de l'email de récapitulatif au clic sur Confirmer la commande */}
                    {stepFormData.selectedPack && stepFormData.selectedMaintenance ? (
                      <OrderEmailSender
                        pack={stepFormData.selectedPack}
                        maintenance={stepFormData.selectedMaintenance}
                        formData={stepFormData.formData}
                        total={calculateTotal()}
                        adminEmail={"contact@la-petite-vitrine.com"}
                      />
                    ) : (
                      <div className="text-red-600 mb-2">Erreur : pack ou maintenance manquant.</div>
                    )}
                    <Button
                      onClick={handleCompleteOrder}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-4 rounded-xl shadow-lg font-medium mt-4"
                      disabled={sending}
                    >
                      {sending ? 'Traitement...' : 'Confirmer la commande'}
                    </Button>
                    {emailResult && <div className="text-red-600 mt-2">{emailResult}</div>}
                    
                    <div className="text-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="text-blue-gray-600 hover:text-blue-gray-800 border-blue-gray-300 hover:bg-blue-gray-50"
                      >
                        Retourner à l'accueil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                selectedPack={stepFormData.selectedPack}
                selectedMaintenance={stepFormData.selectedMaintenance}
                formData={stepFormData.formData}
                totalPrice={calculateTotal()}
                className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}