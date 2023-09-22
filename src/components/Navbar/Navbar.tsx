import React, { useState } from "react";
import { Nunito } from "next/font/google";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const nunito = Nunito({ subsets: ["latin"] });

const Navbar = () => {
  const session = useSession();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleAccountClick = () => {
    setLogoutVisible(!logoutVisible);
  };

  return (
    <div className="h-[87px] w-auto flex flex-row items-center justify-between">
      <div className="w-auto h-[58px] rounded-[30px] border border-solid border-gray-300 bg-[#F9F9F9] shadow-md flex flex-row items-center justify-between">
        <input
          placeholder="Search"
          className={`${nunito.className} ml-[34px] bg-[#F9F9F9] active:bg-[#F9F9F9] focus:outline-none font-[700]`}
        />
        <button className="flex justify-center items-center w-[70px] h-[54px] flex-shrink-0 rounded-[30px] bg-[#0C5BC6] ">
          <Image
            src="/images/iconInfo.png"
            alt="Your Logo"
            width={28}
            height={28}
          />
        </button>
      </div>
      <div className="hidden xl:flex w-auto h-[50px] flex-row items-center gap-[18px] mr-[36px]">
        <div className="flex flex-row w-auto h-[50px] flex-shrink-0 rounded-[30px] border border-solid border-[#FF990019] bg-[#ffc656] shadow-[5px 5px 10px 0px #FF99001A] items-center p-[6px] gap-[2px] shadow-md">
          <div className="flex justify-center items-center w-[40px] h-[40px] flex-shrink-0 rounded-full bg-gray-100 shadow-md ">
            <Image
              src="/images/upgrade.png"
              alt="Your Logo"
              width={28}
              height={28}
            />
          </div>
          <div>Upgrade Plan</div>
        </div>

        <div className="flex justify-center items-center w-[50px] h-[50px] flex-shrink-0 rounded-[10px] bg-[#F9F9F9] shadow-md hover:shadow-none transition-shadow">
          <Image
            src="/images/notifications.png"
            alt="Your Logo"
            width={32}
            height={32}
          />
        </div>
        <div className="flex justify-center items-center w-[50px] h-[50px] flex-shrink-0 rounded-[10px] bg-[#F9F9F9] shadow-md hover:shadow-none transition-shadow">
          <Image
            src="/images/mail.png"
            alt="Your Logo"
            width={32}
            height={32}
          />
        </div>
        <div className="flex justify-center items-center w-[50px] h-[50px] flex-shrink-0 rounded-[10px] bg-[#F9F9F9] shadow-md hover:shadow-none transition-shadow">
          <Image
            src="/images/Settings.png"
            alt="Your Logo"
            width={32}
            height={32}
          />
        </div>
        <div className="ml-[25px] flex flex-row">
          Xero Codee
          <Image
            src="/images/expand.png"
            alt="Your Logo"
            width={24}
            height={24}
          />
        </div>
        <div
          className={`flex justify-center items-center w-[54px] h-[54px] flex-shrink-0 rounded-[10px] bg-[#F9F9F9] shadow-md hover:shadow-none transition-shadow cursor-pointer`}
          onClick={handleAccountClick}
        >
          <div>
            <Image
              src="/images/account.png"
              alt="Your Logo"
              width={32}
              height={32}
            />
            {logoutVisible && (
              <div className="absolute right-[-10px] top-[38px] bg-white border border-solid border-gray-300 rounded-md p-2 shadow-md"  onClick={() => {
                signOut();
              }}>
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
