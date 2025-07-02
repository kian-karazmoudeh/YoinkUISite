"use client";

import BasicCard from "./Cards/BasicCard";
import ProCard from "./Cards/Procard";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import MembershipTypeBtn from "./Btns/MembershipTypeBtn";

const PricingSection = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [membershipType, setMembershipType] = useState<"Monthly" | "Annual">(
    "Monthly"
  );

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .finally(() => {
        setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6  lg:px-8">
      <div className="mt-6 flex justify-start">
        <fieldset>
          <div
            className="leading-[20px] gap-x-2 text-xs flex text-center font-semibold p-1"
            id="headlessui-radiogroup-«R1jrn9b»"
            role="radiogroup"
          >
            <MembershipTypeBtn
              selected={membershipType == "Monthly"}
              onChange={() => setMembershipType("Monthly")}
              label="Monthly"
            />
            <MembershipTypeBtn
              selected={membershipType == "Annual"}
              onChange={() => setMembershipType("Annual")}
              label="Annually"
            />
          </div>
        </fieldset>
      </div>
      <div className="mt-16 max-w-md grid-cols-[repeat(1,_minmax(0px,_1fr))] grid mx-auto gap-8  lg:max-w-[none] lg:grid-cols-[repeat(2,_minmax(0px,_1fr))] lg:mx-[0px]">
        <BasicCard type={membershipType} session={session} loading={loading} />
        <ProCard
          type={membershipType}
          session={session}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default PricingSection;
