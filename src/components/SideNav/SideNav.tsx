import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const SideNav = () => {
  const router = useRouter();
  const SideNavData = [
    {
      title: 'Xero Codee',
      icon: `/images/Xero.png`,
      link: '/dashboard',
    },
    {
      title: 'Builder Center',
      icon: `/images/Builder.png`,
      link: '/sessions',
    },
    {
      title: 'Service Board',
      icon: `/images/service.png`,
      link: '/therapist',
    },
    {
      title: 'Database',
      icon: `/images/database.png`,
      link: '/users',
    },
    {
      title: 'Environment',
      icon: `/images/Hard Drive.png`,
      link: '/analytics',
    },
    {
      title: 'Workflow',
      icon: `/images/workflow.png`,
      link: '/analytics',
    },
    {
      title: 'Monitoring',
      icon: `/images/Monitoring.png`,
      link: '/analytics',
    },
    {
      title: 'Security',
      icon: `/images/security.png`,
      link: '/analytics',
    },
    {
      title: 'Web Hooks',
      icon: `/images/Hooks.png`,
      link: '/analytics',
    },
    {
      title: 'Log Error',
      icon: `/images/Error.png`,
      link: '/analytics',
    },
  ];

  // Initialize activeItem with the index of "Xero Codee" item
  const [activeItem, setActiveItem] = useState(SideNavData.findIndex(item => item.title === 'Xero Codee'));

  const handleItemClick = (index) => {
    if (activeItem !== index) {
      setActiveItem(index);
    }
    router.push(SideNavData[index].link); // Use router.push to navigate to the specified link
  };

  return (
    <div className="w-[315px] flex flex-col">
      <div className="ml-[31px] flex flex-col  items-center">
        <div className="mt-[34px]">
          <Image src="/images/XeroLogo.png" alt="Your Logo" width={180} height={53} />
        </div>
        <ul className="flex flex-col mt-[44px] items-center">
          {SideNavData.map((item, index) => (
            <li key={index} className="flex flex-row mb-[22px]">
              <div
                className={`w-[248px] h-[58px] flex flex-row justify-center items-center gap-[35px] ${
                  activeItem === index ? "rounded-[30px] border border-solid border-gray-300 bg-white shadow-md" : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                <div>
                  <Image src={item.icon} alt="Your Logo" width={20} height={20} style={{ color: "white" }} />
                </div>
                <div
                  className={`${nunito.className}  w-[124px] h-[25px] text-[18px]   ${
                    activeItem === index ? "text-blue-600 font-[800]" : "font-[600]"
                  } `}
                >
                  {item.title}
                </div>
              </div>
              <div className="flex justify-center items-center  relative right-2">
                <div className={`h-[19px] w-[35px]  ${activeItem === index ? "bg-white" : ""} `}></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
