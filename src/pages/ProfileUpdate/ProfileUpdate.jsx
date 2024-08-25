import React from 'react'
import { useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
const ProfileUpdate = () => {
    const [image,setImage]=useState(false)
  return (
    <div className='profile'>
        <div className="profile-container">
       
            <form>
            <img className="logo-icon"src={ image?URL.createObjectURL(image):assets.logo_icon}  alt=""/>
                <h2>Profile details</h2>
          
           
             <label htmlFor='image'>
             <input onChange={(e)=>setImage(e.target.files[0])}type="file" placeholder='Upload image' accept='/image/png, /image/jpg' id='image' hidden /> 
                <img src={image? URL.createObjectURL(image) :assets.avatar_icon} alt="" />
                Upload Image here
             </label>
            
            
             <input type='text' placeholder='Your name' id="name" required />
             <textarea placeholder='Wrie your bio' id="bio " required>
             </textarea>
            <button >Save</button>
        </form>
        
        </div>
    </div>
  )
}

export default ProfileUpdate