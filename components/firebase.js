// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHrgrsL-iN9kW7JaGbeTW0IX1uL_1OBDQ",
  authDomain: "testqr-76e75.firebaseapp.com",
  projectId: "testqr-76e75",
  storageBucket: "testqr-76e75.appspot.com",
  messagingSenderId: "1066125865120",
  appId: "1:1066125865120:web:c4135b2b23c8c56dcd59c5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);