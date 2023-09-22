"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Nunito } from "next/font/google";
import { useSession, signIn } from "next-auth/react";

const nunito = Nunito({ subsets: ["latin"] });
interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const session = useSession();
  const router = useRouter();
  const [user, setUser] = React.useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as User);
  const [validationErrors, setValidationErrors] = useState<Partial<User>>({});

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validateEmail = (email: any) => {
    // Email validation logic (you can use a library like validator.js)
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: any) => {
    // Password validation logic (e.g., minimum length)
    return password.length >= 8;
  };

  const validateForm = () => {
    const errors: Partial<User> = {};

    if (!validateEmail(user.email)) {
      errors.email = "Invalid email address";
    }

    if (!validatePassword(user.password)) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!user.firstname.trim()) {
      errors.firstname = "First name is required";
    }

    if (!user.lastname.trim()) {
      errors.lastname = "Last name is required";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const onSignup = async () => {
    if (!validateForm()) {
      return; // Do not proceed with signup if there are validation errors
    }

    try {
      setLoading(true);
      // Send only the necessary data to the server
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session && session.status === "authenticated") {
      router.push("/profile");
    }
  }, [session, router]);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length >= 8 &&
      user.firstname.trim() !== "" &&
      user.lastname.trim() !== ""
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
      <div className="mx-[100px] my-[50px] flex flex-row rounded-tl-0 rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px] bg-white w-full max-w-[1114px] min-h-[800px] p-[31px]">
        <div className="flex flex-col items-center w-full  mr-[32px]">
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
              Hello!
            </div>
            <div className="flex flex-row mt-[16px]">
              <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
                <hr className="w-[150px]"></hr>
              </div>

              <div
                className={`${nunito.className} w-[152px] h-[21px] text-center font-nunito text-[14px] font-bold leading-6 capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
              >
                Create your account
              </div>
              <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
                <hr className="w-[150px]"></hr>
              </div>
            </div>
            <div className="flex flex-col mt-[29px] w-[450px]">
              {validationErrors.firstname && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.firstname}
                </div>
              )}
              <input
                className={`${nunito.className} p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="firstname"
                type="text"
                value={user.firstname}
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
                placeholder="First Name"
              />

              {validationErrors.lastname && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.lastname}
                </div>
              )}
              <input
                className={`${nunito.className} p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="lastname"
                type="text"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                placeholder="Last Name"
              />
              {validationErrors.email && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.email}
                </div>
              )}
              <input
                className={`${nunito.className} p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email-Id"
              />
              {validationErrors.password && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.password}
                </div>
              )}
              <input
                className={`${nunito.className} p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
              />
              {validationErrors.confirmPassword && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.confirmPassword}
                </div>
              )}
              <input
                className={`${nunito.className} p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="password"
                type="password"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                placeholder="Confirm Password"
              />
              <button
                onClick={onSignup}
                className="rounded-md border border-gray-300 bg-blue-500 h-[45px]"
              >
                <div
                  className={`${nunito.className} text-white text-center text-[16px] font-bold capitalize h-[19px]`}
                >
                  SIGN UP
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
              Already have an Acoount?{" "}
              <Link
                className="text-blue-600 font-nunito text-sm font-medium ml-[1px]"
                href="/login"
              >
                LOGIN
              </Link>
            </div>
          </div>
        </div>
        <div className="h-auto border-l border-gray-300 mt-[86px]"></div>
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
