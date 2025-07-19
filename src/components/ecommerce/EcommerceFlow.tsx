import React, { useState } from 'react';
import { useEcommerce } from '../../hooks/useEcommerce';
import { PackSelector } from './PackSelector';
import { StepForm } from './StepForm';
import { OrderSummary } from './OrderSummary';
import { MaintenanceSelector } from './MaintenanceSelector';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';
import { PACKS, MAINTENANCE_OPTIONS } from '../../data/ecommerce-data';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
      const pack = stepFormData.selectedPack;
      const maintenance = stepFormData.selectedMaintenance;
      const formData = stepFormData.formData;
      const total = calculateTotal();
      const adminEmail = "contact@lapetitevitrine.com";
      if (pack && maintenance && formData.email) {
        // Préparation du FormData pour l'envoi de fichiers en pièce jointe
        const buildFormData = (to: string, subject: string, html: string) => {
          const fd = new FormData();
          fd.append('to', to);
          fd.append('subject', subject);
          fd.append('html', html);

          // Ajout des fichiers
          if (formData.visualFiles && Array.isArray(formData.visualFiles)) {
            console.log('visualFiles trouvés :', formData.visualFiles);
            formData.visualFiles.forEach((f: File, idx: number) => {
              console.log(`Ajout visualFiles[${idx}]: ${f.name} (${f.size} octets)`);
              fd.append('visualFiles', f, f.name);
            });
          }
          if (formData.textFiles && Array.isArray(formData.textFiles)) {
            console.log('textFiles trouvés :', formData.textFiles);
            formData.textFiles.forEach((f: File, idx: number) => {
              console.log(`Ajout textFiles[${idx}]: ${f.name} (${f.size} octets)`);
              fd.append('textFiles', f, f.name);
            });
          }
          if (formData.otherFiles && Array.isArray(formData.otherFiles)) {
            console.log('otherFiles trouvés :', formData.otherFiles);
            formData.otherFiles.forEach((f: File, idx: number) => {
              console.log(`Ajout otherFiles[${idx}]: ${f.name} (${f.size} octets)`);
              fd.append('otherFiles', f, f.name);
            });
          }
          console.log('Envoi du fetch avec FormData :', fd);
          return fd;
        };

        // Email client
        const htmlClient = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Confirmation de commande - La Petite Vitrine</title>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; background: #F9FAFB; color: #222; }
              .container { max-width: 600px; margin: 0 auto; padding: 32px 0 24px 0; background: #F9FAFB; border-radius: 18px; border: 1px solid #E0E7EF; box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); }
              .header { text-align: center; margin-bottom: 32px; }
              .header img { height: 60px; margin-bottom: 12px; }
              .header h1 { font-size: 2rem; color: #2E66C1; margin: 0; font-weight: 700; letter-spacing: -1px; }
              .section { background: #FFF8E1; border-radius: 12px; padding: 20px 24px; margin: 0 24px 24px 24px; border: 1px solid #FCD34D; }
              .recap { background: #fff; border-radius: 12px; padding: 24px 24px 16px 24px; margin: 0 24px 24px 24px; border: 1px solid #E0E7EF; }
              .recap h2 { color: #2E66C1; font-size: 1.2rem; margin-bottom: 12px; font-weight: 700; }
              .recap h3 { color: #F59E42; font-size: 1rem; margin-bottom: 6px; font-weight: 600; }
              ul { margin: 0 0 12px 0; padding-left: 18px; }
              li { color: #2E66C1; }
              .footer { text-align: center; color: #B0B7C3; font-size: 0.9rem; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://lapetitevitrine.com/logo-pv.png" alt="La Petite Vitrine" />
                <h1>Confirmation de commande</h1>
              </div>
              <div class="section">
                <p style="font-size:1.05rem;color:#2E66C1;margin:0 0 8px 0;font-weight:600;">
                  Merci pour votre confiance !
                </p>
                <p style="font-size:1rem;color:#222;margin:0;">
                  Vous recevrez sous 48h une validation de votre commande avec un accès à une prise de rendez-vous en ligne pour préciser votre besoin pour être certains que notre travail corresponde à vos attentes.<br>
                  Vous recevrez également un lien pour procéder au paiement en ligne de votre commande.
                </p>
              </div>
              <div class="recap">
                <h2>Récapitulatif de commande</h2>
                <h3>Pack sélectionné</h3>
                <ul>
                  <li style="color:#222;font-weight:600;">${pack.title} - ${pack.price}€</li>
                  ${pack.features.map((f) => `<li style="color:#2E66C1;">${f}</li>`).join('')}
                </ul>
                <h3>Maintenance sélectionnée</h3>
                <ul>
                  <li style="color:#222;font-weight:600;">${maintenance.title} - ${maintenance.price}€/mois</li>
                  <li style="color:#2E66C1;">${maintenance.description}</li>
                </ul>
                <h3>Informations client</h3>
                <ul>
                  ${Object.entries(formData)
                    .map(([k, v]) => `<li><strong style="color:#2E66C1;">${FORM_FIELD_LABELS[k] ?? k}:</strong> <span style="color:#222;">${v}</span></li>`)
                    .join('')}
                </ul>
                <h3>Montant total</h3>
                <p style="font-size:1.1rem;color:#2E66C1;font-weight:700;margin:0 0 8px 0;">
                  ${total}€ <span style="color:#222;font-weight:400;font-size:0.95rem;">(+${maintenance.price}€/mois de maintenance)</span>
                </p>
              </div>
              <div class="footer">
                La Petite Vitrine &mdash; contact@lapetitevitrine.com
              </div>
            </div>
          </body>
          </html>
        `;

        // Email admin
        const htmlAdmin = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Nouvelle commande reçue - La Petite Vitrine</title>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; background: #F9FAFB; color: #222; }
              .container { max-width: 600px; margin: 0 auto; padding: 32px 0 24px 0; background: #F9FAFB; border-radius: 18px; border: 1px solid #E0E7EF; box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); }
              .header { text-align: center; margin-bottom: 32px; }
              .header img { height: 60px; margin-bottom: 12px; }
              .header h1 { font-size: 2rem; color: #2E66C1; margin: 0; font-weight: 700; letter-spacing: -1px; }
              .section { background: #FFF8E1; border-radius: 12px; padding: 20px 24px; margin: 0 24px 24px 24px; border: 1px solid #FCD34D; }
              .recap { background: #fff; border-radius: 12px; padding: 24px 24px 16px 24px; margin: 0 24px 24px 24px; border: 1px solid #E0E7EF; }
              .recap h2 { color: #2E66C1; font-size: 1.2rem; margin-bottom: 12px; font-weight: 700; }
              .recap h3 { color: #F59E42; font-size: 1rem; margin-bottom: 6px; font-weight: 600; }
              ul { margin: 0 0 12px 0; padding-left: 18px; }
              li { color: #2E66C1; }
              .footer { text-align: center; color: #B0B7C3; font-size: 0.9rem; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://lapetitevitrine.com/logo-pv.png" alt="La Petite Vitrine" />
                <h1>Nouvelle commande reçue</h1>
              </div>
              <div class="section">
                <p style="font-size:1.05rem;color:#2E66C1;margin:0 0 8px 0;font-weight:600;">
                  Nouvelle commande à traiter.
                </p>
                <p style="font-size:1rem;color:#222;margin:0;">
                  Un client vient de passer commande. Retrouvez le récapitulatif ci-dessous.
                </p>
              </div>
              <div class="recap">
                <h2>Récapitulatif de commande</h2>
                <h3>Pack sélectionné</h3>
                <ul>
                  <li style="color:#222;font-weight:600;">${pack.title} - ${pack.price}€</li>
                  ${pack.features.map((f) => `<li style="color:#2E66C1;">${f}</li>`).join('')}
                </ul>
                <h3>Maintenance sélectionnée</h3>
                <ul>
                  <li style="color:#222;font-weight:600;">${maintenance.title} - ${maintenance.price}€/mois</li>
                  <li style="color:#2E66C1;">${maintenance.description}</li>
                </ul>
                <h3>Informations client</h3>
                <ul>
                  ${Object.entries(formData)
                    .map(([k, v]) => `<li><strong style="color:#2E66C1;">${FORM_FIELD_LABELS[k] ?? k}:</strong> <span style="color:#222;">${v}</span></li>`)
                    .join('')}
                </ul>
                <h3>Montant total</h3>
                <p style="font-size:1.1rem;color:#2E66C1;font-weight:700;margin:0 0 8px 0;">
                  ${total}€ <span style="color:#222;font-weight:400;font-size:0.95rem;">(+${maintenance.price}€/mois de maintenance)</span>
                </p>
              </div>
              <div class="footer">
                La Petite Vitrine &mdash; contact@lapetitevitrine.com
              </div>
            </div>
          </body>
          </html>
        `;

        // Envoi email client avec fichiers en PJ
        await fetch('/api/send-order-recap', {
          method: 'POST',
          body: buildFormData(formData.email, 'Votre récapitulatif de commande - La Petite Vitrine', htmlClient),
        });

        // Envoi email admin avec fichiers en PJ
        await fetch('/api/send-order-recap', {
          method: 'POST',
          body: buildFormData(adminEmail, 'Nouvelle commande reçue - La Petite Vitrine', htmlAdmin),
        });

        setEmailSent(true);
      } else {
        setEmailResult('Erreur : données de commande incomplètes.');
      }
      navigate('/success');
    } catch (error) {
      setEmailResult('Erreur lors de la création de la commande');
      console.log('[EcommerceFlow] Erreur lors de la commande :', error);
    } finally {
      setSending(false);
    }
  };

  // Navigation entre les étapes
  const handlePackSelected = () => {
    setCurrentFlow('maintenance-selection');
  };

  const handleFormCompleted = async () => {
    // On déclenche l'envoi d'email et la création de commande ici
    await handleCompleteOrder();
    navigate('/success'); // Ou navigate('/success') si tu veux aller directement à la page de succès
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

  // Associe les clés de FormData à leur label utilisateur pour affichage dans le récapitulatif
  const FORM_FIELD_LABELS: Record<string, string> = {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    company: "Entreprise",
    secteur_activite: "Secteur d'activité",
    address: "Adresse",
    city: "Ville",
    postalCode: "Code postal",
    zone_intervention: "Zone d'intervention",
    mainCompetitors: "Concurrents principaux",
    services_proposes: "Services proposés",
    specificite_positionnement: "Positionnement spécifique",
    type_clients: "Types de clients",
    ton_communication: "Ton de communication",
    liens_contenus_existants: "Liens vers vos contenus existants",
    informations_diverses: "Informations diverses",
    elements_visuels: "Fichiers visuels",
    textes_contenus: "Fichiers textes",
    autres_fichiers: "Autres fichiers",
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
            <h1 className="md:text-3xl text-2xl font-bold text-blue-gray100 font-heading-2 text-center">
              Commande en ligne
            </h1>
            <p className="text-blue-gray200 text-center font-body-l">
              Nous validons votre commande sous 48h, vous recevrez un email de confirmation avec les détails.
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
                onNextStep={isLastStep ? handleFormCompleted : nextStep}
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


                    {/* Envoi de l'email de récapitulatif déplacé dans handleCompleteOrder */}
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