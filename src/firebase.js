// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfBXMfZ0vXNoEfnjNu0fOKrfDbYPJvAms",
  authDomain: "react-http-practice-6fe63.firebaseapp.com",
  databaseURL: "https://react-http-practice-6fe63-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-http-practice-6fe63",
  storageBucket: "react-http-practice-6fe63.appspot.com",
  messagingSenderId: "125672443678",
  appId: "1:125672443678:web:936f54943d5493db63430f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export default app;