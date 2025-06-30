import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getAuth, Auth, connectAuthEmulator } from "firebase/auth";

// Performance optimization: Prepare the config but delay actual initialization
const getFirebaseConfig = (): FirebaseOptions => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };

  // Validate that all required config values are present
  const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingKeys = requiredConfigKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

  if (missingKeys.length > 0) {
    throw new Error(`Missing Firebase configuration: ${missingKeys.join(', ')}`);
  }

  return firebaseConfig;
};

// Create singleton pattern for lazy initialization
let firebaseApp: FirebaseApp | undefined;
let firebaseAuth: Auth | undefined;
let initialized = false;

// Performance optimization: Initialize only when needed
const initializeFirebase = () => {
  if (!initialized) {
    try {
      // Get config and initialize Firebase
      const config = getFirebaseConfig();
      firebaseApp = initializeApp(config);
      
      // Initialize Firebase Authentication and get a reference to the service
      firebaseAuth = getAuth(firebaseApp);
      
      // Optional: Connect to emulator for local development
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_AUTH_EMULATOR === 'true' && firebaseAuth) {
        connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
      }
      
      initialized = true;
    } catch (error) {
      console.error('Firebase initialization error:', error);
      throw error;
    }
  }
  
  if (!firebaseApp || !firebaseAuth) {
    throw new Error('Firebase initialization failed');
  }
  
  return { app: firebaseApp, auth: firebaseAuth };
};

// Export the initialization function and getter for auth
export const getFirebaseAuth = (): Auth => {
  const { auth } = initializeFirebase();
  return auth;
};

// For backward compatibility
export const auth = getFirebaseAuth();
export default initializeFirebase().app;
