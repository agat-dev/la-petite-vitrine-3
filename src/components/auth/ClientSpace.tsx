import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { useAuthContext } from '../../hooks/useAuth';
import { 
  UserIcon, 
  LogOutIcon, 
  EditIcon, 
  SaveIcon, 
  XIcon,
  ShoppingBagIcon,
  SettingsIcon,
  MailIcon,
  PhoneIcon,
  BuildingIcon
} from 'lucide-react';

interface ClientSpaceProps {
  onLogout?: () => void;
  className?: string;
}

export const ClientSpace: React.FC<ClientSpaceProps> = ({
  onLogout,
  className
}) => {
  const { authState, logout, updateProfile } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    company: authState.user?.company || '',
    phone: authState.user?.phone || '',
  });

  const handleLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    }
  };

  const handleSave = async () => {
    const success = await updateProfile(editData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      firstName: authState.user?.firstName || '',
      lastName: authState.user?.lastName || '',
      company: authState.user?.company || '',
      phone: authState.user?.phone || '',
    });
    setIsEditing(false);
  };

  if (!authState.user) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* En-tête de l'espace client */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-amber-100 to-blue-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-gray900">
                  Espace Client
                </h1>
                <p className="text-blue-gray600">
                  Bienvenue, {authState.user.firstName} {authState.user.lastName}
                </p>
                <p className="text-sm text-blue-gray500">
                  Dernière connexion : {authState.user.lastLogin ? 
                    new Date(authState.user.lastLogin).toLocaleDateString('fr-FR') : 
                    'Première connexion'
                  }
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOutIcon className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Informations du profil */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-blue-gray900 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Informations du profil
            </h2>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <EditIcon className="w-4 h-4" />
                Modifier
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <SaveIcon className="w-4 h-4" />
                  Sauvegarder
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <XIcon className="w-4 h-4" />
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-blue-gray900 mb-2">
                Prénom
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <UserIcon className="w-4 h-4 text-blue-gray500" />
                  <span>{authState.user.firstName}</span>
                </div>
              )}
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-blue-gray900 mb-2">
                Nom
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <UserIcon className="w-4 h-4 text-blue-gray500" />
                  <span>{authState.user.lastName}</span>
                </div>
              )}
            </div>

            {/* Email (non modifiable) */}
            <div>
              <label className="block text-sm font-medium text-blue-gray900 mb-2">
                Email
              </label>
              <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                <MailIcon className="w-4 h-4 text-blue-gray500" />
                <span className="text-blue-gray600">{authState.user.email}</span>
                <span className="text-xs text-blue-gray400">(non modifiable)</span>
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-blue-gray900 mb-2">
                Téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                  placeholder="06 12 34 56 78"
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <PhoneIcon className="w-4 h-4 text-blue-gray500" />
                  <span>{authState.user.phone || 'Non renseigné'}</span>
                </div>
              )}
            </div>

            {/* Entreprise */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-blue-gray900 mb-2">
                Entreprise
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.company}
                  onChange={(e) => setEditData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                  placeholder="Nom de votre entreprise"
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <BuildingIcon className="w-4 h-4 text-blue-gray500" />
                  <span>{authState.user.company || 'Non renseigné'}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mes commandes */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-blue-gray900 flex items-center gap-2">
            <ShoppingBagIcon className="w-5 h-5" />
            Mes commandes
          </h2>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingBagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune commande
            </h3>
            <p className="text-gray-600 mb-4">
              Vous n'avez pas encore passé de commande.
            </p>
            <Button
              onClick={() => window.location.href = '/commande'}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Passer ma première commande
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};