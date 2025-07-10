const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configuration des produits Stripe
const STRIPE_PRICES = {
  packs: {
    'pack-base': 'price_pack_essentiel_290',
    'pack-presence': 'price_pack_pro_490', 
    'pack-metier': 'price_pack_pro_plus_690'
  },
  maintenance: {
    'maintenance-simple': 'price_maintenance_simple_19',
    'visibilite-plus': 'price_visibilite_plus_39'
  }
};

// Route pour créer une session de paiement
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { selectedPack, selectedMaintenance } = req.body;

    // Validation: pack et maintenance requis
    if (!selectedPack || !selectedMaintenance) {
      return res.status(400).json({ 
        error: 'Un pack et une maintenance doivent être sélectionnés' 
      });
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

    // Ajouter l'abonnement maintenance (obligatoire)
    const maintenancePriceId = STRIPE_PRICES.maintenance[selectedMaintenance.id];
    if (!maintenancePriceId) {
      return res.status(400).json({ error: 'Maintenance invalide' });
    }

    lineItems.push({
      price: maintenancePriceId,
      quantity: 1,
    });

    // Utiliser le mode 'subscription' pour gérer le pack + abonnement
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        pack_id: selectedPack.id,
        pack_title: selectedPack.title,
        pack_price: selectedPack.price,
        maintenance_id: selectedMaintenance.id,
        maintenance_title: selectedMaintenance.title,
        maintenance_price: selectedMaintenance.price,
        order_type: 'pack_with_maintenance'
      },
      subscription_data: {
        metadata: {
          pack_id: selectedPack.id,
          pack_title: selectedPack.title,
        },
      },
    });

    res.json({ 
      sessionId: session.id, 
      url: session.url,
      mode: 'subscription',
      amount: `${selectedPack.price} + ${selectedMaintenance.price}/mois`
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
app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Erreur webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Paiement terminé:', session.id);
      console.log('Métadonnées:', session.metadata);
      // Logique pour traiter la commande (pack + maintenance)
      break;
      
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Paiement récurrent réussi:', invoice.id);
      // Logique pour les paiements de maintenance
      break;
      
    case 'customer.subscription.created':
      const subscription = event.data.object;
      console.log('Abonnement créé:', subscription.id);
      // Logique pour activer les services
      break;
      
    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  res.json({received: true});
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});