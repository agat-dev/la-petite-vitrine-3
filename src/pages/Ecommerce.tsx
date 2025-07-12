import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { EcommerceFlow } from '../components/ecommerce/EcommerceFlow';

export const EcommercePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Récupérer les paramètres d'URL
  const directToForm = searchParams.get('direct') === 'form';
  const packId = searchParams.get('pack') || 'pack-pro'; // Pack Pro par défaut
  
  return (
    <EcommerceFlow 
      initialFlow={directToForm ? 'form' : 'pack-selection'}
      preSelectedPackId={directToForm ? packId : undefined}
    />
  );
};

export default EcommercePage;