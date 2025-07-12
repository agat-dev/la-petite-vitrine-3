import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Pack, MaintenanceOption } from '../../types/ecommerce';
import { CheckIcon } from 'lucide-react';

interface OrderSummaryProps {
  selectedPack?: Pack;
  selectedSocialOptions?: MaintenanceOption[];
  formData: Record<string, any>;
  totalPrice: number;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPack,
  selectedSocialOptions = [],
  formData,
  totalPrice,
  className
}) => {
  console.log('OrderSummary render - selectedPack:', selectedPack, 'selectedSocialOptions:', selectedSocialOptions);
  
  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-xl font-bold text-blue-gray900">
          Récapitulatif de votre commande
        </h3>
        <p className="text-sm text-blue-gray600">
          Debug: Pack={selectedPack?.title || 'Aucun'}, Options={selectedSocialOptions.length || 0}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pack sélectionné */}
        {selectedPack && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-2">Pack sélectionné</h4>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-blue-gray900">{selectedPack.title}</h5>
                <span className="font-bold text-amber-900">{selectedPack.price}€</span>
              </div>
              <p className="text-sm text-blue-gray600 mb-3">{selectedPack.description}</p>
              <div className="space-y-1">
                {selectedPack.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckIcon className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-blue-gray700">{feature}</span>
                  </div>
                ))}
                {selectedPack.features.length > 3 && (
                  <p className="text-xs text-blue-gray500 italic">
                    +{selectedPack.features.length - 3} autres fonctionnalités
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Maintenance sélectionnée */}
        <div className="border-b pb-4">
          <h4 className="font-semibold text-blue-gray900 mb-2">Options réseaux sociaux</h4>
          {selectedSocialOptions.length > 0 ? (
            <div className="space-y-2">
              {selectedSocialOptions.map((option, index) => (
                <div key={option.id} className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-blue-gray900">{option.title}</h5>
                    <span className="font-bold text-blue-600">{option.price}€</span>
                  </div>
                  <p className="text-xs text-blue-gray600">{option.description}</p>
                </div>
              ))}
              <div className="bg-amber-50 p-2 rounded border-t border-amber-200">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-amber-800">Total options :</span>
                  <span className="text-amber-900">
                    {selectedSocialOptions.reduce((total, option) => total + option.price, 0)}€
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-blue-gray600">Aucune option sélectionnée</p>
            </div>
          )}
        </div>

        {/* Informations client */}
        {(formData.firstName || Object.keys(formData).length > 0) && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-2">Informations client</h4>
            <div className="space-y-1 text-sm">
              {formData.firstName && (
                <p><span className="font-medium">Nom :</span> {formData.firstName} {formData.lastName}</p>
              )}
              {formData.email && (
                <p><span className="font-medium">Email :</span> {formData.email}</p>
              )}
              {formData.phone && (
                <p><span className="font-medium">Téléphone :</span> {formData.phone}</p>
              )}
              {formData.company && (
                <p><span className="font-medium">Entreprise :</span> {formData.company}</p>
              )}
              {Object.keys(formData).length === 0 && (
                <p className="text-blue-gray500 italic">Informations à remplir dans le formulaire</p>
              )}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="bg-amber-100 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-gray900">Total</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-900">{totalPrice}€</div>
            </div>
          </div>
          
          {selectedPack && (
            <div className="mt-2 text-sm text-blue-gray600">
              Livraison prévue en {selectedPack.deliveryTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};