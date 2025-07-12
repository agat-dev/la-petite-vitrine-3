import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { MaintenanceOption } from '../../types/ecommerce';
import { MAINTENANCE_OPTIONS } from '../../data/ecommerce-data';
import { cn } from '../../lib/utils';

interface MaintenanceSelectorProps {
  selectedMaintenance?: MaintenanceOption;
  onSelectMaintenance: (maintenance: MaintenanceOption | undefined) => void;
  className?: string;
}

export const MaintenanceSelector: React.FC<MaintenanceSelectorProps> = ({
  selectedMaintenance,
  onSelectMaintenance,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-gray900 mb-4">
          Options réseaux sociaux (optionnel)
        </h2>
        <p className="text-blue-gray600">
          Choisissez vos options de présence en ligne
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Options de maintenance */}
        {MAINTENANCE_OPTIONS.map((maintenance) => (
          <Card
            key={maintenance.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-105",
              selectedMaintenance?.id === maintenance.id
                ? "ring-2 ring-amber-400 bg-amber-50"
                : "hover:shadow-lg"
            )}
            onClick={() => onSelectMaintenance(maintenance)}
          >
            {selectedMaintenance?.id === maintenance.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <h3 className="text-xl font-bold text-blue-gray900 mb-2">
                {maintenance.title}
              </h3>
              <div className="text-2xl font-bold text-amber-900 mb-2">
                {maintenance.price}€/mois
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-blue-gray700 mb-4 text-sm">
                {maintenance.description}
              </p>
              
              <div className="space-y-2">
                {maintenance.features.map((feature, index) => (
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