import { useState, useEffect } from 'react';
import { AnimatedSection } from "../../../../components/ui/animated-section";

const tabs = [
  {
    title: 'Bâtiment & rénovation',
    id: 'renov',
    description:
      'Sites web optimisés pour les artisans du bâtiment et de la rénovation. Showcase de vos réalisations avec galerie photos et formulaires de devis.',
    imageUrl:
      './artisan-renov.jpg',
  },
  {
    title: 'Electriciens',
    id: 'electricien',
    description:
      'Sites web pour électriciens. Présentation de vos services, interventions et devis en ligne.',
    imageUrl:
      './artisan-elec.png',
  },  
  {
    title: 'Plombiers et chauffagistes',
    id: 'plombier',
    description:
      'Sites web professionnels pour plombiers et chauffagistes. Intervention d\'urgence et devis en ligne pour vos clients.',
    imageUrl:
      './artisan-plombier.jpg',
  },  
  {
    title: 'Paysagistes et jardiniers',
    id: 'paysagiste',
    description:
      'Présentez vos créations paysagères avec des galeries photos immersives. Devis personnalisés pour vos projets d\'aménagement.',
    imageUrl:
      './artisan-paysagiste.jpg',
  },
  {
    title: 'Coiffeurs et esthéticiennes',
    id: 'coiffeur',
    description:
      'Solutions digitales pour salons de coiffure et instituts de beauté. Prise de rendez-vous en ligne et présentation de vos services.',
    imageUrl:
      './artisan-coiffeur.jpg',
  },
  {
    title: 'Artisans Coiffeurs',
    id: 'artisan-coiffeur2',
    description:
      'Solutions digitales pour salons de coiffure et instituts de beauté. Prise de rendez-vous en ligne et présentation de vos services.',  
    imageUrl:
      './artisan-coiffeur2.jpg',
    },
  {
    title: 'Hôtellerie et restauration',
    id: 'hotels',
    description:
      'Solutions digitales adaptées à tous les artisans. Présentation de vos services et prise de contact simplifiée.',
    imageUrl:
      './tourisme-valeur.jpg',
  },
  {
    title: 'Ébénistes et artisans manuels',
    id: 'ebeniste',
    description:
      'Mettez en valeur votre savoir-faire artisanal avec des portfolios sur mesure. Présentation de vos créations uniques.',
    imageUrl:
      './artisan-ebeniste.jpg',
  },
];

export const PersonasSection = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="max-w-[1600px] mx-auto md:flex hidden flex-col items-start justify-center gap-12 md:gap-16 lg:gap-20 md:pt-0 pt-20 pb-20 md:pb-24 lg:pb-32 px-4 md:px-8 lg:px-20 relative self-stretch w-full overflow-hidden">
      <img
        className="absolute w-full h-[400px] md:h-[500px] lg:h-[684px] top-[200px] md:top-[250px] lg:top-[312px] left-0 object-cover"
        alt="Waves"
        src="/waves.png"
      />

      <AnimatedSection animation="fadeIn">
        <div className="flex flex-col items-start gap-8 relative self-stretch w-full">
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
            <h2 className="mt-[-1.00px] text-blue-gray900 relative self-stretch font-heading-2 md:font-medium font-bold text-4xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              Pour tous {" "}
              <span className="font-serif italic text-amber-900">
                les artisans
              </span>
            </h2>
          </div>

          <p className="relative self-stretch font-body-l text-blue-gray900 text-sm md:text-base lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)]">
            Nous proposons une solution complète pensée pour les besoins
            spécifiques des artisans. Clé en main pour ne pas perdre de temps et
            complètement déléguée pour vous permettre de vous concentrer sur
            votre métier.
            <br />
            <br />
            Pensée pour faire vite et bien, nous gérons la création de votre
            site web et de vos réseaux sociaux en 5 jours, la création des
            éléments visuels, des textes et leur optimisation pour le
            référencement Google.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slideUp" delay={200}>
        <div className='mb-20 group flex max-md:flex-col justify-center gap-2 w-full mx-auto'>
          {tabs.map((tab) => {
            return (
              <article key={tab.id} className='group/article relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:rounded-lg after:transition-all focus-within:ring focus-within:ring-amber-300'>
                <div className='absolute inset-0 text-white z-10 p-4 flex flex-col justify-end'>
                  <h3 className='text-xl font-heading-6 font-semibold md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.15)] group-hover/article:delay-300 group-focus-within/article:delay-300'>
                    {tab.title}
                  </h3>
                  <p className='hidden md:block text-sm font-body-m md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.15)] group-hover/article:delay-500 group-focus-within/article:delay-500'>
                    {tab.description}
                  </p>
                </div>
                <img
                  className='md:object-cover object-contain object-top md:h-96 w-164'
                  src={tab.imageUrl}
                  alt={tab.title}
                />
              </article>
            );
          })}
        </div>
      </AnimatedSection>

    </section>
  );
};
