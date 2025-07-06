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
    'pack-base': 'price_pack_essentiel_290', // 290€ - Pack Essentiel
    'pack-presence': 'price_pack_pro_490', // 490€ - Pack Pro
    'pack-metier': 'price_pack_pro_plus_690' // 690€ - Pack Pro Plus
  },
  // Abonnements maintenance (récurrents)
  maintenance: {
    'visibilite': 'price_maintenance_visibility_29', // 29€/mois - Option Visibilité
    'maintenance-pro': 'price_maintenance_pro_39' // 39€/mois - Pack Pro Plus maintenance
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

    // Ajouter le pack sélectionné (paiement unique)
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

    // Déterminer le mode de paiement
    // Si maintenance sélectionnée, utiliser 'subscription' pour gérer l'abonnement
    // Sinon, utiliser 'payment' pour le paiement unique du pack
    const paymentMode = selectedMaintenance ? 'subscription' : 'payment';

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: paymentMode,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        pack_id: selectedPack.id,
        pack_title: selectedPack.title,
        pack_price: selectedPack.price,
        maintenance_id: selectedMaintenance?.id || '',
        maintenance_title: selectedMaintenance?.title || '',
        maintenance_price: selectedMaintenance?.price || '',
      },
      // Configuration pour les abonnements
      ...(selectedMaintenance && {
        subscription_data: {
          metadata: {
            pack_id: selectedPack.id,
            pack_title: selectedPack.title,
          },
        },
      }),
    });

    res.json({ 
      sessionId: session.id, 
      url: session.url,
      mode: paymentMode,
      amount: selectedPack.price + (selectedMaintenance ? ` + ${selectedMaintenance.price}/mois` : '')
    });
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

// Webhook pour gérer les événements Stripe
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer les différents événements
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Paiement réussi:', session.id);
      // Ici, vous pouvez ajouter la logique pour traiter le paiement
      // Par exemple, créer le site web, envoyer un email de confirmation, etc.
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Paiement d\'abonnement réussi:', invoice.id);
      // Gérer le paiement récurrent de maintenance
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log('Paiement d\'abonnement échoué:', failedInvoice.id);
      // Gérer l'échec de paiement
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      console.log('Abonnement annulé:', subscription.id);
      // Gérer l'annulation d'abonnement
      break;
    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  res.json({received: true});
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});