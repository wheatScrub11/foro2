import "./Friends.css";
import FriendListPreview from "./FriendListPreview";
import { useEffect, useRef, useState } from "react";
import threelinesIcon from "../icons/threelines-icon.png"
import exitIcon from "../icons/exit-icon.png"
import { checkIfUserChatExists } from "../../firebase";
import { addFriendToChat } from "../../firebase";
import { getChats } from "../../firebase";
import { addMessage } from "../../firebase";
import { getFormattedDate } from "../../firebase";
import { getSpecificDoc } from "../../firebase";


const Friends = ({data, userName, userPfpUrl, chats, setShowFriends}) => {
    console.log(chats)

    const [switchSides, setSwitchSides] = useState(false)
    const [toSearchUser, setToSearchUser] = useState("")
    const [logData, setLogData] = useState(null)
    const [currentMsg, setCurrentMsg] = useState("")

    const containerRef = useRef(null)

    const Message = ({msgData}) =>{
        console.log(msgData)
        console.log(msgData.sender)
        return(
            <div className={`message ${msgData?.sender === userName ? "t-r" : "t-l"}`}>
                
                <div className={`m-text ${msgData?.sender === userName ? "" : "t-w"}`}>{msgData.text}</div>
                <div className="user-i">
                    <img src={msgData.pfp} alt="" />
                    <div className="m-date">
                        {msgData.date}
                    </div>
                </div>
            </div>
        )
    }


    const handleFriendSearch =  async () =>{
        let x = 0
        let y = 0
        let friendName = null
        let friendPfp = null
        


        data.forEach((arr) =>{
            if (arr.some((e) => e === toSearchUser)){
                console.log(arr[0])
                friendName = arr[0]
                friendPfp= arr[2]
            }
        })

        if (friendName !== null && friendPfp !== null){

            const newFriend = {friendName: friendName, friendPfp: friendPfp, messages: []}
            const me = {friendName: userName, friendPfp: userPfpUrl, messages: []}
            let d ={
                friends: [newFriend]
            }
            let d2 ={
                friends: [me]
            }


            await checkIfUserChatExists((callback) =>{
                callback.forEach(async (doc) =>{

                    if (doc.id === userName){
                        d = {
                            friends: [newFriend, ...doc.data().friends]
                        };
                    }
                    if (doc.id === friendName){
                        d2 = {
                            friends: [me, ...doc.data().friends]
                              
                        };
                    }




                })
            })

            await addFriendToChat(userName, d)
            await addFriendToChat(friendName, d2)
            console.log("x")
            setToSearchUser("")


        }

    }
    const handleSendMsg = async () =>{
        if (currentMsg.trim() != ""){
            
            const data ={
                sender: userName,
                pfp: userPfpUrl,
                date: getFormattedDate(),
                text: currentMsg
                
            }

            const modified = {

                ...chats,
                friends: chats.friends.map((friend) =>{
                    if (friend.friendName === logData.friendName){
                        return {...friend, messages: [...friend.messages, data]}
                    }
                    return chats
                })

            }

            const res = await getSpecificDoc("chats", logData.friendName)
            

            const modified2 = {

                id: logData.friendName,
                friends: res.friends.map((friend) =>{
                    if (friend.friendName === userName){
                        return {...friend, messages: [...friend.messages, data]}
                    }
                    return chats
                })

            }
           

            console.warn("MODIFICAO BRO")
            console.log(modified)

            await addMessage(userName, modified)
            await addMessage(logData.friendName, modified2)
            setCurrentMsg("")

        }
    }


    const scrollToBottom = () => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight, // Scroll hasta el fondo
            behavior: "smooth", // Scroll suave
          });
        }
      };


    useEffect(() =>{
        scrollToBottom()
    }, [logData])
    


  return (
    <div className="Friends">
      <div className="title">
        <div className="t">Amigos</div>
        <img src={exitIcon} onClick={() => setShowFriends(false)} />
      </div>
      <div className="sides">
        <div className="left">

            {!switchSides && (
            <div className="search-container">
                <input type="text" onChange={(e) => setToSearchUser(e.target.value)} value={toSearchUser} />
                <button onClick={handleFriendSearch}> Buscar </button>
            </div>
            )}

          
          <div className="friendlist-container" >
            {switchSides && (
                <div className="three-lines-c">
                    <img src={threelinesIcon} className="three-lines-icon" onClick={() => setSwitchSides(false)} alt="" />
                </div>
            )}




            {chats?.friends?.map((friend) =>(          
                 <FriendListPreview friendData={friend} setSwitchSides={setSwitchSides} setLogData={setLogData}/>
            ))} 
  
          </div>

            

        </div>

        {switchSides && (
            <div className="right">
                <div className="friend">
                    <img className="f-pfp" src={logData?.friendPfp} alt="" />
                    <div className="f-name">
                        @{logData?.friendName}
                    </div>
                </div>
                <div className="chat-container" ref={containerRef}>


                    {logData?.messages.map((log) =>(
                        <Message msgData={log} />
                    ))}
                    
                </div>
                <div className="bottom-container">
                    <textarea className="jjj" onChange={(e) => setCurrentMsg(e.target.value)} placeholder="Mensaje..." value={currentMsg} id=""></textarea>
                    <button onClick={handleSendMsg}>Enviar</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
