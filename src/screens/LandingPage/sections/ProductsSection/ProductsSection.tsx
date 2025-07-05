import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import { cn } from "../../../../lib/utils";
import StyledButton from "../../../../components/ui/styled-button";
import { CartSummary } from "../../../../components/ui/cart-summary";
import { MaintenanceSelector } from "../../../../components/ui/maintenance-selector";
import { useStripe } from "../../../../hooks/useStripe";
import type { Pack, MaintenanceService } from "../../../../types/stripe";

export const ProductsSection = (): JSX.Element => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<MaintenanceService | null>(null);
  const [showMaintenanceSelector, setShowMaintenanceSelector] = useState(false);

  const { createCheckoutSession, redirectToCheckout, loading, error } =
    useStripe();

  // Packs principaux
  const mainPacks: Pack[] = [
    {
      id: "pack-base",
      icon: "💡",
      title: "Pack Site de Base",
      price: "290€",
      maintenance: "puis 19€ par mois sans engagement",
      features: [
        "Site web One Page professionnel responsive",
        "Formulaire de contact",
        "Création des visuels et contenus",
        "Optimisation SEO incluse",
        "Google Business",
        "Nom de domaine + hébergement 1 an",
        "Livraison en 5 jours",
        "Sans engagement",
      ],
      buttonText: "Choisir ce pack",
      isRecommended: false,
      bgColor: "bg-blue-gray900",
      textColor: "text-white",
      priceColor: "text-amber-400",
      buttonVariant: "secondary",
    },
    {
      id: "pack-presence",
      icon: "⭐",
      title: "Pack Web Marketing",
      price: "490€",
      maintenance: "puis 19€ par mois sans engagement",
      features: [
        "Tout du pack de base",
        "3 pages additionnelles parmi :",
        "Services, Réalisations, A propos, Infos pratiques",
        "Formulaire de contact",
        "Facebook + Instagram Business",
        "Sans engagement",
      ],
      buttonText: "Pack recommandé",
      isRecommended: true,
      bgColor: "bg-blue-gray900",
      textColor: "text-white",
      priceColor: "text-amber-400",
      buttonVariant: "primary",
    },
    {
      id: "pack-metier",
      icon: "🎨",
      title: "Pack Métier",
      price: "690€",
      maintenance: "puis 29€ par mois sans engagement",
      features: [
        "Pack Web Marketing inclus",
        "2 modules parmi :",
        "Réservation en ligne, Devis/Simulation en ligne, Messagerie Whatsapp",
        "Avis google sur le site web",
        "Facebook + Instagram Business",
        "Réseaux sociaux professionnels",
        "Sans engagement",
      ],
      buttonText: "Solution complète",
      isRecommended: false,
      bgColor: "bg-blue-gray900",
      textColor: "text-white",
      priceColor: "text-amber-400",
      buttonVariant: "secondary",
    },
  ];

  // Services de maintenance
  const maintenanceServices: MaintenanceService[] = [
    {
      id: "maintenance-essentielle",
      icon: "🔧",
      title: "Option Visiblité Essentielle",
      price: "19€",
      features: [
        "2 posts/mois par réseau social",
        "Visuels et contenus fournis",
        "Mise à jour contenus site",
        "Mise à jour réseaux sociaux",
        "Statistiques mensuelles",
      ],
      buttonText: "Choisir Essentielle",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      titleColor: "text-amber-900",
      priceColor: "text-amber-700",
      textColor: "text-amber-800",
      checkColor: "text-amber-600",
      buttonClass: "border-amber-600 text-amber-900 hover:bg-amber-100",
    },
    {
      id: "maintenance-plus",
      icon: "⚡",
      title: "Option Visibilité Plus",
      price: "29€",
      features: [
        "Tout de la visibilité essentielle",
        "2 articles de blog/mois",
        "Visuels et contenus fournis",
        "Mise à jour contenus site",
        "Mise à jour réseaux sociaux",
        "Statistiques mensuelles",
      ],
      buttonText: "Choisir Plus",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      titleColor: "text-amber-900",
      priceColor: "text-amber-700",
      textColor: "text-amber-800",
      checkColor: "text-amber-600",
      buttonClass: "border-amber-600 text-amber-900 hover:bg-amber-100",
    },
  ];

  // Formes décoratives
  const decorativeShapes = [
    {
      className:
        "w-[180px] h-[180px] top-16 left-[1100px] bg-green-700 absolute rounded-[50px] opacity-75",
    },
    {
      className:
        "w-[150px] h-[150px] top-[400px] left-[950px] bg-fuchsia-700 rounded-[30px] absolute opacity-75",
    },
    {
      className:
        "w-[100px] h-[100px] top-[300px] left-[700px] bg-amber-700 absolute rounded-[30px] opacity-75",
    },
    {
      className:
        "w-[120px] h-[120px] top-0 left-[400px] bg-blue-light700 rounded-[50px] absolute opacity-75",
    },
    {
      className:
        "w-[200px] h-[200px] top-[500px] left-0 bg-pink-700 absolute rounded-[50px] opacity-75",
    },
  ];

  const handlePackSelect = (pack: Pack) => {
    setSelectedPack(pack);
    setShowMaintenanceSelector(true);
    setSelectedMaintenance(null);

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

  const handleMaintenanceSelect = (maintenance: MaintenanceService | null) => {
    setSelectedMaintenance(maintenance);
  };

  const handleCheckout = async () => {
    if (!selectedPack) return;

    const session = await createCheckoutSession(
      selectedPack,
      selectedMaintenance
    );
    if (session) {
      // Redirection directe vers l'URL Stripe
      window.location.href = session.url;
    }
  };

  const resetSelection = () => {
    setSelectedPack(null);
    setSelectedMaintenance(null);
    setShowMaintenanceSelector(false);
  };

  return (
    <section className="flex flex-col items-start justify-center gap-12 md:gap-16 lg:gap-20 p-4 md:p-8 lg:p-20 relative w-full bg-amber-50 border-t [border-top-style:solid] border-b [border-bottom-style:solid] border-slate-200">
      {/* Background vector conservé */}
      <img
        className="hidden lg:block absolute w-full h-[327px] top-[436px] left-0 opacity-20"
        alt="Vector"
        src="/vector-13.svg"
      />

      {/* Formes décoratives */}
      <div className="hidden lg:block absolute w-full h-full top-0 left-0 overflow-hidden">
        {decorativeShapes.map((shape, index) => (
          <div key={`shape-${index}`} className={shape.className} />
        ))}
      </div>

      {/* En-tête de section */}
      <div className="flex items-center gap-6 w-full relative z-10">
        <AnimatedSection
          animation="slideRight"
          className="flex-1 flex flex-col items-start gap-6"
        >
          <div className="flex flex-col items-start gap-4 w-full">
            <h2 className="text-blue-gray900 font-heading-2 font-[number:var(--heading-2-font-weight)] text-2xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              Nos Packs Création Site Web
            </h2>
            <p className="text-blue-gray700 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] leading-[var(--body-l-line-height)]">
              Du site simple aux solutions complètes avec réseaux sociaux
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Affichage des erreurs */}
      {error && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative z-10">
          <strong className="font-bold">Erreur: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 w-full relative z-10">
        <div className="flex-1">
          {/* Packs principaux - 3 colonnes */}
          <StaggeredContainer
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mb-8"
            staggerDelay={200}
            animation="slideUp"
          >
            {mainPacks.map((pack, index) => (
              <Card
                key={pack.id}
                className={cn(
                  "flex flex-col overflow-hidden rounded-[10px] transition-all duration-500 group relative cursor-pointer",
                  pack.bgColor,
                  "border border-solid",
                  selectedPack?.id === pack.id
                    ? "border-amber-400 scale-105 shadow-shadow-dark-XL"
                    : "border-slate-900 hover:scale-105"
                )}
                onClick={() => handlePackSelect(pack)}
              >
                {pack.isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-400 text-blue-gray900 px-6 py-2 rounded-full text-sm font-bold">
                    RECOMMANDÉ
                  </div>
                )}

                {selectedPack?.id === pack.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-blue-gray900" />
                  </div>
                )}

                {/* Image de fond décorative */}
                <div
                  className="absolute w-full h-[150px] md:h-[180px] lg:h-[220px] top-0 left-0 bg-cover bg-center opacity-20"
                  style={{
                    backgroundImage: `url(../picture-${index + 2}.png)`,
                  }}
                />

                <CardHeader className="text-center pt-6 md:pt-8 pb-4 md:pb-6 relative z-10">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                    {pack.icon}
                  </div>
                  <h3
                    className={`font-heading-6 font-[number:var(--heading-6-font-weight)] ${pack.textColor} text-lg md:text-xl lg:text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)] mb-2`}
                  >
                    {pack.title}
                  </h3>
                  <div
                    className={`text-2xl md:text-3xl font-bold ${pack.priceColor} mb-1`}
                  >
                    {pack.price}
                  </div>
                  <p className="text-xs md:text-sm text-blue-gray200">
                    {pack.maintenance}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 px-4 md:px-6 pb-4 md:pb-6 relative z-10">
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {pack.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3 group"
                      >
                        <CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span
                          className={`${pack.textColor} font-body-m text-sm md:text-base lg:text-[length:var(--body-m-font-size)] leading-[var(--body-m-line-height)]`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <span className="text-sm text-blue-gray200">
                      {selectedPack?.id === pack.id
                        ? "Sélectionné"
                        : "Cliquer pour sélectionner"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredContainer>

          {/* Sélecteur de maintenance */}
          {showMaintenanceSelector && selectedPack && (
            <div id="maintenance-section" className="scroll-mt-8">
              <AnimatedSection animation="slideUp" delay={300}>
                <div className="bg-white p-6 rounded-lg border-2 border-amber-200 shadow-shadow-dark-l">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Section maintenance à gauche */}
                    <div className="flex-1">
                      <MaintenanceSelector
                        maintenanceServices={maintenanceServices}
                        selectedMaintenance={selectedMaintenance}
                        onSelect={handleMaintenanceSelect}
                      />

                      <div className="flex justify-center gap-4 mt-6 lg:hidden">
                        <StyledButton
                          variant="secondary"
                          onClick={resetSelection}
                        >
                          Recommencer
                        </StyledButton>
                      </div>
                    </div>

                    {/* Panier à droite sur desktop */}
                    <div className="lg:w-80">
                      <CartSummary
                        selectedPack={selectedPack}
                        selectedMaintenance={selectedMaintenance}
                        onRemovePack={() => setSelectedPack(null)}
                        onRemoveMaintenance={() => setSelectedMaintenance(null)}
                        onCheckout={handleCheckout}
                        loading={loading}
                      />

                      <div className="hidden lg:flex justify-center gap-4 mt-4">
                        <StyledButton
                          variant="secondary"
                          onClick={resetSelection}
                          className="w-full"
                        >
                          Recommencer
                        </StyledButton>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
