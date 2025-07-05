import React from 'react';
import { XIcon, ArrowLeftIcon, RefreshCwIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import StyledButton from '../components/ui/styled-button';

export const Cancel: React.FC = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white shadow-shadow-dark-XL">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XIcon className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-heading-2 text-blue-gray900 mb-2">
            Paiement annulé
          </h1>
          <p className="text-blue-gray600 font-body-l">
            Votre paiement a été annulé. Aucun montant n'a été débité.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h3 className="font-heading-6 text-blue-gray900 mb-3">
              Que s'est-il passé ?
            </h3>
            <ul className="space-y-2 text-sm text-blue-gray700">
              <li>• Vous avez annulé le processus de paiement</li>
              <li>• Votre sélection de pack et maintenance est conservée</li>
              <li>• Aucun frais n'a été appliqué à votre carte</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-heading-6 text-blue-gray900 mb-3">
              Besoin d'aide ?
            </h3>
            <p className="text-sm text-blue-gray700 mb-3">
              Si vous avez rencontré un problème technique ou avez des questions sur nos packs, 
              n'hésitez pas à nous contacter.
            </p>
            <div className="space-y-2 text-sm">
              <div>📧 Email: <a href="mailto:support@example.com" className="text-amber-900 hover:underline">support@example.com</a></div>
              <div>📞 Téléphone: <a href="tel:+33123456789" className="text-amber-900 hover:underline">01 23 45 67 89</a></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StyledButton
              variant="primary"
              onClick={() => window.location.href = '/#pricing'}
              className="inline-flex items-center gap-2"
            >
              <RefreshCwIcon className="w-4 h-4" />
              Réessayer le paiement
            </StyledButton>
            
            <StyledButton
              variant="secondary"
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Retour à l'accueil
            </StyledButton>
          </div>

          <div className="text-center">
            <p className="text-xs text-blue-gray500">
              Vos données de paiement sont sécurisées par Stripe
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};