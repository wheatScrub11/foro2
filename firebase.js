// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA_wxPnS30lA3AUwm3uU91fSe4toI19Kw",
  authDomain: "forum-mitapp.firebaseapp.com",
  databaseURL: "https://forum-mitapp-default-rtdb.firebaseio.com",
  projectId: "forum-mitapp",
  storageBucket: "forum-mitapp.firebasestorage.app",
  messagingSenderId: "781341417234",
  appId: "1:781341417234:web:36be5c5278f29318b89dcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const addPost =(userName, userPfpUrl) =>{

}