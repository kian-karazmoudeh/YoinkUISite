import Link from "next/link";
import { twMerge } from "tailwind-merge";

const SubscribeBtn = ({ className = "", href, onClick }: SubscribeBtnProps) => {
  return (
    <Link
      onClick={() => onClick()}
      href={href}
      className={twMerge(
        "mt-[42px] text-zinc-900 leading-[24px] w-full text-sm  block text-center font-semibold cursor-pointer px-3 py-2 rounded-full glowing",
        className
      )}
    >
      Upgrade
    </Link>
  );
};

export default SubscribeBtn;
