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
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-heading-4 text-blue-gray900 mb-4">
          Ajouter une maintenance ? (Optionnel)
        </h3>
        <p className="text-blue-gray600 font-body-m mb-6">
          Sélectionnez un abonnement maintenance pour votre site
        </p>
      </div>

      {/* Option "Aucune maintenance" */}
      <div 
        className={cn(
          "p-4 rounded-lg border-2 cursor-pointer transition-all duration-300",
          selectedMaintenance === null
            ? "border-amber-400 bg-amber-50 shadow-md"
            : "border-gray-200 hover:border-amber-200 hover:bg-amber-25"
        )}
        onClick={() => onSelect(null)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚫</div>
            <div>
              <h4 className="font-heading-6 text-blue-gray900">Aucune maintenance</h4>
              <p className="text-sm text-blue-gray600">Gérer mon site moi-même</p>
            </div>
          </div>
          {selectedMaintenance === null && (
            <CheckIcon className="w-5 h-5 text-amber-600" />
          )}
        </div>
      </div>

      {/* Option "Aucune maintenance" */}
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 hover:scale-102",
          selectedMaintenance === null
            ? "border-2 border-amber-400 bg-amber-50"
            : "border border-gray-200 hover:border-amber-200"
        )}
        onClick={() => onSelect(null)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-gray900">Aucune maintenance</h4>
              <p className="text-sm text-blue-gray600">Juste le pack, sans abonnement</p>
            </div>
            {selectedMaintenance === null && (
              <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-blue-gray900" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Services de maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <h4 className={cn("font-medium text-lg mb-1", service.titleColor)}>
                  {service.title}
                </h4>
                <div className={cn("text-xl font-bold", service.priceColor)}>
                  {service.price} par mois
                </div>
              </div>

              <div className="space-y-1">
                {service.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckIcon className={cn("w-3 h-3 mt-0.5 flex-shrink-0", service.checkColor)} />
                    <span className={cn("text-xs", service.textColor)}>
                      {feature}
                    </span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className={cn("text-xs italic", service.textColor)}>
                    +{service.features.length - 3} autres avantages
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};