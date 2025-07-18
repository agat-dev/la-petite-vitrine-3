import { useEffect } from 'react';
import { PAGE_SEO, STRUCTURED_DATA_TEMPLATES } from '../components/seo-constants';


interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title = "La Petite Vitrine",
  description = "La Petite Vitrine - Création de sites web et solutions digitales pour artisans et PME.",
  keywords = "site web, vitrine, artisan, PME, digital, maintenance, création, SEO, référencement",
  canonical,
  ogImage = "/default-og-image.jpg",
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false,
  noFollow = false,
}) => {
  useEffect(() => {
    // Titre de la page
    document.title = title;

    // Fonction utilitaire pour créer/mettre à jour les meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };


    // Métadonnées de base
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', "La Petite Vitrine");
    updateMetaTag('robots', `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', "#fbbf24");
    updateMetaTag('msapplication-TileColor', "#fbbf24");
    updateMetaTag('application-name', "La Petite Vitrine");

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:site_name', "La Petite Vitrine", true);
    updateMetaTag('og:locale', 'fr_FR', true);
    
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      updateMetaTag('og:image', fullImageUrl, true);
      updateMetaTag('og:image:alt', title, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
    }
    
    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true);
    } else {
      updateMetaTag('og:url', window.location.href, true);
    }

    // Twitter Card
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:site', "@LaPetiteVitrine");
    updateMetaTag('twitter:creator', "@LaPetiteVitrine");
    
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
      updateMetaTag('twitter:image', fullImageUrl);
    }

    // Canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (linkElement) {
        linkElement.setAttribute('href', canonical);
      } else {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        linkElement.setAttribute('href', canonical);
        document.head.appendChild(linkElement);
      }
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (scriptElement) {
        scriptElement.textContent = JSON.stringify(structuredData);
      } else {
        scriptElement = document.createElement('script') as HTMLScriptElement;
        scriptElement.type = 'application/ld+json';
        scriptElement.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptElement);
      }
    }

    // Structured Data par défaut pour la page d'accueil
    if (!structuredData && window.location.pathname === '/') {
      const defaultStructuredData = {
        ...STRUCTURED_DATA_TEMPLATES.organization,
        "description": description,
      };

      let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (scriptElement) {
        scriptElement.textContent = JSON.stringify(defaultStructuredData);
      } else {
        scriptElement = document.createElement('script') as HTMLScriptElement;
        scriptElement.type = 'application/ld+json';
        scriptElement.textContent = JSON.stringify(defaultStructuredData);
        document.head.appendChild(scriptElement);
      }
    }

    // Cleanup function (optionnel)
    return () => {
      // Nettoyage si nécessaire
    };
  }, [title, description, keywords, canonical, ogImage, ogUrl, ogType, twitterCard, structuredData, noIndex, noFollow]);

  return null; // Ce composant ne rend rien visuellement
};

// Hook personnalisé pour une utilisation plus simple avec des pages prédéfinies
export const usePageSEO = (pageKey: keyof typeof PAGE_SEO, customProps?: Partial<SEOProps>) => {
  const pageData = PAGE_SEO[pageKey];
  return <SEO {...pageData} {...customProps} />;
};

// Composant spécialisé pour les pages de produits
export const ProductSEO: React.FC<{
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage?: string;
}> = ({ productName, productDescription, productPrice, productImage }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "image": productImage ? `${window.location.origin}${productImage}` : undefined,
    "offers": {
      "@type": "Offer",
      "price": productPrice.replace('€', ''),
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "La Petite Vitrine"
      }
    }
  };

  return (
    <SEO
      title={`${productName} - La Petite Vitrine`}
      description={productDescription}
      ogType="product"
      ogImage={productImage}
      structuredData={structuredData}
    />
  );
};

export default SEO;