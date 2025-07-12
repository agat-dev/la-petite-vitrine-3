import { Pack, MaintenanceOption, FormStep } from '../types/ecommerce';

export const PACKS: Pack[] = [
  {
    id: "pack-base",
    title: "Pack Essentiel",
    price: 590,
    description: "Site web One Page professionnel responsive",
    features: [
      "Site web One Page professionnel responsive",
      "Google Business",
      "5 Sections : Présentation, Services, Informations pratiques, Map, Contact",
      "Mise à jour des contenus",
      "Nom de domaine + hébergement 1 an",
      "Livraison en 5 jours",
      "Sans engagement",
      "Remboursé sous 48h si non satisfait"
    ],
    deliveryTime: "5 jours"
  },
  {
    id: "pack-presence", 
    title: "Pack Pro",
    price: 890,
    description: "Tout le pack de base + réseaux sociaux",
    features: [
      "Tout le pack de base",
      "Facebook + Instagram Business",
      "3 pages additionnelles : Services, Réalisations, A propos, Infos pratiques",
      "Livraison en 7 jours",
      "Sans engagement",
      "Remboursé sous 48h si non satisfait"
    ],
    deliveryTime: "7 jours"
  },
  {
    id: "pack-metier",
    title: "Pack Pro Plus",
    price: 1390,
    description: "Solution complète avec modules métier",
    features: [
      "Tout le pack pro",
      "2 modules métier additionnels : Réservation en ligne, Devis/Simulation en ligne, Messagerie Whatsapp, Avis clients",
      "Réseaux sociaux professionnels",
      "Livraison en 9 jours",
      "Sans engagement",
      "Remboursé sous 48h si non satisfait"
    ],
    deliveryTime: "9 jours"
  }
];

export const MAINTENANCE_OPTIONS: MaintenanceOption[] = [
  {
    id: "maintenance-base",
    title: "Maintenance de base",
    price: 19,
    description: "Maintenance essentielle pour votre site web",
    features: [
      "Mises à jour de sécurité",
      "Sauvegarde mensuelle",
      "Support technique de base",
      "Monitoring du site",
      "Rapport mensuel"
    ],
    billingCycle: "monthly"
  },
  {
    id: "visibilite",
    title: "Option Animation et Visibilité",
    price: 39,
    description: "Animation de vos réseaux sociaux et mise à jour de contenu",
    features: [
      "2 posts/mois par réseau social",
      "Mise à jour contenus site",
      "Mise à jour réseaux sociaux",
      "Visuels et contenus fournis",
      "Statistiques mensuelles"
    ],
    billingCycle: "monthly"
  },
  {
    id: "maintenance-pro",
    title: "Maintenance Pro Plus",
    price: 59,
    description: "Maintenance complète avec support prioritaire",
    features: [
      "Tout l'option Visibilité",
      "Support prioritaire",
      "Modifications illimitées",
      "Sauvegarde quotidienne",
      "Monitoring 24/7",
      "Rapport mensuel détaillé"
    ],
    billingCycle: "monthly"
  }
];

// Configuration des étapes du formulaire (structure de base)
export const DEFAULT_FORM_STEPS: FormStep[] = [
  {
    id: "step-1",
    title: "Informations de contact",
    description: "Vos coordonnées personnelles et professionnelles",
    isCompleted: false,
    fields: [
      {
        id: "nom",
        type: "text",
        label: "Nom",
        placeholder: "Votre nom",
        required: true,
        validation: { minLength: 2 }
      },
      {
        id: "prenom",
        type: "text",
        label: "Prénom",
        placeholder: "Votre prénom",
        required: true,
        validation: { minLength: 2 }
      },
      {
        id: "mail",
        type: "email",
        label: "Mail",
        placeholder: "votre@email.com",
        required: true
      },
      {
        id: "telephone",
        type: "tel",
        label: "Téléphone",
        placeholder: "06 12 34 56 78",
        required: true
      },
      {
        id: "entreprise",
        type: "text",
        label: "Entreprise",
        placeholder: "Nom de votre entreprise",
        required: true
      }
    ]
  },
  {
    id: "step-2",
    title: "Activité et localisation",
    description: "Informations sur votre secteur d'activité et zone d'intervention",
    isCompleted: false,
    fields: [
      {
        id: "secteur_activite",
        type: "select",
        label: "Secteur d'activité",
        required: true,
        options: [
          { value: "batiment", label: "Bâtiment & Rénovation" },
          { value: "electricien", label: "Électricien" },
          { value: "plombier", label: "Plombier / Chauffagiste" },
          { value: "paysagiste", label: "Paysagiste / Jardinier" },
          { value: "coiffeur", label: "Coiffeur / Esthéticienne" },
          { value: "restauration", label: "Hôtellerie / Restauration" },
          { value: "artisan", label: "Artisan manuel" },
          { value: "commerce", label: "Commerce de détail" },
          { value: "services", label: "Services aux particuliers" },
          { value: "sante", label: "Santé / Bien-être" },
          { value: "autre", label: "Autre" }
        ]
      },
      {
        id: "adresse_complete",
        type: "textarea",
        label: "Adresse complète",
        placeholder: "Adresse complète de votre entreprise (rue, ville, code postal)",
        required: true,
        validation: { minLength: 10, maxLength: 200 }
      },
      {
        id: "zone_intervention",
        type: "textarea",
        label: "Zone d'intervention",
        placeholder: "Décrivez votre zone d'intervention géographique (villes, départements, rayon en km...)",
        required: true,
        validation: { minLength: 10, maxLength: 300 }
      }
    ]
  },
  {
    id: "step-3",
    title: "Positionnement et concurrence",
    description: "Votre positionnement sur le marché et vos concurrents",
    isCompleted: false,
    fields: [
      {
        id: "concurrents_principaux",
        type: "textarea",
        label: "Concurrents principaux",
        placeholder: "Listez vos principaux concurrents (noms d'entreprises, sites web...)",
        required: true,
        validation: { minLength: 20, maxLength: 500 }
      },
      {
        id: "services_proposes",
        type: "textarea",
        label: "Services proposés",
        placeholder: "Listez tous vos services et prestations",
        required: true,
        validation: { minLength: 30, maxLength: 800 }
      },
      {
        id: "specificite_positionnement",
        type: "textarea",
        label: "Spécificité / Positionnement",
        placeholder: "Qu'est-ce qui vous différencie de vos concurrents ? Votre valeur ajoutée unique ?",
        required: true,
        validation: { minLength: 30, maxLength: 500 }
      }
    ]
  },
  {
    id: "step-4",
    title: "Clientèle et communication",
    description: "Votre cible client et le ton de communication souhaité",
    isCompleted: false,
    fields: [
      {
        id: "types_clients",
        type: "radio",
        label: "Types de clients",
        required: true,
        options: [
          { value: "particuliers", label: "Particuliers uniquement" },
          { value: "professionnels", label: "Professionnels uniquement" },
          { value: "mixte", label: "Particuliers et professionnels" }
        ]
      },
      {
        id: "ton_communication",
        type: "select",
        label: "Ton souhaité pour la communication",
        required: true,
        options: [
          { value: "professionnel", label: "Professionnel et sérieux" },
          { value: "convivial", label: "Convivial et accessible" },
          { value: "moderne", label: "Moderne et dynamique" },
          { value: "traditionnel", label: "Traditionnel et rassurant" },
          { value: "premium", label: "Premium et haut de gamme" },
          { value: "familial", label: "Familial et chaleureux" }
        ]
      }
    ]
  },
  {
    id: "step-5",
    title: "Éléments visuels et contenus",
    description: "Vos fichiers et contenus existants",
    isCompleted: false,
    fields: [
      {
        id: "elements_visuels",
        type: "file",
        label: "Éléments visuels (logo, charte, photos etc.)",
        required: false
      },
      {
        id: "textes_contenus",
        type: "file",
        label: "Textes et contenus",
        required: false
      },
      {
        id: "autres_fichiers",
        type: "file",
        label: "Autres fichiers",
        required: false
      },
      {
        id: "liens_contenus_existants",
        type: "textarea",
        label: "Lien vers des contenus existants",
        placeholder: "Sites web, réseaux sociaux, portfolios en ligne... (un lien par ligne)",
        required: false,
        validation: { maxLength: 500 }
      },
      {
        id: "informations_diverses",
        type: "textarea",
        label: "Informations diverses",
        placeholder: "Toute information complémentaire que vous souhaitez nous communiquer",
        required: false,
        validation: { maxLength: 1000 }
      }
    ]
  }
];

        required: true,
        validation: { minLength: 20 }
      }
    ]
  }
];