'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// Email/password form component extracted for better code splitting
interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (type === 'signup') {
      if (!confirmPassword) {
        setError('Please confirm your password');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    try {
      setError('');
      setLoading(true);
      
      if (type === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      
      router.push('/dashboard');
    } catch (error: any) {
      setError(`Failed to ${type === 'login' ? 'log in' : 'create account'}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {type === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
            type === 'login' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
        >
          {loading ? (type === 'login' ? 'Signing in...' : 'Creating account...') : (type === 'login' ? 'Sign in' : 'Sign up')}
        </button>
      </div>

      {type === 'login' && (
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm">
            <Link href="/phone-login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in with Phone
            </Link>
          </div>
        </div>
      )}

      {type === 'signup' && (
        <div className="flex items-center justify-center">
          <div className="text-sm">
            <Link href="/phone-login" className="font-medium text-emerald-600 hover:text-emerald-500">
              Sign up with Phone instead
            </Link>
          </div>
        </div>
      )}

      <div className="text-center">
        <span className="text-sm text-gray-600">
          {type === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <Link 
            href={type === 'login' ? '/signup' : '/login'} 
            className={`font-medium ${type === 'login' ? 'text-indigo-600 hover:text-indigo-500' : 'text-emerald-600 hover:text-emerald-500'}`}
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </span>
      </div>
    </form>
  );
};

export default AuthForm;
