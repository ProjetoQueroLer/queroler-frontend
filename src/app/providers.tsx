'use client';

import { AuthProvider } from '@/presentation/shared/lib/auth-context';
import { QueryProvider } from '@/presentation/shared/lib/query-provider';

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
      <QueryProvider>
        {children}
      </QueryProvider>
    </AuthProvider>
  );
}
