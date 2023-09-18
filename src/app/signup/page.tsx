"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {Nunito} from 'next/font/google'

const nunito = Nunito({subsets:['latin']})

export default function SignupPage() {
  const session = useSession();
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      console.log("before api hit");
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("after api hit");
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (session && session.status === "authenticated") {
      // Redirect the user to the profile page when authenticated
      router.push("/profile");
    }
  }, [session, router]);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.firstname.length > 0 &&
      user.lastname.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className="flex justify-center items-center bg-opacity-0 bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url('/images/Background.png')` }}
    >
      <div className="flex flex-row rounded-tl-0 rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px] bg-white w-[1114px] h-[800px] p-[31px]">
        <div className="flex flex-col items-center w-[50%] h-full">
          <div className="w-[160px] h-[47px]">
            <Image
              src="/images/XeroLogo.png"
              alt="Your Logo"
              width={160}
              height={47}
            />
          </div>
          <div className="w-full h-full flex flex-col mt-[27px] items-center">
            <div className="flex items-center justify-center  w-[99px] h-[37px] text-black text-center  text-[32px] font-bold capitalize">Hello</div>
            <div className="flex flex-col items-center justify-center min-h-screen py-2  h-auto">
              <h1>{loading ? "Processing" : "Signup"}</h1>
              <hr />
              <label htmlFor="firstname">firstname</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="firstname"
                type="text"
                value={user.firstname}
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
                placeholder="firstname"
              />
              <label htmlFor="lastname">lastname</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="lastname"
                type="text"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                placeholder="lastname"
              />
              <label htmlFor="email">email</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
              />
              <label htmlFor="password">password</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
              />
              <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                {buttonDisabled ? "No signup" : "Signup"}
              </button>
              <Link href="/login">Visit login page</Link>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
