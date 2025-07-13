import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { useAuthContext } from '../../hooks/useAuth';
import { useEcommerce } from '../../hooks/useEcommerce';
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
  BuildingIcon,
  EyeIcon,
  DownloadIcon,
  FileTextIcon,
  PaletteIcon
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
  const { customer } = useEcommerce();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(null);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return 'Brouillon';
    }
  };

  // Récupérer les commandes du client connecté
  const userOrders = customer?.orders?.filter(order => 
    order.formData.email === authState.user?.email
  ) || [];

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
          {userOrders.length === 0 ? (
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
          ) : (
            <div className="space-y-4">
              {userOrders.map((order, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-blue-gray900">
                          {order.pack.title}
                        </h3>
                        <p className="text-sm text-blue-gray600">
                          Commandé le {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-gray900">
                          {order.totalPrice}€
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-blue-gray900 mb-2">Pack</h4>
                        <p className="text-sm text-blue-gray600">{order.pack.description}</p>
                      </div>
                      {order.maintenance && (
                        <div>
                          <h4 className="font-medium text-blue-gray900 mb-2">Maintenance</h4>
                          <p className="text-sm text-blue-gray600">
                            {order.maintenance.title} - {order.maintenance.price}€/mois
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedOrderIndex(selectedOrderIndex === index ? null : index)}
                      >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        {selectedOrderIndex === index ? 'Masquer détails' : 'Voir détails'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Télécharger facture
                      </Button>
                    </div>

                    {/* Détails étendus de la commande */}
                    {selectedOrderIndex === index && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-blue-gray900 mb-4">Configuration du projet</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Informations entreprise */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                              <BuildingIcon className="w-4 h-4 text-blue-600" />
                              <h5 className="font-medium text-blue-gray900">Informations entreprise</h5>
                            </div>
                            {order.formData.company && (
                              <div>
                                <span className="text-sm font-medium text-blue-gray700">Entreprise :</span>
                                <p className="text-sm text-blue-gray600">{order.formData.company}</p>
                              </div>
                            )}
                            {order.formData.secteur_activite && (
                              <div>
                                <span className="text-sm font-medium text-blue-gray700">Secteur d'activité :</span>
                                <p className="text-sm text-blue-gray600">{order.formData.secteur_activite}</p>
                              </div>
                            )}
                            {order.formData.adresse_complete && (
                              <div>
                                <span className="text-sm font-medium text-blue-gray700">Adresse :</span>
                                <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.adresse_complete}</p>
                              </div>
                            )}
                          </div>

                          {/* Configuration du site */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                              <PaletteIcon className="w-4 h-4 text-purple-600" />
                              <h5 className="font-medium text-blue-gray900">Configuration du site</h5>
                            </div>
                            {order.formData.services_proposes && (
                              <div>
                                <span className="text-sm font-medium text-blue-gray700">Services :</span>
                                <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.services_proposes}</p>
                              </div>
                            )}
                            {order.formData.ton_communication && (
                              <div>
                                <span className="text-sm font-medium text-blue-gray700">Ton de communication :</span>
                                <p className="text-sm text-blue-gray600">{order.formData.ton_communication}</p>
                              </div>
                            )}
                            {order.formData.informations_diverses && (
                              <div>
                                <span className="text-sm font-medium text-blue-gray700">Informations diverses :</span>
                                <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.informations_diverses}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};