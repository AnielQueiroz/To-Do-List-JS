// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0uOxz9DdPrDc412NdB8lFQr960TzrRnQ",
  authDomain: "todo-list-52db5.firebaseapp.com",
  projectId: "todo-list-52db5",
  storageBucket: "todo-list-52db5.appspot.com",
  messagingSenderId: "557895988381",
  appId: "1:557895988381:web:16dd46b48bab61ca925074",
  measurementId: "G-H70449FS11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

module.exports = app;