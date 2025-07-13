import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, AuthContextType } from '../types/auth';

// Simulation d'une base de données locale
const USERS_STORAGE_KEY = 'lapetitevitrine_users';
const CURRENT_USER_KEY = 'lapetitevitrine_current_user';

// Utilitaires de stockage
const getStoredUsers = (): Record<string, any> => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const setStoredUsers = (users: Record<string, any>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getCurrentUser = (): User | null => {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Hash simple pour les mots de passe (en production, utiliser bcrypt côté serveur)
const hashPassword = (password: string): string => {
  // Simple hash pour la démo - en production, utiliser un vrai système de hash
  return btoa(password + 'salt_lapetitevitrine');
};

const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const user = getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    });
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const users = getStoredUsers();
      const user = users[credentials.email];

      if (!user || !verifyPassword(credentials.password, user.passwordHash)) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Email ou mot de passe incorrect',
        }));
        return false;
      }

      // Mettre à jour la dernière connexion
      const updatedUser: User = {
        ...user,
        lastLogin: new Date(),
      };

      users[credentials.email] = { ...updatedUser, passwordHash: user.passwordHash };
      setStoredUsers(users);
      setCurrentUser(updatedUser);

      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erreur de connexion',
      }));
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const users = getStoredUsers();

      // Vérifier si l'utilisateur existe déjà
      if (users[data.email]) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Un compte existe déjà avec cet email',
        }));
        return false;
      }

      // Créer le nouvel utilisateur
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        phone: data.phone,
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      // Stocker l'utilisateur avec son mot de passe hashé
      users[data.email] = {
        ...newUser,
        passwordHash: hashPassword(data.password),
      };

      setStoredUsers(users);
      setCurrentUser(newUser);

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erreur lors de la création du compte',
      }));
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      const users = getStoredUsers();
      const updatedUser = { ...authState.user, ...data };
      
      users[authState.user.email] = {
        ...updatedUser,
        passwordHash: users[authState.user.email].passwordHash,
      };

      setStoredUsers(users);
      setCurrentUser(updatedUser);

      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    authState,
    login,
    register,
    logout,
    updateProfile,
  };
};

// Context pour l'authentification
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};