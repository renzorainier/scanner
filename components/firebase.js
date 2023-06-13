// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFUy6OAoziQQQYnBr3TJVnbrlEDLBqsbQ",
  authDomain: "qrcode-e0852.firebaseapp.com",
  projectId: "qrcode-e0852",
  storageBucket: "qrcode-e0852.appspot.com",
  messagingSenderId: "964760739363",
  appId: "1:964760739363:web:bee7a73ad557fd7458db96",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);