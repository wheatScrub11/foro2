import { useEffect, useState } from "react";
import Post from "./assets/Post";
import CreatePost from "./assets/CreatePost";
import ButtonCreatePost from "./assets/ButtonCreatePost";

import "./App.css";

function App() {
  const [dataFromAppInventor, setDataFromAppInventor] = useState("vacio");
  const [showCreateNewPost, setShowCreateNewPost] = useState(false);

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


  useEffect(() =>{
    obtenerDatos()
  }, [])

  return (
    <div id="MAIN-CONTAINER">
      <div className="main">
        {/* <button onClick={obtenerDatos}>ObtenerDatos</button> */}
        {/* <div style={{color: "white"}}>hola {dataFromAppInventor}</div> */}
        {showCreateNewPost ? (
          <CreatePost setShowCreateNewPost={setShowCreateNewPost} userPfpUrl={userPfpUrl} userName={userName}/>
        ) : (
          <ButtonCreatePost setShowCreateNewPost={setShowCreateNewPost}  />
        )}
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default App;
