import React from 'react';
import styled from 'styled-components';
import { StaggeredContainer } from "../../../../components/ui/staggered-container";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  onMoreInfo?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image, onMoreInfo }) => {
  return (
    <StyledWrapper>
      <div className="card bg-amber-600">
        <img src={image} alt="" className="card-illustration absolute -top-12 right-8 h-28 w-44 bg-white" />
        <div className="card-details">
          <p className="text-title md:text-4xl text-3xl md:mt-0 mt-10">{title}</p>
          <p className="text-body mt-2">{description}</p>
        </div>
        <a href='/#products'>
          <button className="card-button">
            En savoir plus
          </button>
        </a>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    height: 254px;
    border-radius: 20px;
    position: relative;
    padding: 1.8rem;
    overflow: visible;
  }

  .card-illustration {
    object-fit: cover;
    border-radius: 1.5rem;
    z-index: 1;
    pointer-events: none;
    user-select: none;
  }

  .card-details {
    color: white;
    height: 100%;
    gap: .5em;
    display: grid;
    place-content: center;
  }

  .card-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 1rem;
    border: none;
    background-color: #FCD34D;
    color: black;
    font-size: 1rem;
    padding: .5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
    cursor: pointer;
  }

  .text-body {
    color: white;
  }

  .card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
`;


// Exemple d'utilisation avec un tableau de features
const features = [
  {
    title: "Site web",
    description: "Vitrine de 1 à 5 pages pour présenter vos services, être contacté et donner toutes les informations pratiques à vos clients.",
    image: "/artisan-elec.png",
  },
  {
    title: "Réseaux Sociaux",
    description: "Développer votre visibilité partout où vos clients sont et interagir avec eux.",
    image: "/logo-social.png",
  },
  // Ajoute d'autres features ici...
];

export const FeaturesSection = (): JSX.Element => (
  <section
    id="offre"
    className="relative max-w-[1400px] mx-auto md:mt-8 mt-48 flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20 p-4 md:p-8 lg:p-20 w-full"
  >
    {/* SVG décoratifs */}
    <svg
      className="absolute left-0 top-0 w-32 h-32 opacity-30 z-100"
      viewBox="0 0 200 200"
      fill="none"
    >
      <circle cx="100" cy="100" r="100" fill="#FCD34D" />
    </svg>
    <svg
      className="absolute right-0 top-12 w-24 h-24 opacity-20 z-90"
      viewBox="0 0 120 120"
      fill="none"
    >
      <rect x="0" y="0" width="120" height="120" rx="40" fill="#2E66C1" />
    </svg>
    <svg
      className="absolute left-1/2 bottom-0 -translate-x-1/2 w-40 h-16 opacity-20 z-80"
      viewBox="0 0 300 80"
      fill="none"
    >
      <ellipse cx="150" cy="40" rx="150" ry="40" fill="#FCD34D" />
    </svg>

    {/* Grille de features */}
    <StaggeredContainer 
      className="w-fit grid md:grid-cols-2 max-w-[1280px] md:gap-32 gap-24 z-40"
      staggerDelay={150}
      animation="slideUp"
    >
      {features.map((feature, idx) => (
        <FeatureCard
          key={idx}
          title={feature.title}
          description={feature.description}
          image={feature.image}
        />
      ))}
    </StaggeredContainer>
  </section>
);