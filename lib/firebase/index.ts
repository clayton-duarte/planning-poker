import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  storageBucket: process.env.FIREBASE_STORE_BUCKET,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJ_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseInstance = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseInstance.firestore();

export { db };
