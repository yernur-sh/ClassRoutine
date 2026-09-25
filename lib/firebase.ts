import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from environment or fallback placeholders
const firebaseConfig = {
   apiKey: "AIzaSyBYF3eJvOPoh8dDEryIG8fI0pwtUHrcT-s",
    authDomain: "classroutine-8bb0f.firebaseapp.com",
    projectId: "classroutine-8bb0f",
    storageBucket: "classroutine-8bb0f.firebasestorage.app",
    messagingSenderId: "468100680383",
    appId: "1:468100680383:web:40c35ce01c7c487f9b940a",
};

// Check if Firebase is running with actual valid API key
export const isFirebaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== undefined &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "" &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("Dummy")
  );
};

// Initialize Firebase app safely
let app;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn("Firebase initialization notice: Running in local reactive state mode.", error);
}

export { app, auth, db, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
