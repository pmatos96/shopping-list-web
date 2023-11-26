// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpezrbObBpu79fQn1RmJ_0zdYBHYX5pOU",
  authDomain: "shopping-list-c137f.firebaseapp.com",
  projectId: "shopping-list-c137f",
  storageBucket: "shopping-list-c137f.appspot.com",
  messagingSenderId: "557161475729",
  appId: "1:557161475729:web:b9984c244a607697fe9930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);