import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-q-2L0HyMrx3C1RWjlzDHRUWbHeUJnrA",
  authDomain: "malek-djr-prtf.firebaseapp.com",
  projectId: "malek-djr-prtf",
  storageBucket: "malek-djr-prtf.firebasestorage.app",
  messagingSenderId: "182838346745",
  appId: "1:182838346745:web:fe4c99fc99fcbf5e5c7328",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
