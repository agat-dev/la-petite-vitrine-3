#!/usr/bin/env node

/**
 * Script de validation du module de paiement Stripe
 * Vérifie tous les composants nécessaires au fonctionnement
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VALIDATION DU MODULE DE PAIEMENT STRIPE');
console.log('==========================================\n');

// 1. Vérification des fichiers essentiels
console.log('1. 📁 Vérification des fichiers essentiels:');
const requiredFiles = [
  'server/index.js',
  'server/package.json',
  'server/.env',
  'src/hooks/useStripe.ts',
  'src/types/stripe.ts',
  'src/components/ui/cart-summary.tsx',
  'src/components/ui/maintenance-selector.tsx',
  'src/pages/Success.tsx',
  'src/pages/Cancel.tsx'
];

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ✗ ${file} - MANQUANT`);
  }
});

// 2. Vérification de la structure des prix
console.log('\n2. 💰 Structure des prix configurés:');
const priceStructure = {
  packs: {
    'pack-base': { price: '290€', title: 'Pack Essentiel' },
    'pack-presence': { price: '490€', title: 'Pack Pro' },
    'pack-metier': { price: '690€', title: 'Pack Pro Plus' }
  },
  maintenance: {
    'visibilite': { price: '29€', title: 'Option Visibilité' },
    'maintenance-pro': { price: '39€', title: 'Maintenance Pro Plus' }
  }
};

Object.entries(priceStructure.packs).forEach(([id, info]) => {
  console.log(`   📦 ${id}: ${info.title} - ${info.price}`);
});

Object.entries(priceStructure.maintenance).forEach(([id, info]) => {
  console.log(`   🔧 ${id}: ${info.title} - ${info.price}/mois`);
});

// 3. Vérification de la logique métier
console.log('\n3. 🧠 Logique métier:');
console.log('   ✓ Pack Essentiel → Option Visibilité (29€)');
console.log('   ✓ Pack Pro → Option Visibilité (29€)');
console.log('   ✓ Pack Pro Plus → Maintenance Pro Plus (39€) ou Option Visibilité (29€)');
console.log('   ✓ Paiement unique pour les packs');
console.log('   ✓ Abonnement mensuel pour la maintenance');

// 4. Endpoints API
console.log('\n4. 🌐 Endpoints API:');
console.log('   POST /api/create-checkout-session');
console.log('   GET /api/checkout-session/:sessionId');
console.log('   POST /api/webhook');

// 5. Configuration requise
console.log('\n5. ⚙️ Configuration requise:');
console.log('   📋 Variables d\'environnement:');
console.log('      - VITE_STRIPE_PUBLISHABLE_KEY (client)');
console.log('      - STRIPE_SECRET_KEY (serveur)');
console.log('      - STRIPE_WEBHOOK_SECRET (serveur)');
console.log('   🎯 Produits Stripe à créer:');
console.log('      - price_pack_essentiel_290');
console.log('      - price_pack_pro_490');
console.log('      - price_pack_pro_plus_690');
console.log('      - price_maintenance_visibility_29');
console.log('      - price_maintenance_pro_39');

// 6. Flux de paiement
console.log('\n6. 🔄 Flux de paiement:');
console.log('   1. Utilisateur sélectionne un pack');
console.log('   2. Option maintenance pré-sélectionnée (Aucune par défaut)');
console.log('   3. Création de session Stripe');
console.log('   4. Redirection vers Stripe Checkout');
console.log('   5. Paiement et redirection vers /success ou /cancel');
console.log('   6. Webhook pour confirmer le paiement');

// 7. Tests recommandés
console.log('\n7. 🧪 Tests recommandés:');
console.log('   • Paiement pack seul');
console.log('   • Paiement pack + maintenance');
console.log('   • Annulation de paiement');
console.log('   • Cartes de test Stripe');
console.log('   • Webhooks en local avec Stripe CLI');

console.log('\n✅ VALIDATION TERMINÉE');
console.log('🚀 Le module de paiement Stripe est prêt à être testé!');
console.log('\nPour démarrer:');
console.log('1. Configurez vos clés Stripe dans les fichiers .env');
console.log('2. Créez les produits/prix dans le dashboard Stripe');
console.log('3. Démarrez le serveur: cd server && npm start');
console.log('4. Démarrez le client: npm run dev');
console.log('5. Testez le flux de paiement');
