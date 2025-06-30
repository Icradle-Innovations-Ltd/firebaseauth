'use client';

// This is a script that helps fix common Firebase QUIC protocol errors
// Add this to pages where Firebase auth is not working properly
export const fixFirebaseNetworkIssues = () => {
  if (typeof window !== 'undefined') {
    // Attempt to bypass QUIC protocol issues by storing a session flag
    if (!sessionStorage.getItem('firebase-quic-fix')) {
      sessionStorage.setItem('firebase-quic-fix', 'true');
      
      // Add event listener to retry on network errors
      window.addEventListener('error', (event) => {
        const errorText = event.message || '';
        if (
          errorText.includes('QUIC_PROTOCOL_ERROR') || 
          errorText.includes('net::ERR_QUIC_PROTOCOL_ERROR')
        ) {
          console.log('Detected QUIC error, refreshing...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
    }
  }
};

export default fixFirebaseNetworkIssues;
