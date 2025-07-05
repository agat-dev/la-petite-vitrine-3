import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import type { Pack, MaintenanceService, CheckoutSession } from '../types/stripe';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (
    selectedPack: Pack,
    selectedMaintenance?: MaintenanceService
  ): Promise<CheckoutSession | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
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
      return session;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const redirectToCheckout = async (sessionId: string) => {
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
  };
};