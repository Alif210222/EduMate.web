// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDYO-Bn8KBq4-L-_ndudUUMgZO6YNl0Rk",
  authDomain: "job-seeker-auth-732fa.firebaseapp.com",
  projectId: "job-seeker-auth-732fa",
  storageBucket: "job-seeker-auth-732fa.firebasestorage.app",
  messagingSenderId: "964335250878",
  appId: "1:964335250878:web:0d3e0b5a60c95c7c7b1def"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);