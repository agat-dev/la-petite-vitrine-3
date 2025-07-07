import { motion } from "framer-motion";
import { Card, CardContent } from "./card";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export type { FAQItem };

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
  maxWidth?: string;
}

export const FAQ = ({ 
  title = "Foire aux Questions",
  subtitle = "Retrouvez les réponses aux questions les plus fréquentes",
  items,
  className = "",
}: FAQProps): JSX.Element => {
  return (
    <section className={`bg-amber-50 flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20 p-6 md:p-12 lg:p-20 3xl:p-24 4xl:p-32 relative overflow-hidden ${className}`}>
      {/* Advanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative shapes */}
        <div className="absolute w-64 h-[285px] top-[782px] left-[1255px] hidden xl:block">
          <div className="relative h-[285px]">
            <div className="w-[111px] h-[111px] top-[174px] left-[137px] bg-blue-light700 rounded-[50px] absolute opacity-75" />
            <div className="w-[164px] h-[164px] top-0 left-0 bg-fuchsia-700 absolute rounded-[30px] opacity-75" />
            <div className="w-[185px] h-[185px] top-[45px] left-[71px] bg-pink-700 absolute rounded-[50px] opacity-75" />
          </div>
        </div>

        {/* Gradient orbs with refined positioning */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-amber-600/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-tl from-blue-light700/8 to-amber-500/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-amber-300/15 to-transparent rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-bl from-amber-200/12 to-blue-gray100/8 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Geometric decorative elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-amber-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-40 w-1 h-1 bg-amber-500/40 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-60 left-60 w-1.5 h-1.5 bg-amber-300/35 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
        
        {/* Formes décoratives dans le style des autres sections */}
        
        {/* Rectangle décoratif principal (similaire à rectangle-31.svg) */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] h-[300px] md:h-[400px] lg:h-[500px]">
          <div className="w-full h-full bg-gradient-to-br from-amber-100/15 via-amber-200/10 to-amber-300/5 rounded-[60px] md:rounded-[80px] lg:rounded-[100px] blur-sm transform rotate-2"></div>
        </div>
        
        {/* Rectangles secondaires (style rectangle-25.svg et rectangle-26.svg) */}
        <div className="absolute top-32 right-8 w-[85px] h-[85px] bg-gradient-to-br from-amber-400/20 to-amber-600/15 rounded-[20px] transform rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-8 w-[53px] h-[53px] bg-gradient-to-br from-blue-gray400/15 to-amber-500/10 rounded-[15px] transform -rotate-6 animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Formes géométriques supplémentaires */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-amber-300/20 to-amber-500/15 rounded-[12px] transform rotate-45 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-gray300/15 to-amber-400/10 rounded-[16px] transform -rotate-12 animate-pulse" style={{animationDelay: '5s'}}></div>
        
        {/* Losanges décoratifs */}
        <div className="absolute top-40 left-20 w-8 h-8 bg-gradient-to-br from-amber-400/25 to-amber-600/20 transform rotate-45 animate-pulse" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-40 right-20 w-6 h-6 bg-gradient-to-br from-blue-gray400/20 to-amber-500/15 transform rotate-45 animate-pulse" style={{animationDelay: '7s'}}></div>
        
        {/* Triangles subtils */}
        <div className="absolute top-3/4 left-16 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-amber-400/20 animate-pulse" style={{animationDelay: '8s'}}></div>
        <div className="absolute top-16 right-1/3 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-blue-gray400/15 animate-pulse" style={{animationDelay: '9s'}}></div>
        
        {/* Cercles décoratifs de différentes tailles */}
        <div className="absolute top-2/3 right-12 w-12 h-12 bg-gradient-to-br from-amber-300/15 to-amber-500/10 rounded-full animate-pulse" style={{animationDelay: '10s'}}></div>
        <div className="absolute top-1/5 left-1/3 w-4 h-4 bg-gradient-to-br from-blue-gray300/20 to-amber-400/15 rounded-full animate-pulse" style={{animationDelay: '11s'}}></div>
        
        {/* Lignes décoratives */}
        <div className="absolute top-1/2 left-4 w-1 h-24 bg-gradient-to-b from-amber-400/20 via-amber-500/15 to-transparent rounded-full animate-pulse" style={{animationDelay: '12s'}}></div>
        <div className="absolute bottom-1/3 right-4 w-1 h-16 bg-gradient-to-b from-blue-gray400/15 via-amber-400/10 to-transparent rounded-full animate-pulse" style={{animationDelay: '13s'}}></div>
        
        {/* Subtle mesh pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-blue-gray50/5 mix-blend-overlay"></div>
        
        {/* Overlay principal pour unifier */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        {/* Section header avec design sophistiqué */}
        <header className="flex flex-col items-center gap-6 md:gap-8 relative w-full text-center mb-12 md:mb-16">
          <div className="flex flex-col items-center gap-6">
            {/* Titre */}
            <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
              <h2 className="mt-[-1.00px] text-blue-gray900 relative self-stretch font-medium text-2xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)] text-center">
                {title.split(' ').slice(0, -1).join(' ')}{" "}
                <span className="font-serif italic text-amber-900">
                  {title.split(' ').slice(-1)[0]}
                </span>
              </h2>
            </div>
            
            {/* Sous-titre */}
            <div className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-50/30 via-transparent to-amber-50/30 rounded-2xl blur-sm -z-10"></span>
              <p className="text-amber-50 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)] mb-2">
                {subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* FAQ items avec design Bento - layout asymétrique inspiré des boîtes bento japonaises */}
        <div className={`w-full max-w-[1400px] mx-auto relative`}>
          {/* Grille Bento avec CSS Grid - layout asymétrique comme de vraies boîtes bento */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-6"
            style={{
              gridAutoRows: '80px',
              gridAutoFlow: 'dense',
            }}
          >
            {items.map((faq, index) => {
              // Vrais patterns Bento asymétriques - tailles très variées comme des compartiments bento
              const bentoPatterns = [
                { cols: 'col-span-2 sm:col-span-4 md:col-span-4 lg:col-span-5', rows: 'row-span-4 md:row-span-3', size: 'hero', type: 'hero' },        // Héro - très grande
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3', rows: 'row-span-5 md:row-span-4', size: 'tall', type: 'tall' },       // Haute et étroite
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3', rows: 'row-span-3 md:row-span-3', size: 'wide', type: 'wide' },       // Large et basse
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2', rows: 'row-span-3 md:row-span-4', size: 'square', type: 'square' },   // Carrée
                { cols: 'col-span-2 sm:col-span-4 md:col-span-3 lg:col-span-3', rows: 'row-span-4 md:row-span-3', size: 'medium', type: 'medium' },   // Moyenne
                { cols: 'col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1', rows: 'row-span-4 md:row-span-3', size: 'mini', type: 'mini' },       // Mini haute
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2', rows: 'row-span-2 md:row-span-1', size: 'flat', type: 'flat' },       // Très plate
                { cols: 'col-span-2 sm:col-span-4 md:col-span-3 lg:col-span-3', rows: 'row-span-4 md:row-span-4', size: 'large', type: 'large' },     // Grande
              ];
              
              const pattern = bentoPatterns[index % bentoPatterns.length];
              
              // Variations de contenu selon la taille Bento
              const isHero = pattern.type === 'hero';
              const isTall = pattern.type === 'tall' || pattern.type === 'mini';
              const isLarge = pattern.type === 'large' || pattern.type === 'medium';
              
              // Styles spécifiques selon le type de compartiment Bento
              const getBentoStyle = (type: string) => {
                const baseStyles = 'transition-all duration-700';
                switch(type) {
                  case 'hero':
                    return `bg-amber-100 shadow-lg ${baseStyles}`;
                  case 'tall':
                    return `bg-indigo-100 shadow-md ${baseStyles}`;
                  case 'wide':
                    return `bg-pink-100 shadow-md ${baseStyles}`;
                  case 'square':
                    return `bg-blue-gray200 shadow-md ${baseStyles}`;
                  case 'large':
                    return `bg-green-100 shadow-lg ${baseStyles}`;
                  case 'medium':
                    return `bg-green-100 shadow-md ${baseStyles}`;
                  case 'mini':
                    return `bg-blue-gray200 shadow-sm ${baseStyles}`;
                  case 'flat':
                    return `bg-blue-gray200 shadow-sm ${baseStyles}`;
                  default:
                    return `bg-white shadow-md ${baseStyles}`;
                }
              };
              
              
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }}
                  className={`relative group w-full ${pattern.cols} ${pattern.rows} rounded-3xl overflow-hidden`}
                >
                  <Card className={`w-full h-full ${getBentoStyle(pattern.type)} rounded-3xl transition-all duration-700 relative overflow-hidden`}>
                    <CardContent className={`relative h-full flex flex-col ${isHero ? 'p-4 sm:p-6 md:p-8 lg:p-12' : isTall ? 'p-2 sm:p-3 md:p-4 lg:p-6' : isLarge ? 'p-3 sm:p-4 md:p-6 lg:p-8' : 'p-2 sm:p-3 md:p-4 lg:p-6'}`}>
                      
                    
                      
                      {/* Contenu adapté à la taille du compartiment */}
                      <div className="flex flex-col gap-3 md:gap-4 relative z-10 h-full">
                        
                        {/* Question - taille adaptée selon le type de compartiment */}
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <h3 className={`font-subtitle-XL font-[number:var(--subtitle-XL-font-weight)] text-amber-900 tracking-[var(--subtitle-XL-letter-spacing)] leading-tight [font-style:var(--subtitle-XL-font-style)] group-hover:text-amber-800 transition-colors duration-300 ${
                            isHero ? 'text-lg sm:text-xl md:text-2xl lg:text-2xl' : 
                            isTall ? 'text-xs sm:text-sm md:text-2xl lg:text-2xl' : 
                            isLarge ? 'text-sm sm:text-base md:text-lg lg:text-xl' : 
                            'text-xs sm:text-sm md:text-base lg:text-lg'
                          }`}>
                            {faq.question}
                          </h3>
                        </div>
                        
                        {/* Réponse - adaptée selon l'espace disponible */}
                        <div className="flex-1 overflow-hidden">
                          <p className={`font-body-l font-[number:var(--body-l-font-weight)] text-blue-gray900 tracking-[var(--body-l-letter-spacing)] leading-relaxed [font-style:var(--body-l-font-style)] group-hover:text-blue-gray800 transition-colors duration-300 ${
                            isHero ? 'text-sm sm:text-base md:text-lg lg:text-lg' : 
                            isTall ? 'text-xs sm:text-xs md:text-lg' : 
                            isLarge ? 'text-xs sm:text-sm md:text-base' : 
                            'text-xs sm:text-xs md:text-base'
                          }`}>
                            {/* Troncature du texte selon la taille */}
                            {faq.answer}
                          </p>
                        </div>
                        
                        
                    
                      </div>
                      
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant par défaut pour test et compatibilité
export default function FAQDemo() {
  const sophisticatedFAQItems: FAQItem[] = [
    {
      id: 1,
      question: "Comment nos services peuvent-ils transformer votre entreprise ?",
      answer: "Nos solutions sur mesure s'adaptent parfaitement à vos besoins spécifiques. Grâce à notre expertise technique et notre approche personnalisée, nous optimisons vos processus métier pour une efficacité maximale. Nos clients constatent généralement une amélioration de 40% de leur productivité dans les 3 premiers mois."
    },
    {
      id: 2,
      question: "Quels sont les délais moyens pour un projet personnalisé ?", 
      answer: "Chaque projet étant unique, nos délais varient selon la complexité et l'étendue des fonctionnalités demandées. En moyenne, un projet standard prend entre 4 à 8 semaines, tandis qu'un projet complexe peut nécessiter 12 à 16 semaines. Nous établissons toujours un planning détaillé avec des jalons clairs dès le début de notre collaboration."
    },
    {
      id: 3,
      question: "Proposez-vous un accompagnement après la livraison ?",
      answer: "Absolument ! Notre engagement ne s'arrête pas à la livraison. Nous offrons un support technique complet incluant la maintenance, les mises à jour, la formation de vos équipes et l'évolution de votre solution. Notre équipe dédiée reste à votre disposition pour garantir le succès à long terme de votre projet."
    },
    {
      id: 4,
      question: "Comment garantissez-vous la sécurité de nos données ?",
      answer: "La sécurité est notre priorité absolue. Nous appliquons les dernières normes de sécurité (ISO 27001, RGPD) et utilisons des protocoles de chiffrement avancés. Nos serveurs sont hébergés dans des centres de données certifiés avec des sauvegardes automatiques quotidiennes. De plus, nous réalisons des audits de sécurité réguliers pour maintenir le plus haut niveau de protection."
    },
    {
      id: 5,
      question: "Quels sont vos tarifs et modalités de paiement ?",
      answer: "Nos tarifs sont adaptés à la complexité et à la valeur ajoutée de chaque projet. Nous proposons plusieurs modalités : forfait global, paiement échelonné selon les livrables, ou abonnement mensuel pour les services récurrents. Un devis détaillé vous sera fourni après analyse de vos besoins spécifiques. Nous acceptons tous les modes de paiement professionnels."
    },
    {
      id: 6,
      question: "Quelles technologies utilisez-vous ?",
      answer: "Nous maîtrisons les dernières technologies : React, Vue.js, Node.js, Python, AWS, Docker, Kubernetes. Notre stack technologique évolue constamment pour rester à la pointe de l'innovation."
    },
    {
      id: 7,
      question: "Avez-vous des références clients ?",
      answer: "Oui, nous avons accompagné plus de 200 entreprises dans leur transformation digitale. Nos clients incluent des startups innovantes, des PME en croissance et des grandes entreprises internationales."
    },
    {
      id: 8,
      question: "Proposez-vous des formations ?",
      answer: "Nous proposons des formations sur mesure pour vos équipes techniques et fonctionnelles. Ces formations permettent une appropriation optimale des solutions déployées."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-white">
      <FAQ 
        title="Questions Fréquentes"
        subtitle="Découvrez tout ce que vous devez savoir sur nos services premium"
        items={sophisticatedFAQItems}
        className=""
        maxWidth="6xl"
      />
    </div>
  );
}