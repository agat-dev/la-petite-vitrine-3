import { ArrowRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import StyledButton from "../../../../components/ui/styled-button";

export const ContactSection = (): JSX.Element => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: "Combien de temps faut-il pour créer mon site web ?",
      answer: "La création d'un site web prend généralement entre 5 à 10 jours ouvrés selon le pack choisi. Le Pack Site de Base est livré en 5 jours, tandis que les packs plus complexes peuvent nécessiter jusqu'à 10 jours pour intégrer tous les modules métiers."
    },
    {
      id: 2,
      question: "Que comprend exactement la maintenance de mon site ?",
      answer: "La maintenance inclut l'hébergement sécurisé, les sauvegardes automatiques, les mises à jour de sécurité, le support technique, et selon le pack choisi, la mise à jour des contenus et l'animation des réseaux sociaux. Nous nous occupons de tout l'aspect technique pour que vous puissiez vous concentrer sur votre activité."
    },
    {
      id: 3,
      question: "Puis-je modifier mon site après sa création ?",
      answer: "Absolument ! Avec nos services de maintenance, nous pouvons effectuer les modifications de contenu pour vous. Vous pouvez également apprendre à gérer certains aspects de votre site grâce à la formation incluse dans nos packs."
    },
    {
      id: 4,
      question: "Mes réseaux sociaux seront-ils vraiment cohérents avec mon site ?",
      answer: "Oui, c'est notre spécialité ! Nous créons une identité visuelle unique qui se décline sur votre site web, Google My Business, Facebook et Instagram. Tous vos supports digitaux auront la même charte graphique pour une image de marque professionnelle et reconnaissable."
    },
    {
      id: 5,
      question: "Que se passe-t-il si je ne suis pas satisfait du résultat ?",
      answer: "Votre satisfaction est notre priorité. Nous travaillons en étroite collaboration avec vous tout au long du projet et effectuons les ajustements nécessaires. Nous nous engageons à livrer un site qui correspond exactement à vos attentes et à votre image de marque."
    },
    {
      id: 6,
      question: "Puis-je changer de pack de maintenance plus tard ?",
      answer: "Bien sûr ! Vous pouvez évoluer vers un pack de maintenance supérieur à tout moment selon vos besoins. Si vous souhaitez plus d'animation sur vos réseaux sociaux ou des fonctionnalités supplémentaires, nous adaptons nos services à votre croissance."
    },
    {
      id: 7,
      question: "Mon site sera-t-il visible sur Google ?",
      answer: "Oui, tous nos sites sont optimisés pour le référencement naturel (SEO). Nous nous occupons également de votre inscription sur Google My Business et mettons en place les bases pour que votre site soit bien positionné dans les résultats de recherche."
    },
    {
      id: 8,
      question: "Proposez-vous des formations pour gérer mon site ?",
      answer: "Oui, nos packs incluent une formation pour vous apprendre à gérer les aspects essentiels de votre site et de vos réseaux sociaux. Nous vous donnons les clés pour être autonome sur les tâches courantes tout en gardant notre support pour les aspects techniques."
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="flex flex-col items-end relative">
      {/* FAQ section with light background */}
      <div className="flex flex-col w-full items-center justify-center gap-12 md:gap-16 lg:gap-20 p-6 md:p-12 lg:p-20 3xl:p-24 4xl:p-32 relative bg-[#FEF3C7]">
        {/* Container pour centrer le contenu sur très grands écrans */}
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Section header */}
          <AnimatedSection animation="slideUp">
            <header className="flex flex-col items-center gap-4 md:gap-6 relative w-full text-center">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-blue-gray900 font-heading-2 text-2xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] 3xl:text-7xl 4xl:text-8xl tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                  Foire aux <span className="font-serif italic text-amber-900">Questions</span> 
                </h2>
              <p className="text-blue-gray700 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] leading-[var(--body-l-line-height)] max-w-2xl px-4 md:px-0">
                Retrouvez les réponses aux questions les plus fréquentes sur nos services de création de sites web et de maintenance.
              </p>
            </div>
          </header>
        </AnimatedSection>

        {/* FAQ items */}
        <StaggeredContainer 
          className="w-full max-w-4xl space-y-3 md:space-y-4"
          staggerDelay={100}
          animation="slideUp"
        >
          {faqData.map((faq) => (
            <Card
              key={faq.id}
              className="bg-white rounded-[10px] md:rounded-[15px] shadow-shadow-dark-l overflow-hidden border border-amber-200 hover:shadow-shadow-dark-XL transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-4 md:p-6 text-left flex items-start md:items-center justify-between hover:bg-amber-50 transition-colors duration-300 group"
              >
                <h3 className="font-heading-6 font-[number:var(--heading-6-font-weight)] text-blue-gray900 text-base md:text-lg lg:text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)] pr-3 md:pr-4 group-hover:text-amber-900 transition-colors duration-300 flex-1">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mt-1 md:mt-0">
                  {openFaq === faq.id ? (
                    <ChevronUpIcon className="w-5 h-5 md:w-6 md:h-6 text-amber-900" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 md:w-6 md:h-6 text-amber-700" />
                  )}
                </div>
              </button>
              
              {openFaq === faq.id && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-amber-100 bg-amber-25">
                  <div className="pt-3 md:pt-4">
                    <p className="font-body-l font-[number:var(--body-l-font-weight)] text-blue-gray700 text-sm md:text-base lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </StaggeredContainer>

        {/* Contact CTA */}
        <AnimatedSection animation="slideUp" delay={400}>
          <div className="text-center px-4 md:px-0">
            <p className="text-blue-gray700 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] mb-4 md:mb-6">
              Vous avez d'autres questions ? N'hésitez pas à nous contacter !
            </p>
            <StyledButton variant="primary">
              Nous contacter
            </StyledButton>
          </div>
        </AnimatedSection>
      </div>



      {/* Decorative shapes */}
      <div className="absolute w-64 h-[285px] top-[782px] left-[1255px] hidden xl:block">
        <div className="relative h-[285px]">
          <div className="w-[111px] h-[111px] top-[174px] left-[137px] bg-blue-light700 rounded-[50px] absolute opacity-75" />
          <div className="w-[164px] h-[164px] top-0 left-0 bg-fuchsia-700 absolute rounded-[30px] opacity-75" />
          <div className="w-[185px] h-[185px] top-[45px] left-[71px] bg-pink-700 absolute rounded-[50px] opacity-75" />
        </div>
      </div>

      {/* Call to action section */}
      <div className="relative w-full bg-blue-gray900 overflow-hidden">
        {/* Gradient overlay sophistiqué */}
        


        {/* Contenu principal */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 p-6 md:p-12 lg:p-20">
          {/* Contenu textuel */}
          <div className="flex flex-col items-center lg:items-start gap-6 md:gap-8 text-center lg:text-left flex-1">
            {/* Titre principal */}
            <h2 className="relative font-heading-2 font-[number:var(--heading-2-font-weight)] text-white text-2xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              <span className="bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                Créez votre présence digitale
              </span>
              <br />
              <span className="text-white">dès aujourd'hui</span>
            </h2>

            {/* Sous-titre */}
            <p className="text-blue-gray200 font-body-l text-base md:text-lg leading-relaxed max-w-xl">
              Rejoignez plus de 1000+ entrepreneurs qui ont transformé leur activité grâce à notre expertise digitale.
            </p>

            {/* Statistiques */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">1000+</div>
                <div className="text-blue-gray300 text-sm">Sites créés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">98%</div>
                <div className="text-blue-gray300 text-sm">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">5j</div>
                <div className="text-blue-gray300 text-sm">Livraison</div>
              </div>
            </div>
          </div>

          {/* CTA sophistiqué */}
          <div className="flex flex-col items-center gap-6 relative">
            {/* Bouton principal avec effet glassmorphism */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              <button className="relative bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-blue-gray900 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <span className="font-button-XL font-[number:var(--button-XL-font-weight)] text-lg md:text-[length:var(--button-XL-font-size)] tracking-[var(--button-XL-letter-spacing)] leading-[var(--button-XL-line-height)] [font-style:var(--button-XL-font-style)]">
                    Commencer maintenant
                  </span>
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRightIcon className="w-4 h-4 text-blue-gray900" />
                  </div>
                </div>
              </button>
            </div>

            {/* Bouton secondaire */}
            <Button
              variant="ghost"
              className="text-white hover:text-amber-300 transition-colors duration-300 group"
            >
              <span className="border-b border-transparent group-hover:border-amber-300 transition-all duration-300">
                Voir nos réalisations
              </span>
            </Button>

            {/* Indicateurs de confiance */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-blue-gray300 text-sm ml-2">+1000 clients satisfaits</span>
              </div>
            </div>

            {/* Garantie */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-3 h-3 text-white" />
              </div>
              <span className="text-blue-gray200 text-sm">Garantie satisfaction 30 jours</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
