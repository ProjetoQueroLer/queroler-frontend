'use client';

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialIsAuthenticated = false,
}: PropsWithChildren<{ initialIsAuthenticated?: boolean }>) {
  const [isAuthenticated, setAuthenticated] = useState(initialIsAuthenticated);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
