"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import { useSession, getSession, signOut } from "next-auth/react";
import { IncomingMessage } from 'http'; 
import { NextRequest } from "next/server";



export default function ProfilePage() {
    const { data: sessionAuth } = useSession();
    const router = useRouter()
    const [data, setData] = useState("nothing")
    // const [token, setToken] = useState(null); 
    // const token = localStorage.getItem('token');
    const logout = async () => {
        await signOut();
        window.location.href = '/login';
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data.firstname)
        // console.log(token) 
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>


            </div>
    )
}

export async function getServerSideProps({ req }: { req: NextRequest }) {
    const session = await getSession({ req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
  }
 
  
  
  
  
  
  