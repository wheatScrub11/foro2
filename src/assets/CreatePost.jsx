import { useRef, useState } from "react";
import "./CreatePost.css";

const CreatePost = ({setShowCreateNewPost, userPfpUrl, userName}) => {
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');
    const titleRef = useRef(null);
    const msgRef = useRef(null);


  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChange2 = (event) => {
    setMsg(event.target.value);
  };

  // Adjust the height of the textarea when the text changes
  const adjustHeight = (ref) => {
    const textarea = ref.current;
    textarea.style.height = 'auto'; // Reset height to auto for recalculation
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  };

  console.log(userPfpUrl)


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
        <div className="btns-container">
            <button className="btn-cancelar" onClick={() => setShowCreateNewPost(false)}>Cancelar</button>
            <button className="btn-publicar" >Publicar</button>
        </div>
      </div> 
    </div>
  );
};

export default CreatePost;
