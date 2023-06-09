import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAJJeMPQDGAX68G3f88xZN1HrhzfJNr4kY",
  authDomain: "bonofondomivivienda2023.firebaseapp.com",
  projectId: "bonofondomivivienda2023",
  storageBucket: "bonofondomivivienda2023.appspot.com",
  messagingSenderId: "396030072431",
  appId: "1:396030072431:web:4033fbf850074d842bdf9a",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp);
export { auth, db ,storage};
