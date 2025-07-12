import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Pack } from '../../types/ecommerce';
import { PACKS } from '../../data/ecommerce-data';
import { cn } from '../../lib/utils';

interface PackSelectorProps {
  selectedPack?: Pack;
  onSelectPack: (pack: Pack) => void;
  className?: string;
}

export const PackSelector: React.FC<PackSelectorProps> = ({
  selectedPack,
  onSelectPack,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-gray900 mb-4">
          Choisissez votre pack
        </h2>
        <p className="text-blue-gray600 text-lg">
          Sélectionnez le pack qui correspond le mieux à vos besoins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKS.map((pack) => (
          <Card
            key={pack.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-105",
              selectedPack?.id === pack.id
                ? "ring-2 ring-amber-400 bg-amber-50"
                : "hover:shadow-lg"
            )}
            onClick={() => onSelectPack(pack)}
          >
            {selectedPack?.id === pack.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <h3 className="text-2xl font-bold text-blue-gray900 mb-2">
                {pack.title}
              </h3>
              <div className="text-3xl font-bold text-amber-900 mb-2">
                {pack.price}€
              </div>
              <p className="text-blue-gray600 text-sm">
                Livraison en {pack.deliveryTime}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-blue-gray700 mb-4 text-sm">
                {pack.description}
              </p>
              
              <div className="space-y-2">
                {pack.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-gray700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};