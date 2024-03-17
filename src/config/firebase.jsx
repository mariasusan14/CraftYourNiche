import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcCUA-nWhK1r_MtzU2dbr3zR-reMT4kEQ",
  authDomain: "craft-your-niche.firebaseapp.com",
  projectId: "craft-your-niche",
  storageBucket: "craft-your-niche.appspot.com",
  messagingSenderId: "665546749599",
  appId: "1:665546749599:web:69698d01a8690d95f494aa",
  measurementId: "G-Q26N71W35Y"
};


const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db =getFirestore(app);
export const storage=getStorage(app);