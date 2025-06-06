// src/services/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoSqBLGppM9H9SAwMqrYdmWZ5BrrulP7U",
  authDomain: "restaurant-app-888d0.firebaseapp.com",
  projectId: "restaurant-app-888d0",
  storageBucket: "restaurant-app-888d0.firebasestorage.app",
  messagingSenderId: "1029979074603",
  appId: "1:1029979074603:web:53515314c46c7d1f423a6e",
  measurementId: "G-PKRGP4SVK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);