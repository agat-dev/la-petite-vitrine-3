import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Customer, OrderData } from '../../types/ecommerce';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  CreditCardIcon, 
  SettingsIcon,
  LogOutIcon,
  EyeIcon,
  DownloadIcon
} from 'lucide-react';

interface CustomerDashboardProps {
  customer: Customer;
  onLogout: () => void;
  className?: string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  customer,
  onLogout,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'billing'>('orders');

  const getStatusColor = (status: OrderData['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: OrderData['status']) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return 'Brouillon';
    }
  };

  const tabs = [
    { id: 'orders' as const, label: 'Mes commandes', icon: ShoppingBagIcon },
    { id: 'profile' as const, label: 'Mon profil', icon: UserIcon },
    { id: 'billing' as const, label: 'Facturation', icon: CreditCardIcon },
  ];

  return (
    <div className={className}>
      {/* En-tête */}
      <div className="bg-blue-gray900 text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Espace Client</h1>
            <p className="text-blue-gray200">
              Bienvenue, {customer.firstName} {customer.lastName}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="text-white border-white hover:bg-white hover:text-blue-gray900"
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-gray900">Mes commandes</h2>
            
            {customer.orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingBagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune commande
                  </h3>
                  <p className="text-gray-600">
                    Vous n'avez pas encore passé de commande.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {customer.orders.map((order, index) => (
                  <Card key={index}>
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
                        <Button variant="outline" size="sm">
                          <EyeIcon className="w-4 h-4 mr-2" />
                          Voir détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="w-4 h-4 mr-2" />
                          Télécharger facture
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-gray900">Mon profil</h2>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Informations personnelles</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={customer.firstName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={customer.lastName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customer.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={customer.phone || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  {customer.company && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-blue-gray900 mb-1">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        value={customer.company}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        readOnly
                      />
                    </div>
                  )}
                </div>
                
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Modifier mes informations
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-gray900">Facturation</h2>
            
            <Card>
              <CardContent className="text-center py-12">
                <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Gestion de la facturation
                </h3>
                <p className="text-gray-600 mb-4">
                  Gérez vos moyens de paiement et consultez vos factures.
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Ajouter un moyen de paiement
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};