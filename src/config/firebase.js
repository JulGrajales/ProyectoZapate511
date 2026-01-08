import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAV2RlGQURre-KVWcEdyM1q_wzUh578QM",
  authDomain: "zapateriajgl.firebaseapp.com",
  projectId: "zapateriajgl",
  storageBucket: "zapateriajgl.firebasestorage.app",
  messagingSenderId: "830574582291",
  appId: "1:830574582291:web:788c2a454e6338c4013de6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);