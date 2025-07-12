// Constantes pour les métadonnées par défaut
export const DEFAULT_SEO = {
  siteName: "La Petite Vitrine",
  description: "Créez votre site web professionnel et vos réseaux sociaux en 5 jours. Solutions complètes pour artisans : sites vitrine, Google Business, Facebook, Instagram. Sans engagement.",
  keywords: "site web artisan, création site web, réseaux sociaux artisans, vitrine en ligne, Google Business, Facebook Instagram professionnel, artisans, PME, commerce local",
  author: "Next Impact - La Petite Vitrine",
  twitterSite: "@lapetitevitrine",
  twitterCreator: "@nextimpact",
  ogImage: "/og-image.jpg",
  themeColor: "#D97706", // Amber-600
  domain: "https://lapetitevitrine.com",
  phone: "+33673981638",
  email: "contact@lapetitevitrine.com",
} as const;

// Métadonnées spécifiques par page
export const PAGE_SEO = {
  home: {
    title: "La petite vitrine - Sites web et Réseaux sociaux des artisans",
    description: DEFAULT_SEO.description,
    canonical: "https://lapetitevitrine.com",
    keywords: DEFAULT_SEO.keywords,
  },
  products: {
    title: "Nos Packs - Sites web pour artisans | La Petite Vitrine",
    description: "Découvrez nos packs de création de sites web pour artisans : Pack Essentiel, Pack Pro, Pack Pro Plus. Solutions clé en main avec maintenance incluse.",
    canonical: "https://lapetitevitrine.com/packs",
    keywords: "pack site web artisan, tarifs création site web, pack réseaux sociaux, maintenance site web",
  },
  contact: {
    title: "Contact - La Petite Vitrine",
    description: "Contactez-nous pour créer votre site web et vos réseaux sociaux. Devis gratuit et conseil personnalisé pour votre activité d'artisan.",
    canonical: "https://lapetitevitrine.com/contact",
    keywords: "contact création site web, devis site web artisan, conseil digital artisan",
  },
  faq: {
    title: "FAQ - Questions fréquentes | La Petite Vitrine",
    description: "Retrouvez toutes les réponses à vos questions sur nos services de création de sites web et réseaux sociaux pour artisans.",
    canonical: "https://lapetitevitrine.com/faq",
    keywords: "faq site web artisan, questions création site web, aide réseaux sociaux",
  },
  cgv: {
    title: "Conditions Générales de Vente | La Petite Vitrine",
    description: "Consultez nos conditions générales de vente pour nos services de création de sites web et gestion des réseaux sociaux.",
    canonical: "https://lapetitevitrine.com/cgv",
    keywords: "cgv création site web, conditions générales vente",
  },
  mentions: {
    title: "Mentions Légales | La Petite Vitrine",
    description: "Mentions légales de La Petite Vitrine - Next Impact, spécialiste en création de sites web pour artisans.",
    canonical: "https://lapetitevitrine.com/mentions-legales",
    keywords: "mentions légales, informations légales",
  },
  privacy: {
    title: "Politique de Confidentialité | La Petite Vitrine",
    description: "Notre politique de confidentialité et de protection des données personnelles pour nos services digitaux.",
    canonical: "https://lapetitevitrine.com/politique-confidentialite",
    keywords: "politique confidentialité, protection données, rgpd",
  },
} as const;

// Structured Data templates
export const STRUCTURED_DATA_TEMPLATES = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": DEFAULT_SEO.siteName,
    "alternateName": DEFAULT_SEO.author,
    "url": DEFAULT_SEO.domain,
    "logo": {
      "@type": "ImageObject",
      "url": `${DEFAULT_SEO.domain}/logo.png`,
      "width": 200,
      "height": 200
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressRegion": "France"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": DEFAULT_SEO.phone,
      "email": DEFAULT_SEO.email,
      "contactType": "customer service",
      "availableLanguage": "French"
    },
    "sameAs": [
      "https://www.facebook.com/lapetitevitrine",
      "https://www.instagram.com/lapetitevitrine"
    ],
    "serviceType": [
      "Création de sites web",
      "Gestion des réseaux sociaux",
      "Marketing digital",
      "Référencement local"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "France"
    }
  },
  
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": DEFAULT_SEO.siteName,
    "url": DEFAULT_SEO.domain,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${DEFAULT_SEO.domain}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  },
  
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [] // À remplir dynamiquement
  }
} as const;

// Types pour TypeScript
export type PageKeys = keyof typeof PAGE_SEO;
export type StructuredDataKeys = keyof typeof STRUCTURED_DATA_TEMPLATES;