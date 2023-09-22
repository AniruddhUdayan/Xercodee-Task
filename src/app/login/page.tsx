"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn, useSession, getSession } from "next-auth/react";
import { NextRequest } from "next/server";
import { Nunito } from "next/font/google";
import Image from "next/image";

const nunito = Nunito({ subsets: ["latin"] });

export default function LoginPage() {
  const session = useSession();

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const signInHandlerGoogle = async () => {
    signIn("google");
  };
  const signInHandlerGithub = async () => {
    signIn("github");
  };
  useEffect(() => {
    if (session && session.status === "authenticated") {
      router.push("/profile");
    }
  }, [session, router]);
  const onLogin = async () => {
    try {
      setLoading(true);
      const status = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
        callbackUrl: "/profile",
      });
      if (status?.ok && status.url !== null) {
        router.push(status.url);
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="flex justify-center items-center bg-opacity-0 bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url('/images/Background.png')` }}
    >
      <div className="flex mx-[100px] flex-row rounded-tl-0 rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px] bg-white w-full max-w-[1114px] min-h-[800px] p-[31px] pb-0">
        <div className="flex flex-col items-center w-full mr-[32px]">
          <div className="w-[160px] h-[47px]">
            <Image
              src="/images/XeroLogo.png"
              alt="Your Logo"
              width={160}
              height={47}
            />
          </div>
          <div className="w-full h-full flex flex-col mt-[27px] items-center">
            <div
              className={`${nunito.className} text-black text-center  text-[32px] font-bold  capitalize`}
            >
              Welcome!
            </div>
            <div className="flex flex-row mt-[16px]">
              <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
                <hr className="w-[150px]"></hr>
              </div>

              <div
                className={`${nunito.className} w-[152px] h-[21px] text-center font-nunito text-[14px] font-bold leading-6 capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
              >
                Login To Your Account
              </div>
              <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
                <hr className="w-[150px]"></hr>
              </div>
            </div>
            <div className="flex flex-col mt-[29px] w-[450px]">
           
             
              {/* {validationErrors.email && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.email}
                </div>
              )} */}
              <input
                className={`${nunito.className} p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email-Id"
              />
              {/* {validationErrors.password && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.password}
                </div>
              )} */}
              <input
                className={`${nunito.className} p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
              />
           
              <button
                onClick={onLogin}
                className="rounded-md border border-gray-300 bg-blue-500 h-[45px]"
              >
                <div
                  className={`${nunito.className} text-white text-center text-[16px] font-bold capitalize h-[19px]`}
                >
                  LOGIN
                </div>
              </button>
            </div>
            <div
              className={`${nunito.className} mt-[24px] w-[29px] h-[20px] text-center text-[14px] font-[800] leading-6`}
              style={{ color: "rgba(0, 0, 34, 0.50)" }}
            >
              OR
            </div>
            <div className="mt-[23px] h-[45px] w-[450px] flex gap-[39px]">
              <button
                onClick={() => {
                  signIn("google");
                }}
                className="flex flex-row items-center justify-center gap-[3px] w-[205px] rounded-lg border border-gray-300 bg-white"
              >
                <div
                  className={`${nunito.className} text-base font-semibold leading-150 capitalize  `}
                  style={{ color: "rgba(0, 0, 34, 0.50)" }}
                >
                  Sign Up With Google
                </div>{" "}
                <Image
                  src="/images/Google.png"
                  alt="Your Logo"
                  width={32}
                  height={30}
                />
              </button>
              <button
                onClick={() => {
                  signIn("github");
                }}
                className="flex flex-row items-center justify-center gap-[6px] w-[205px] rounded-lg border border-gray-300 bg-white"
              >
                <div
                  className={`${nunito.className} text-base font-semibold leading-150 capitalize  `}
                  style={{ color: "rgba(0, 0, 34, 0.50)" }}
                >
                  Sign Up With Github
                </div>{" "}
                <Image
                  src="/images/Github.png"
                  alt="Your Logo"
                  width={32}
                  height={30}
                />
              </button>
            </div>
            <div
              className={`${nunito.className}flex flex-row mt-[28px] w-[224px] h-[19px] text-sm font-normal `}
              style={{ color: "rgba(0, 0, 34, 0.50)" }}
            >
              Dont't have an Acoount ?
              <Link
                className="text-blue-600 font-nunito text-sm font-medium ml-[px]"
                href="/signup"
              >
                  SIGN UP
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[603px] border-l border-gray-300 mt-[86px]"></div>
        <div className="w-full flex flex-col">
          <div className="mt-[224px]">
            <Image
              src="/images/bro.png"
              alt="Your Logo"
              width={500}
              height={326}
            />
          </div>
          <div className="mt-[105px] relative left-[31px] w-full">
            <Image
              src="/images/wave.png"
              alt="Your Logo"
              width={538}
              height={114}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
