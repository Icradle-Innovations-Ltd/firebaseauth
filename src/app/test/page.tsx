'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing Firebase connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Test Firebase connection
      if (auth) {
        setStatus('✅ Firebase Auth initialized successfully');
        
        // Test auth state listener
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
          console.log('Auth state changed:', user ? 'User logged in' : 'No user');
        });

        return unsubscribe;
      } else {
        setError('❌ Firebase Auth initialization failed');
      }
    } catch (err) {
      setError(`❌ Firebase Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Firebase Connection Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded">
            <p className="text-sm font-medium">Status:</p>
            <p className={`text-sm ${error ? 'text-red-600' : 'text-green-600'}`}>
              {error || status}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-sm font-medium">Environment Variables:</p>
            <ul className="text-xs space-y-1 mt-2">
              <li>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</li>
              <li>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</li>
              <li>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</li>
            </ul>
          </div>
          
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}
