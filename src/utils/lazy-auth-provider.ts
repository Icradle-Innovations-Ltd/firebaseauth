'use client';

// This is a utility for lazily loading Firebase auth providers
// to improve initial load performance
export const lazyLoadAuthProvider = async (providerName: string) => {
  // Dynamically import Firebase auth
  const { 
    GoogleAuthProvider,
    GithubAuthProvider, 
    FacebookAuthProvider, 
    OAuthProvider 
  } = await import('firebase/auth');
  
  switch(providerName) {
    case 'google':
      return new GoogleAuthProvider();
    case 'github':
      return new GithubAuthProvider();
    case 'facebook':
      return new FacebookAuthProvider();
    case 'microsoft':
      return new OAuthProvider('microsoft.com');
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
};

export default lazyLoadAuthProvider;
