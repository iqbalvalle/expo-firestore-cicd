import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWYhO5k8HYU_TzDPCSqx5BpKLexK8Bhrc",
    authDomain: "odp309.firebaseapp.com",
    projectId: "odp309",
    storageBucket: "odp309.appspot.com",
    messagingSenderId: "303309231649",
    appId: "1:303309231649:web:2b8080fc94e65abf2fb560",
    measurementId: "G-JY7PJ22JT6"
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { app, collection, addDoc, db, getDocs, deleteDoc, doc }