import React from 'react';
import { XIcon, ShoppingCartIcon } from 'lucide-react';
import { CardContent, CardHeader } from './card';
import StyledButton from './styled-button';
import type { Pack, MaintenanceService } from '../../types/stripe';

interface CartSummaryProps {
  selectedPack: Pack;
  selectedMaintenance?: MaintenanceService | null;
  onRemovePack: () => void;
  onRemoveMaintenance: () => void;
  onCheckout: () => void;
  loading: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  selectedPack,
  selectedMaintenance,
  onRemovePack,
  onRemoveMaintenance,
  onCheckout,
  loading
}) => {
  // Calculer les prix
  const packPrice = parseInt(selectedPack.price.replace('€', ''));
  const maintenancePrice = selectedMaintenance ? parseInt(selectedMaintenance.price.replace('€', '')) : 0;
  
  return (
    <div className="sticky top-12 bg-amber-50 rounded-[30px] shadow-shadow-dark-l p-6">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="w-5 h-5 text-amber-900" />
          <h3 className="font-heading-6 text-blue-gray900">Votre sélection</h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pack sélectionné */}
        <div className="flex items-start justify-between p-3 bg-amber-100 rounded-lg border border-amber-200">
          <div className="flex-1">
            <h4 className="font-medium text-blue-gray900 text-sm">{selectedPack.title}</h4>
            <p className="text-amber-900 font-bold">{selectedPack.price}</p>
            <p className="text-xs text-blue-gray600">Paiement unique</p>
          </div>
          <button
            onClick={onRemovePack}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Maintenance sélectionnée */}
        {selectedMaintenance && (
          <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-1">
              <h4 className="font-medium text-blue-gray900 text-sm">{selectedMaintenance.title}</h4>
              <p className="text-blue-600 font-bold">{selectedMaintenance.price}/mois</p>
              <p className="text-xs text-blue-gray600">Abonnement mensuel sans engagement</p>
            </div>
            <button
              onClick={onRemoveMaintenance}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Résumé des coûts */}
        <div className="border-t border-amber-200 pt-4">
          {selectedMaintenance && (
            <div className="bg-blue-50 p-2 rounded text-xs text-blue-gray700 mb-4">
              <strong>Note:</strong> La maintenance sera facturée mensuellement après le premier paiement du pack.
            </div>
          )}
          <div className="flex justify-between items-center text-lg font-bold text-amber-900">
            <span>Aujourd'hui:</span>
            <span>{packPrice}€</span>
          </div>
          {selectedMaintenance && (
            <div className="flex justify-between items-center text-sm text-blue-gray600 mt-1">
              <span>Puis chaque mois:</span>
              <span>{maintenancePrice}€</span>
            </div>
          )}
        </div>

        {/* Bouton de paiement */}
        <StyledButton
          variant="primary"
          onClick={onCheckout}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Redirection...' : 'Procéder au paiement'}
        </StyledButton>

        <p className="text-xs text-blue-gray500 text-center">
          Paiement sécurisé par Stripe
        </p>
      </CardContent>
    </div>
  );
};