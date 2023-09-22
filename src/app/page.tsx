"use client"
import { useEffect } from "react";
import { useSession} from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session && session.status === "authenticated") {
      router.push("/profile");
    }else{
      router.push("/login");
    }
  }, [session, router]);
  return (
    <div
      className="flex bg-none w-full h-screen justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ background: `#C2DAFB` }}
    >
      Hello
    </div>
  );
}
