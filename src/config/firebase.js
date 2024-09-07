// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";


const firebaseConfig = {
  apiKey: "AIzaSyABkP99PPyjyISzpdn6gb0CTwF2YWaAHtg",
  authDomain: "real-time-chat-app-56995.firebaseapp.com",
  projectId: "real-time-chat-app-56995",
  storageBucket: "real-time-chat-app-56995.appspot.com",
  messagingSenderId: "367812567780",
  appId: "1:367812567780:web:a75e1da5ed7b947e3282f1",
  measurementId: "G-3N1Y20SZSW"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app)
const db=getFirestore(app)


const signup = async(username,email,password)=>{
try
   {const res =await createUserWithEmailAndPassword(auth,email,password)
    const user= res.user;
    await setDoc(doc(db,"users",user.uid),{
        id:user.uid,
        username:username.toLowerCase(),
        email,
        name:"",
        avatar:"",
        bio:"Hey,I am using Chat App",
        lastSeen:Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
        chatData:[]
    })
   }
   catch(err){
    console.error(err)
    toast.error(err.code.split('/')[1].split("-").join(""));
   }
}
const login = async (email,password)=>{
try{
    await signInWithEmailAndPassword(auth,email,password)
}
catch(err){
    console.error(err)
    toast.error(err.code.split('/')[1].split("-").join(""));
}
}
 
const logout = async()=>{
    try{
        await signOut(auth)
    }
    catch(error){
        console.error(err)
        toast.error(err.code.split('/')[1].split("-").join(""));
    }

}
const resetPass = async(email) =>{
    if(!email){
        toast.error("Enter your email")
        return null;
    }
    try{
        const userRef = collection(db,"users")
        const q = query(userRef,where("email","==",email));
        const querySnap = await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset email sent");
        }
        else{
            toast.error("Email doesnt exist");
        }
    }
    catch(err){
        console.error(err)
        toast.error(err.message)
    }
}

export{signup,login,logout,db,auth,resetPass}