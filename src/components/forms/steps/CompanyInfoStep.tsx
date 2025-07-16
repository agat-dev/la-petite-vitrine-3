import React from 'react';
import type { StepProps } from '../../../types/formTypes';

export const CompanyInfoStep: React.FC<StepProps> = ({ formData, setFormData, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`[Form] Saisie (CompanyInfoStep): ${name} =`, value);
    setFormData({ ...formData, [name]: value });
  };

  const sectors = [
    'Artisanat', 'Commerce', 'Services', 'Restaurant/Hôtellerie', 'Beauté/Bien-être',
    'Bâtiment/Travaux', 'Santé', 'Éducation', 'Transport', 'Immobilier', 'Autre'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informations sur votre entreprise
        </h2>
        <p className="text-gray-600">
          Parlez-nous de votre activité professionnelle
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de l'entreprise *
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nom de votre entreprise"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secteur d'activité *
          </label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.sector ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Sélectionnez votre secteur</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          {errors.sector && (
            <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zone d'intervention
          </label>
          <input
            type="text"
            name="interventionArea"
            value={formData.interventionArea}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Ex: Lyon et agglomération, France entière, etc."
          />
        </div>
      </div>
    </div>
  );
};