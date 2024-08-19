// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrvDbtwELtOR5qOXQpLL327MJkH-MZO5I",
  authDomain: "aigeneratedflashcards.firebaseapp.com",
  projectId: "aigeneratedflashcards",
  storageBucket: "aigeneratedflashcards.appspot.com",
  messagingSenderId: "508304300315",
  appId: "1:508304300315:web:44c9a0762340d833be9bbe",
  measurementId: "G-VT0J7MKP5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}