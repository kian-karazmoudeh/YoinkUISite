"use client";

import Image from "next/image";
import Devices from "./Devices";
import ExportBtn from "./ExportBtn";
import { User } from "@supabase/supabase-js";
import { Skeleton } from "@/components/ui/skeleton";
import FileName from "./FileName";
import SaveBtn from "./SaveBtn";
import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import UserPopover from "./UserPopover";

type EditorNavbarProps = {
  user: User | null;
  membership: string | null;
};

const LoadingUser = () => {
  return (
    <div className="flex min-w-0 items-center gap-2 opacity-50">
      <div className="block cursor-pointer">
        <span className="relative flex size-[22px] shrink-0 cursor-pointer overflow-hidden rounded-full shadow-[_#27272a_0px_0px_0px_1px]">
          <Skeleton className="size-full" />
        </span>
      </div>
      <Skeleton className="w-15 h-2" />
    </div>
  );
};

const Navbar = ({ user, membership }: EditorNavbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Link
            className="flex size-[30px] cursor-pointer items-center justify-center rounded-full"
            title="Right-click for brand assets menu"
            href="/editor"
          >
            <div className="relative size-full cursor-pointer">
              <Image
                src="/logo/YoinkUI.png"
                alt="logo"
                fill
                className="size-full rounded-full"
              />
            </div>
          </Link>
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
          {!user ? (
            <LoadingUser />
          ) : (
            <UserPopover user={user} membership={membership} />
          )}
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
          <FileName />
        </div>
      </div>
      <div className="flex items-center gap-1 flex-1">
        <Devices />
        <SaveBtn />
        <ExportBtn />
      </div>
    </div>
  );
};

export default Navbar;
