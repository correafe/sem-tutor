// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwkcGbXa_EXM7ABpbrJOvVI_0HZipmFqg",
  authDomain: "journeymapeasy-sem-tutor.firebaseapp.com",
  projectId: "journeymapeasy-sem-tutor",
  storageBucket: "journeymapeasy-sem-tutor.firebasestorage.app",
  messagingSenderId: "350419191088",
  appId: "1:350419191088:web:4785cbb53db0955dc7b4f5",
  measurementId: "G-4EJJV5NT5Q"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
