import React from 'react';
import { CheckIcon, MailIcon, PhoneIcon } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckIcon className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Demande envoyée avec succès !
      </h2>
      
      <p className="text-lg text-gray-600 mb-8">
        {message}
      </p>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">
          Prochaines étapes
        </h3>
        <ul className="space-y-2 text-amber-700">
          <li className="flex items-center">
            <MailIcon className="w-5 h-5 mr-2" />
            Vous recevrez un email de confirmation
          </li>
          <li className="flex items-center">
            <PhoneIcon className="w-5 h-5 mr-2" />
            Nous vous contacterons sous 24h
          </li>
        </ul>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Une question ? Contactez-nous directement :
        </p>
        <div className="space-y-2">
          <p>
            <strong>Email :</strong> 
            <a href="mailto:contact@lapetitevitrine.com" className="text-amber-600 hover:text-amber-700 ml-2">
              contact@lapetitevitrine.com
            </a>
          </p>
          <p>
            <strong>Téléphone :</strong> 
            <a href="tel:0123456789" className="text-amber-600 hover:text-amber-700 ml-2">
              01 23 45 67 89
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};