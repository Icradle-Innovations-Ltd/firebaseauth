'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  sendPasswordResetEmail,
} from 'firebase/auth';
import lazyLoadAuthProvider from '@/utils/lazy-auth-provider';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  signInWithPhone: (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>;
  confirmPhoneSignIn: (confirmationResult: ConfirmationResult, verificationCode: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        // Check for any pending redirect result
        const { getRedirectResult } = await import('firebase/auth');
        await getRedirectResult(auth);
      } catch (redirectError) {
        console.error('Redirect authentication error:', redirectError);
        // Don't set error state here as we'll fallback to normal auth flow
      }
    };
    
    try {
      // First check for any redirect results
      checkRedirectResult();
      
      // Then setup the normal auth state listener
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        setError(null);
      }, (error) => {
        console.error('Auth state change error:', error);
        setError(error.message);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Firebase auth initialization error:', error);
      setError('Failed to initialize authentication');
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = await lazyLoadAuthProvider('google');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw error;
    }
  };

  const signInWithGitHub = async () => {
    try {
      const provider = await lazyLoadAuthProvider('github');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = await lazyLoadAuthProvider('facebook');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Facebook sign-in failed:", error);
      throw error;
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const provider = await lazyLoadAuthProvider('microsoft');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const signInWithPhone = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return confirmationResult;
    } catch (error) {
      throw error;
    }
  };

  const confirmPhoneSignIn = async (confirmationResult: ConfirmationResult, verificationCode: string) => {
    try {
      await confirmationResult.confirm(verificationCode);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGitHub,
    signInWithFacebook,
    signInWithMicrosoft,
    logout,
    signInWithPhone,
    confirmPhoneSignIn,
    resetPassword,
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
