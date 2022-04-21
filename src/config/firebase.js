import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseInfos from '../firebase-infos';

const firebaseApp = initializeApp({
  apiKey: firebaseInfos.REACT_APP_FIREBASE_API_KEY,
  authDomain: firebaseInfos.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: firebaseInfos.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: firebaseInfos.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: firebaseInfos.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseInfos.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseInfos.REACT_APP_FIREBASE_APP_ID,
  measurementId: firebaseInfos.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
