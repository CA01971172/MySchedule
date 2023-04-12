// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcbLVJT86gqqndMvS4rsm-Y4Mtd1waaYw",
  authDomain: "myschedule-c0a49.firebaseapp.com",
  databaseURL: "https://myschedule-c0a49-default-rtdb.firebaseio.com",
  projectId: "myschedule-c0a49",
  storageBucket: "myschedule-c0a49.appspot.com",
  messagingSenderId: "133869260530",
  appId: "1:133869260530:web:5df93f1bf99af2c5cf0a6b",
  measurementId: "G-KEHHLYCZT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);