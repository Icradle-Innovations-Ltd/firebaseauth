'use client';

import { Suspense, lazy, useEffect } from 'react';
import dynamic from 'next/dynamic';
import fixFirebaseNetworkIssues from '@/utils/firebase-network-fix';
import { preloadAuthModules, loadNonCriticalResources } from '@/utils/performance-optimizations';

// Dynamic imports for performance optimization
const AuthForm = dynamic(() => import('@/components/AuthForm'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded h-32 w-full mb-4"></div>,
  ssr: false
});

const SocialLoginSection = dynamic(() => import('@/components/SocialLoginSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded h-10 w-full mb-2"></div>,
  ssr: false
});

export default function Login() {
  // Apply network fixes and performance optimizations
  useEffect(() => {
    // Fix Firebase network issues
    fixFirebaseNetworkIssues();
    
    // Preload auth modules in the background
    preloadAuthModules();
    
    // Load non-critical resources (like Font Awesome icons) after page load
    loadNonCriticalResources();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded h-64 w-full"></div>}>
          <AuthForm type="login" />
        </Suspense>
        
        <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded h-32 w-full"></div>}>
          <SocialLoginSection />
        </Suspense>
      </div>
    </div>
  );
}
