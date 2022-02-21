import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDsnrd890YIu3hQUtlD1639Ibrd1j7VGiE",
  authDomain: "quizz-creator.firebaseapp.com",
  databaseURL: "https://quizz-creator-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quizz-creator",
  storageBucket: "quizz-creator.appspot.com",
  messagingSenderId: "366969350230",
  appId: "1:366969350230:web:e558454f343ad82c34f3f7",
  measurementId: "G-3QDLQDZCY5"
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export {
  getFirestore,
  collection,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc
};