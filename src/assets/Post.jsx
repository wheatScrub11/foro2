
import "./Post.css"


const Post = () => {
  return (
    <div className="post">
      <div className="top">
        <img src="https://static.wikia.nocookie.net/zenless-zone-zero/images/3/37/Avatar_Ben_Bigger.png" alt="" />
        <p className="userName">wheatScrub11</p>
        <div className="postDate">12-23-12</div>
      </div>
      <div className="mid">
        <div className="postTitle">Ejemplo de titulo Ejemplo de titulo Ejemplo de titulo Ejemplo de titulo</div>
        <p className="main-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
          dolorum quas quaerat nobis eveniet aut, maiores itaque hic odio animi,
          nisi adipisci sint placeat sit quibusdam, numquam recusandae? Et,
          ipsum!
        </p>
      </div>
      <div className="bottom">
        <img className="commentsIcon" src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="" />
        <button className="comments">Comentarios</button>
      </div>
    </div>
  );
};

export default Post;
