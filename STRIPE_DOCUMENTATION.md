# Documentation - Module de Paiement Stripe

## Vue d'ensemble

Le module de paiement Stripe a été adapté pour gérer la nouvelle structure tarifaire avec des packs et des abonnements de maintenance.

## Structure des Prix

### Packs (Paiement unique)
- **Pack Essentiel** : 290€ (ID: `pack-base`)
- **Pack Pro** : 490€ (ID: `pack-presence`)
- **Pack Pro Plus** : 690€ (ID: `pack-metier`)

### Maintenance (Abonnement mensuel)
- **Option Visibilité** : 29€/mois (ID: `visibilite`)
- **Maintenance Pro Plus** : 39€/mois (ID: `maintenance-pro`)

## Configuration Stripe

### Variables d'environnement
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_votre_clé_publique_stripe
STRIPE_SECRET_KEY=sk_test_votre_clé_secrète_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook_stripe
```

### Prix Stripe (à configurer dans le dashboard Stripe)
```javascript
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
```

## Logique de Paiement

### Types de Sessions
1. **Paiement unique** : Quand seul un pack est sélectionné
2. **Paiement avec abonnement** : Quand un pack + maintenance sont sélectionnés

### Flux de Paiement
1. Utilisateur sélectionne un pack
2. Maintenance recommandée pré-sélectionnée selon le pack
3. Création de la session Stripe avec les bons price_id
4. Redirection vers Stripe Checkout
5. Gestion des webhooks pour confirmer le paiement

## Règles de Sélection

### Pack Essentiel & Pack Pro
- Maintenance recommandée : Option Visibilité (29€/mois)
- Seule option disponible : Option Visibilité

### Pack Pro Plus
- Maintenance recommandée : Maintenance Pro Plus (39€/mois)
- Options disponibles : Option Visibilité ou Maintenance Pro Plus

## Événements Webhook

### Événements gérés
- `checkout.session.completed` : Paiement initial réussi
- `invoice.payment_succeeded` : Paiement récurrent réussi
- `invoice.payment_failed` : Paiement récurrent échoué
- `customer.subscription.deleted` : Abonnement annulé

## Pages de Redirection

### Succès (`/success`)
- Affichage des détails de commande
- Prochaines étapes
- Informations de contact

### Annulation (`/cancel`)
- Explication de l'annulation
- Options pour réessayer
- Support client

## Composants Principaux

### `useStripe` Hook
- Gestion des sessions de paiement
- Gestion des erreurs
- États de chargement

### `ProductsSection`
- Affichage des packs
- Logique de sélection
- Filtrage des maintenances

### `MaintenanceSelector`
- Sélection des options de maintenance
- Gestion de "Aucune maintenance"

### `CartSummary`
- Résumé de la commande
- Calcul des coûts
- Bouton de paiement

## Configuration Serveur

### Endpoints
- `POST /api/create-checkout-session` : Création de session
- `GET /api/checkout-session/:sessionId` : Récupération session
- `POST /api/webhook` : Webhooks Stripe

### Métadonnées
Les sessions incluent des métadonnées pour le suivi :
- `pack_id`, `pack_title`, `pack_price`
- `maintenance_id`, `maintenance_title`, `maintenance_price`

## Déploiement

### Étapes de Configuration
1. Créer les produits et prix dans Stripe Dashboard
2. Configurer les variables d'environnement
3. Configurer les webhooks Stripe
4. Tester avec les clés de test
5. Passer en production avec les clés live

### URLs de Webhook
- URL : `https://votre-domaine.com/api/webhook`
- Événements : `checkout.session.completed`, `invoice.payment_succeeded`, etc.

## Tests

### Tests Recommandés
- Paiement pack seul
- Paiement pack + maintenance
- Annulation de paiement
- Webhooks de paiement
- Échec de paiement récurrent

### Cartes de Test Stripe
- Succès : `4242424242424242`
- Échec : `4000000000000002`
- Authentification 3D : `4000002500003155`
