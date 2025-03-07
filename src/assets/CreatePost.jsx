import { useEffect, useRef, useState } from "react";
import "./CreatePost.css";
import { addPost } from "../../firebase";

const CreatePost = ({setShowCreateNewPost, userPfpUrl, userName}) => {
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');
    const titleRef = useRef(null);
    const msgRef = useRef(null);
    const [showError, setShowError] = useState(false)

  useEffect(() =>{

  }, [])


  const handleChange = (event) => {
    setTitle(event.target.value);
    event.target.value.trim().length > 0 ? setShowError(false) : setShowError(true)
  };
  const handleChange2 = (event) => {
    setMsg(event.target.value);
    event.target.value.trim().length > 0 ? setShowError(false) : setShowError(true)
  };

  // Adjust the height of the textarea when the text changes
  const adjustHeight = (ref) => {
    const textarea = ref.current;

    textarea.style.height = 'auto'; // Reset height to auto for recalculation
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  };

  console.log(userPfpUrl)


  const pushPost = () =>{
    if ((title != null && title.trim().length > 0) && (msg != null && msg.trim().length > 0)){
      addPost(userPfpUrl, userName, title, msg)
      setShowCreateNewPost(false)
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Adds smooth scrolling
      });
    }else{
      console.log("error de inputs")
      setShowError(true)
    }


  }


  return (
    <div className="create-post">
      <div className="pfp-container">
        <img
          src={userPfpUrl}
          alt=""
        />
      </div>
      <div className="content-container">
        <div className="hint1">Nueva publicación</div>
        <textarea
          className="post-title"
          ref={titleRef}
          value={title}
          onChange={handleChange}
          onInput={() => adjustHeight(titleRef)} // Adjust height on input
          placeholder="Título..."
          autoFocus
        />
        {/* <hr /> */}
        <textarea
          className="post-desc"
          ref={msgRef}
          value={msg}
          onChange={handleChange2}
          onInput={() => adjustHeight(msgRef)} // Adjust height on input
          placeholder="Mensaje..."
        />
        {showError ? <div className="err1">Los campos no puden estar vacíos</div> : <></>}
        
        <div className="btns-container">
            <button className="btn-cancelar" onClick={() => setShowCreateNewPost(false)}>Cancelar</button>
            <button className="btn-publicar" onClick={pushPost} >Publicar</button>
        </div>
      </div> 
    </div>
  );
};

export default CreatePost;
