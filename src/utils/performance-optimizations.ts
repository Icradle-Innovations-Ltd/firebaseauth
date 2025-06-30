'use client';

// This utility provides performance optimization methods for Firebase auth pages
// to speed up their initial loading time

// Preload critical Firebase auth modules when needed
export const preloadAuthModules = () => {
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback for non-critical preloading
    const requestIdleCallback = 
      window.requestIdleCallback || 
      ((cb) => setTimeout(cb, 1));
    
    requestIdleCallback(() => {
      // Preload Firebase auth in the background after page loads
      import('firebase/auth').catch(e => console.error('Error preloading auth:', e));
    });
  }
};

// Use this for dynamic image loading (avatars, etc)
export const optimizeImageLoading = (url: string) => {
  if (typeof window !== 'undefined' && url) {
    const img = new Image();
    img.src = url;
  }
  return url;
};

// Defer non-critical CSS or external resource loading
export const loadNonCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback for loading non-critical resources
    const requestIdleCallback = 
      window.requestIdleCallback || 
      ((cb) => setTimeout(cb, 1));
    
    requestIdleCallback(() => {
      // Load non-critical CSS or scripts here
      // Example: Load Font Awesome only when needed
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(link);
    });
  }
};

export default {
  preloadAuthModules,
  optimizeImageLoading,
  loadNonCriticalResources
};
