'use client';

import WebSocketFix from '@/components/WebSocketFix';
import FontOptimizer from '@/components/FontOptimizer';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WebSocketFix />
      <FontOptimizer />
      <AuthProvider>
        {children}
      </AuthProvider>
    </>
  );
}
