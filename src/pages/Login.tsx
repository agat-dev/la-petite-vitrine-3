import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { ClientSpace } from '../components/auth/ClientSpace';
import { useAuthContext } from '../hooks/useAuth';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../components/ui/button';

export const LoginPage: React.FC = () => {
  const { authState, logout } = useAuthContext();

  const handleLoginSuccess = () => {
    // La redirection se fait automatiquement via l'état d'authentification
  };

  const handleLogout = () => {
    logout();
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-gray-50">
      {/* Header avec bouton retour */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={goBack}
                className="flex items-center gap-2 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-50"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Retour
              </Button>
              
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10"
                  alt="Logo"
                  src="/logo-pv.png"
                />
                <h1 className="text-xl font-bold text-blue-gray900">
                  La Petite Vitrine
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {authState.isAuthenticated ? (
            // Utilisateur connecté - Afficher l'espace client
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-gray900 mb-2">
                  Bienvenue dans votre espace client
                </h2>
                <p className="text-blue-gray600">
                  Gérez vos informations et consultez vos commandes
                </p>
              </div>
              
              <ClientSpace 
                onLogout={handleLogout}
                className="max-w-4xl mx-auto"
              />
            </div>
          ) : (
            // Utilisateur non connecté - Afficher le formulaire de connexion
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-gray900 mb-2">
                  Connexion à votre espace client
                </h2>
                <p className="text-blue-gray600">
                  Accédez à vos informations et suivez vos projets
                </p>
              </div>

              <div className="flex justify-center">
                <LoginForm 
                  onSuccess={handleLoginSuccess}
                  className="w-full max-w-md"
                />
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-12 max-w-2xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50">
                  <h3 className="text-lg font-semibold text-blue-gray900 mb-4">
                    Pourquoi créer un compte ?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 font-bold">📊</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-gray900">Suivi de projet</h4>
                        <p className="text-sm text-blue-gray600">Suivez l'avancement de votre site web en temps réel</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 font-bold">💬</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-gray900">Communication directe</h4>
                        <p className="text-sm text-blue-gray600">Échangez directement avec notre équipe</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 font-bold">📋</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-gray900">Gestion des commandes</h4>
                        <p className="text-sm text-blue-gray600">Consultez l'historique de vos commandes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 font-bold">⚙️</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-gray900">Paramètres</h4>
                        <p className="text-sm text-blue-gray600">Modifiez vos informations personnelles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA vers la commande */}
                <div className="mt-8 text-center">
                  <p className="text-blue-gray600 mb-4">
                    Pas encore client ? Découvrez nos offres
                  </p>
                  <Button
                    onClick={() => window.location.href = '/commande'}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
                  >
                    Voir nos packs
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};