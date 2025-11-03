import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAakn8qC5MpEtTTkoibKkPv01ixq_dcSMA",
  authDomain: "andreyrelova.firebaseapp.com",
  projectId: "andreyrelova",
  storageBucket: "andreyrelova.firebasestorage.app",
  messagingSenderId: "984389417661",
  appId: "1:984389417661:web:249553796d69607d8795d4",
  measurementId: "G-FFNB1YKEQ0",
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db, storage, auth };
