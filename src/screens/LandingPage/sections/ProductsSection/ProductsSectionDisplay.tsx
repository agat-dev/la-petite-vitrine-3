// Inline type definitions for Pack and MaintenanceService
interface Pack {
  id: string;
  icon: React.ReactNode;
  title: string;
  price: string;
  maintenance?: string;
  features: string[];
  buttonText?: string;
  isRecommended?: boolean;
  bgColor?: string;
  textColor?: string;
  priceColor?: string;
  buttonVariant?: string;
}

interface MaintenanceService {
  id: string;
  icon: React.ReactNode;
  title: string;
  price: string;
  features: string[];
  buttonText?: string;
  bgColor?: string;
  borderColor?: string;
  titleColor?: string;
  priceColor?: string;
  textColor?: string;
  checkColor?: string;
  buttonClass?: string;
}
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import { cn } from "../../../../lib/utils";
import StyledWrapper from "../../../../components/ui/button-ui";
// Removed type-only import for Pack and MaintenanceService since '../../../../types/stripe' is not a module
import { Link } from 'react-router-dom';

export const ProductsSectionDisplay = (): JSX.Element => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceService | null>(null);
  const [showMaintenanceSelector, setShowMaintenanceSelector] = useState(false);

  // Packs principaux
  const mainPacks: Pack[] = [
    {
      id: "pack-base",
      icon: "💡",
      title: "Pack Essentiel",
      price: "290€",
      maintenance: "",
      features: [
        "Site web One Page professionnel responsive",
        "Google Business",
        "5 Sections : Présentation, Services, Informations pratiques, Map, Contact",
        "Mise à jour des contenus",
        "Nom de domaine + hébergement 1 an",
        "Livraison en 5 jours",
        "Sans engagement",
      ],
      buttonText: "Choisir ce pack",
      isRecommended: false,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
      buttonVariant: "secondary",
    },
    {
      id: "pack-presence",
      icon: "⭐",
      title: "Pack Pro",
      price: "490€",
      maintenance: "",
      features: [
        "Tout le pack de base",
        "Facebook + Instagram Business",
        "3 pages additionnelles : Services, Réalisations, A propos, Infos pratiques",
        "Livraison en 7 jours",
        "Sans engagement",
      ],
      buttonText: "Pack recommandé",
      isRecommended: true,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
      buttonVariant: "primary",
    },
    {
      id: "pack-metier",
      icon: "🎨",
      title: "Pack Pro Plus",
      price: "690€",
      maintenance: "",
      features: [
        "Tout le pack pro",
        "2 modules métier additionnels : Réservation en ligne, Devis/Simulation en ligne, Messagerie Whatsapp, Avis clients",
        "Réseaux sociaux professionnels",
        "Livraison en 9 jours",
        "Sans engagement",
      ],
      buttonText: "Solution complète",
      isRecommended: false,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
      buttonVariant: "secondary",
    },
  ];

  // Services de maintenance
  const maintenanceServices: MaintenanceService[] = [
    {
      id: "maintenance-simple",
      icon: "🔧",
      title: "Option Maintenance simple",
      price: "19€",
      features: [
        "Hébergement et nom de domaine",
        "Sauvegardes quotidiennes",
        "Mises à jour de sécurité",
        "Support technique par email",
      ],
      buttonText: "Maintenance de base",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      titleColor: "text-blue-900",
      priceColor: "text-blue-700",
      textColor: "text-blue-gray900",
      checkColor: "text-blue-600",
      buttonClass: "border-blue-600 text-blue-900 hover:bg-blue-50",
    },
    {
      id: "visibilite-plus",
      icon: "📱",
      title: "Option Visibilité Plus",
      price: "39€",
      features: [
        "Tout de l'Option Maintenance simple",
        "Animation des réseaux sociaux",
        "Création de contenu mensuel",
        "Suivi des performances",
        "Support téléphonique prioritaire",
      ],
      buttonText: "Maintenance premium",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      titleColor: "text-green-900",
      priceColor: "text-green-700",
      textColor: "text-blue-gray900",
      checkColor: "text-green-600",
      buttonClass: "border-green-600 text-green-900 hover:bg-green-50",
    },
  ];

  // Fonction pour filtrer les services de maintenance selon le pack
  const getAvailableMaintenanceServices = (packId: string): MaintenanceService[] => {
    // Tous les packs peuvent maintenant avoir les deux options de maintenance
    return maintenanceServices;
  };

  // Fonction pour obtenir la maintenance par défaut selon le pack
  const getDefaultMaintenance = (packId: string): MaintenanceService => {
    if (packId === "pack-metier") {
      // Pour le Pack Pro Plus, maintenance premium par défaut
      return maintenanceServices.find((m) => m.id === "visibilite-plus")!;
    }
    // Pour les autres packs, maintenance simple par défaut
    return maintenanceServices.find((m) => m.id === "maintenance-simple")!;
  };

  const handlePackSelect = (pack: Pack) => {
    setSelectedPack(pack);
    setShowMaintenanceSelector(true);

    // Sélectionner automatiquement la maintenance par défaut
    const defaultMaintenance = getDefaultMaintenance(pack.id);
    setSelectedMaintenance(defaultMaintenance);

    // Scroll vers la section maintenance après un court délai pour l'animation
    setTimeout(() => {
      const maintenanceSection = document.getElementById("maintenance-section");
      if (maintenanceSection) {
        maintenanceSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  const handleMaintenanceSelect = (maintenance: MaintenanceService) => {
    setSelectedMaintenance(maintenance);
  };

  const handleContactClick = () => {
    // Redirection vers le formulaire de devis
    window.location.href = '/devis';
  };

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading-2 text-blue-gray900 mb-4">
            Nos Packs
          </h2>
          <p className="text-lg text-blue-gray700 max-w-2xl mx-auto">
            Choisissez le pack qui correspond à vos besoins et découvrez nos options de maintenance
          </p>
        </div>

        {/* Sélection des packs */}
        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainPacks.map((pack) => (
            <Card
              key={pack.id}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg",
                pack.bgColor,
                selectedPack?.id === pack.id ? "ring-2 ring-amber-400" : ""
              )}
              onClick={() => handlePackSelect(pack)}
            >
              <CardHeader className="pb-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{pack.icon}</div>
                  <h3
                    className={cn(
                      "text-xl font-heading-4 mb-2",
                      pack.textColor
                    )}
                  >
                    {pack.title}
                  </h3>
                  <p className={cn("text-3xl font-bold", pack.priceColor)}>
                    {pack.price}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {pack.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-gray700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-16 flex-1 flex items-center justify-center">
                  <StyledWrapper>
                    <span className="text-sm text-blue-gray800">
                      {selectedPack?.id === pack.id
                        ? "Sélectionné"
                        : "Découvrir ce pack"}
                    </span>
                  </StyledWrapper>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredContainer>

        {/* Sélecteur de maintenance - Affichage uniquement */}
        {showMaintenanceSelector && selectedPack && (
          <div id="maintenance-section" className="scroll-mt-8">
            <AnimatedSection animation="slideUp" delay={300}>
              <div>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Section maintenance à gauche */}
                  <div className="flex-1 basis-0 lg:basis-1/2">
                    <div className="mt-12 space-y-4">
                      <div className="text-left">
                        <h3 className="text-2xl font-heading-4 text-blue-gray100 mb-4">
                          Options de maintenance mensuelle (obligatoire)
                        </h3>
                        <p className="text-blue-gray200 font-body-m mb-6">
                          Chaque pack inclut une maintenance mensuelle pour assurer le bon fonctionnement de votre site et de vos réseaux sociaux.
                        </p>
                      </div>

                      {/* Services de maintenance */}
                      <div className="space-y-4">
                        {getAvailableMaintenanceServices(selectedPack.id).map((maintenance) => (
                          <Card
                            key={maintenance.id}
                            className={cn(
                              "cursor-pointer transition-all duration-300 hover:shadow-lg relative",
                              maintenance.bgColor,
                              maintenance.borderColor,
                              selectedMaintenance?.id === maintenance.id
                                ? "border-2 shadow-md"
                                : "border hover:border-amber-300"
                            )}
                            onClick={() => handleMaintenanceSelect(maintenance)}
                          >
                            {/* Badge recommandé pour l'option Visibilité Plus */}
                            {maintenance.id === "visibilite-plus" && (
                              <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                <span>⭐</span>
                                <span>Recommandé</span>
                              </div>
                            )}
                            
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="text-2xl">{maintenance.icon}</div>
                                  <div className="flex-1">
                                    <h4 className={cn("font-heading-6 font-bold", maintenance.titleColor)}>
                                      {maintenance.title} - {maintenance.price}/mois
                                    </h4>
                                    <div className="mt-2 space-y-1">
                                      {maintenance.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <CheckIcon className={cn("w-4 h-4", maintenance.checkColor)} />
                                          <span className={cn("text-sm", maintenance.textColor)}>
                                            {feature}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {selectedMaintenance?.id === maintenance.id && (
                                  <CheckIcon className="w-5 h-5 text-amber-600" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Message informatif */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                        <div className="flex items-start gap-3">
                          <div className="text-amber-600 mt-0.5">ℹ️</div>
                          <div>
                            <h4 className="font-medium text-amber-900 mb-1">
                              Pourquoi une maintenance est-elle obligatoire ?
                            </h4>
                            <p className="text-sm text-amber-800">
                              La maintenance assure la sécurité, les performances et la disponibilité de votre site web. 
                              Elle inclut l'hébergement, les sauvegardes et le support technique nécessaire au bon fonctionnement de votre présence en ligne.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Résumé à droite sur desktop */}
                  <div className="basis-0 lg:basis-1/2">
                    <div className="sticky top-12 bg-amber-50 rounded-[30px] shadow-shadow-dark-l p-6">
                      <div className="pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 text-amber-900">🛍️</div>
                          <h3 className="font-heading-6 text-blue-gray900">Votre sélection</h3>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Pack sélectionné */}
                        <div className="flex items-start justify-between p-3 bg-amber-100 rounded-lg border border-amber-200">
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-gray900 text-sm">{selectedPack.title}</h4>
                            <p className="text-amber-900 font-bold">{selectedPack.price}</p>
                            <p className="text-xs text-blue-gray600">Paiement unique</p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedPack(null);
                              setSelectedMaintenance(null);
                              setShowMaintenanceSelector(false);
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Maintenance sélectionnée */}
                        {selectedMaintenance && (
                          <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex-1">
                              <h4 className="font-medium text-blue-gray900 text-sm">{selectedMaintenance.title}</h4>
                              <p className="text-blue-600 font-bold">{selectedMaintenance.price}/mois</p>
                              <p className="text-xs text-blue-gray600">Abonnement mensuel sans engagement</p>
                            </div>
                          </div>
                        )}

                        {/* Résumé des coûts */}
                        {selectedMaintenance && (
                          <div className="border-t border-amber-200 pt-4">
                            <div className="bg-blue-50 p-2 rounded text-xs text-blue-gray700 mb-4">
                              <strong>Note:</strong> La maintenance sera facturée mensuellement.
                            </div>
                            
                            {/* Détail des coûts */}
                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between items-center text-sm text-blue-gray700">
                                <span>Pack {selectedPack.title}:</span>
                                <span>{selectedPack.price}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-blue-gray700">
                                <span>Maintenance (1er mois):</span>
                                <span>{selectedMaintenance.price}</span>
                              </div>
                            </div>
                            
                            {/* Total */}
                            <div className="flex justify-between items-center text-lg font-bold text-amber-900 border-t border-amber-200 pt-2">
                              <span>Total de départ:</span>
                              <span>
                                {parseInt(selectedPack.price.replace('€', '')) + parseInt(selectedMaintenance.price.replace('€', ''))}€
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm text-blue-gray600 mt-1">
                              <span>Puis chaque mois:</span>
                              <span>{selectedMaintenance.price}</span>
                            </div>
                          </div>
                        )}

                        {/* Bouton de contact */}
                        <Link
                          to="/devis"
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center block"
                        >
                          Demander un devis personnalisé
                        </Link>

                        <p className="text-xs text-blue-gray500 text-center">
                          Devis gratuit et sans engagement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
};