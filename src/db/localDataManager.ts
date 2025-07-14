// src/db/localDataManager.ts
// Module de gestion des commandes et clients pour stockage local (localStorage)

export interface ClientData {
  id: string;
  nom: string;
  prenom?: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  adresse?: string;
  [key: string]: any;
}

export interface CommandeData {
  id: string;
  clientId: string;
  services: string[];
  montant?: number;
  date: string;
  statut?: string;
  [key: string]: any;
}

const CLIENTS_KEY = 'lpv_clients';
const COMMANDES_KEY = 'lpv_commandes';

// --- Clients ---
export function addClient(client: ClientData): void {
  const clients = getClients();
  clients.push(client);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function getClients(): ClientData[] {
  const raw = localStorage.getItem(CLIENTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function updateClient(id: string, updates: Partial<ClientData>): void {
  const clients = getClients().map(c => c.id === id ? { ...c, ...updates } : c);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function deleteClient(id: string): void {
  const clients = getClients().filter(c => c.id !== id);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

// --- Commandes ---
export function addCommande(commande: CommandeData): void {
  const commandes = getCommandes();
  commandes.push(commande);
  localStorage.setItem(COMMANDES_KEY, JSON.stringify(commandes));
}

export function getCommandes(): CommandeData[] {
  const raw = localStorage.getItem(COMMANDES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getCommandesByClient(clientId: string): CommandeData[] {
  return getCommandes().filter(cmd => cmd.clientId === clientId);
}

export function updateCommande(id: string, updates: Partial<CommandeData>): void {
  const commandes = getCommandes().map(cmd => cmd.id === id ? { ...cmd, ...updates } : cmd);
  localStorage.setItem(COMMANDES_KEY, JSON.stringify(commandes));
}

export function deleteCommande(id: string): void {
  const commandes = getCommandes().filter(cmd => cmd.id !== id);
  localStorage.setItem(COMMANDES_KEY, JSON.stringify(commandes));
}

// --- Utilitaires ---
export function clearAllLocalData(): void {
  localStorage.removeItem(CLIENTS_KEY);
  localStorage.removeItem(COMMANDES_KEY);
}
