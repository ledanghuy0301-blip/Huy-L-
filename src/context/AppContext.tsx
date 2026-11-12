import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, HistoryItem } from '../types';

export interface AppContextType {
  user: User | null;
  history: HistoryItem[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  login: (email: string, displayName?: string) => void;
  logout: () => void;
  addHistoryItem: (
    kind: 'text' | 'url' | 'call' | 'image',
    input: string,
    report: any,
    score: number,
    verdict: string
  ) => boolean;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const u = localStorage.getItem('kg_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [currentTab, setCurrentTab] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    const p = window.location.pathname;
    return p === '/cuoc-goi'
      ? '/cuoc-goi'
      : p === '/mo-phong'
      ? '/mo-phong'
      : p === '/tra-cuu'
      ? '/tra-cuu'
      : p === '/du-an'
      ? '/du-an'
      : p === '/lich-su'
      ? '/lich-su'
      : p === '/auth'
      ? '/auth'
      : '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      const valid = ['/cuoc-goi', '/mo-phong', '/tra-cuu', '/du-an', '/lich-su', '/auth'].includes(p)
        ? p
        : '/';
      setCurrentTab(valid);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(`kg_history_${user.email}`, JSON.stringify(history));
      } catch (e) {
        console.error(e);
      }
    }
  }, [history, user]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('kg_user', JSON.stringify(user));
        const h = localStorage.getItem(`kg_history_${user.email}`);
        setHistory(h ? JSON.parse(h) : []);
      } else {
        localStorage.removeItem('kg_user');
        setHistory([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = (email: string, displayName?: string) => {
    const u: User = {
      id: `u-${Date.now()}`,
      email: email.trim().toLowerCase(),
      display_name: displayName || email.split('@')[0],
    };
    setUser(u);
  };

  const logout = () => {
    setUser(null);
    setHistory([]);
    if (currentTab === '/lich-su') {
      setCurrentTab('/');
      if (typeof window !== 'undefined' && window.history.pushState) {
        window.history.pushState({}, '', '/');
      }
    }
  };

  const addHistoryItem = (
    kind: 'text' | 'url' | 'call' | 'image',
    input: string,
    report: any,
    score: number,
    verdict: string
  ): boolean => {
    if (!user) return false;
    const item: HistoryItem = {
      id: `item-${Date.now()}`,
      kind,
      input,
      score,
      verdict,
      report,
      created_at: new Date().toISOString(),
    };
    setHistory((prev) => {
      const updated = [item, ...prev];
      try {
        localStorage.setItem(`kg_history_${user.email}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    return true;
  };

  const removeHistoryItem = (id: string) => {
    if (!user) return;
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(`kg_history_${user.email}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearHistory = () => {
    if (!user) return;
    setHistory([]);
    try {
      localStorage.removeItem(`kg_history_${user.email}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        history,
        currentTab,
        setCurrentTab,
        login,
        logout,
        addHistoryItem,
        removeHistoryItem,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
