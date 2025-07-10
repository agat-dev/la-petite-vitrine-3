import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent } from './card';
import { cn } from '../../lib/utils';
import type { MaintenanceService } from '../../types/stripe';

interface MaintenanceSelectorProps {
  maintenanceServices: MaintenanceService[];
  selectedMaintenance: MaintenanceService | null;
  onSelect: (maintenance: MaintenanceService) => void;
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
          Sélectionnez votre maintenance mensuelle (obligatoire)
        </h3>
        <p className="text-blue-gray200 font-body-m mb-6">
          Chaque pack inclut une maintenance mensuelle pour assurer le bon fonctionnement de votre site et de vos réseaux sociaux.
        </p>
      </div>

      {/* Services de maintenance */}
      <div className="space-y-4">
        {maintenanceServices.map((maintenance) => (
          <Card
            key={maintenance.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-lg",
              maintenance.bgColor,
              maintenance.borderColor,
              selectedMaintenance?.id === maintenance.id
                ? "border-2 shadow-md"
                : "border hover:border-amber-300"
            )}
            onClick={() => onSelect(maintenance)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{maintenance.icon}</div>
                  <div className="flex-1">
                    <h4 className={cn("font-heading-6 font-bold", maintenance.titleColor)}>
                      {maintenance.title} - {maintenance.price}/mois
                    </h4>
                    <div className="mt-2 space-y-1">
                      {maintenance.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckIcon className={cn("w-4 h-4", maintenance.checkColor)} />
                          <span className={cn("text-sm", maintenance.textColor)}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedMaintenance?.id === maintenance.id && (
                  <CheckIcon className="w-5 h-5 text-amber-600" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};