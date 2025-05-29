"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const supabase = createClient()

  function isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSignUp = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    } else if (!isEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    } else {
      const { data, error } = await supabase.from("prelaunch").insert([{ email }]);
      if (error) {
        console.error("Error inserting email:", error); 
        alert("There was an error signing up. Please try again later.");
        return;
      }
      console.log("Email inserted successfully:", data);
      router.push("/thanks");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex space-x-5 items-center mx-auto">
          <Image src={"/YoinkUI.png"} alt="YoinkUI Logo" width={60} height={60} className="md:w-[60px] md:h-[60px] w-10 h-10" />
          <h1 className="md:text-6xl text-4xl font-bold text-center w-full">YoinkUI</h1>
        </div>
        <p className="text-zinc-700 text-center w-full">Copy any landing page with just one click. <br />
          Sign up to get notified when we launch!
        </p>
        <form className="space-x-3" onSubmit={(e) => {e.preventDefault()}}>
          <input className="px-4 py-2 rounded-md border-1 border-zinc-500" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button
            className="px-4 py-2 bg-blue-500 rounded-md text-white font-semibold"
            onClick={handleSignUp}>Sign Up</button>
        </form>
      </main>
      <footer className="flex flex-col items-center justify-center row-start-3">
        <p className="text-zinc-500 text-sm">Copyright © 2025 YoinkUI®. All rights reserved.</p>
      </footer>
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>
    </div>
  );
}
