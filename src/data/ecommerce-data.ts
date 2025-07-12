import { Pack, MaintenanceOption, FormStep } from '../types/ecommerce';

export const PACKS: Pack[] = [
  {
    id: "pack-base",
    title: "Pack Essentiel",
    price: 290,
    description: "Site web One Page professionnel responsive",
    features: [
      "Site web One Page professionnel responsive",
      "Google Business",
      "5 Sections : Présentation, Services, Informations pratiques, Map, Contact",
      "Mise à jour des contenus",
      "Nom de domaine + hébergement 1 an",
      "Livraison en 5 jours",
      "Sans engagement"
    ],
    deliveryTime: "5 jours"
  },
  {
    id: "pack-presence", 
    title: "Pack Pro",
    price: 490,
    description: "Tout le pack de base + réseaux sociaux",
    features: [
      "Tout le pack de base",
      "Facebook + Instagram Business",
      "3 pages additionnelles : Services, Réalisations, A propos, Infos pratiques",
      "Livraison en 7 jours",
      "Sans engagement"
    ],
    deliveryTime: "7 jours"
  },
  {
    id: "pack-metier",
    title: "Pack Pro Plus",
    price: 690,
    description: "Solution complète avec modules métier",
    features: [
      "Tout le pack pro",
      "2 modules métier additionnels : Réservation en ligne, Devis/Simulation en ligne, Messagerie Whatsapp, Avis clients",
      "Réseaux sociaux professionnels",
      "Livraison en 9 jours",
      "Sans engagement"
    ],
    deliveryTime: "9 jours"
  }
];

export const MAINTENANCE_OPTIONS: MaintenanceOption[] = [
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
    title: "Informations personnelles",
    description: "Vos coordonnées pour créer votre compte",
    isCompleted: false,
    fields: [
      {
        id: "firstName",
        type: "text",
        label: "Prénom",
        placeholder: "Votre prénom",
        required: true,
        validation: { minLength: 2 }
      },
      {
        id: "lastName",
        type: "text",
        label: "Nom",
        placeholder: "Votre nom",
        required: true,
        validation: { minLength: 2 }
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "votre@email.com",
        required: true
      },
      {
        id: "phone",
        type: "tel",
        label: "Téléphone",
        placeholder: "06 12 34 56 78",
        required: true
      }
    ]
  },
  {
    id: "step-2",
    title: "Informations entreprise",
    description: "Détails sur votre activité",
    isCompleted: false,
    fields: [
      {
        id: "company",
        type: "text",
        label: "Nom de l'entreprise",
        placeholder: "Nom de votre entreprise",
        required: true
      },
      {
        id: "activity",
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
          { value: "autre", label: "Autre" }
        ]
      },
      {
        id: "description",
        type: "textarea",
        label: "Description de votre activité",
        placeholder: "Décrivez brièvement votre activité et vos services",
        required: true,
        validation: { minLength: 50, maxLength: 500 }
      }
    ]
  },
  {
    id: "step-3",
    title: "Contenu du site",
    description: "Éléments pour personnaliser votre site",
    isCompleted: false,
    fields: [
      {
        id: "logo",
        type: "file",
        label: "Logo (optionnel)",
        required: false
      },
      {
        id: "colors",
        type: "text",
        label: "Couleurs préférées",
        placeholder: "Ex: bleu, blanc, rouge",
        required: false
      },
      {
        id: "services",
        type: "textarea",
        label: "Vos principaux services",
        placeholder: "Listez vos principaux services (un par ligne)",
        required: true,
        validation: { minLength: 20 }
      }
    ]
  }
];