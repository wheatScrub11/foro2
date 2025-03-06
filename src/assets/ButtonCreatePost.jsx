import "./ButtonCreatePost.css"
import plusIcon from '../icons/plus-icon.png';

const ButtonCreatePost = ({setShowCreateNewPost}) =>{
    return(
        <div className="createPost">
            <img onClick={() => setShowCreateNewPost(true)} src={plusIcon} alt="" />
        </div>
    )
}


export default ButtonCreatePost