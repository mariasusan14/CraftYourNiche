import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword} from "firebase/auth"
import { collection,addDoc } from "@firebase/firestore";
//import { Dashboard } from "./dashboard";
import { auth,db } from "../src/config/firebase"
import '../src/Auth.css'
export const Auth=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate();
    const userref=collection(db,"user");
    const signin=async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password)
        }
        catch(e){
            console.error(e)
        }        
    }

    const submitUser = async () => {
    
        try {
            // Create a user document in Firestore
            const userDocRef = await addDoc(userref, { email: email, password: password });
            
            // Sign up the user using Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, password);

            // Additional actions after successful sign-up or user creation
            console.log("User document created in Firestore:", userDocRef.id);
            console.log("User signed up successfully!");
        } catch (e) {
            console.error(e);
        }
    }

    const logout=async()=>{
        try{
            await signOut(auth)
        }
        catch(e){
            console.error(e)
        }        
    }
   
    const login = async () => {
        try {
            // Sign in the user using Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);

            // Additional actions after successful login
            console.log("User logged in successfully!");
            console.log(auth.currentUser.uid);
           
            navigate(`/dashboard/${auth.currentUser.uid}`)
        
        } catch (e) {
            console.error(e);
        }
       
    }
    return(
        <div>
            <input 
                placeholder="email..."
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                placeholder="password..."
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                />
            <button onClick={submitUser}>Sign up</button>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Sign out</button>
        </div>
    )
}
