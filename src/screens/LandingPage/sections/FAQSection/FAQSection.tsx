import { Button } from '../../../../components/ui/button';
import StyledButton from '../../../../components/ui/styled-button';

export const FAQSection = (): JSX.Element => {

  return (
    <section className="flex flex-col items-end relative">
       {/* Call to action section */}
      <div className="relative w-full bg-blue-gray900 overflow-hidden">
        {/* Gradient overlay sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-gray900 via-blue-gray800 to-blue-gray900" />
        
        {/* Formes géométriques animées */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-400 rounded-full opacity-70" />
          <div className="absolute top-1/2 -left-32 w-64 h-64 bg-fuchsia-700 rounded-full opacity-70" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-green-700 rounded-full opacity-70" style={{ animationDelay: '2s' }} />
          
          {/* Lignes géométriques */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,50 600,150 T1200,100" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M0,300 Q400,150 800,250 T1200,200" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" opacity="0.4" />
          </svg>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 p-6 md:p-12 lg:p-20">
          {/* Contenu textuel */}
          <div className="flex flex-col items-center lg:items-start gap-6 md:gap-8 text-center lg:text-left flex-1">
            {/* Titre principal */}
            <h2 className="relative font-medium text-white text-2xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing [font-style:var(--heading-2-font-style)]">
              <p className="text-amber-50">
                Créez votre présence digitale
              </p>
              <p className="mt-4 text-amber-200 font-serif italic">dès aujourd'hui</p>
            </h2>

            {/* Sous-titre */}
            <p className="text-blue-gray200 font-body-l text-base md:text-lg leading-relaxed max-w-xl">
              Nous nous occupons de tout pour vous offrir un site web et des réseaux sociaux optimisés, adaptés aux artisans. 
              </p>

            {/* Statistiques */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">5 jours</div>
                <div className="text-blue-gray100 text-sm">avant la<br />mise en ligne</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">100%</div>
                <div className="text-blue-gray100 text-sm">des textes et visuels<br />réalisés pour vous</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">1 mois</div>
                <div className="text-blue-gray100 text-sm">d'engagement<br />uniquement</div>
              </div>
            </div>
          </div>

          {/* CTA sophistiqué */}
          <div className="flex flex-col items-center gap-6 relative">
            {/* Bouton principal avec effet glassmorphism */}
            <div className="relative group">
             
              <StyledButton>
                <a href="#products" className="flex items-center gap-2">
                    Commencer maintenant
                 </a>
              </StyledButton>
            </div>

            {/* Bouton secondaire */}
            <Button
              className="bg-transparent text-white hover:text-amber-300 transition-colors duration-300 group"
            >
              <a href="#demos" className="flex items-center gap-2">
              <span className="border-b border-transparent transition-all duration-300">
                Voir les démos
              </span>
              </a>
            </Button>



          </div>
        </div>
      </div>
    </section>
  );
};
