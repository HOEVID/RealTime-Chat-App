import React, { useContext ,useEffect,useState} from 'react'
import "./ChatBox.css"
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'
const ChatBox = () => {
  const{userData,messagesId,chatUser,messages,setMessages} =useContext(AppContext)
 const [input,setInput] = useState("");
 const sendMessage = async()=>{
  
  try{
    if(input && messagesId){
      await updateDoc(doc(db,"messages",messagesId),{
        messages:arrayUnion({
          sId:userData.id,
          text:input,
          createdAt:new Date()
        })
      })
      const userIDs = [chatUser.rId,userData.id];

      userIDs.forEach (async(id)=>{
        const userChatsRef = doc(db,'chats',id);
        const userChatsSnapshot = await getDoc(userChatsRef)
        if (userChatsSnapshot.exists()){
           const userChatData = userChatsSnapshot.data();
           const chatIndex = userChatData.chatData.findIndex((c)=>c.messageId === messagesId)
           userChatData.chatData[chatIndex].lastMessage = input.slice(0-30);
           userChatData.chatData[chatIndex].updatedAt = Date.now()
           if(userChatData.chatData[chatIndex].rId === userData,id)
           {
            userChatData.chatData[chatIndex].messageSeen =false;
           }
           await updateDoc(userChatsRef,{
            chatData:userChatData.chatData
           })
          }
      })
    }
    setInput("")
  }
  catch(err){
    console.error(err)
    toast.error(err.message)
  }
  
 }

 const convertTimestamp =(timestamp)=>{
   let date = timestamp.toDate();
   const hour =date.getHours();
   const minutes = date.getMinutes();
   if(hour>12){
    return hour-12 +":"+ minutes+"PM"
   }
   else{
    return hour +":"+ minutes+"AM"
   }
 }

useEffect(()=>{
  if(messagesId){
    const unSub = onSnapshot(doc(db,"messages",messagesId),(res)=>{
      setMessages(res.data().messages.reverse())
    
    })
    return ()=>{
      unSub();
    }
  }
},[messagesId])

  return chatUser ? (
    <div className='chat-box'  >
        <div className="chat-user">
            <img src={chatUser.userData.avatar} alt="" />
            <p>{chatUser.userData.name} <img className='dot' src={assets.green_dot}/></p>
            <img src={assets.help_icon}/>
        </div>
    <div className='chat-msg'>
      {messages.map((msg,index)=>(
       <div className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
       <p className='msg'>{msg.text}</p>
     <div>
       <img src={msg.sId === userData.id ? userData.avatar :chatUser.userData.avatar} />
       <p>{convertTimestamp(msg.createdAt)}</p>
     </div>
     </div>
      ))}
         
         
        </div>    
        <div className="chat-input">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="send a message"/>
            <input type="file" placeholder="send a file" id="image" accept='image/png , img/jpg 'hidden/>
            <label htmlFor='image'>
                <img src={assets.gallery_icon} alt="" />

            </label>
            <img onClick={sendMessage}src={assets.send_button} alt="" />
        </div>
    </div>
  )
  :
    <div className='chat-welcome'>
   <img src={assets.logo_icon} alt="" />
   <p>Chat anytime , anywhere</p>
    </div>
  
}

export default ChatBox