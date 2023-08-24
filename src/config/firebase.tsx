// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzY0FnHAa5wm33ts0M8jCHx53BCefMRIM",
  authDomain: "react-chatapp-2e60f.firebaseapp.com",
  projectId: "react-chatapp-2e60f",
  storageBucket: "react-chatapp-2e60f.appspot.com",
  messagingSenderId: "576938004561",
  appId: "1:576938004561:web:8df1f4b1c9e6176521a870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();