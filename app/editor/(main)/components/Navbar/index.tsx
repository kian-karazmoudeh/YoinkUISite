import Image from "next/image";
import Profile from "./Profile";
import { User } from "@supabase/supabase-js";

const Navbar = ({ user }: { user: User | null }) => {
  return (
    <div className="flex items-center justify-between px-4 py-6 text-zinc-50">
      <div className="flex items-center gap-2">
        <div className="relative">
          <a
            className="flex size-[30px] cursor-pointer items-center justify-center rounded-full"
            title="Right-click for brand assets menu"
            href="/home"
          >
            <div className="relative size-full cursor-pointer">
              <Image
                src="/logo/YoinkUI.png"
                alt="logo"
                fill
                className="size-full rounded-full"
              />
            </div>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <svg
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            className="size-[22px] overflow-hidden fill-zinc-800 stroke-[1px] text-zinc-800"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
              className="inline fill-zinc-800 stroke-[1px]"
            ></path>
          </svg>
          <div className="flex min-w-0 items-center gap-2">
            <p className="text-sm font-medium text-nowrap whitespace-nowrap">
              Home
            </p>
          </div>
        </div>
      </div>
      <Profile user={user} />
    </div>
  );
};

export default Navbar;
