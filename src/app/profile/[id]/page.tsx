"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Nunito } from "next/font/google";
import Image from "next/image";

const nunito = Nunito({ subsets: ["latin"] });

export default function UserProfile({ params }: any) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session && session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);
  return (
    <div
      className="flex justify-center items-center bg-opacity-0 bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url('/images/Background.png')` }}
    >
      <div className="w-[1300px]  h-[620px]  rounded-[35px] bg-white p-[42px] mx-[100px]">
        <div className="flex justify-center items-center">
          {" "}
          <Image
            src="/images/XeroLogo.png"
            alt="Your Logo"
            width={160}
            height={47}
          />
        </div>
        <div
          className={`${nunito.className} mt-[37px] w-full h-[37px] flex-shrink-0 text-black text-center text-[32px] font-bold  capitalize `}
        >
          Welcome {session.data?.user?.email}!
        </div>
        <div className="flex flex-row mt-[16px] justify-center items-center">
          <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
            <hr className="w-[150px]"></hr>
          </div>

          <div
            className={`${nunito.className} w-[194px] h-[21px] text-center font-nunito text-[14px] font-bold leading-6 capitalize`}
            style={{ color: "rgba(0, 0, 34, 0.50)" }}
          >
            Choose From The Following
          </div>
          <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
            <hr className="w-[150px]"></hr>
          </div>
        </div>
        <div className="flex flex-row justify-evenly mt-[76px] ml-[100px] mr-[100px]">
          <div
            onClick={() => {
              router.push("/dashboard");
            }}
            className="flex justify-center items-center w-auto h-[59px] px-[30px] rounded-lg border border-gray-300 bg-white hover:bg-blue-500 hover:text-white "
          >
            Self Hosting
          </div>
          <div
            onClick={() => {
              router.push("/dashboard");
            }}
            className="flex justify-center items-center w-auto h-[59px] px-[30px] rounded-lg border border-gray-300 bg-white  hover:bg-blue-500 hover:text-white"
          >
            XeroCodee Hosting
          </div>
        </div>
      </div>
    </div>
  );
}
