'use client';

import { useEffect } from 'react';

// Component for optimizing font loading
const FontOptimizer: React.FC = () => {
  useEffect(() => {
    // Check if Font Awesome is already loaded
    const isFontAwesomeLoaded = () => {
      return document.querySelectorAll('link[href*="font-awesome"]').length > 0;
    };

    if (!isFontAwesomeLoaded()) {
      // Create a preconnect link for Font Awesome CDN to establish early connection
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://cdnjs.cloudflare.com';
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
      
      // Use the "resource hint" pattern to pre-load without blocking
      // This loads font awesome icons without blocking the main thread
      const loadFontAwesome = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        link.integrity = 'sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==';
        link.crossOrigin = 'anonymous';
        link.referrerPolicy = 'no-referrer';
        document.head.appendChild(link);
      };
      
      // Load Font Awesome immediately for auth pages to prevent icon flicker
      const path = window.location.pathname;
      const isAuthPage = path.includes('login') || path.includes('signup') || path.includes('phone-login');
      
      if (isAuthPage) {
        // Load immediately for auth pages
        loadFontAwesome();
      } else {
        // Use requestIdleCallback for other pages
        const requestIdleCallback = 
          window.requestIdleCallback || 
          ((cb) => setTimeout(cb, 1));
          
        requestIdleCallback(() => {
          loadFontAwesome();
        });
      }
    }
  }, []);

  return null; // This component doesn't render anything
};

export default FontOptimizer;
