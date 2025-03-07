
import "./Post.css"
import commentsIcon from '../icons/comments-icon.png';
import unlikedIcon from '../icons/unliked-icon.png';
import likedIcon from '../icons/liked-icon.png';
import { useEffect, useRef, useState } from "react";
import { uploadComment } from "../../firebase";
import { getFormattedDate } from "../../firebase";



const Post = ({post, userName, userPfpUrl}) => {
  const [showCommentSection, setShowCommentSection] = useState(false)
  const commentMsgRef = useRef(null)
  const [commentMsg, setCommentMsg] = useState("")
  const [showError, setShowError] = useState(false)
  const [wLikeIcon, setWLikeIcon] = useState(null)

  const handleChange1 = (event) => {
    setCommentMsg(event.target.value);
    event.target.value.trim().length > 0 ? setShowError(false) : setShowError(true)
  };

  const adjustHeight = (ref) => {
    const textarea = ref.current;
    textarea.style.height = 'auto'; // Reset height to auto for recalculation
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  };


  const validateMsg = async () =>{
    if (commentMsg.trim().length > 0){
      const commentData = {
        commenterPfp: userPfpUrl,
        commenterName: userName,
        commentMessage: commentMsg,
        commentDate: getFormattedDate()
      }
      const data = {...post, postComments: [commentData,...post.postComments]}
      await uploadComment(post.id, data)

      setCommentMsg("")

      
    }else{
      setShowError(true)
    }
  }

  const checkIfUserHasLiked = () =>{
    if(post.postLikes.some(e => e === userName)){
      console.log("si hay jeje")
      setWLikeIcon(likedIcon)
    }else{
      console.log("no tiene like jeje")
      setWLikeIcon(unlikedIcon)
    }
  }

  const doLike = async () =>{
    if (wLikeIcon == likedIcon){
      console.log("A")
      const filteredArr = post.postLikes.filter(e => e !== userName)
      const data = {...post, postLikes: filteredArr}
      await uploadComment(post.id, data)
      setWLikeIcon(unlikedIcon)

    }else if (wLikeIcon == unlikedIcon){
      console.log("B")
      const data = {...post, postLikes: [...post.postLikes, userName]}
      await uploadComment(post.id, data)
      setWLikeIcon(likedIcon)
    }
  }


  useEffect(() =>{
      console.log(post.postComments)
      checkIfUserHasLiked()
  }, [])


  const Comment = ({commentData}) =>{
    return(
      <div className="comment">
        <div className="comment-left">
          <img src={commentData.commenterPfp} alt="" className="comment-pfp" />
          <div className="comment-date">
          {commentData.commentDate}
          </div>
        </div>
        <div className="comment-right">
          <div className="comment-user">
              @{commentData.commenterName}
          </div>
          <div className="comment-text">
          {commentData.commentMessage}
          </div>
        </div>

      </div>
    )
  }

  
  return (
    <div className="post">
      <div className="top">
        <img src={post.userPfpUrl} alt="" />
        <p className="userName">@{post.userName}</p>
        <div className="postDate">{post.postDate}</div>
      </div>
      <div className="mid">
        <div className="postTitle">{post.postTitle}</div>
        <p className="main-text">
          {post.postMsg}
        </p>
      </div>
      <div className="bottom">
        <img className="commentsIcon" onClick={() => setShowCommentSection(!showCommentSection)} src={commentsIcon} alt="" />
        <div className="comments-count">{post.postComments.length}</div>
        <img className="likesIcon" src={wLikeIcon} onClick={doLike} alt="" />
        <div className="likes-count">{post.postLikes.length}</div>
      </div>

      {showCommentSection && (
        <div className="comment-section-container">
          <div className="separator" style={{height: "1px", width:"100%", backgroundColor: "#ffff006e", marginBottom: "10px"}}></div>
          <div className="comment-section">


            {post?.postComments.map((comment) => <Comment commentData={comment} />)}
            
            
          </div>
          <div className="input-comment">
            <img src={userPfpUrl} alt="" className="logged-user-pfp" />
            <div className="msgarea">
              <textarea
                className="comment-text"
                ref={commentMsgRef}
                value={commentMsg}
                onChange={handleChange1}
                onInput={() => adjustHeight(commentMsgRef)} // Adjust height on input
                placeholder="Mensaje..."
              />
              {showError && <div className="err1">El campo no puede estar vacío</div>}
            </div>
            <button className="btn-postComment" onClick={validateMsg} >Comentar</button>
          </div>
        </div>
      
      )}
      <hr />
    </div>
  );
};

export default Post;
