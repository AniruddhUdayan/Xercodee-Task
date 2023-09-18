"use client";
import React, {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import { useSession } from "next-auth/react";


export default function UserProfile({params}: any) {
    const session = useSession();
    const router = useRouter()
    useEffect(() => {
        if (session && session.status === "unauthenticated") {
          // Redirect the user to the profile page when authenticated
          router.push("/login");
        }
      }, [session, router]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page 
            <span className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>

            </div>
    )
}