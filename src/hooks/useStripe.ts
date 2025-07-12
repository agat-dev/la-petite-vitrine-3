import { useState } from 'react';
import type { Pack, MaintenanceService, CheckoutSession } from '../types/stripe';

// Utiliser import.meta.env
const isStripeEnabled = import.meta.env.VITE_STRIPE_ENABLED === 'true';
const stripePromise = isStripeEnabled ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) : null;

export const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (
    selectedPack: Pack,
    selectedMaintenance: MaintenanceService
  ): Promise<CheckoutSession | null> => {
    // Si Stripe est désactivé, rediriger vers le formulaire
    if (!isStripeEnabled) {
      console.log('Stripe désactivé - Redirection vers formulaire de devis');
      window.location.href = '/devis';
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Validation: pack et maintenance requis
      if (!selectedPack || !selectedMaintenance) {
        throw new Error('Un pack et une maintenance doivent être sélectionnés');
      }

      // Utiliser import.meta.env.VITE_API_URL
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedPack,
          selectedMaintenance,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de la session');
      }

      const session: CheckoutSession = await response.json();
      
      console.log('Session Stripe créée:', {
        pack: selectedPack.title,
        maintenance: selectedMaintenance.title,
        mode: session.mode,
        amount: session.amount
      });
      
      return session;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la création de la session:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const redirectToCheckout = async (sessionId: string) => {
    if (!isStripeEnabled) {
      window.location.href = '/devis';
      return;
    }
    const stripe = await stripePromise;
    if (!stripe) {
      setError('Stripe n\'a pas pu être chargé');
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      setError(error.message || 'Erreur lors de la redirection');
    }
  };

  return {
    createCheckoutSession,
    redirectToCheckout,
    loading,
    error,
    isStripeEnabled
  };
};