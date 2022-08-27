// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCC8xpj1u9lK0Q6z3zxbQ9CGdmhIutLKVA",
  authDomain: "fir-crud-51f2b.firebaseapp.com",
  projectId: "fir-crud-51f2b",
  storageBucket: "fir-crud-51f2b.appspot.com",
  messagingSenderId: "988347115189",
  appId: "1:988347115189:web:04b0897421dd6cfb0f80fc",
  measurementId: "G-FZ1QDRNFGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);