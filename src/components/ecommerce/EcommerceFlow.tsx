import React, { useState } from 'react';
import { useEcommerce } from '../../hooks/useEcommerce';
import { PackSelector } from './PackSelector';
import { MaintenanceSelector } from './MaintenanceSelector';
import { StepForm } from './StepForm';
import { OrderSummary } from './OrderSummary';
import { CustomerDashboard } from './CustomerDashboard';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowLeftIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { PACKS } from '../../data/ecommerce-data';
import { useEffect } from 'react';

type FlowStep = 'pack-selection' | 'maintenance-selection' | 'form' | 'summary' | 'dashboard';

interface EcommerceFlowProps {
  initialFlow?: FlowStep;
  preSelectedPackId?: string;
}
export const EcommerceFlow: React.FC<EcommerceFlowProps> = ({ 
  initialFlow = 'pack-selection',
  preSelectedPackId 
}) => {
  const [currentFlow, setCurrentFlow] = useState<FlowStep>(initialFlow);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  const {
    stepFormData,
    customer,
    selectPack,
    selectMaintenance,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    createOrder,
    resetForm,
    loginCustomer,
    logout,
    isFormValid,
    currentStep,
    isLastStep,
    isFirstStep
  } = useEcommerce();

  // Pré-sélection du pack si spécifié
  useEffect(() => {
    if (preSelectedPackId && !stepFormData.selectedPack) {
      const pack = PACKS.find(p => p.id === preSelectedPackId);
      if (pack) {
        selectPack(pack);
        // Si on démarre directement sur le formulaire, on pré-sélectionne aussi "aucune maintenance"
        if (initialFlow === 'form') {
          selectMaintenance(undefined);
        }
      }
    }
  }, [preSelectedPackId, stepFormData.selectedPack, selectPack, selectMaintenance, initialFlow]);

  // Gestion de la connexion
  const handleLogin = () => {
    if (loginCustomer(loginEmail)) {
      setCurrentFlow('dashboard');
      setShowLogin(false);
      setLoginEmail('');
    } else {
      alert('Client non trouvé. Veuillez passer une commande d\'abord.');
    }
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    setCurrentFlow('pack-selection');
    resetForm();
  };

  // Finaliser la commande
  const handleCompleteOrder = async () => {
    try {
      await createOrder();
      alert('Commande créée avec succès !');
      setCurrentFlow('dashboard');
    } catch (error) {
      alert('Erreur lors de la création de la commande');
    }
  };

  // Navigation entre les étapes
  const handlePackSelected = () => {
    setCurrentFlow('maintenance-selection');
  };

  const handleMaintenanceSelected = () => {
    setCurrentFlow('form');
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

  // Si un client est connecté et on est sur le dashboard
  if (customer && currentFlow === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <CustomerDashboard
          customer={customer}
          onLogout={handleLogout}
          className="max-w-6xl mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            {currentFlow !== 'pack-selection' && (
              <Button
                variant="outline"
                onClick={goBack}
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Retour
              </Button>
            )}
            <h1 className="text-3xl font-bold text-blue-gray900">
              Commande en ligne
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Bouton connexion */}
            <Button
              variant="outline"
              onClick={() => setShowLogin(!showLogin)}
              className="flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              Espace client
            </Button>

            {/* Indicateur panier */}
            {stepFormData.selectedPack && (
              <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-lg">
                <ShoppingCartIcon className="w-4 h-4 text-amber-700" />
                <span className="text-sm font-medium text-amber-700">
                  {calculateTotal()}€
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Formulaire de connexion */}
        {showLogin && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Connexion espace client</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-blue-gray900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="votre@email.com"
                  />
                </div>
                <Button onClick={handleLogin} className="bg-amber-600 hover:bg-amber-700">
                  Se connecter
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {currentFlow === 'pack-selection' && (
              <PackSelector
                selectedPack={stepFormData.selectedPack}
                onSelectPack={(pack) => {
                  selectPack(pack);
                  handlePackSelected();
                }}
              />
            )}

            {currentFlow === 'maintenance-selection' && (
              <div className="space-y-6">
                <MaintenanceSelector
                  selectedMaintenance={stepFormData.selectedMaintenance}
                  onSelectMaintenance={selectMaintenance}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleMaintenanceSelected}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
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
              />
            )}

            {currentFlow === 'summary' && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-blue-gray900 mb-6">
                      Finaliser votre commande
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-800 mb-2">
                          ✅ Votre commande est prête !
                        </h3>
                        <p className="text-green-700 text-sm">
                          Vérifiez les détails ci-contre et cliquez sur "Confirmer la commande" 
                          pour finaliser votre achat.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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

                    <Button
                      onClick={handleCompleteOrder}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-3"
                    >
                      Confirmer la commande
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar - Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                selectedPack={stepFormData.selectedPack}
                selectedMaintenance={stepFormData.selectedMaintenance}
                formData={stepFormData.formData}
                totalPrice={calculateTotal()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};