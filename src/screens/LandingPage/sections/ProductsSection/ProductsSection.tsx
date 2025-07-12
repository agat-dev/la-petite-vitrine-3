import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import { cn } from "../../../../lib/utils";
import StyledWrapper from "../../../../components/ui/button-ui";
import { CartSummary } from "../../../../components/ui/cart-summary";
import { MaintenanceSelector } from "../../../../components/ui/maintenance-selector";
import { useStripe } from "../../../../hooks/useStripe";
import type { Pack, MaintenanceService } from "../../../../types/stripe";

export const ProductsSection = (): JSX.Element => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<MaintenanceService | null>(null);
  const [showMaintenanceSelector, setShowMaintenanceSelector] = useState(false);

  const { createCheckoutSession, loading, error } = useStripe();

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
  const getAvailableMaintenanceServices = (
    packId: string
  ): MaintenanceService[] => {
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

  const handleCheckout = async () => {
    if (!selectedPack || !selectedMaintenance) return;

    // Sauvegarder les sélections pour la page commande
    localStorage.setItem("selectedPack", JSON.stringify(selectedPack));
    localStorage.setItem("selectedMaintenance", JSON.stringify(selectedMaintenance));

    // Rediriger vers la page commande
    window.location.href = "/commande";

    // Ou avec React Router :
    // navigate('/commande');
  };

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading-2 text-blue-gray900 mb-4">
            Nos Packs
          </h2>
          <p className="text-lg text-blue-gray700 max-w-2xl mx-auto">
            Choisissez le pack qui correspond à vos besoins et sélectionnez
            votre maintenance mensuelle
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
                        : "Commander ce pack"}
                    </span>
                  </StyledWrapper>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredContainer>

        {/* Sélecteur de maintenance */}
        {showMaintenanceSelector && selectedPack && (
          <div id="maintenance-section" className="scroll-mt-8">
            <AnimatedSection animation="slideUp" delay={300}>
              <div>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Section maintenance à gauche */}
                  <div className="flex-1 basis-0 lg:basis-1/2">
                    <MaintenanceSelector
                      maintenanceServices={getAvailableMaintenanceServices(
                        selectedPack.id
                      )}
                      selectedMaintenance={selectedMaintenance}
                      onSelect={handleMaintenanceSelect}
                    />
                  </div>

                  {/* Panier à droite sur desktop */}
                  <div className="basis-0 lg:basis-1/2">
                    <CartSummary
                      selectedPack={selectedPack}
                      selectedMaintenance={selectedMaintenance}
                      onRemovePack={() => {
                        setSelectedPack(null);
                        setSelectedMaintenance(null);
                        setShowMaintenanceSelector(false);
                      }}
                      onCheckout={handleCheckout}
                      loading={loading}
                    />
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
