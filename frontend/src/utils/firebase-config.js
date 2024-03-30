// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYdbSCrjLIaQdv8yJ8lJ0nL7MptmQqBqw",
  authDomain: "flixxit-main.firebaseapp.com",
  projectId: "flixxit-main",
  storageBucket: "flixxit-main.appspot.com",
  messagingSenderId: "506635325569",
  appId: "1:506635325569:web:2bc5c3c187f13f12ddbd80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
