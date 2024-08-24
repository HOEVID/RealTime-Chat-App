import React from 'react'
import Chat from './pages/chat/Chat'
import Login from './pages/login/Login'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>
      </Routes> 
    </>
  )
}

export default App