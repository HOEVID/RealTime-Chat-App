import React, { useContext ,useState} from 'react'
import  "./LeftSidebar.css"
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
const LeftSidebar = () => {
  const navigate = useNavigate()
const {userData,chatData,chatUser,setChatUser,messagesId,setMessagesId} = useContext(AppContext)
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
  }
  catch(err){
    console.log(err)
    toast.error(err.code)
  }
}

const setChat = async (item) =>{
 setChatUser(item)
 setMessagesId(item.messageId)
}

  return (
    <div className='ls'>
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
          <div onClick={()=>setChat(item)} key={index} className="friends">
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