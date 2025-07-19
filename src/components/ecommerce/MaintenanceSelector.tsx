import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { MaintenanceOption } from '../../types/ecommerce';
import { cn } from '../../lib/utils';

interface MaintenanceSelectorProps {
  maintenanceOptions: MaintenanceOption[];
  selectedMaintenance: MaintenanceOption | null;
  onSelectMaintenance: (option: MaintenanceOption) => void;
  className?: string;
}

export const MaintenanceSelector: React.FC<MaintenanceSelectorProps> = ({
  maintenanceOptions,
  selectedMaintenance,
  onSelectMaintenance,
  className
}) => {
  // Filtrer pour ne garder que les options de maintenance (exclure réseaux sociaux)
  const filteredOptions = maintenanceOptions.filter(
    option => !option.title.toLowerCase().includes('réseaux sociaux') && !option.title.toLowerCase().includes('google my business')
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-gray900 mb-4">
          Choisissez votre maintenance
        </h2>
        <p className="text-blue-gray600">
          Sélectionnez le niveau de maintenance qui vous convient
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOptions.map((option) => {
          const isSelected = selectedMaintenance?.id === option.id;
          return (
            <Card
              key={option.id}
              className={cn(
                " border border-1 border-amber-200 cursor-pointer transition-all duration-300",
                isSelected ? "ring-1 ring-amber-400 bg-amber-50" : "hover:shadow-lg hover:scale-105"
              )}
              onClick={() => onSelectMaintenance(option)}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold text-blue-gray900 mb-2">
                  {option.title}
                </h3>
                <div className="text-2xl font-bold text-amber-900 mb-2">
                  {option.price}€/mois
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-gray700 mb-4 text-sm">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};