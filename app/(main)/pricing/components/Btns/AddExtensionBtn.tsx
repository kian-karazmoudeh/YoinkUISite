import ChromeIcon from "@/components/Icons/ChromeIcon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const AddExtensionBtn = ({ className = "" }: BtnProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        "mt-[42px] w-full bg-transparent flex relative text-center flex-col items-center",
        className
      )}
    >
      <Link
        href="#"
        className="text-sky-950 leading-[24px] w-full z-[10] gap-x-1 text-sm bg-sky-100 shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold justify-center items-center cursor-pointer px-3 py-2 rounded-[2.68435e+07px]"
      >
        <ChromeIcon className="size-5 fill-sky-950" />
        <span className="block cursor-pointer">Add Extension</span>
      </Link>
    </button>
  );
};

export default AddExtensionBtn;
