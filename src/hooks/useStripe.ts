import { useState } from 'react';
import type { Pack, MaintenanceService, CheckoutSession } from '../types/stripe';

export const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isStripeEnabled = false; // Toujours désactivé

  const createCheckoutSession = async (
    selectedPack: Pack,
    selectedMaintenance: MaintenanceService
  ): Promise<CheckoutSession | null> => {
    console.log('Redirection vers formulaire de devis - Stripe désactivé');
    console.log('Pack sélectionné:', selectedPack?.title);
    console.log('Maintenance sélectionnée:', selectedMaintenance?.title);
    
    // Sauvegarder la sélection dans localStorage pour pré-remplir le formulaire
    localStorage.setItem('selectedPack', JSON.stringify({
      pack: selectedPack,
      maintenance: selectedMaintenance,
      timestamp: new Date().toISOString()
    }));
    
    window.location.href = '/devis';
    return null;
  };

  const redirectToCheckout = async (sessionId: string) => {
    window.location.href = '/devis';
  };

  return {
    createCheckoutSession,
    redirectToCheckout,
    loading,
    error,
    isStripeEnabled
  };
};