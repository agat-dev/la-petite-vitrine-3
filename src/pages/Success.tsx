import React, { useEffect, useState } from 'react';
import { CheckIcon, ArrowLeftIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import StyledButton from '../components/ui/styled-button';

export const Success: React.FC = () => {
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      fetch(`/api/checkout-session/${sessionId}`)
        .then(response => response.json())
        .then(data => {
          setSessionData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white shadow-shadow-dark-XL">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-heading-2 text-blue-gray900 mb-2">
            Paiement réussi !
          </h1>
          <p className="text-blue-gray600 font-body-l">
            Merci pour votre commande. Nous avons bien reçu votre paiement.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {sessionData && (
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="font-heading-6 text-blue-gray900 mb-3">
                Détails de votre commande
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-gray600">Numéro de commande:</span>
                  <span className="font-mono text-blue-gray900">{sessionData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-gray600">Montant total:</span>
                  <span className="font-bold text-blue-gray900">
                    {(sessionData.amount_total / 100).toFixed(2)}€
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-gray600">Statut:</span>
                  <span className="text-green-600 font-medium">Payé</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-heading-6 text-blue-gray900 mb-3">
              Prochaines étapes
            </h3>
            <ul className="space-y-2 text-sm text-blue-gray700">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Vous recevrez un email de confirmation dans les prochaines minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Notre équipe vous contactera sous 48h pour démarrer votre projet</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Votre site sera livré selon les délais annoncés dans votre pack dès validation de votre commande.</span>
              </li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <p className="text-blue-gray600 font-body-m">
              Une question ? Contactez-nous à{' '}
              <a href="mailto:contact@lapetitevitrine.com" className="text-amber-900 hover:underline">
                contact@lapetitevitrine.com
              </a>
            </p>
            
            <StyledButton
              variant="primary"
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Retour à l'accueil
            </StyledButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};