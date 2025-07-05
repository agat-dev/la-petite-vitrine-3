import React from 'react';
import { XIcon, ShoppingCartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from './card';
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
  // Calculer le total
  const packPrice = parseInt(selectedPack.price.replace('€', ''));
  const maintenancePrice = selectedMaintenance ? parseInt(selectedMaintenance.price.replace('€/mois', '')) : 0;
  const total = packPrice + (maintenancePrice * 12); // Maintenance sur 12 mois pour l'exemple

  return (
    <div className="bg-white rounded-lg border-2 border-amber-300 shadow-shadow-dark-l p-6">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="w-5 h-5 text-amber-900" />
          <h3 className="font-heading-6 text-blue-gray900">Votre sélection</h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pack sélectionné */}
        <div className="flex items-start justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex-1">
            <h4 className="font-medium text-blue-gray900 text-sm">{selectedPack.title}</h4>
            <p className="text-amber-900 font-bold">{selectedPack.price}</p>
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
              <p className="text-blue-600 font-bold">{selectedMaintenance.price}</p>
              <p className="text-xs text-blue-gray600">Engagement 12 mois</p>
            </div>
            <button
              onClick={onRemoveMaintenance}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Total */}
        <div className="border-t border-amber-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-blue-gray900">Pack:</span>
            <span className="font-bold text-blue-gray900">{selectedPack.price}</span>
          </div>
          {selectedMaintenance && (
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-gray900">Maintenance (12 mois):</span>
              <span className="font-bold text-blue-gray900">{maintenancePrice * 12}€</span>
            </div>
          )}
          <div className="flex justify-between items-center text-lg font-bold text-amber-900 border-t border-amber-200 pt-2">
            <span>Total:</span>
            <span>{total}€</span>
          </div>
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