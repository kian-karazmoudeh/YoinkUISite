"use client";

import Image from "next/image";
import { DeviceName } from "../../types";
import Devices from "./Devices";
import ExportBtn from "./ExportBtn";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type EditorNavbarProps = {
  currentDevice: DeviceName;
  setCurrentDevice: (device: DeviceName) => void;
};

const Navbar = ({ currentDevice, setCurrentDevice }: EditorNavbarProps) => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Fetch user on mount
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUser(data.user);
      }
    };

    getUser();

    // Optional: listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex items-center justify-between">
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
            <a className="block cursor-pointer" href="/shugar">
              <span className="relative flex size-[22px] shrink-0 cursor-pointer overflow-hidden rounded-full shadow-[_#27272a_0px_0px_0px_1px]">
                <img
                  className="aspect-[1_/_1] size-full cursor-pointer"
                  alt="tigran tumasov"
                  src={
                    user
                      ? user.user_metadata.avatar_url
                      : "https://placehold.co/460x460"
                  }
                />
              </span>
            </a>
            <p className="text-sm font-medium text-nowrap whitespace-nowrap">
              {user ? user.user_metadata.name : "Anonymous"}
            </p>
          </div>
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
          <div className="flex items-center gap-1 rounded-md px-2 py-1">
            <p className="text-sm font-medium text-nowrap whitespace-nowrap">
              Untitled
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-1">
        <Devices
          currentDevice={currentDevice}
          setCurrentDevice={setCurrentDevice}
        />

        <ExportBtn />
      </div>
    </div>
  );
};

export default Navbar;
