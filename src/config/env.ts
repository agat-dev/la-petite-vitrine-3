// Configuration centralisée des environnements
export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
  
  // URLs
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:5173',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  
  // Features
  STRIPE_ENABLED: import.meta.env.VITE_STRIPE_ENABLED === 'true',
  USE_BACKEND: import.meta.env.VITE_USE_BACKEND === 'true',
  
  // APIs
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  
  // Debug
  DEBUG: import.meta.env.DEV
} as const;

// Validation des variables requises
export const validateEnv = () => {
  const required = ['VITE_GOOGLE_MAPS_API_KEY'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('Variables d\'environnement manquantes:', missing);
  }
  
  return missing.length === 0;
};