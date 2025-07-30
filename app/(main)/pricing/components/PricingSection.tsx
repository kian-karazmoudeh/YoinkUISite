"use client";

import BasicCard from "./Cards/BasicCard";
import EnterpriseCard from "./Cards/EnterpriceCard";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import MembershipTypeBtn from "./Btns/MembershipTypeBtn";

const PricingSection = () => {
  const [userMembership, setUserMembership] = useState<
    "free" | "premium" | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [membershipType, setMembershipType] = useState<"Monthly" | "Annual">(
    "Monthly"
  );

  useEffect(() => {
    setLoading(true);
    const supabase = createClient();
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.log("BYE", error);
        }
        if (session == null) {
          setUserMembership(session);
        } else {
          supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()
            .then(({ data, error }) => {
              if (error) {
                setUserMembership(null);
              } else {
                setUserMembership(data.membership);
              }
            });
        }
      })
      .finally(() => {
        setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session == null) {
          setUserMembership(session);
        } else {
          supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()
            .then(({ data: { membership } }) => {
              setUserMembership(membership);
            });
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
      <div className="mt-16 max-w-md grid-cols-1 grid mx-auto gap-8  lg:max-w-[none] lg:grid-cols-2 lg:mx-[0px]">
        <BasicCard
          type={membershipType}
          userMembership={userMembership}
          loading={loading}
          setLoading={setLoading}
        />
        <EnterpriseCard />
      </div>
    </div>
  );
};

export default PricingSection;
