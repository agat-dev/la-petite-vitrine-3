export interface FormData {
  // Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Informations entreprise
  company: string;
  sector: string;
  
  // Adresse
  address: string;
  city: string;
  postalCode: string;
  country: string;
  
  // Zone d'intervention
  interventionArea: string;
  
  // Détails business
  mainCompetitors: string;
  proposedServices: string;
  specificityPositioning: string;
  typesOfClients: 'particuliers' | 'professionnels' | 'mixte';
  
  // Communication
  communicationTone: string;
  
  // Fichiers
  visualFiles: File[];
  textFiles: File[];
  otherFiles: File[];
  existingContentLinks: string;
  
  // Informations diverses
  miscellaneousInfo: string;
}

export interface StepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  errors: Record<string, string>;
}