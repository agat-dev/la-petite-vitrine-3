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
      <Card className="bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="p-8">
        <h2 className="text-3xl font-bold text-blue-gray900 mb-4 font-heading-2 text-center">
          Choisissez votre pack
        </h2>
        <p className="text-blue-gray600 text-lg font-body-l text-center">
          Sélectionnez le pack qui correspond le mieux à vos besoins
        </p>
        </CardHeader>

        <CardContent className="p-8">
      <div className="grid grid-cols-1 pt-8 gap-8">
        {PACKS.map((pack) => {
          const isSelected = selectedPack?.id === pack.id;
          return (
            <Card
              key={pack.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300 overflow-hidden border rounded-2xl",
                isSelected
                  ? "ring-2 ring-amber-400 bg-amber-50 border-amber-400"
                  : "hover:shadow-lg hover:scale-105 border-amber-200 bg-white"
              )}
              onClick={() => onSelectPack(pack)}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center z-10">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold text-blue-gray900 mb-2">
                  {pack.title}
                </h3>
                <div className="text-2xl font-bold text-amber-900 mb-2">
                  {pack.price}€
                </div>
                <p className="text-blue-gray600 text-sm font-body-m">
                  Livraison en {pack.deliveryTime}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-blue-gray700 mb-4 text-sm font-body-m">
                  {pack.description}
                </p>
                <div className="space-y-2">
                  {pack.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-gray700 font-body-m">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
        </CardContent>
      </Card>
    </div>
  );
};