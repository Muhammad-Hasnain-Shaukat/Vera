import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Order, QuizAnswer, Product } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  savedQuizResult: { answer: QuizAnswer; routine: Product[] } | null;
  saveQuizResult: (answer: QuizAnswer, routine: Product[]) => void;
  savedCustomRoutine: { morning: Product[]; evening: Product[] } | null;
  saveCustomRoutine: (routine: { morning: Product[]; evening: Product[] }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'vera_user_v1';
const ORDERS_STORAGE_KEY = 'vera_orders_v1';
const QUIZ_STORAGE_KEY = 'vera_quiz_result_v1';
const ROUTINE_STORAGE_KEY = 'vera_saved_routine_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        id: 'usr_guest_demo',
        name: 'Margaux Delacroix',
        email: 'margaux.delacroix@vera-client.com',
        skinType: 'Combination',
        concerns: ['Dullness', 'Fine Lines']
      };
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'VERA-89241',
          date: 'February 18, 2025',
          customer: {
            firstName: 'Margaux',
            lastName: 'Delacroix',
            email: 'margaux.delacroix@vera-client.com',
            address: '44 Rue de la Paix',
            city: 'Paris',
            state: 'Île-de-France',
            zip: '75002',
            country: 'France'
          },
          items: [],
          subtotal: 182,
          shipping: 0,
          discount: 27.3,
          total: 154.7,
          status: 'Delivered',
          paymentMethod: 'Mastercard ending in 4082'
        }
      ];
    } catch {
      return [];
    }
  });

  const [savedQuizResult, setSavedQuizResult] = useState<{ answer: QuizAnswer; routine: Product[] } | null>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedCustomRoutine, setSavedCustomRoutine] = useState<{ morning: Product[]; evening: Product[] } | null>(() => {
    try {
      const saved = localStorage.getItem(ROUTINE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, name = 'Margaux Delacroix') => {
    await new Promise(res => setTimeout(res, 600));
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      skinType: 'Combination',
      concerns: ['Dullness', 'Fine Lines']
    });
    return true;
  };

  const loginWithGoogle = async () => {
    await new Promise(res => setTimeout(res, 700));
    setUser({
      id: `usr_google_${Date.now()}`,
      name: 'Margaux Delacroix',
      email: 'margaux.delacroix@gmail.com',
      skinType: 'Combination',
      concerns: ['Dullness', 'Fine Lines']
    });
    return true;
  };

  const signup = async (name: string, email: string) => {
    await new Promise(res => setTimeout(res, 600));
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const saveQuizResult = (answer: QuizAnswer, routine: Product[]) => {
    const data = { answer, routine };
    setSavedQuizResult(data);
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(data));
  };

  const saveCustomRoutine = (routine: { morning: Product[]; evening: Product[] }) => {
    setSavedCustomRoutine(routine);
    localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(routine));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        signup,
        logout,
        orders,
        addOrder,
        savedQuizResult,
        saveQuizResult,
        savedCustomRoutine,
        saveCustomRoutine
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
