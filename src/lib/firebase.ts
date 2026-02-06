import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Replace with your Firebase project configuration
// Hardcoded configuration to resolve environment variable loading issues
const firebaseConfig = {
    apiKey: "AIzaSyCo5oerWoRV2czP78gVJYas6AVIfve_c54",
    authDomain: "pushgo-cf875.firebaseapp.com",
    projectId: "pushgo-cf875",
    storageBucket: "pushgo-cf875.firebasestorage.app",
    messagingSenderId: "911430817259",
    appId: "1:911430817259:web:caf82c1ff4747c9b2975ae",
    measurementId: "G-J48HZNW9V7"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase initialized with hardcoded config ✅");

export { app, auth, db };
