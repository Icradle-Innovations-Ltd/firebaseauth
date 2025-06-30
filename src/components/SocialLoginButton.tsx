'use client';

import React from 'react';

// Social login button optimized component with brand colors
const SocialLoginButton: React.FC<{
  provider: string;
  onClick: () => Promise<void>;
  disabled?: boolean;
  icon: string;
  label: string;
  colorClass: string;
}> = ({ provider, onClick, disabled = false, icon, label, colorClass }) => {
  const [loading, setLoading] = React.useState(false);

  const getIconColor = () => {
    // Return specific colors for brand icons
    switch(provider.toLowerCase()) {
      case 'google':
        return 'text-[#4285F4]'; // Google blue
      case 'facebook':
        return ''; // Color comes from background
      case 'github':
        return ''; // Color comes from background
      case 'microsoft':
        return ''; // Color comes from background
      default:
        return '';
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={`w-full ${colorClass} py-2 px-4 rounded mb-2 flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-70' : 'hover:opacity-90'}`}
      aria-label={`Sign in with ${provider}`}
    >
      {loading ? (
        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></span>
      ) : (
        <i className={`${icon} ${getIconColor()} mr-3 text-lg`}></i>
      )}
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default SocialLoginButton;
