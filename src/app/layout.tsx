import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import WebSocketFix from '@/components/WebSocketFix';

export const metadata: Metadata = {
  title: 'Firebase Auth App',
  description: 'Next.js app with Firebase authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WebSocketFix />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
