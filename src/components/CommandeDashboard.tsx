import React, { useEffect, useState } from 'react';
import { getClients, getCommandesByClient, ClientData, CommandeData } from '../db/localDataManager';

interface DashboardProps {
  clientId: string;
}

const CommandeDashboard: React.FC<DashboardProps> = ({ clientId }) => {
  const [client, setClient] = useState<ClientData | null>(null);
  const [commandes, setCommandes] = useState<CommandeData[]>([]);

  useEffect(() => {
    const clients = getClients();
    const foundClient = clients.find(c => c.id === clientId) || null;
    setClient(foundClient);
    setCommandes(getCommandesByClient(clientId));
  }, [clientId]);

  if (!client) {
    return <div className="p-8 text-center">Client introuvable.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-gray900">Bienvenue dans votre espace client</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">Informations client</h2>
        <ul className="space-y-1 text-blue-gray700">
          <li><strong>Nom:</strong> {client.nom} {client.prenom}</li>
          <li><strong>Email:</strong> {client.email}</li>
          {client.telephone && <li><strong>Téléphone:</strong> {client.telephone}</li>}
          {client.entreprise && <li><strong>Entreprise:</strong> {client.entreprise}</li>}
          {client.adresse && <li><strong>Adresse:</strong> {client.adresse}</li>}
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Vos commandes</h2>
        {commandes.length === 0 ? (
          <div className="text-blue-gray500">Aucune commande enregistrée.</div>
        ) : (
          <table className="w-full border border-amber-200 rounded-lg">
            <thead>
              <tr className="bg-amber-50">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Services</th>
                <th className="p-2 border">Montant</th>
                <th className="p-2 border">Statut</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map(cmd => (
                <tr key={cmd.id}>
                  <td className="p-2 border">{cmd.date}</td>
                  <td className="p-2 border">{cmd.services.join(', ')}</td>
                  <td className="p-2 border">{cmd.montant ? cmd.montant + ' €' : '-'}</td>
                  <td className="p-2 border">{cmd.statut || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CommandeDashboard;
