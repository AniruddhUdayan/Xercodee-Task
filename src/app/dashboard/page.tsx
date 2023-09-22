"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SideNav from "@/components/SideNav/SideNav";
import Navbar from "@/components/Navbar/Navbar";
import { Nunito } from "next/font/google";
import Image from "next/image";
import CircularProgressBar from "@/components/ProgressBar/ProgressBar";

const nunito = Nunito({ subsets: ["latin"] });

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [awsSelected, setAwsSelected] = useState(false);
  const [gcpSelected, setGcpSelected] = useState(false);
  const [githubSelected, setGithubSelected] = useState(false);
  const [gitlabSelected, setGitlabSelected] = useState(false);
  const [bitbucketSelected, setBitbucketSelected] = useState(false);
  const [mongodbSelected, setMongodbSelected] = useState(false);
  const [redisSelected, setRedisSelected] = useState(false);
  const [postgraseSelected, setPostgraseSelected] = useState(false);
  const [cloudSelected, setCloudSelected] = useState(false);
  const [sourceCodeSelected, setSourceCodeSelected] = useState(false);
  const [dataSourceSelected, setDataSourceSelected] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (session && session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);
  const handleAWSTabClick = () => {
    if (gcpSelected || awsSelected || cloudSelected || sourceCodeSelected) {
      // If any later step is already selected, don't allow selecting this one
      return;
    }
    setAwsSelected(true);
    setProgress(40);
  };

  const handleGCPTabClick = () => {
    if (awsSelected || cloudSelected || sourceCodeSelected) {
      // If any later step is already selected, don't allow selecting this one
      return;
    }
    setAwsSelected(false);
    setGcpSelected(true);
    setProgress(40);
  };

  const handleGitHubTabClick = () => {
    if ((awsSelected || gcpSelected) && !cloudSelected) {
      setCloudSelected(true);
      setGithubSelected(true);
      setProgress(80);
      setGitlabSelected(false);
      setBitbucketSelected(false);
    }
  };

  const handleGitLabTabClick = () => {
    if ((awsSelected || gcpSelected) && !cloudSelected) {
      setCloudSelected(true);
      setProgress(80);
      setGithubSelected(false);
      setGitlabSelected(true);
      setBitbucketSelected(false);
    }
  };

  const handleBitbucketTabClick = () => {
    if ((awsSelected || gcpSelected) && !cloudSelected) {
      setCloudSelected(true);
      setProgress(80);
      setGithubSelected(false);
      setGitlabSelected(false);
      setBitbucketSelected(true);
    }
  };

  const handleMongoDBTabClick = () => {
    if (cloudSelected && !sourceCodeSelected && !dataSourceSelected) {
      setSourceCodeSelected(true);
      setProgress(100);
      setMongodbSelected(true);
      setRedisSelected(false);
      setPostgraseSelected(false);
    }
  };

  const handleRedisDBTabClick = () => {
    if (cloudSelected && !sourceCodeSelected && !dataSourceSelected) {
      setSourceCodeSelected(true);
      setProgress(100);
      setMongodbSelected(false);
      setRedisSelected(true);
      setPostgraseSelected(false);
    }
  };

  const handlePostgresqlTabClick = () => {
    if (cloudSelected && !sourceCodeSelected && !dataSourceSelected) {
      setSourceCodeSelected(true);
      setProgress(100);
      setMongodbSelected(false);
      setRedisSelected(false);
      setPostgraseSelected(true);
    }
  };

  const handleDataSourceTabClick = () => {
    if (sourceCodeSelected) {
      // If source code has been selected, don't allow selecting data source
      return;
    }
    setDataSourceSelected(true);
    setProgress(100);
  };
  // const handleTabClick = (index) => {
  //   const updatedTabs = [...selectedTabs];
  //   updatedTabs[index] = !updatedTabs[index];

  //   // Clear the selection of other tabs within the same div
  //   for (let i = 0; i < updatedTabs.length; i++) {
  //     if (i !== index) {
  //       updatedTabs[i] = false;
  //     }
  //   }

  //   setSelectedTabs(updatedTabs);

  //   // Calculate progress based on the number of selected tabs
  //   const selectedCount = updatedTabs.filter((tab) => tab).length;
  //   const newProgress = (selectedCount / 3) * 100; // Assuming you have 3 tabs per section
  //   setProgress(newProgress);
  // };

  return (
    <div
      className="flex bg-none w-full  bg-cover bg-center bg-no-repeat"
      style={{ background: `#C2DAFB` }}
    >
      <SideNav />
      <div className="w-full">
        {" "}
        <Navbar />
        <div className="flex flex-col  p-[20px] w-auto h-auto flex-shrink-0 rounded-[35px] bg-white ml-[10px] relative right-5 gap-[24px]">
          <div className="w-auto h-[171px] flex-shrink-0 rounded-[25px] border border-white  bg-gradient-to-b from-blue-50 to-blue-50 p-[24px]">
            <div className="flex flex-row justify-between">
              {" "}
              <div
                className={`${nunito.className} flex flex-col justify-center w-auto h-[76px] flex-shrink-0 text-[#242331] font-Nunito md:text-[40px] xl:text-[75px] font-extrabold leading-125`}
              >
                Hi Arya!
              </div>
              <div className="flex flex-row">
                <div
                  className={`${nunito.className} flex flex-col items-center w-[87px] h-[20px] flex-shrink-0 text-right text-[#231F20] text-[16px] font-bold leading-normal`}
                >
                  Test Mode
                </div>
                <button className="h-[20px]">
                  {" "}
                  <Image
                    src="/images/switch on.png"
                    alt="Your Logo"
                    width={40}
                    height={20}
                  />
                </button>
                <div
                  className={`${nunito.className} flex flex-col items-center w-[146px] h-[20px] flex-shrink-0 text-right text-[#231F20] text-[16px] font-bold leading-normal`}
                >
                  Production Mode
                </div>
              </div>
            </div>
            <div
              className={`${nunito.className} flex flex-col justify-center w-auto h-[76px] flex-shrink-0 text-black font-Nunito font-bold text-[18px] leading-normal tracking-wider`}
            >
              Welcome to Xero Codee Ecosystem😎
            </div>
          </div>
          <div className="flex flex-row gap-[36px] ml-[27px] flex-wrap">
            <div className="h-auto w-auto flex flex-col">
              <div className="h-auto flex flex-row gap-[57px]">
                <div className="flex flex-col items-center">
                  <div className="h-[56px] w-[50px] bg-[#0C5BC6] rounded-full flex justify-center items-center z-10">
                    <div className="h-[16px] w-[16px] rounded-full bg-white"></div>
                  </div>
                  <div className={`h-full w-[8px] rounded-md border border-solid border-gray-300 bg-[#0C5BC6] shadow-md relative bottom-1 ${(awsSelected || gcpSelected)?"bg-[#0C5BC6] transition-background duration-500 ease-in-out transform translate-y-0":"bg-white"}`}></div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col">
                    <div
                      className={`${nunito.className} flex w-auto h-[31px] flex-col justify-center flex-shrink-0 text-black text-[18px] font-bold leading-normal tracking-wider`}
                    >
                      Step 1
                    </div>
                    <div
                      className={`${nunito.className} flex-shrink-0 text-[#797979] font-nunito text-14 font-semibold leading-normal tracking-wide`}
                    >
                      Connect to Cloud
                    </div>
                  </div>
                  <div className="flex flex-row gap-[30px] flex-wrap">
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4] shadow-md ${
                        awsSelected ? "bg-[#FFF5E5]" : "bg-white"
                      }`}
                      onClick={handleAWSTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          AWS
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px] border border-solid border-[#ffdfa2] bg-[#fff5e5]">
                        <Image
                          src="/images/aws.png"
                          alt="Your Logo"
                          width={68}
                          height={41}
                        />
                      </div>
                    </div>
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4] shadow-md  ${
                        gcpSelected ? "bg-blue-100" : "bg-white"
                      }`}
                      onClick={handleGCPTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          GCP
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px] border border-blue-400 border-opacity-40 bg-blue-100">
                        <Image
                          src="/images/gcp.png"
                          alt="Your Logo"
                          width={68}
                          height={41}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-auto flex flex-row gap-[57px]">
                <div className="flex flex-col items-center">
                  <div className="h-[56px] w-[50px] bg-[#0C5BC6] rounded-full flex justify-center items-center z-10 relative bottom-2">
                    <div className="h-[16px] w-[16px] rounded-full bg-white"></div>
                  </div>
                  <div className={`h-full w-[8px] rounded-md border border-solid border-gray-300  shadow-md relative bottom-3 ${cloudSelected?"bg-[#0C5BC6] transition-background duration-500 ease-in-out transform translate-y-0":"bg-white"}`}></div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col">
                    <div
                      className={`${nunito.className} flex w-auto h-[31px] flex-col justify-center flex-shrink-0 text-black text-[18px] font-bold leading-normal tracking-wider`}
                    >
                      Step 2
                    </div>
                    <div
                      className={`${nunito.className} 1 flex-shrink-0 text-[#797979] font-nunito  font-semibold leading-normal tracking-wide`}
                    >
                      Connect to Source Code
                    </div>
                  </div>
                  <div className="flex flex-row gap-[30px] flex-wrap">
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4]  shadow-md ${
                        githubSelected ? "bg-gray-300" : "bg-white"
                      }`}
                      onClick={handleGitHubTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          Github
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px] border border-gray-300 bg-gray-300">
                        <Image
                          src="/images/github2.png"
                          alt="Your Logo"
                          width={53}
                          height={61}
                        />
                      </div>
                    </div>
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4]  shadow-md ${
                        gitlabSelected ? "bg-orange-100" : "bg-white"
                      }`}
                      onClick={handleGitLabTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          Gitlab
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px]  border border-orange-200 bg-orange-100">
                        <Image
                          src="/images/gitlab.png"
                          alt="Your Logo"
                          width={53}
                          height={56}
                        />
                      </div>
                    </div>
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4] shadow-md ${
                        bitbucketSelected ? "bg-blue-200" : "bg-white"
                      }`}
                      onClick={handleBitbucketTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          Bitbucket
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px]  border border-solid border-blue-400 bg-blue-200">
                        <Image
                          src="/images/bitbucket.png"
                          alt="Your Logo"
                          width={57}
                          height={57}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-auto flex flex-row gap-[57px]">
                <div className="flex flex-col items-center">
                  <div className="h-[50px] w-[50px] bg-[#0C5BC6] rounded-full flex justify-center items-center z-10 relative bottom-4">
                    <div className="h-[16px] w-[16px] rounded-full bg-white"></div>
                  </div>
                  <div className={`h-[191px] w-[8px] rounded-md border border-solid border-gray-300  shadow-md relative bottom-5 ${sourceCodeSelected ? "bg-[#0C5BC6] transition-background duration-500 ease-in-out transform translate-y-0" : "bg-white"}`}></div>

                </div>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col">
                    <div
                      className={`${nunito.className} flex w-auto h-[31px] flex-col justify-center flex-shrink-0 text-black text-[18px] font-bold leading-normal tracking-wider`}
                    >
                      Step 3
                    </div>
                    <div
                      className={`${nunito.className} flex-shrink-0 text-[#797979] font-nunito text-14 font-semibold leading-normal tracking-wide`}
                    >
                      Connect to DataSource
                    </div>
                  </div>
                  <div className="flex flex-row gap-[30px] flex-wrap">
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4]  shadow-md ${
                        mongodbSelected ? "bg-green-50" : "bg-white"
                      }`}
                      onClick={handleMongoDBTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          MongoDB
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px] border border-solid border-green-500 bg-green-50">
                        <Image
                          src="/images/mongodb.png"
                          alt="Your Logo"
                          width={55}
                          height={63}
                        />
                      </div>
                    </div>
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4]  shadow-md ${
                        redisSelected ? "bg-red-100" : "bg-white"
                      }`}
                      onClick={handleRedisDBTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          RedisDB
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px] border border-solid border-red-200 bg-red-100">
                        <Image
                          src="/images/redis.png"
                          alt="Your Logo"
                          width={53}
                          height={56}
                        />
                      </div>
                    </div>
                    <div
                      className={`flex flex-row w-[260px] h-[118px] p-[16px] rounded-[15px] border border-solid border-[#F3F3F4] shadow-md ${
                        postgraseSelected ? "bg-blue-50" : "bg-white"
                      }`}
                      onClick={handlePostgresqlTabClick}
                    >
                      <div className="flex flex-col h-full">
                        <div
                          className={`${nunito.className} flex flex-col items-start justify-end w-[128px] h-[46px] flex-shrink-0 text-[#242331] font-bold text-[22px] leading-normal tracking-wider`}
                        >
                          Postgresql
                        </div>
                        <div className="flex flex-row h-full items-end  gap-[5px]">
                          <div className="h-[10px] w-[10px] bg-[#D12223] rounded-full flex items-center"></div>
                          <div className="h-[10px] w-[10px] bg-[#34A853] rounded-full flex justify-center items-center"></div>
                          <div className="relative top-1">
                            {" "}
                            <Image
                              src="/images/Sync.png"
                              alt="Your Logo"
                              width={14}
                              height={15}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[93px] h-[83px] flex-shrink-0 rounded-[15px] border border-solid border-blue-400 bg-blue-50">
                        <Image
                          src="/images/postgrasql.png"
                          alt="Your Logo"
                          width={53}
                          height={56}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[354px] h-[708px] flex-shrink-0 rounded-[15px] border border-[#0000001A] bg-white shadow-md items-center ">
              <div className="flex flex-col justify-center w-[160px] h-[76px] flex-shrink-0 mt-[2px]">
                <div
                  className={`${nunito.className} text-black text-center font-nunito text-[22px] font-bold tracking-wide leading-normal`}
                >
                  Your Progress
                </div>
                <div
                  className={`text-[#818181] text-[14px] font-semibold leading-normal tracking-wider`}
                >
                  Towards xero codee
                </div>
              </div>
              <CircularProgressBar progress={progress} />
              <div className="mt-[16px] h-[32px] w-[109px] flex justify-center items-center">
                <div
                  className={`${nunito.className} text-[#797979] font-Nunito text-[12px] font-bold leading-[20px] tracking-[0.5px]`}
                >
                  View Details
                </div>
              </div>
              <div className="mt-[33px] flex flex-col gap-[22px]">
                <div className="flex flex-col">
                  <div className="flex flex-col  w-[320px] h-[31px] flex-shrink-0 text-[rgba(121,121,121,0.50)] font-Nunito text-[14px] font-bold leading-normal tracking-[0.7px]">
                    Step 1
                  </div>
                  {awsSelected && (
                    <div className="w-[320px] h-[72px] bg-[#FFF5E5] rounded-md border border-solid border-[#FFF5E5] shadow-md p-[13px]">
                      <div className="flex flex-row gap-[90px]">
                        <div className="flex flex-col">
                          <div
                            className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                          >
                            AWS
                          </div>
                          <div
                            className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                          >
                            Status: Complete
                          </div>
                        </div>
                        <div className="w-[56px] h-[52px] rounded-lg border border-solid border-yellow-300 bg-white flex justify-center items-center">
                          <Image
                            src="/images/aws.png"
                            alt="Your Logo"
                            width={33}
                            height={23}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {gcpSelected && (
                    <div className="w-[320px] h-[72px] bg-[#ECF3FE] rounded-md border border-solid border-[#ECF3FE] shadow-md p-[13px]">
                      <div className="flex flex-row gap-[90px]">
                        <div className="flex flex-col">
                          <div
                            className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                          >
                            GCP
                          </div>
                          <div
                            className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                          >
                            Status: Complete
                          </div>
                        </div>
                        <div className="w-[56px] h-[52px] rounded-lg border border-solid border-[#ECF3FE] bg-white flex justify-center items-center">
                          <Image
                            src="/images/gcp.png"
                            alt="Your Logo"
                            width={33}
                            height={23}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col  w-[320px] h-[31px] flex-shrink-0 text-[rgba(121,121,121,0.50)] font-Nunito text-[14px] font-bold leading-normal tracking-[0.7px]">
                    Step 2
                  </div>
                  {gitlabSelected && (
                    <div className="w-[320px] h-[72px] bg-[#FFF5E5] rounded-md border border-solid border-[#FFF5E5] shadow-md p-[13px]">
                    <div className="flex flex-row gap-[90px]">
                      <div className="flex flex-col">
                        <div
                          className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                        >
                          Gitlab
                        </div>
                        <div
                          className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                        >
                          Status: Complete
                        </div>
                      </div>
                      <div className="w-[56px] h-[52px] rounded-lg border border-solid border-yellow-300 bg-white flex justify-center items-center">
                        <Image
                          src="/images/gitlab.png"
                          alt="Your Logo"
                          width={33}
                          height={23}
                        />
                      </div>
                    </div>
                  </div>
                  )}
                  {githubSelected && (
                    <div className="w-[320px] h-[72px] bg-[#E9E9E9] rounded-md border border-solid border-[#E9E9E9] shadow-md p-[13px]">
                    <div className="flex flex-row gap-[90px]">
                      <div className="flex flex-col">
                        <div
                          className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                        >
                          Github
                        </div>
                        <div
                          className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                        >
                          Status: Complete
                        </div>
                      </div>
                      <div className="w-[56px] h-[52px] rounded-lg border border-solid border-[#E9E9E9] bg-white flex justify-center items-center">
                        <Image
                          src="/images/github.png"
                          alt="Your Logo"
                          width={33}
                          height={23}
                        />
                      </div>
                    </div>
                  </div>
                  )}
                  {bitbucketSelected && (
                    <div className="w-[320px] h-[72px] bg-[#E0ECFF] rounded-md border border-solid border-[#E9E9E9] shadow-md p-[13px]">
                    <div className="flex flex-row gap-[90px]">
                      <div className="flex flex-col">
                        <div
                          className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                        >
                          Bitbucket
                        </div>
                        <div
                          className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                        >
                          Status: Complete
                        </div>
                      </div>
                      <div className="w-[56px] h-[52px] rounded-lg border border-solid border-[#E0ECFF] bg-white flex justify-center items-center">
                        <Image
                          src="/images/bitbucket.png"
                          alt="Your Logo"
                          width={33}
                          height={23}
                        />
                      </div>
                    </div>
                  </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col  w-[320px] h-[31px] flex-shrink-0 text-[rgba(121,121,121,0.50)] font-Nunito text-[14px] font-bold leading-normal tracking-[0.7px]">
                    Step 3
                  </div>
                 {mongodbSelected && (
                   <div className="w-[320px] h-[72px] bg-[#EDF5ED] rounded-md border border-solid border-[#F3F3F4;] shadow-md p-[13px]">
                   <div className="flex flex-row gap-[90px]">
                     <div className="flex flex-col">
                       <div
                         className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                       >
                         MongoDB
                       </div>
                       <div
                         className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                       >
                         Status: Complete
                       </div>
                     </div>
                     <div className="w-[56px] h-[52px] rounded-lg border border-solid border-[#EDF5ED] bg-white flex justify-center items-center">
                       <Image
                         src="/images/mongodb.png"
                         alt="Your Logo"
                         width={33}
                         height={23}
                       />
                     </div>
                   </div>
                 </div>
                 )}
                 {redisSelected && (
                   <div className="w-[320px] h-[72px] bg-[#FBEAE9] rounded-md border border-solid border-[#F3F3F4;] shadow-md p-[13px]">
                   <div className="flex flex-row gap-[90px]">
                     <div className="flex flex-col">
                       <div
                         className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                       >
                        RedisDB
                       </div>
                       <div
                         className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                       >
                         Status: Complete
                       </div>
                     </div>
                     <div className="w-[56px] h-[52px] rounded-lg border border-solid border-[#FBEAE9] bg-white flex justify-center items-center">
                       <Image
                         src="/images/redis.png"
                         alt="Your Logo"
                         width={33}
                         height={23}
                       />
                     </div>
                   </div>
                 </div>
                 )}
                 {postgraseSelected && (
                   <div className="w-[320px] h-[72px] bg-[#EBF0F4] rounded-md border border-solid border-[#F3F3F4;] shadow-md p-[13px]">
                   <div className="flex flex-row gap-[90px]">
                     <div className="flex flex-col">
                       <div
                         className={`${nunito.className} flex flex-col   flex-shrink-0 text-[#242331] font-Nunito text-[18px] font-bold leading-normal tracking-wider`}
                       >
                       Postgresql
                       </div>
                       <div
                         className={`${nunito.className} flex flex-col items-center justify-center  flex-shrink-0 text-[#797979] font-Nunito text-[14px] font-bold leading-normal tracking-wider`}
                       >
                         Status: Complete
                       </div>
                     </div>
                     <div className="w-[56px] h-[52px] rounded-lg border border-solid border-[#EBF0F4] bg-white flex justify-center items-center">
                       <Image
                         src="/images/postgrasql.png"
                         alt="Your Logo"
                         width={33}
                         height={23}
                       />
                     </div>
                   </div>
                 </div>
                 )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
