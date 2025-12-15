import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_Wm3I4jNttcPNkPHckzlzHL0AY9fKpdU",
  authDomain: "sunflag-1ed54.firebaseapp.com",
  projectId: "sunflag-1ed54",
  storageBucket: "sunflag-1ed54.appspot.com",
  messagingSenderId: "396801318644",
  appId: "1:396801318644:web:9e965eeb6497547c7648a1"
};

const app = initializeApp(firebaseConfig);

// ✅ THESE EXPORTS ARE REQUIRED
export const auth = getAuth(app);
export const db = getFirestore(app);

