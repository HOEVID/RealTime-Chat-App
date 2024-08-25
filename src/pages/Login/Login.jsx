import {React,useState} from 'react'
import './Login.css'
import assets from '../../assets/assets.js'
import { signup , login } from '../../config/firebase.js'
const Login = () => {

    const [currState ,setCurrState] = useState("Sign up")
    const [username,setUsername]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

     const onSubmitHandler=(event) =>{
     event.preventDefault();
      if(currState==="Sign up"){
        signup(username,email,password)
      }
      else{
        login(email,password)
      }
     }

     
 
  return (
    <div>
        <div className='login'>
           <img src= {assets.logo_big} alt="" className='logo'/>
           <form onSubmit={onSubmitHandler} className="login-app">
            <h2>{currState}</h2>
            {( currState === "Sign up")? <input type= "text" placeholder='username' onChange={(e)=>setUsername(e.target.value)}/> :null }
            
            <input type= "email" placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type= "password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            <button className='create-btn'>
                
                {currState=== "Sign up" ? "Create Account" :"Login Here"}</button>
            <div>
            <input className="checkbox" type='checkbox'/>
            <label >Agreee to the terms of use & private policy</label>
            </div>
            
            <div className="login-forgot">
                {
                 (currState === "Sign up") ?
                 <p className='login-toggle'>Already have an account? <span onClick={()=>setCurrState("Login")}  >Login Here</span></p>
                 :
                 <p className='login-toggle'>Dont have an account? <span onClick={()=>setCurrState("Sign up")}>Create Account Here</span></p>
                }
            
            
            </div>

           </form>
        </div>

    </div>
  )
}

export default Login;