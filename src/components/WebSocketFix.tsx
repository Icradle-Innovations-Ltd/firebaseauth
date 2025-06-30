'use client';

import { useEffect } from 'react';

export default function WebSocketFix() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This helps fix WebSocket connection issues in some environments
      const wsReconnect = () => {
        // Handle WebSocket reconnection
        if ((window as any).__NEXT_HMR_LATENCY_CB) {
          (window as any).__NEXT_HMR_LATENCY_CB = null;
        }
      };
      
      window.addEventListener('online', wsReconnect);
      
      return () => {
        window.removeEventListener('online', wsReconnect);
      };
    }
  }, []);

  return null;
}
