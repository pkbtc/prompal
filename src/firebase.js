// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-0dkhubrnhp-Hj7Vbdfr43RC2zzRCMUo",
  authDomain: "ai-prowered-sih.firebaseapp.com",
  projectId: "ai-prowered-sih",
  storageBucket: "ai-prowered-sih.appspot.com",
  messagingSenderId: "209179779442",
  appId: "1:209179779442:web:ea9c44f0c312c5b8c23deb",
  measurementId: "G-XSHVJY1LKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics - only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { db, analytics };
