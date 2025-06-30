'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import dynamic from 'next/dynamic';

// Custom Icons
import GoogleIcon from './GoogleIcon';
import { FacebookIcon, GitHubIcon, MicrosoftIcon } from './SocialIcons';

// Dynamic import for social login button
const SocialLoginButton = dynamic(() => import('./SocialLoginButton'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded h-10 w-full mb-2"></div>,
  ssr: false
});

interface SocialLoginSectionProps {
  loading?: boolean;
}

const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({ loading = false }) => {
  const { signInWithGoogle, signInWithGitHub, signInWithFacebook, signInWithMicrosoft } = useAuth();
  const router = useRouter();
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Google sign-in failed:', error.message);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      router.push('/dashboard');
    } catch (error: any) {
      console.error('GitHub sign-in failed:', error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Facebook sign-in failed:', error.message);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      await signInWithMicrosoft();
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Microsoft sign-in failed:', error.message);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Google official colors with custom icon */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-10 w-full rounded mb-2"></div>}>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full bg-white text-gray-700 border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 py-2 px-4 rounded mb-2 flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-70' : ''}`}
            aria-label="Sign in with Google"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-3"></span>
            ) : (
              <GoogleIcon className="mr-3" />
            )}
            <span className="font-medium">Google</span>
          </button>
        </Suspense>

        {/* GitHub official colors with custom icon */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-10 w-full rounded mb-2"></div>}>
          <button
            type="button"
            onClick={handleGitHubSignIn}
            disabled={loading}
            className={`w-full bg-[#24292e] text-white hover:bg-[#1b1f23] py-2 px-4 rounded mb-2 flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-70' : ''}`}
            aria-label="Sign in with GitHub"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
            ) : (
              <GitHubIcon className="mr-3" />
            )}
            <span className="font-medium">GitHub</span>
          </button>
        </Suspense>

        {/* Facebook official colors with custom icon */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-10 w-full rounded mb-2"></div>}>
          <button
            type="button"
            onClick={handleFacebookSignIn}
            disabled={loading}
            className={`w-full bg-[#1877F2] text-white hover:bg-[#166fe5] py-2 px-4 rounded mb-2 flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-70' : ''}`}
            aria-label="Sign in with Facebook"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
            ) : (
              <FacebookIcon className="mr-3" />
            )}
            <span className="font-medium">Facebook</span>
          </button>
        </Suspense>

        {/* Microsoft official colors with custom icon */}
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-10 w-full rounded mb-2"></div>}>
          <button
            type="button"
            onClick={handleMicrosoftSignIn}
            disabled={loading}
            className={`w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded mb-2 flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-70' : ''}`}
            aria-label="Sign in with Microsoft"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-3"></span>
            ) : (
              <MicrosoftIcon className="mr-3" />
            )}
            <span className="font-medium">Microsoft</span>
          </button>
        </Suspense>
      </div>
    </>
  );
};

export default SocialLoginSection;
