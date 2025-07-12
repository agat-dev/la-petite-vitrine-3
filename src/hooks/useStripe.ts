import { useState } from 'react';

// Types simplifiés sans Stripe
export interface Pack {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
  category: 'essentiel' | 'pro' | 'premium';
}

export interface MaintenanceService {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  period: 'monthly' | 'yearly';
}

export interface PackageSelection {
  pack: Pack;
  maintenance: MaintenanceService;
  totalPrice: number;
  timestamp: string;
}

export const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (
    selectedPack: Pack,
    selectedMaintenance: MaintenanceService
  ) => {
    console.log('Redirection vers formulaire de devis');
    console.log('Pack sélectionné:', selectedPack?.title);
    console.log('Maintenance sélectionnée:', selectedMaintenance?.title);
    
    // Sauvegarder la sélection pour pré-remplir le formulaire
    localStorage.setItem('selectedPackage', JSON.stringify({
      pack: selectedPack,
      maintenance: selectedMaintenance,
      timestamp: new Date().toISOString()
    }));
    
    // Rediriger vers le formulaire de devis
    window.location.href = '/devis';
    return null;
  };

  const redirectToCheckout = async () => {
    window.location.href = '/devis';
  };

  return {
    createCheckoutSession,
    redirectToCheckout,
    loading,
    error,
    isStripeEnabled: false // Toujours false
  };
};