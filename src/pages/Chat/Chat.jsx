import React from 'react'
import './Chat.css'
import LeftSidebar from '../../components/Left-Sidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
const Chat = () => {
  return (
    <div className='chat'>
        <div className="chat-container">
            <LeftSidebar/>
            <ChatBox/>
            <RightSidebar/>
        </div>

    </div>
  )
}

export default Chat