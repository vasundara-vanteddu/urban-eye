import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhSh46YIB7hWoKchHoMvExloWUTDAab0Y",
  authDomain: "urban-eye-b87e1.firebaseapp.com",
  projectId: "urban-eye-b87e1",
  storageBucket: "urban-eye-b87e1.firebasestorage.app",
  messagingSenderId: "629691005413",
  appId: "1:629691005413:web:81e96bba4174090eefd70c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();