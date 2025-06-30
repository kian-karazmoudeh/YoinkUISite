"use client";

import { authWithGithub, authWithGoogle } from "@/app/api/auth/actions";
import GithubIcon from "@/components/Icons/GithubIcon";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Authenticate = () => {
  const handleGoogleAuth = async () => {
    // logic for google auth
    const res = await authWithGoogle();
    if (res.status == "error") {
      //   setError(res.message);
      //   setLoading(false);
    } else if (res.status == "confirm") {
      redirect(res.message);
      //   alert("yay");
    } else {
      //   redirect("/");
    }
  };

  const handleGithubAuth = async () => {
    // logic for google auth
    const res = await authWithGithub();
    if (res.status == "error") {
      //   setError(res.message);
      //   setLoading(false);
    } else if (res.status == "confirm") {
      redirect(res.message);
      //   alert("yay");
    } else {
      //   redirect("/");
    }
  };

  return (
    <div className="text-slate-800 leading-[1.5] w-full  font-[inter,_sans-serif] bg-white flex flex-col items-center">
      <header className="w-full min-h-[55px] max-w-88 bg-white flex flex-col items-center mx-auto py-4">
        <Link className="gap-x-[2px] flex items-center cursor-pointer" href="/">
          <Image
            width={28}
            height={28}
            src="/logo/yoinkUI.svg"
            alt="YoinkUI Logo"
            className="size-7 mt-1 cursor-pointer"
          />

          <span className="mt-[6px] leading-[1.55556] text-lg block font-medium cursor-pointer">
            YoinkUI
          </span>
        </Link>
      </header>
      <main className="w-full flex justify-center ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-start">
          <div className="w-full max-w-100">
            <h1 className="mb-6 text-black leading-[48px] tracking-[-0.8px] text-[40px] text-center">
              Welcome to YoinkUI
            </h1>
            <div className="flex flex-col-reverse">
              <div className="grid-cols-1 grid gap-2">
                <button
                  onClick={() => handleGoogleAuth()}
                  type="button"
                  role="button"
                  className="text-black tracking-[0.16px] w-full hover:bg-[#F4F5FB] transition-all bg-white flex relative text-center font-bold justify-center items-center cursor-pointer px-8 py-3 gap-2 border-gray-200 border-[0.8px] rounded-xl"
                >
                  <span className="left-5 flex absolute cursor-pointer">
                    <GoogleIcon />
                  </span>
                  Continue with Google
                </button>
                <button
                  type="button"
                  role="button"
                  onClick={() => handleGithubAuth()}
                  className="text-black tracking-[0.16px] w-full hover:bg-[#F4F5FB] transition-all bg-white flex relative text-center font-bold justify-center items-center cursor-pointer px-8 py-3 gap-2 border-gray-200 border-[0.8px] rounded-xl"
                >
                  <span className="left-5 flex absolute cursor-pointer">
                    <GithubIcon />
                  </span>
                  Continue with Github
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 text-center py-4">
          <div className="text-[#9899a6] leading-[20px] tracking-[-0.07px] text-sm">
            <p className="mb-[10px] min-h-5">
              By continuing you accept our{" "}
              <Link className="cursor-pointer" href="/terms">
                Terms of Use
              </Link>{" "}
              and{" "}
              <a className="cursor-pointer" href="/privacy-policy">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Authenticate;
