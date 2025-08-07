import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNW66Xoz6UnZ-Xxka1wifqOdm9tAIEE6k",
  authDomain: "connecthub-fe14c.firebaseapp.com",
  projectId: "connecthub-fe14c",
  storageBucket: "connecthub-fe14c.appspot.com",
  messagingSenderId: "349988300719",
  appId: "1:349988300719:web:ec9409426c1a86d57b315a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
