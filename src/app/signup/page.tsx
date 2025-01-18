"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";



export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setButtonDisabled] = React.
    useState(false)
    const [loading,setLoading] = React.useState(false);
 
    const onSignup = async () => {
        try{
            setLoading(true)
            const response= await axios.post("api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");
        }catch(error:any){
            console.log("signup failed",error.message);

            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    } 

    useEffect(() => {
        if(user.email.length > 0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    },[user]);

    return(
       
        <div className="flex flex-col items-center justify-center min-h-screen py-2"
        style={{
            backgroundColor: "#f9f9f9", // Light background color
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            padding: "16px", // Additional padding if needed
            transition: "all 0.3s ease", // Smooth transition for hover effects
        }}>
            <h1><b>{loading ? "Processing" : "Signup"}</b></h1>
            <hr/>
        <label htmlFor="username"><strong>username</strong></label>
        <input className="p-2 border: border-gray-300 round-lg mb-4 
            focus:outline-none focus:border-gray-600 text-black"
            id = "username" type="text" value={user.username} 
            onChange={(e) => setUser({...user,username: e.target.value})}
            placeholder="username"/>

        <label htmlFor="email"><strong>Email</strong></label>
        <input className="p-2 border: border-gray-300 round-lg mb-4 
            focus:outline-none focus:border-gray-600 text-black"
            id = "email" type="text" value={user.email} 
            onChange={(e) => setUser({...user,email: e.target.value})}
            placeholder="email"/>

        <label htmlFor="password"><strong>Password</strong></label>
        <input className="p-2 border: border-gray-300 round-lg mb-4 
            focus:outline-none focus:border-gray-600 text-black"
            id = "password" type="text" value={user.password} 
            onChange={(e) => setUser({...user,password: e.target.value})}
            placeholder="password"/>

        <button 
        onClick={onSignup} 
        className="p-2 border:border-2 border-gray-500 round-lg mb-4 
            focus:outline-none focus:border-black-600"><b>{buttonDisabled ? "No signup" : "Signup"}</b></button>
        
        <Link href="/login">Visit login page</Link>
        </div>

    
    )
}