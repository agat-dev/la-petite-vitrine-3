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
      maintenance: "puis 29€ par mois sans engagement",
      features: [
        "Site web One Page professionnel responsive",
        "Sections : Présentation, Services, Informations pratiques, Contact",
        "Formulaire de contact",
        "Intégration Google Maps",
        "Google Business",
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
      maintenance: "puis 29€ par mois sans engagement",
      features: [
        "Tout du pack de base",
        "3 pages additionnelles : Services, Réalisations, A propos, Infos pratiques",
        "Formulaire de contact",
        "Facebook + Instagram Business",
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
      maintenance: "puis 39€ par mois sans engagement",
      features: [
        "Pack Web Marketing inclus",
        "2 modules parmi : Réservation en ligne, Devis/Simulation en ligne, Messagerie Whatsapp",
        "Avis google sur le site web",
        "Facebook + Instagram Business",
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
      id: "visibilite",
      icon: "🔧",
      title: "Option Réseaux Sociaux",
      price: "29€",
      features: [
        "2 posts/mois par réseau social",
        "Mise à jour contenus site",
        "Mise à jour réseaux sociaux",
        "Visuels et contenus fournis",
        "Statistiques mensuelles",
      ],
      buttonText: "Choisir Visiblité",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      titleColor: "text-amber-900",
      priceColor: "text-amber-700",
      textColor: "text-amber-800",
      checkColor: "text-amber-600",
      buttonClass: "border-amber-600 text-amber-900 hover:bg-amber-50",
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

  // Fonction pour filtrer les services de maintenance selon le pack
  const getAvailableMaintenanceServices = (packId: string): MaintenanceService[] => {
    if (packId === "pack-metier") {
      // Pour le Pack Pro Plus, proposer les deux options
      return maintenanceServices;
    }
    // Pour les autres packs, proposer seulement l'option Visibilité
    return maintenanceServices.filter(m => m.id === "visibilite");
  };

  const handlePackSelect = (pack: Pack) => {
    setSelectedPack(pack);
    setShowMaintenanceSelector(true);
    
    // Sélectionner "Aucune maintenance" par défaut
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
      selectedMaintenance || undefined
    );
    if (session) {
      // Redirection directe vers l'URL Stripe
      window.location.href = session.url;
    }
  };

  return (
    <section id="products" className="flex flex-col items-start justify-center gap-12 md:gap-16 lg:gap-20 px-4 py-16 md:px-8 md:py-24 lg:py-36 lg:px-20 3xl:px-24 3xl:py-40 4xl:px-32 4xl:py-48 relative w-full bg-amber-900 border-t [border-top-style:solid] border-b [border-bottom-style:solid] border-slate-200">
      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[1400px] mx-auto">
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
      <div className="pb-16 flex items-center gap-6 w-full relative z-10">
        <AnimatedSection
          animation="slideRight"
          className="flex-1 flex flex-col items-start gap-6"
        >
          <div className="flex flex-col items-start gap-4 w-full">
            <h2 className="text-blue-gray200 font-heading-2 text-2xl md:text-4xl lg:text-6xl tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              Nos Packs<br /><span className="text-5xl font-serif italic text-blue-gray100">Site web et Réseaux sociaux</span>
            </h2>
            <p className="mt-4 w-4/6 text-blue-gray200 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] leading-[var(--body-l-line-height)]">
              Des solutions complètes de présence numérique pensées pour les artisans, pour vous développer en ligne tout en restant concentré sur votre métier.
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
                  "flex flex-col overflow-hidden rounded-[20px] transition-all duration-500 group relative cursor-pointer",
                  pack.bgColor,
                  "border border-solid",
                  selectedPack?.id === pack.id
                    ? "border-amber-400 scale-105 shadow-shadow-dark-XL"
                    : "border-white hover:scale-105"
                )}
                onClick={() => handlePackSelect(pack)}
              >

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
                  <p className="text-xs md:text-sm text-blue-gray800">
                    {pack.maintenance}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 px-4 md:px-6 py-4 md:py-6 relative z-10">
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
                        maintenanceServices={getAvailableMaintenanceServices(selectedPack.id)}
                        selectedMaintenance={selectedMaintenance}
                        onSelect={handleMaintenanceSelect}
                      />
                    </div>

                    {/* Panier à droite sur desktop */}
                    <div className="basis-0 lg:basis-1/2">
                      <CartSummary
                        selectedPack={selectedPack}
                        selectedMaintenance={selectedMaintenance}
                        onRemovePack={() => setSelectedPack(null)}
                        onRemoveMaintenance={() => setSelectedMaintenance(null)}
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
      </div>
      </div>
    </section>
  );
};
