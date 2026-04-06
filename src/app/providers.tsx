'use client';

import { AuthProvider } from '@/presentation/shared/lib/auth-context';

type ProvidersProps = {
  children: React.ReactNode;
  initialIsAuthenticated: boolean;
};

export function Providers({
  children,
  initialIsAuthenticated,
}: ProvidersProps) {
  return (
    <AuthProvider initialIsAuthenticated={initialIsAuthenticated}>
      {children}
    </AuthProvider>
  );
}
