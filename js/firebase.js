// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhh3vbuHxy2enjjaDrb2jcb-xIMCeaD24",
  authDomain: "board-firebase-7b0fe.firebaseapp.com",
  databaseURL:
    "https://board-firebase-7b0fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "board-firebase-7b0fe",
  storageBucket: "board-firebase-7b0fe.appspot.com",
  messagingSenderId: "577767159937",
  appId: "1:577767159937:web:e95f0dc24f3c6849ba7580",
  measurementId: "G-PJLVBNKEW4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
