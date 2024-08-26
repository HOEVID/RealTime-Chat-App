import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc ,doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import { toast } from 'react-toastify'
import upload from '../../lib/upload'
import { AppContext } from '../../context/AppContext'
const ProfileUpdate = () => {
    const [image,setImage]=useState(false)
    const [name,setName] =useState("")
    const [bio,setBio] =useState("")
    const [uid,setUid] = useState("")
    const[prevImage,setPrevImage] =useState("")
    const navigate = useNavigate()
    const{setUserData} = useContext(AppContext)
  
useEffect(()=>{
onAuthStateChanged (auth,async(user)=>{
    if(user){
        setUid(user.uid)
        const docRef = doc(db,"users",user.uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.data().name){
            setName(docSnap.data().name);
        }
        if (docSnap.data().bio){
            setBio(docSnap.data().bio);
        }
        if (docSnap.data().avatar){
            setPrevImage(docSnap.data().avatar);
        }
    }
    else{
        navigate('/');
    }
})
},[])

  const profileUpdate = async(event)=>{
   event.preventDefault();
   try{
    if(!prevImage && !image){
        toast.error("Upload profile picture")
    }
    const docRef = doc(db,"users",uid)
    if(image){
        const imgUrl = await upload(image)
        setPrevImage(image)
        await updateDoc(docRef,{
            avatar:imgUrl,
            bio:bio,
            name:name
        })
    }
    else{
        await updateDoc(docRef,{
            bio:bio,
            name:name
        })
    }
    const snap = await getDoc(docRef)
   setUserData(snap.data());
   navigate('/chat')
   }
   
   catch(err){
    console.error(err)
    toast.error(err.code).split("/")[1].split("-").join("")
  }
  }
 

  return (
    <div className='profile'>
        <div className="profile-container">
       
            <form onSubmit={profileUpdate}>
            <img className="logo-icon"src={ image?URL.createObjectURL(image):assets.logo_icon}  alt=""/>
                <h2>Profile details</h2>
          
           
             <label htmlFor='image'>
             <input onChange={(e)=>setImage(e.target.files[0])}type="file" placeholder='Upload image' accept='/image/png, /image/jpg' id='image' hidden /> 
                <img src={image? URL.createObjectURL(image) :assets.avatar_icon} alt="" />
                Upload Image here
             </label>
            
            
             <input onChange={(e)=>setName(e.target.value)}type='text' placeholder='Your name' id="name" required />
             <textarea onChange={(e)=>setBio(e.target.bio)} value={bio} placeholder='Wrie your bio' id="bio " required>
             </textarea>
            <button >Save</button>
        </form>
        
        </div>
    </div>
  )
}

export default ProfileUpdate