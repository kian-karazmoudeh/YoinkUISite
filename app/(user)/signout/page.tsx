"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect } from "react";

const SignOutPage = () => {
  useEffect(() => {
    (async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
    })();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex space-x-5 items-center mx-auto">
          <h1 className="md:text-4xl text-2xl font-bold text-center w-full">
            You&apos;ve been Signed out
          </h1>
        </div>
        <p className="text-zinc-700 text-center w-full">
          explore{" "}
          <Link href="/" className="text-blue-500">
            YoinkUI
          </Link>
        </p>
      </main>
      <footer className="flex flex-col items-center justify-center row-start-3">
        <p className="text-zinc-500 text-sm">
          Copyright © 2025 YoinkUI®. All rights reserved.
        </p>
      </footer>
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>
    </div>
  );
};

export default SignOutPage;
