"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Yearly from "./Cards/Yearly";
import Monthly from "./Cards/Monthly";

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
      .then(({ data: { session } }) => {
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
      <div className="mt-16 max-w-md grid-cols-1 grid mx-auto gap-8  lg:max-w-[none] lg:grid-cols-2 lg:mx-[0px]">
        <Yearly
          userMembership={userMembership}
          loading={loading}
          setLoading={setLoading}
        />
        <Monthly
          userMembership={userMembership}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default PricingSection;
