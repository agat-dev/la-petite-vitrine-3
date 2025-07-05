import {
  HeadphonesIcon,
  MonitorIcon,
  RocketIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";

export const CallToActionSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  // Navigation menu items data with content
  const menuItems = [
    {
      icon: <SearchIcon className="w-6 h-6" />,
      text: "Bibendum tellus",
      rightIcon: "/icon---jam-icons---outline---logos---arrow-right.svg",
      content: {
        mainImage: "..//picture-4.png",
        secondaryImage: "..//picture-5.png",
        mobileImage: "..//picture-3.png",
        title: "Recherche et découverte",
        description: "Explorez notre vaste collection de sneakers rares et trouvez exactement ce que vous cherchez."
      }
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      text: "Cras eget",
      content: {
        mainImage: "..//picture-5.png",
        secondaryImage: "..//picture-4.png",
        mobileImage: "..//picture-6.png",
        title: "Authentification garantie",
        description: "Chaque paire est vérifiée par nos experts pour garantir son authenticité."
      }
    },
    {
      icon: <RocketIcon className="w-6 h-6" />,
      text: "Dolor pharetra",
      content: {
        mainImage: "..//picture-6.png",
        secondaryImage: "..//picture-3.png",
        mobileImage: "..//picture-4.png",
        title: "Livraison express",
        description: "Recevez vos sneakers rapidement avec notre service de livraison premium."
      }
    },
    {
      icon: <MonitorIcon className="w-6 h-6" />,
      text: "Amet, fringilla",
      content: {
        mainImage: "..//picture-3.png",
        secondaryImage: "..//picture-6.png",
        mobileImage: "..//picture-5.png",
        title: "Suivi en temps réel",
        description: "Suivez vos commandes et votre collection en temps réel sur notre plateforme."
      }
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      text: "Amet nibh",
      content: {
        mainImage: "..//picture-2.png",
        secondaryImage: "..//picture-4.png",
        mobileImage: "..//picture-3.png",
        title: "Support client 24/7",
        description: "Notre équipe d'experts est disponible pour vous accompagner à tout moment."
      }
    },
    {
      icon: <SettingsIcon className="w-6 h-6" />,
      text: "Sed velit",
      content: {
        mainImage: "..//picture-4.png",
        secondaryImage: "..//picture-2.png",
        mobileImage: "..//picture-6.png",
        title: "Personnalisation",
        description: "Personnalisez votre expérience et créez des alertes pour vos modèles préférés."
      }
    },
  ];

  // Browser window circles data
  const browserCircles = Array(3)
    .fill(null)
    .map((_, index) => (
      <img
        key={`circle-${index}`}
        className="relative w-2.5 h-2.5"
        alt="Browser window control"
        src="/icon---jam-icons---filled---circle-f.svg"
      />
    ));

  const currentContent = menuItems[activeTab].content;

  return (
    <section className="flex flex-col items-start justify-center gap-12 md:gap-16 lg:gap-20 pt-12 md:pt-16 lg:pt-20 pb-20 md:pb-24 lg:pb-32 px-4 md:px-8 lg:px-20 relative self-stretch w-full overflow-hidden">
      <img
        className="absolute w-full h-[400px] md:h-[500px] lg:h-[684px] top-[200px] md:top-[250px] lg:top-[312px] left-0 object-cover"
        alt="Waves"
        src="/waves.png"
      />

      <AnimatedSection animation="fadeIn">
        <div className="flex flex-col items-start gap-8 relative self-stretch w-full">
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
            <h2 className="mt-[-1.00px] text-blue-gray900 relative self-stretch font-heading-2 text-2xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              Grow your collection
            </h2>
          </div>

          <p className="relative self-stretch font-body-l text-blue-gray900 text-sm md:text-base lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)]">
            Enim neque massa porta adipiscing elit. Sem libero id faucibus nibh
            amet dictum pellentesque sed. Eu non turpis risus odio sapien, fames
            sit rhoncus.
            <br />
            Nec magna sed interdum sit purus tellus. Et volutpat proin neque
            placerat at bibendum quam tellus.
          </p>
        </div>
      </AnimatedSection>

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-20 relative self-stretch w-full">
        <AnimatedSection animation="slideRight" delay={200}>
          <div className="flex flex-row lg:flex-col w-full lg:w-64 items-start gap-2 lg:gap-4 relative overflow-x-auto lg:overflow-x-visible">
            {menuItems.map((item, index) => (
              <Button
                key={`menu-item-${index}`}
                variant={activeTab === index ? "default" : "ghost"}
                onClick={() => setActiveTab(index)}
                className={`flex items-center p-3 lg:p-4 relative flex-shrink-0 lg:self-stretch w-auto lg:w-full justify-start transition-all duration-300 ${
                  activeTab === index 
                    ? "bg-white scale-105" 
                    : "hover:bg-white/50 hover:scale-102"
                } rounded-lg h-auto group cursor-pointer whitespace-nowrap lg:whitespace-normal`}
              >
                <div className={`transition-colors duration-300 ${
                  activeTab === index ? "text-amber-900" : "text-blue-gray600 group-hover:text-amber-900"
                }`}>
                  {item.icon}
                </div>
                <div className="flex px-2 lg:px-4 py-0 flex-1 grow items-center relative">
                  <span className={`font-button-l text-sm lg:text-[length:var(--button-l-font-size)] tracking-[var(--button-l-letter-spacing)] leading-[var(--button-l-line-height)] whitespace-nowrap [font-style:var(--button-l-font-style)] transition-colors duration-300 ${
                    activeTab === index ? "text-blue-gray900" : "text-blue-gray600 group-hover:text-blue-gray900"
                  }`}>
                    {item.text}
                  </span>
                </div>
                {activeTab === index && item.rightIcon && (
                  <img
                    className="hidden lg:block relative w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                    alt="Arrow right"
                    src={item.rightIcon}
                  />
                )}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideLeft" delay={400}>
          <div className="flex flex-col h-auto lg:h-[556px] items-start gap-2.5 relative flex-1 w-full overflow-hidden">
            {/* Description du contenu actuel */}
            <div className="mb-4 lg:mb-6 transition-all duration-500 ease-out w-full">
              <h3 className="text-lg md:text-xl font-semibold text-blue-gray900 mb-2">
                {currentContent.title}
              </h3>
              <p className="text-blue-gray600 font-body-m text-sm md:text-base">
                {currentContent.description}
              </p>
            </div>

            {/* Carte principale */}
            <Card className="relative flex flex-col w-full max-w-[759px] h-[250px] md:h-[350px] lg:h-[451px] items-center bg-white rounded-[15px] lg:rounded-[20px] overflow-hidden border-[3px] lg:border-[5px] border-solid border-[#ffffff] transition-all duration-500 ease-out transform z-30">
              <div className="h-[41px] items-center gap-7 px-4 py-2 flex relative self-stretch w-full">
                <div className="flex items-start gap-[5px] relative flex-1 grow">
                  {browserCircles}
                </div>
              </div>
              <CardContent 
                className="relative flex-1 self-stretch w-full p-0 transition-all duration-500 ease-out"
                style={{
                  background: `url(${currentContent.mainImage}) 50% 50% / cover`
                }}
              />
            </Card>

            {/* Carte secondaire */}
            <Card className="hidden lg:flex absolute top-[105px] left-[94px] flex-col w-[600px] h-[400px] items-center bg-white rounded-[20px] overflow-hidden border-[5px] border-solid border-[#ffffff] transition-all duration-500 ease-out transform hover:scale-105 z-20">
              <div className="h-[41px] items-center gap-7 px-4 py-2 flex relative self-stretch w-full">
                <div className="flex items-start gap-[5px] relative flex-1 grow">
                  {browserCircles}
                </div>
              </div>
              <CardContent 
                className="relative flex-1 self-stretch w-full p-0 transition-all duration-500 ease-out"
                style={{
                  background: `url(${currentContent.secondaryImage}) 50% 50% / cover`
                }}
              />
            </Card>

            {/* Carte mobile */}
            <div 
              className="hidden lg:block absolute w-[200px] h-[250px] top-[197px] right-[20px] rounded-[10px] border-[5px] border-solid border-[#ffffff] transition-all duration-500 ease-out transform hover:scale-105 z-10"
              style={{
                background: `url(${currentContent.mobileImage}) 50% 50% / cover`
              }}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};