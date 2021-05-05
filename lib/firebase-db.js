import firebase from 'firebase/app';
import 'firebase/firestore';

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "wll-mirror.firebaseapp.com",
  projectId: "wll-mirror",
  storageBucket: "wll-mirror.appspot.com",
  messagingSenderId: "648715608974",
  appId: FIREBASE_APP_ID
};

let store;
export default function firebaseInit() {
  if (!store) {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (error) {
      if (!/already exists/.test(error.message)) {
        console.error("Firebase initialization error", error.stack);
      } else {
        console.log('already exists ---')
      }
    }
    store = firebase.firestore();
  }
  return store;
}
