// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, Firestore, getFirestore, onSnapshot, query, setDoc } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
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

export function getFormattedDate() {
  const date = new Date();

  // Get day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  // Get hours and minutes
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Determine if it's AM or PM
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hour12 = hours % 12 || 12; // Convert 24-hour to 12-hour format

  // Format the time as hh:mmpm
  const time = `${hour12}:${minutes}${ampm}`;

  // Combine into the desired format
  return `${day}/${month}/${year} ${time}`;
}


export const addPost = async ( userPfpUrl, userName, postTitle, postMsg) =>{
try {
    const customIdAsDate = Date.now().toString(); 

    const docRef = doc(db, "posts", customIdAsDate);

    await setDoc(docRef, {
      userPfpUrl: userPfpUrl,
      userName: userName,
      postTitle: postTitle,
      postMsg: postMsg,
      postDate: getFormattedDate() ,
      postComments: [],
      postLikes: []
    });

    console.log("Document added with ID:", customIdAsDate);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}


export const getPosts = (callback) => {
  const q = query(collection(db, "posts"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    callback(posts); // Pass the data to the callback
  });

  return unsubscribe; // Return the unsubscribe function if needed
};


export const uploadComment = async (id, data) =>{
  await setDoc(doc(db, "posts", id), data)
}