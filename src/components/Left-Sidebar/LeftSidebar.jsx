import React, { useContext ,useEffect,useState} from 'react'
import  "./LeftSidebar.css"
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
const LeftSidebar = () => {
  const navigate = useNavigate()
const {userData,chatData,chatUser,setChatUser,messagesId,setMessagesId,chatVisible,setchatVisible} = useContext(AppContext)
const [user,setUser] = useState(null);
const [showSearch,setShowSearch] = useState(false)


 //displaying user name in left side bar when searching 
const inputHandler =async(e)=>{
try{
const input = e.target.value;
if(input){
  setShowSearch(true);
  const userRef =  collection(db,'users')
const q = query(userRef,where("username","==",input.toLowerCase()))
  const querySnap = await getDocs(q);
  if(!querySnap.empty &&querySnap.docs[0].data().id!=userData.id){  //not display its own name
    let userExist = false
    chatData.map((user)=>{      // if user already have talked then will display in chats
      if(user.rId === querySnap.docs[0].data().id)
        userExist =true;
    })
    if (!userExist)
    setUser(querySnap.docs[0].data())
  }
  else{
    setUser(null);
  }
}
else{
  setShowSearch(false)
}

}
catch(err){
  console.error(err)
}
}

const addChat = async()=>{
  const messagesRef = collection(db,"messages");
  const chatsRef = collection(db,"chats");
  try{
    const newMessageRef = doc(messagesRef);
    await setDoc(newMessageRef,{
      createdAt:serverTimestamp(),
      messages:[]
    })
  // add chat data in both sender and receiver
    await updateDoc(doc(chatsRef,user.id),{
      chatData:arrayUnion({
        messageId:newMessageRef.id,
        lastMessage:"",
        rId:userData.id,
        updatedAt:Date.now(),
        messageSeen:true
      })
    })
    
    await updateDoc(doc(chatsRef,userData.id),{
      chatData:arrayUnion({
        messageId:newMessageRef.id,
        lastMessage:"",
        rId:user.id,
        updatedAt:Date.now(),
        messageSeen:true
      })
    }) 
    const uSnap = await getDoc(doc(db,'users',user.id));
    const uData = uSnap.data();
    setChat ({
      messagesId:newMessageRef.id,
      lastMessage:"",
      rId:user.id,
      updatedAt:Date.now(),
      messageSeen:true,
      userData:uData
    })
    setShowSearch(false)
    setchatVisible(true)
  }
  catch(err){
    console.log(err)
    toast.error(err.code)
  }
}
useEffect(()=>{
const updateChatUserData = async()=>{
   if(chatUser){
    const userRef = doc(db,'users',chatUser.userData.id);
    const userSnap = await getDoc(userRef)
    userData = userSnap.data();
   }
}
updateChatUserData();
},[chatData])

const setChat = async (item) =>{
  try{
    setChatUser(item)
    setMessagesId(item.messageId)
     const userChatsRef = doc(db,'chats',userData.id)
    const userChatsSnapshot = await getDoc(userChatsRef)
    const userChatsData = userChatsSnapshot.data()
   const chatIndex = userChatsData.chatData.findIndex((c)=>c.messageId === item.messageId)
   userChatsData.chatData[chatIndex].messageSeen =true;
   await updateDoc (userChatsRef,{
    chatData:userChatsData.chatData
   })
   setchatVisible(true)
   }
   catch(err){
    console.log(err)
    toast.error(err.message)
   }
  }
 

  return (
    <div className={`ls ${chatVisible ?"hidden":""}`}>
      <div className="ls-top">
        <div className="ls-nav">
          <img  className='logo'src={assets.logo} />
          <div className="menu">
            <img src={assets.menu_icon} />
            <div className='sub-menu'>
              <p onClick={()=>navigate('/profile')}>
                Edit Profile
              </p>
              <hr/>
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon}/>
          <input  onChange={inputHandler}type="text" placeholder='Search here...'/>

        </div>
      </div>
      <div className="ls-list">
        {showSearch && user ?
        <div onClick={addChat} className='friends add-user'> 
        <img src={user.avatar} alt ="" />
           <p>{user.name}</p>
           
           </div>
           
      :
      
      chatData && chatData.length > 0 ? (
        chatData.map((item, index) => (
          <div onClick={()=>setChat(item)} key={index} className={`friends ${ item.messageSeen || item.messageId===messagesId ? "":"border" }`}>
            <img src={item.userData?.avatar} alt="" />
            <div className='text'>
              <p>{item.userData?.name}</p>
              <span>{item.lastMessage}</span>
            </div>
          </div>
        ))
      ) : (
        <div>No chats available</div>
      )
        }
        
      
        
      </div>
    </div>
  )
}

export default LeftSidebar