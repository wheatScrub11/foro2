import { useEffect } from "react";
import "./FriendListPreview.css";

const FriendListPreview = ({ friendData, setSwitchSides, setLogData }) => {
    console.log(friendData)
    console.log(friendData.messages.length)
  const handleClick = () =>{
    setSwitchSides(true)
    setLogData({
        friendName: friendData.friendName,
        friendPfp: friendData.friendPfp.split("/revision")[0],
        messages: friendData.messages
      });
  }

  useEffect(() =>{
    setLogData({
        friendName: friendData.friendName,
        friendPfp: friendData.friendPfp.split("/revision")[0],
        messages: friendData.messages
      });
  }, [friendData])

  return (
    <div className="friendlistpreview" onClick={handleClick}>
      <div className="pfp-container">
        <img src={friendData.friendPfp.split("/revision")[0]} alt="" />
      </div>
      <div className="info">
        <div className="user-name">@{friendData?.friendName}</div>
        <div className="last-message">
          
          {friendData.messages.length > 0 && friendData?.messages[friendData?.messages?.length - 1].text}
        </div>
      </div>
      <div className="last-msg-date"> {friendData.messages.length > 0 && friendData?.messages[friendData?.messages.length - 1].date}</div>
    </div>
  );
};

export default FriendListPreview;
