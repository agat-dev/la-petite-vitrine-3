// Exemple de base locale simple pour stocker les données client et commandes

export interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: string;
}

export interface CommandeData {
  id: string;
  clientId: string;
  pack: string;
  maintenance: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export class ClientDb {
  private static CLIENT_KEY = 'clients';
  private static COMMANDE_KEY = 'commandes';

  // Ajouter un client
  static addClient(client: Omit<ClientData, 'id' | 'createdAt'>): ClientData {
    const clients = this.getClients();
    const newClient: ClientData = {
      ...client,
      id: 'cli_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    clients.push(newClient);
    localStorage.setItem(this.CLIENT_KEY, JSON.stringify(clients));
    return newClient;
  }

  // Récupérer tous les clients
  static getClients(): ClientData[] {
    try {
      return JSON.parse(localStorage.getItem(this.CLIENT_KEY) || '[]');
    } catch {
      return [];
    }
  }

  // Ajouter une commande
  static addCommande(commande: Omit<CommandeData, 'id' | 'createdAt'>): CommandeData {
    const commandes = this.getCommandes();
    const newCommande: CommandeData = {
      ...commande,
      id: 'cmd_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    commandes.push(newCommande);
    localStorage.setItem(this.COMMANDE_KEY, JSON.stringify(commandes));
    return newCommande;
  }

  // Récupérer toutes les commandes
  static getCommandes(): CommandeData[] {
    try {
      return JSON.parse(localStorage.getItem(this.COMMANDE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  // Récupérer les commandes d'un client
  static getCommandesByClient(clientId: string): CommandeData[] {
    return this.getCommandes().filter(cmd => cmd.clientId === clientId);
  }

  // Supprimer toutes les données (optionnel)
  static clearAll() {
    localStorage.removeItem(this.CLIENT_KEY);
    localStorage.removeItem(this.COMMANDE_KEY);
  }
}