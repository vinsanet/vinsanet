import { firebaseConfig } from "@/firebase/firebaseConfig";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebase = initializeApp(firebaseConfig);
getAnalytics(firebase);

const isEmulating =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
export const firebaseAuth = getAuth();
export const firebaseStorage = getStorage();
export const firebaseDb = getFirestore(firebase);

if (isEmulating) {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099", {
    disableWarnings: true,
  });
  connectStorageEmulator(firebaseStorage, "localhost", 9199);
  connectFirestoreEmulator(firebaseDb, "localhost", 8080);
}

export default firebase;
