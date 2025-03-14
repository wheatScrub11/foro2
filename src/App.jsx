import { useEffect, useState } from "react";
import Post from "./assets/Post";
import CreatePost from "./assets/CreatePost";
import { getPosts } from "../firebase";
import ButtonCreatePost from "./assets/ButtonCreatePost";
import interknotLogo from './icons/interknot.png';
import friendsIcon from "./icons/friends-icon.png"
import Friends from "./assets/Friends";
import axios from 'axios';
import { checkIfUserChatExists } from "../firebase";
import { getChats } from "../firebase";


import "./App.css";

function App() {
  const [posts, setPosts] = useState(null)
  const [dataFromAppInventor, setDataFromAppInventor] = useState("vacio");
  const [showCreateNewPost, setShowCreateNewPost] = useState(false);
  const [showFriends, setShowFriends] = useState(false)
  const [data, setData] = useState([]);
  const [chats, setChats] = useState(null)


  const [userName, setUserName] = useState(null)
  const [userPfpUrl, setUserPfpUrl] = useState(null)


  const obtenerDatos = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const data = queryParams.get("data");
    console.log(data);

    if (data){
      const parts = data.split("^")
      setUserName(parts[0])
      setUserPfpUrl(parts[1].split("/revision")[0])
  
      console.log(parts[0], parts[1])
  
      setDataFromAppInventor(data);
    }

  };


  const getPostsFromFB =  () => {
    getPosts((posts) => {
      console.log("Posts:", posts);
      setPosts(posts.reverse())
      
      

    });
    
    
  };

  const getChatsFromFB = () => {
    getChats((chats) =>{

      chats.forEach((chat) =>{
        if (chat.id === userName){
          console.log(chat)
          setChats(chat)
        }
      })
      
    })
  
  };


  
  useEffect(() => {
    getChatsFromFB()
  }, [userName]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = '1Bcze_9b0F7USc2zRz9QKg32YiTvGS91POdL7J9mVdKc'; // Replace with your Sheet ID
      const apiKey = 'AIzaSyBpIz7F_OZCzjLn8FZkSzw2KQE-7oyeO1s'; // Replace with your API key
      const range = 'UsuariosHoja'; // Adjust the range to match your data

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setData(response.data.values);
        console.log(response.data.values)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() =>{
    obtenerDatos()
  }, [])
  // useEffect(() =>{
  //   getChatsFromFB()
    
  // }, [])

  // useEffect(() =>{
  //   getChatsFromFB()
    
  // }, [userName])

  useEffect(() =>{
    getPostsFromFB()
    
  }, [])

  return (
    <div id="MAIN-CONTAINER">
      <div className="main">

        {showCreateNewPost ? (
          <CreatePost setShowCreateNewPost={setShowCreateNewPost} userPfpUrl={userPfpUrl} userName={userName}/>
        ) : (
          <ButtonCreatePost setShowCreateNewPost={setShowCreateNewPost}  />
        )}

        {showFriends ? (
          <Friends data={data} userName={userName} userPfpUrl={userPfpUrl} chats={chats} setShowFriends={setShowFriends} />
        ) : (
          <img src={friendsIcon} className="openfriends-icon" onClick={() => setShowFriends(true)} />
        )}



        <div className="interknot-container">
          <img src={interknotLogo} className="internot-logo" alt="" />
        </div>

        {posts?.map((post) => (
          <>
            <Post post={post} userName={userName} userPfpUrl={userPfpUrl} key={post.id} />
          </>
        )  )}

      </div>
    </div>
  );
}

export default App;
