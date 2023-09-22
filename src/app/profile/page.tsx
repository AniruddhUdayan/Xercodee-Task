"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default function ProfilePage() {
  const session = useSession();
  const router = useRouter();

  const [showInputDiv, setShowInputDiv] = useState(false);
  const [selectedDivText, setSelectedDivText] = useState("");

  const handleDivClick = (text) => {
    setSelectedDivText(text); 
    setShowInputDiv(true); 
  };
  const handleSubmit = () => {
    // Assuming you want to push to 'profile/abc'
    router.push(`/profile/${selectedDivText}`);
  };
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
        <div className="flex justify-center items-center ">
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
        <div className="flex flex-row justify-evenly gap-2 mt-[76px] ml-[100px] mr-[100px]">
            <div className="flex justify-center items-center w-auto h-[59px] rounded-lg border border-gray-300 bg-white hover:bg-blue-500 hover:text-white px-[30px]" onClick={() => handleDivClick("Developer")}>Developer</div>
            <div className="flex justify-center items-center w-auto h-[59px] rounded-lg border border-gray-300 bg-white  hover:bg-blue-500 hover:text-white px-[30px]"  onClick={() => handleDivClick("Organistion")}>Organisation</div>
            <div className="flex justify-center items-center w-auto h-[59px] rounded-lg border border-gray-300 bg-white  hover:bg-blue-500 hover:text-white px-[30px]"  onClick={() => handleDivClick("Company")}>Company</div>
        </div>
        {showInputDiv && (
          <div className="flex flex-row mt-[122px] justify-center gap-[16px]">
            <input
              className={`${nunito.className} w-[392px] p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
              style={{ color: "rgba(0, 0, 34, 0.50)" }}
              placeholder={`Enter ${selectedDivText} Name`}
            />
            <button onClick={handleSubmit} className="h-[45px] w-[111px] rounded-lg bg-blue-500 text-white">Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}
