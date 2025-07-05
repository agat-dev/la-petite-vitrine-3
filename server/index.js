const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configuration des produits Stripe (remplacez par vos vrais price_id)
const STRIPE_PRICES = {
  // Packs principaux (paiement unique)
  packs: {
    'pack-base': 'price_1234567890abcdef', // 390€
    'pack-presence': 'price_1234567890abcdef', // 489€
    'pack-metier': 'price_1234567890abcdef' // 899€
  },
  // Abonnements maintenance (récurrents)
  maintenance: {
    'maintenance-essentielle': 'price_1234567890abcdef', // 19€/mois
    'maintenance-plus': 'price_1234567890abcdef', // 39€/mois
    'maintenance-pro': 'price_1234567890abcdef' // 79€/mois
  }
};

// Route pour créer une session de paiement
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { selectedPack, selectedMaintenance } = req.body;

    if (!selectedPack) {
      return res.status(400).json({ error: 'Un pack doit être sélectionné' });
    }

    const lineItems = [];

    // Ajouter le pack sélectionné
    const packPriceId = STRIPE_PRICES.packs[selectedPack.id];
    if (!packPriceId) {
      return res.status(400).json({ error: 'Pack invalide' });
    }

    lineItems.push({
      price: packPriceId,
      quantity: 1,
    });

    // Ajouter l'abonnement maintenance si sélectionné
    if (selectedMaintenance) {
      const maintenancePriceId = STRIPE_PRICES.maintenance[selectedMaintenance.id];
      if (!maintenancePriceId) {
        return res.status(400).json({ error: 'Abonnement maintenance invalide' });
      }

      lineItems.push({
        price: maintenancePriceId,
        quantity: 1,
      });
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: selectedMaintenance ? 'subscription' : 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        pack_id: selectedPack.id,
        maintenance_id: selectedMaintenance?.id || '',
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour récupérer les détails d'une session
app.get('/api/checkout-session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});