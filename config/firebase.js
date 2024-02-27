// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcCUA-nWhK1r_MtzU2dbr3zR-reMT4kEQ",
  authDomain: "craft-your-niche.firebaseapp.com",
  projectId: "craft-your-niche",
  storageBucket: "craft-your-niche.appspot.com",
  messagingSenderId: "665546749599",
  appId: "1:665546749599:web:69698d01a8690d95f494aa",
  measurementId: "G-Q26N71W35Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
