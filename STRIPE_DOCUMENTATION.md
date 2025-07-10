# Documentation - Module de Paiement Stripe

## Vue d'ensemble

Le module de paiement Stripe a été adapté pour gérer la nouvelle structure tarifaire avec des packs et des abonnements de maintenance **obligatoires**.

## Structure des Prix

### Packs (Paiement unique)
- **Pack Essentiel** : 290€ (ID: `pack-base`)
- **Pack Pro** : 490€ (ID: `pack-presence`)
- **Pack Pro Plus** : 690€ (ID: `pack-metier`)

### Maintenance (Abonnement mensuel - **OBLIGATOIRE**)
- **Option Maintenance simple** : 19€/mois (ID: `maintenance-simple`)
- **Option Visibilité Plus** : 39€/mois (ID: `visibilite-plus`)

## Règles de Sélection **OBLIGATOIRE**

### ✅ Sélection automatique
- **Pack sélectionné** → Maintenance par défaut auto-sélectionnée
- **Pack Essentiel & Pack Pro** → Option Maintenance simple (19€/mois)
- **Pack Pro Plus** → Option Visibilité Plus (39€/mois) par défaut

### ✅ Validation stricte
- **Impossible de commander** sans maintenance
- **Bouton paiement désactivé** si pas de maintenance
- **Validation côté serveur** : pack + maintenance requis

### 🚫 Suppression des options
- **Suppression de "Aucune maintenance"** dans MaintenanceSelector
- **Suppression du bouton "Supprimer maintenance"** dans CartSummary
- **Mode subscription obligatoire** pour toutes les sessions

## Flux de Paiement Mis à Jour

1. **Utilisateur sélectionne un pack** → Maintenance auto-sélectionnée
2. **Utilisateur peut changer la maintenance** (si options disponibles)
3. **Validation** : Pack + Maintenance requis
4. **Session Stripe** : Mode 'subscription' pour tous les paiements
5. **Facturation** : Pack (one-time) + Maintenance (récurrente)

## Changements Techniques

### MaintenanceSelector
- Suppression de l'option "Aucune maintenance"
- Signature modifiée : `onSelect: (maintenance: MaintenanceService) => void`
- Validation obligatoire d'une sélection

### CartSummary
- Suppression du bouton "Supprimer maintenance"
- Bouton paiement désactivé si pas de maintenance
- Interface simplifiée : pas de prop `onRemoveMaintenance`

### useStripe Hook
- Paramètre `selectedMaintenance` obligatoire (plus d'optionnel)
- Validation stricte côté client
- Gestion d'erreurs renforcée

### Serveur Express
- Validation pack + maintenance obligatoire
- Mode 'subscription' pour toutes les sessions
- Métadonnées enrichies pour le suivi

## Tests Requis

### ✅ Tests de validation
- Tentative de paiement sans maintenance (doit échouer)
- Sélection automatique de maintenance par défaut
- Changement de maintenance (Pack Pro Plus uniquement)

### ✅ Tests de paiement
- Pack Essentiel + Maintenance simple (309€ initial)
- Pack Pro + Maintenance simple (509€ initial)
- Pack Pro Plus + Visibilité Plus (729€ initial)
- Pack Pro Plus + Maintenance simple (709€ initial)

### ✅ Tests de webhook
- Abonnement créé avec pack + maintenance
- Paiements récurrents de maintenance
- Gestion des échecs de paiement

Tous les paiements incluent maintenant obligatoirement 1 pack + 1 maintenance ! 🎯
