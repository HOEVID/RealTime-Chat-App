import React, { useContext, useEffect, useState } from 'react'
import "./RightSidebar.css"
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'
const RightSidebar = () => {
const {chatUser,messages} = useContext(AppContext)
const [messageImages,setMessageImages] = useState([])

useEffect(()=>{
 let tempVar =[];
messages.map((msg)=>{
    if(msg.image){
tempVar.push(msg.image)
    }
})
setMessageImages(tempVar)
},[messages])

  return  chatUser?(
    <div className="rs">
        <div className="rs-profile">
            <img src={chatUser.userData.avatar} alt=""/>
            <h3>c{chatUser.userData.name}</h3>
            <p>{chatUser.userData.bio}</p>
        </div>
        <hr/>
        <div className="rs-media">
            <p >Media</p>
            <div>
            {messageImages.map((url,index)=>(
             <img onClick={()=>window.open(url)}key={index} src={url} alt="" />

            ))}
            </div>
            <button onClick={()=>logout()}>logout</button>
        </div>
    </div>
  )
  : (
    <div className='rs'>
        <button onClick={()=>logout()} >Logout</button>
    </div>
  )
}

export default RightSidebar