import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { Card, CardContent, CardHeader } from "./card";
import StyledWrapper from "./button-ui";

interface DemoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoPopup: React.FC<DemoPopupProps> = ({ isOpen, onClose }) => {
  const demoCards = [
    {
      image: "/artisan-renov.jpg",
      title: "Site d'artisan rénovateur",
      description: "OnePage vitrine pour artisans avec réalisations et témoignages",
      category: "Vitrine",
      url: "https://artisan-renov.lapetitevitrine.com",
    },
    {
      image: "/artisan-coiffeur.jpg",
      title: "Site d'artisan coiffeur",
      description: "OnePage vitrine pour coiffeurs avec formulaire de contact",
      category: "Vitrine",
      url: "https://artisan-coiffeur.lapetitevitrine.com",
    },
  ];

  const handleCardClick = (card: (typeof demoCards)[0]) => {
    window.open(card.url, '_blank');
  };

  const handleGetStarted = () => {
    onClose();
    // Rediriger vers le formulaire de devis au lieu de la page de commande
    window.location.href = '/devis';
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-blue-gray900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[85vh] bg-blue-gray900/80"
          >
            <Card className="bg-blue-gray900 backdrop-blur-md rounded-[20px]">
              <CardHeader className="relative p-4 pb-2 bg-gradient-to-r from-amber-50/80 to-blue-gray100/30 backdrop-blur-md rounded-t-[20px]">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/20 hover:backdrop-blur-md transition-all duration-200"
                >
                  <X className="w-4 h-4 text-blue-gray100" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-900 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-gray100 font-heading-2">
                      Découvrez notre solution
                    </h2>
                    <p className="text-blue-gray400 font-body-m text-sm">
                      Votre site web professionnel en 5 jours
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-8">
                <div className="space-y-4">
                  {/* Demo Cards - 2 colonnes */}
                  <div className="grid grid-cols-2 gap-4">
                    {demoCards.map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => handleCardClick(card)}
                      >
                        <Card className="overflow-hidden backdrop-blur-md bg-white/10 hover:bg-white/20 hover:backdrop-blur-lg transition-all duration-500 rounded-[12px] hover:scale-105 hover:border-white/40">
                          <div className="relative">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-32 object-cover scale-120 group-hover:scale-140 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                {card.category}
                              </span>
                            </div>
                            {/* Overlay qui apparaît au hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                              <div className="bg-white/30 backdrop-blur-md rounded-full p-2 border border-white/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <Play className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-3 bg-white backdrop-blur-sm">
                            <h4 className="text-sm font-bold text-blue-gray900 font-heading-6 mb-1 group-hover:text-amber-900 transition-colors duration-300">
                              {card.title}
                            </h4>
                            <p className="text-blue-gray600 font-body-m text-xs leading-relaxed group-hover:text-blue-gray700 transition-colors duration-300">
                              {card.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Section - Modifié pour rediriger vers le formulaire */}
                  <div className="p-4 rounded-[12px] text-center">
                    <h3 className="text-lg font-bold text-blue-gray200 mb-1 font-heading-6">
                      Prêt pour votre projet ?
                    </h3>
                    <p className="text-blue-gray400 mb-3 font-body-m text-sm">
                      Demandez votre devis personnalisé gratuit
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <StyledWrapper>
                        <a
                          href="#products"
                          rel="noopener noreferrer"
                          onClick={onClose}
                        >
                        Commencer maintenant
                        </a>
                      </StyledWrapper>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
