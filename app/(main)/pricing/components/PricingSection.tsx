"use client";

import BasicCard from "./Cards/BasicCard";
import ProCard from "./Cards/Procard";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

const PricingSection = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
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
            <span
              className="text-white leading-[1.5] bg-zinc-700 block cursor-pointer px-[10px] py-1 rounded-md"
              id="headlessui-radio-«R1ljrn9b»"
              role="radio"
            >
              <span className="flex items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="fill-white stroke-[1px] overflow-hidden cursor-pointer size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                    className="fill-white stroke-[1px] inline cursor-pointer"
                  ></path>
                </svg>
                <span className="ml-[6px] block cursor-pointer">Monthly</span>
              </span>
            </span>
            <span
              className="text-zinc-600 leading-[1.5] bg-zinc-100 block cursor-pointer px-[10px] py-1 rounded-md"
              id="headlessui-radio-«R2ljrn9b»"
              role="radio"
            >
              <span className="flex items-center cursor-pointer">
                <span className="block cursor-pointer">Annually</span>
              </span>
            </span>
          </div>
        </fieldset>
      </div>
      <div className="mt-16 max-w-md grid-cols-[repeat(1,_minmax(0px,_1fr))] grid mx-auto gap-8  lg:max-w-[none] lg:grid-cols-[repeat(2,_minmax(0px,_1fr))] lg:mx-[0px]">
        <BasicCard session={session} />
        <ProCard type="Monthly" session={session} />
      </div>
    </div>
  );
};

export default PricingSection;
