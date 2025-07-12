import React from 'react';
import type { StepProps } from '../../../types/formTypes';

export const BusinessDetailsStep: React.FC<StepProps> = ({ formData, setFormData, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clientTypes = [
    { value: 'particuliers', label: 'Particuliers uniquement' },
    { value: 'professionnels', label: 'Professionnels uniquement' },
    { value: 'mixte', label: 'Particuliers et professionnels' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Détails de votre activité
        </h2>
        <p className="text-gray-600">
          Aidez-nous à mieux comprendre votre business et votre positionnement sur le marché
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Concurrents principaux
          </label>
          <textarea
            name="mainCompetitors"
            value={formData.mainCompetitors}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Qui sont vos principaux concurrents ? Comment vous différenciez-vous d'eux ?"
          />
          <p className="text-sm text-gray-500 mt-1">
            Optionnel - Cette information nous aide à positionner votre communication
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services proposés
          </label>
          <textarea
            name="proposedServices"
            value={formData.proposedServices}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Décrivez en détail vos principaux services ou produits..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Soyez précis pour que nous puissions mettre en valeur vos offres
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spécificité / Positionnement
          </label>
          <textarea
            name="specificityPositioning"
            value={formData.specificityPositioning}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Qu'est-ce qui vous rend unique ? Quelle est votre valeur ajoutée ?"
          />
          <p className="text-sm text-gray-500 mt-1">
            Votre différenciation sera mise en avant sur votre site web
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Types de clients
          </label>
          <div className="space-y-2">
            {clientTypes.map((type) => (
              <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="typesOfClients"
                  value={type.value}
                  checked={formData.typesOfClients === type.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Cela nous aide à adapter le ton et le contenu de votre site
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-amber-600 mt-0.5">💡</div>
          <div>
            <h4 className="font-medium text-amber-900 mb-1">
              Conseil pour optimiser votre site
            </h4>
            <p className="text-sm text-amber-800">
              Plus vous serez précis dans la description de votre activité et de votre positionnement, 
              plus nous pourrons créer un site web qui vous différencie de la concurrence et attire vos clients idéaux.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};