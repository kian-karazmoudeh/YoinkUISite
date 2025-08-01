"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, LogOut, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const Profile = ({ user }: { user: User | null }) => {
  const [membership, setMembership] = useState<string | null>(null);
  const [yoinksLeft, setYoinksLeft] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();
        setMembership(profileData?.membership);
        return data.user;
      }
      return null;
    };

    getProfile().then(async (user) => {
      if (user) {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { count } = await supabase
          .from("yoinks")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", startOfMonth.toISOString());

        if (count) {
          setYoinksLeft(5 - count);
        }
      }
    });
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const isPremium = membership === "pro" || membership === "premium";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex min-w-0 items-center gap-2 cursor-pointer">
          <span className="relative flex size-[22px] shrink-0 overflow-hidden rounded-full shadow-[_#27272a_0px_0px_0px_1px]">
            <img
              className="aspect-[1_/_1] size-full"
              alt={user.user_metadata.name || "Anonymous"}
              src={
                user.user_metadata.avatar_url || "https://placehold.co/460x460"
              }
            />
          </span>
          <p className="text-sm font-semibold text-nowrap whitespace-nowrap">
            {user.user_metadata.name || "Anonymous"}
          </p>
          <Badge className="capitalize">{membership}</Badge>
          <ChevronsUpDown className="size-4 text-zinc-300" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-zinc-900 border-zinc-800 text-zinc-100 w-70 p-3"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-zinc-700">
              <img
                className="aspect-[1_/_1] size-full"
                alt={user.user_metadata.name || "Anonymous"}
                src={
                  user.user_metadata.avatar_url ||
                  "https://placehold.co/460x460"
                }
              />
            </span>
            <div className="overflow-hidden">
              <div className="font-semibold text-sm text-zinc-100 overflow-hidden text-ellipsis whitespace-nowrap">
                {user.email || "Anonymous"}
              </div>
              <div className="space-x-2">
                <Badge className="capitalize mt-1" variant="secondary">
                  {membership}
                </Badge>
                {!isPremium ? (
                  <Badge className="capitalize mt-1" variant="default">
                    {yoinksLeft} left this month
                  </Badge>
                ) : (
                  <Badge className="capitalize mt-1" variant="default">
                    Unlimited yoinks
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 my-2" />
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" /> Sign out
          </Button>
          {!isPremium ? (
            <Link href="/pricing">
              <Button
                asChild
                variant="default"
                className="w-full justify-start gap-2 bg-sky-700 hover:bg-blue-700 cursor-pointer text-white border-none"
              >
                <span>
                  <ArrowUpRight className="size-4" /> Upgrade to Pro
                </span>
              </Button>
            </Link>
          ) : (
            <Link href="/api/stripe/portal">
              <Button
                variant="ghost"
                className="w-full flex justify-start gap-2 cursor-pointer text-zinc-100 border-none"
              >
                Manage Subscription
              </Button>
            </Link>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
