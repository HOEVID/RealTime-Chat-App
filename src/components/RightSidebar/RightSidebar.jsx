import React from 'react'
import "./RightSidebar.css"
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
const RightSidebar = () => {
  return (
    <div className="rs">
        <div className="rs-profile">
            <img src={assets.profile_img} alt=""/>
            <h3>Richard</h3>
            <p>Hey There I Am Richarf</p>
        </div>
        <hr/>
        <div className="rs-media">
            <p >Media</p>
            <div>
            <img src={assets.pic1} alt=""/>
            <img src={assets.pic2} alt=""/>
            <img src={assets.pic3} alt=""/>
            <img src={assets.pic4} alt=""/>
            <img src={assets.pic1} alt=""/>
            </div>
            <button onClick={()=>logout()}>logout</button>
        </div>
    </div>
  )
}

export default RightSidebar