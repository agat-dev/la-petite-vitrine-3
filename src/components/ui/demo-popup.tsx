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
      url: "#",
    },
    {
      image: "/artisan-coiffeur.jpg",
      title: "Site d'artisan coiffeur",
      description:
        "OnePage vitrine pour coiffeurs avec formulaire de contact",
      category: "Vitrine",
      url: "#",
    },
  ];

  const handleCardClick = (card: (typeof demoCards)[0]) => {
    console.log("Carte cliquée:", card.title);
    // Ici vous pouvez ajouter la logique pour ouvrir le site ou afficher plus de détails
    // Par exemple: window.open(card.url, '_blank');
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
            className="w-full max-w-4xl max-h-[85vh]"
          >
            <Card className="bg-gradient-to-br from-white to-amber-50 rounded-[20px] shadow-2xl border border-amber-200/50">
              <CardHeader className="relative p-4 pb-2 bg-gradient-to-r from-amber-50 to-blue-gray100/50 rounded-t-[20px]">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-amber-100 transition-colors duration-200 border border-amber-200/50"
                >
                  <X className="w-4 h-4 text-blue-gray700" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-900 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-gray900 font-heading-2">
                      Découvrez notre solution
                    </h2>
                    <p className="text-blue-gray600 font-body-m text-sm">
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
                        <Card className="overflow-hidden border-2 border-amber-200/50 hover:shadow-2xl hover:border-amber-600/60 hover:bg-amber-50/30 transition-all duration-300 rounded-[12px] hover:scale-105 bg-gradient-to-br from-white to-amber-50/20">
                          <div className="relative">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="bg-gradient-to-r from-amber-900 to-amber-800 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-md">
                                {card.category}
                              </span>
                            </div>
                            {/* Overlay qui apparaît au hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-gray900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-gradient-to-br from-amber-50 to-white rounded-full p-2 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300 border border-amber-200">
                                <Play className="w-4 h-4 text-amber-900" />
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-3 bg-gradient-to-b from-transparent to-amber-50/20">
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

                  {/* CTA Section - Plus compact */}
                  <div className="p-4 rounded-[12px] text-center">
                    <h3 className="text-lg font-bold text-blue-gray900 mb-1 font-heading-6">
                      Prêt pour votre projet ?
                    </h3>
                    <p className="text-blue-gray700 mb-3 font-body-m text-sm">
                      190€ + 29€/mois sans engagement
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <StyledWrapper>
                        Commencer maintenant
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
