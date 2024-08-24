import {React,useState} from 'react'
import './Login.css'
import assets from '../../assets/assets.js'
const Login = () => {

    const [currState ,setCurrState] = useState("Sign up")
  return (
    <div>
        <div className='login'>
           <img src= {assets.logo_big} alt="" className='logo'/>
           <form  className="login-app">
            <h2>{currState}</h2>
            {( currState === "Sign up")? <input type= "text" placeholder='username'/> :null }
            
            <input type= "email" placeholder='email'/>
            <input type= "password" placeholder='password'/>
            <button className='create-btn'>
                
                {currState=== "Sign up" ? "Create Account" :"Login Here"}</button>
            <div>
            <input className="checkbox" type='checkbox'/>
            <label >Agreee to the terms of use & private policy</label>
            </div>
            
            <div className="login-forgot">
                {
                 (currState === "Sign Up") ?
                 <p className='login-toggle'>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
                 :
                 <p className='login-toggle'>Dont have an account? <span onClick={()=>setCurrState("Sign Up")}>Create Account Here</span></p>
                }
            
            
            </div>

           </form>
        </div>

    </div>
  )
}

export default Login;