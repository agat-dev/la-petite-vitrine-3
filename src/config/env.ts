
// Configuration centralisée des environnements
export const NODE_ENV = import.meta.env.NODE_ENV || 'development';
export const PROD = import.meta.env.PROD;
export const DEV = import.meta.env.DEV;

// URLs
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Features
export const STRIPE_ENABLED = import.meta.env.VITE_STRIPE_ENABLED === 'true';
export const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

// APIs
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Debug
export const DEBUG = import.meta.env.DEV;

// Validation des variables requises
export const validateEnv = () => {
  const required = ['VITE_GOOGLE_MAPS_API_KEY'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('Variables d\'environnement manquantes:', missing);
  }
  
  return missing.length === 0;
};