// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwBgzBo--eSqpMafNxQ_8VkvtvcUzM7Mw",
  authDomain: "musicfy-bc02b.firebaseapp.com",
  projectId: "musicfy-bc02b",
  storageBucket: "musicfy-bc02b.appspot.com",
  messagingSenderId: "681763719509",
  appId: "1:681763719509:web:907ad21e0757ad403307dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
