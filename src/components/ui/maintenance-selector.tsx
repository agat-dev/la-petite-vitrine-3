import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent } from './card';
import { cn } from '../../lib/utils';
import type { MaintenanceService } from '../../types/stripe';

interface MaintenanceSelectorProps {
  maintenanceServices: MaintenanceService[];
  selectedMaintenance: MaintenanceService | null;
  onSelect: (maintenance: MaintenanceService | null) => void;
}

export const MaintenanceSelector: React.FC<MaintenanceSelectorProps> = ({
  maintenanceServices,
  selectedMaintenance,
  onSelect
}) => {
  return (
    <div className="mt-12 space-y-4">
      <div className="text-left">
        <h3 className="text-2xl font-heading-4 text-blue-gray100 mb-4">
          Choisissez votre maintenance mensuelle (sans engagement)
        </h3>
        <p className="text-blue-gray200 font-body-m mb-6">
          Sélectionnez un abonnement mensuel pour la maintenance et l'animation de votre site et de vos réseaux sociaux.
        </p>
      </div>

      {/* Option "Aucune maintenance" */}
      <div 
        className={cn(
          "p-4 rounded-xl bg-amber-50 border-2 cursor-pointer transition-all duration-300",
          selectedMaintenance === null
            ? "border-amber-400 bg-amber-50 shadow-md"
            : "border-gray-200 hover:border-amber-200 hover:bg-amber-50"
        )}
        onClick={() => onSelect(null)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl"></div>
            <div>
              <h4 className="font-heading-6 text-amber-900 font-bold">Maintenance du site uniquement - 19€/mois</h4>
              <p className="text-sm text-blue-gray600">Je souhaite une maintenance technique seulement</p>
            </div>
          </div>
          {selectedMaintenance === null && (
            <CheckIcon className="w-5 h-5 text-amber-600" />
          )}
        </div>
      </div>

      {/* Services de maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {maintenanceServices.map((service) => (
          <Card
            key={service.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-102",
              service.bgColor,
              service.borderColor,
              selectedMaintenance?.id === service.id
                ? "border-2 border-amber-400 scale-105"
                : "border hover:border-amber-300"
            )}
            onClick={() => onSelect(service)}
          >
            <CardContent className="p-4 relative">
              {selectedMaintenance?.id === service.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-blue-gray900" />
                </div>
              )}

              <div className="text-center mb-3">
                <div className="text-2xl mb-2">{service.icon}</div>
                <h4 className={cn("font-bold text-lg mb-1", service.titleColor)}>
                  {service.title}
                </h4>
                <div className={cn("text-xl font-medium", service.priceColor)}>
                  {service.price} par mois
                </div>
              </div>

              <div className="space-y-1">
                {service.features.slice(0, 10).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckIcon className={cn("w-3 h-3 mt-0.5 flex-shrink-0", service.checkColor)} />
                    <span className={cn("text-xs", service.textColor)}>
                      {feature}
                    </span>
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