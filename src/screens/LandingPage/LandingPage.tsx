import { HeroSection } from "./sections/HeroSection";
import { PersonasSection } from "./sections/PersonasSection";
import { FAQPersonnalisee } from "../../components/ui/faq-petite-vitrine";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { AtoutsSection } from "./sections/AtoutsSection";
import { DemosSection } from "./sections/DemosSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { ProductsSection } from "./sections/ProductsSection";
import { FAQSection } from "./sections/FAQSection";
import { usePageSEO } from "../../components/metadata";

export const LandingPage = (): JSX.Element => {
  return (
    <>
      {usePageSEO("home")}

      <main className="flex flex-col w-full min-h-screen relative bg-white bg-[linear-gradient(180deg,rgba(255,251,235,1)_0%,rgba(255,255,255,1)_100%)] overflow-x-hidden">
        <img
          className="md:block hidden absolute w-full max-w-[1428px] h-auto mx-auto left-0 right-0 top-[238px] z-0 object-contain"
          alt="Background decoration"
          src="/rectangle-31.svg"
        />

        <HeaderSection />
        <HeroSection />
        <FeaturesSection />
        <AtoutsSection />
        <DemosSection />
        <PersonasSection />
        <ProductsSection />
        <FAQPersonnalisee />
        <FAQSection />
        <FooterSection />
      </main>
    </>
  );
};
