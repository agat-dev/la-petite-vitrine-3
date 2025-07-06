import { AboutSection } from "./sections/AboutSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ContactSection } from "./sections/ContactSection/ContactSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { MainContentSection } from "./sections/MainContentSection";
import { SidebarSection } from "./sections/SidebarSection";
import { ProductsSection } from "./sections/ProductsSection";
import { FAQPetiteVitrine } from "../../components/ui/faq-petite-vitrine";

export const LandingPage = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full min-h-screen relative bg-white bg-[linear-gradient(180deg,rgba(255,251,235,1)_0%,rgba(255,255,255,1)_100%)] overflow-x-hidden">
      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[2400px] mx-auto">
        <img
          className="absolute w-full max-w-[1428px] h-auto mx-auto left-0 right-0 top-[238px] z-0 object-contain"
          alt="Background decoration"
          src="/rectangle-31.svg"
        />

        <HeaderSection />
        <AboutSection />
        <SidebarSection />
        <HeroSection />
        <MainContentSection />
        <CallToActionSection />
        <ProductsSection />
        <FAQPetiteVitrine />
        <FooterSection />
      </div>
    </main>
  );
};
