"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const PromotionalCard = () => {
  const supabase = createClient();
  const [membership, setMembership] = useState<string | null>("");
  const [yoinksLeft, setYoinksLeft] = useState<number | null>(null);
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
  }, []);

  if (membership == "free") {
    return (
      <div className=" p-6 flex gap-4 justify-center items-center bg-gradient-to-br from-sky-900 via-sky-800 to-blue-900 rounded-md">
        {/* <Crown className="size-10 text-zinc-100" /> */}
        <div className="grow">
          <h1 className="text-zinc-100 text-lg font-bold">
            {yoinksLeft} Left this month
          </h1>
          <p className="text-zinc-300 font-medium text-sm">
            Save hours of design for only $0.5/day
          </p>
          <Button className="bg-zinc-100 text-zinc-900 hover:bg-sky-200 cursor-pointer mt-2">
            <Link href="/pricing">Get Unlimited Yoinks</Link>
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default PromotionalCard;
