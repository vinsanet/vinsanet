import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
getAnalytics(firebase);

const isEmulating = window.location.hostname === "localhost";
export const firebaseAuth = getAuth();
export const firebaseStorage = getStorage();
export const firebaseDb = getFirestore(firebase);

if (isEmulating) {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
  connectStorageEmulator(firebaseStorage, "localhost", 9199);
  connectFirestoreEmulator(firebaseDb, "localhost", 8080);
}

export default firebase;
