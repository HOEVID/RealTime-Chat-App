import React from 'react'
import "./ChatBox.css"
import assets from '../../assets/assets'
const ChatBox = () => {
  return (
    <div className='chat-box'  >
        <div className="chat-user">
            <img src={assets.profile_img} alt="" />
            <p>Richard <img className='dot' src={assets.green_dot}/></p>
            <img src={assets.help_icon}/>
        </div>
    <div className='chat-msg'>
          <div className="s-msg">
            <p className='msg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quasi quae praesentium quas doloribus optio harum deserunt assumenda iusto delectus totam, laudantium accusantium nulla in! Debitis sint voluptates labore laborum.</p>
          <div>
            <img src={assets.profile_img} />
            <p>2.30pm</p>
          </div>
          </div>
          <div className="s-msg">
            <img className="msg-img" src={assets.pic1}/>
          <div>
            <img   src={assets.profile_img} />
            <p>2.30pm</p>
          </div>
          </div>
          <div className="r-msg">
            <p className='msg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quasi quae praesentium quas doloribus optio harum deserunt assumenda iusto delectus totam, laudantium accusantium nulla in! Debitis sint voluptates labore laborum.</p>
          <div>
            <img src={assets.profile_img} />
            <p>2.30pm</p>
          </div>
          </div>
        </div>    
        <div className="chat-input">
            <input type="text" placeholder="send a message"/>
            <input type="file" placeholder="send a file" id="image" accept='image/png , img/jpg 'hidden/>
            <label htmlFor='image'>
                <img src={assets.gallery_icon} alt="" />

            </label>
            <img src={assets.send_button} alt="" />
        </div>
    </div>
  )
}

export default ChatBox