import { useEffect } from "react";
import { AboutSection } from "./sections/AboutSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FAQPersonnalisee } from "../../components/ui/faq-petite-vitrine";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { MainContentSection } from "./sections/MainContentSection";
import { SidebarSection } from "./sections/SidebarSection";
import { ProductsSection } from "./sections/ProductsSection";
import { ContactSection } from "./sections/ContactSection";
import { usePageSEO } from "../../components/metadata";

export const LandingPage = (): JSX.Element => {
  return (
    <>
      {usePageSEO("home")}

      <main className="flex flex-col w-full min-h-screen relative bg-white bg-[linear-gradient(180deg,rgba(255,251,235,1)_0%,rgba(255,255,255,1)_100%)] overflow-x-hidden">
        <img
          className="absolute w-full max-w-[1428px] h-auto mx-auto left-0 right-0 top-[238px] z-0 object-contain"
          alt="Background decoration"
          src="/rectangle-31.svg"
        />

        <HeaderSection />
        <AboutSection />
        <SidebarSection />
        
        {/* Bannière Satisfait ou remboursé */}
        <section className="relative w-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 py-4 md:py-6 overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full transform -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full transform translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
              {/* Icône principale */}
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Texte principal */}
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading-4">
                  Satisfait ou remboursé
                </h3>
                <div className="hidden md:block w-1 h-8 bg-white/30 rounded-full"></div>
                <p className="text-lg md:text-xl text-white/90 font-body-l">
                  Remboursement sous 48h si non satisfait
                </p>
              </div>
              
              {/* Badge de garantie */}
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm md:text-base">
                  Garantie 48h
                </span>
              </div>
            </div>
          </div>
          
          {/* Animation de particules */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white rounded-full opacity-40 animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
        </section>
        
        <HeroSection />
        <MainContentSection />
        <CallToActionSection />
        <ProductsSection />
        <FAQPersonnalisee />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  );
};
