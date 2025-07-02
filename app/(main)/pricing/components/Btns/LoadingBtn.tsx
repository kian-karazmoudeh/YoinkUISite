import { Loader2 } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const LoadingBtn = ({ className = "" }: BtnProps) => {
  return (
    <button
      type="button"
      className="mt-[42px] w-full bg-transparent flex relative text-center flex-col items-center"
    >
      <Link
        href="#"
        className={twMerge(
          "text-white leading-[24px] w-full z-[10] gap-x-1 text-sm bg-blue-600 shadow-[_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold justify-center items-center cursor-pointer px-3 py-2 rounded-full",
          className
        )}
      >
        <span className="block cursor-pointer">
          <Loader2 className="animate-spin text-sm" />
        </span>
      </Link>
    </button>
  );
};

export default LoadingBtn;
