import React from 'react';
import type { StepProps } from '../../../types/formTypes';

export const CommunicationStep: React.FC<StepProps> = ({ formData, setFormData, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const communicationTones = [
    { 
      value: 'professionnel', 
      label: 'Professionnel et formel',
      description: 'Ton sérieux et corporate, idéal pour B2B'
    },
    { 
      value: 'convivial', 
      label: 'Convivial et chaleureux',
      description: 'Approche humaine et bienveillante'
    },
    { 
      value: 'moderne', 
      label: 'Moderne et dynamique',
      description: 'Ton énergique et innovant'
    },
    { 
      value: 'premium', 
      label: 'Premium et luxueux',
      description: 'Élégance et exclusivité'
    },
    { 
      value: 'accessible', 
      label: 'Accessible et familial',
      description: 'Proximité et simplicité'
    },
    { 
      value: 'expert', 
      label: 'Expert et technique',
      description: 'Compétence et savoir-faire'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ton de communication
        </h2>
        <p className="text-gray-600">
          Définissez l'ambiance et le style de communication pour votre site web
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Ton souhaité pour la communication
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communicationTones.map((tone) => (
              <div key={tone.value} className="relative">
                <label className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.communicationTone === tone.value
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="communicationTone"
                      value={tone.value}
                      checked={formData.communicationTone === tone.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{tone.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{tone.description}</div>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Le ton choisi influencera le design, les couleurs et le style rédactionnel de votre site
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Liens vers des contenus existants
          </label>
          <textarea
            name="existingContentLinks"
            value={formData.existingContentLinks}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Partagez les liens vers vos contenus existants :&#10;- Site web actuel&#10;- Page Facebook/Instagram&#10;- Brochures en ligne&#10;- Autres supports de communication"
          />
          <p className="text-sm text-gray-500 mt-1">
            Optionnel - Ces références nous aident à comprendre votre univers visuel et éditorial
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Informations diverses
          </label>
          <textarea
            name="miscellaneousInfo"
            value={formData.miscellaneousInfo}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Toute autre information importante pour votre projet :&#10;- Contraintes particulières&#10;- Délais souhaités&#10;- Budget approximatif&#10;- Fonctionnalités spécifiques&#10;- Références ou inspirations"
          />
          <p className="text-sm text-gray-500 mt-1">
            Optionnel - Plus vous nous donnerez d'informations, plus notre proposition sera précise
          </p>
        </div>
      </div>
    </div>
  );
};