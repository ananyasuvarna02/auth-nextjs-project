"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
      
    })
    const [buttonDisabled,setButtonDisabled] = React.
    useState(false);
    const [loading,setLoading] =React.useState(false);

    const onLogin = async () => {
        try{
            setLoading(true);
           const response = await axios.post("/api/users/login",user);
            console.log("Login successful",response.data);
            toast.success("Login success");
            router.push("/profile");

        }catch(error:any){
            console.log("Login failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    } 

    useEffect(() => {
        if(user.email.length>0 && user.password.length> 0)
        {
            setButtonDisabled(false);
        }
        setButtonDisabled(true);
    },[user]);

    return(
       
        <div className="flex flex-col items-center justify-center min-h-screen py-2"
        style={{
            backgroundColor: "#f9f9f9", // Light background color
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            padding: "16px", // Additional padding if needed
            transition: "all 0.3s ease", // Smooth transition for hover effects
        }}>
            <h1><b>{loading ? "Processing" : "login" }</b></h1>
            <hr/>

        <label htmlFor="email"><strong>Email</strong></label>
        <input className="p-2 border: border-gray-300 round-lg mb-4 
            focus:outline-none focus:border-gray-600"
            id = "email" type="text" value={user.email} 
            onChange={(e) => setUser({...user,email: e.target.value})}
            placeholder="email"/>

        <label htmlFor="password"><strong>Password</strong></label>
        <input className="p-2 border: border-gray-300 round-lg mb-4 
            focus:outline-none focus:border-gray-600"
            id = "password" type="text" value={user.password} 
            onChange={(e) => setUser({...user,password: e.target.value})}
            placeholder="password"/>

        <button 
        onClick={onLogin} 
        className="p-2 border:border-2 border-gray-500 round-lg mb-4 
            focus:outline-none focus:border-black-600"><b>{buttonDisabled ? "No login" : " login"} </b></button>
        
        <Link href="/signup">Visit Sign page</Link>
        </div>

    
    )
}