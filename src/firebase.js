// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpwrVEvl6dLFlSSOQ-2YEIrqYNs8BKy7I",
  authDomain: "ms-todo-4c9f8.firebaseapp.com",
  projectId: "ms-todo-4c9f8",
  storageBucket: "ms-todo-4c9f8.appspot.com",
  messagingSenderId: "324974162524",
  appId: "1:324974162524:web:0439b50dd24da7f93aac99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app)


export default app;

