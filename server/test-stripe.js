// Test du module de paiement Stripe
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Test de la configuration Stripe
console.log('=== TEST DE CONFIGURATION STRIPE ===');

// Vérifier les variables d'environnement
const requiredEnvVars = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET'
];

console.log('1. Vérification des variables d\'environnement:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`   ✓ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`   ✗ ${varName}: NON DÉFINIE`);
  }
});

// Test d'initialisation Stripe
console.log('\n2. Test d\'initialisation Stripe:');
try {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  console.log('   ✓ Stripe initialisé avec succès');
  
  // Test des prix configurés
  console.log('\n3. Configuration des prix:');
  const STRIPE_PRICES = {
    packs: {
      'pack-base': 'price_pack_essentiel_290',
      'pack-presence': 'price_pack_pro_490', 
      'pack-metier': 'price_pack_pro_plus_690'
    },
    maintenance: {
      'visibilite': 'price_maintenance_visibility_29',
      'maintenance-pro': 'price_maintenance_pro_39'
    }
  };
  
  console.log('   Packs configurés:', Object.keys(STRIPE_PRICES.packs));
  console.log('   Maintenances configurées:', Object.keys(STRIPE_PRICES.maintenance));
  
} catch (error) {
  console.log('   ✗ Erreur d\'initialisation Stripe:', error.message);
}

// Test de création de session (simulation)
console.log('\n4. Test de création de session:');
const testPackData = {
  id: 'pack-base',
  title: 'Pack Essentiel',
  price: '290€'
};

const testMaintenanceData = {
  id: 'visibilite',
  title: 'Option Visibilité',
  price: '29€'
};

console.log('   Pack de test:', testPackData);
console.log('   Maintenance de test:', testMaintenanceData);

// Test des endpoints
console.log('\n5. Structure des endpoints:');
console.log('   POST /api/create-checkout-session');
console.log('   GET /api/checkout-session/:sessionId');
console.log('   POST /api/webhook');

console.log('\n=== FIN DU TEST ===');
console.log('Pour tester complètement, assurez-vous que:');
console.log('- Les variables d\'environnement sont configurées');
console.log('- Les prix Stripe sont créés dans le dashboard');
console.log('- Le webhook est configuré sur Stripe');
console.log('- Le serveur est démarré avec: npm start');
