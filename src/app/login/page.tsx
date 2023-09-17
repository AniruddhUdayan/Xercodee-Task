"use client";
import Link from "next/link";
import React, {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {signIn,useSession} from 'next-auth/react'





export default function LoginPage() {
    const { data: session } = useSession();
    const [token, setToken] = useState(null); 
    
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // useEffect(() => {
    //     // Check if the user is authenticated when the component mounts
       
    //     if (session || token) {
    //       // User is authenticated, redirect to profile page
    //       router.push('/profile');
    //     }
    //   }, [session,router,token]);
    const signInHandlerGoogle = async () => {
            signIn('google');
            router.push('/profile')
    }
    const signInHandlerGithub = async () => {
            signIn('github');
            router.push('/profile')
    }
    const onLogin = async () => {
        try {
            setLoading(true);
            // const response = await axios.post("/api/users/login", user);
            // const token = response.data.token
            // localStorage.setItem('token', token);
            // setToken(token);
            //     router.push('/profile');
            const status = await signIn('credentials',{
                redirect:false,
                email: user.email,
                password: user.password,
                callbackUrl:'/profile'
            })
            if (status?.ok && status.url !== null) {
                router.push(status.url);
              }
              
           
        } catch (error:any) {
            console.log("Login failed", error.message);
        } finally{
        setLoading(false);
        }
    }
   
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            // onClick={onLogin}
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup page</Link>
            <button onClick={signInHandlerGoogle} className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Google Login</button>
            <button onClick={signInHandlerGithub} className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Github Login</button>
        </div>
    )

}