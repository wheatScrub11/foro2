// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, Firestore, getDoc, getFirestore, onSnapshot, query, setDoc } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { cloneElement } from "react";
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


export const checkIfUserChatExists = async (callback) =>{
  try{
    const collectionRef = collection(db, "chats")

    const qS = await getDocs(collectionRef)

    console.log(qS)
    callback(qS)
  } catch(err){
    console.log(err)
  }
}

export const addFriendToChat = async (customId, data) =>{
  try {

    const docRef = doc(db, "chats", customId);

    await setDoc(docRef, data);

    console.log("Document added with ID:");
  } catch (e) {
    console.error("Error adding document:", e);
  }
}





export const getChats = (callback) => {
  const q = query(collection(db, "chats"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    callback(chats); // Pass the data to the callback
  });

  return unsubscribe; // Return the unsubscribe function if needed
};


export const addMessage = async ( docID, data) =>{
  try {
      const docRef = doc(db, "chats", docID);
  
      await setDoc(docRef, data);
  
      console.log("Document added with ID:", docID);
    } catch (e) {
      console.error("Error adding document:", e);
    }
  }

  export const getSpecificDoc = async (collectionName, docId) => {
    try {
      // Create a reference to the document
      const docRef = doc(db, collectionName, docId);
  
      // Fetch the document
      const docSnap = await getDoc(docRef);
  
      // Check if the document exists
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data(); // Return the document data
      } else {
        console.log("No such document!");
        return null; // Return null if the document doesn't exist
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error; // Handle errors
    }
  };

