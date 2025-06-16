// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5s3lmTqjagRAN-BT10Fy2R8S6kwFhVpM",
  authDomain: "app-restaurants-d0dc8.firebaseapp.com",
  databaseURL: "https://app-restaurants-d0dc8-default-rtdb.firebaseio.com",
  projectId: "app-restaurants-d0dc8",
  storageBucket: "app-restaurants-d0dc8.firebasestorage.app",
  messagingSenderId: "1072539355153",
  appId: "1:1072539355153:web:228681ed436437cb1889b0",
  measurementId: "G-5EFVK1H09P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };