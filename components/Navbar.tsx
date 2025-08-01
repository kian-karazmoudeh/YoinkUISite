"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const links: { href: string; label: string }[] = [
  // { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#howitworks" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact us", href: "/contact-us" },
];

const ArrowIcon = (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-[21px] fill-[none] stroke-[1px] overflow-hidden cursor-pointer"
  >
    <circle
      cx="10"
      cy="10.9469"
      r="10"
      className="fill-neutral-800 stroke-[1px] inline cursor-pointer"
    ></circle>
    <mask
      id="mask0_1_567"
      x="0"
      y="0"
      width="20"
      height="21"
      className="w-5 h-[21px] fill-[none] stroke-[1px] inline cursor-pointer"
    >
      <circle
        cx="10"
        cy="10.9469"
        r="10"
        className="fill-neutral-800 stroke-[1px] inline cursor-pointer"
      ></circle>
    </mask>
    <g className="fill-[none] stroke-[1px] inline cursor-pointer">
      <path
        d="M4.78544 8.12311L12.8231 8.12311M12.8231 8.12311L12.8231 16.1608M12.8231 8.12311L3.1779 17.7683"
        strokeLinecap="square"
        className="fill-[none] stroke-[1.3px] stroke-white inline cursor-pointer"
      ></path>
    </g>
  </svg>
);

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const { scrollY } = useScroll();
  const supabase = createClient();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const current = latest;
    const previous = lastScrollY;

    // Check if at top of page
    setIsAtTop(current <= 10);

    if (current > previous && current > 100) {
      // Scrolling down and past 100px
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(current);
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        return data.user;
      }
      return null;
    };

    getUser();

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Screen is large, close the sidebar
        setShowSidebar(false);
      }
    };

    // Add listener
    mediaQuery.addEventListener("change", handleMediaChange);

    // Run once on mount in case it's already large
    if (mediaQuery.matches) {
      setShowSidebar(false);
    }

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <>
      <motion.div
        className={`w-full max-w-304 top-0 z-[12] flex fixed justify-between items-center [translate:0px] mx-auto inset-x-0 lg:mt-5 rounded-full transition-all duration-300 `}
        style={{
          backgroundColor: isAtTop ? "transparent" : "rgba(255, 255, 255, 0.3)",
          boxShadow: isAtTop ? "none" : "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          backdropFilter: isAtTop ? "none" : "blur(10px)",
          maxWidth: isAtTop ? "1216px" : "1190px",
          top: isAtTop ? "10px" : "20px",
        }}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <header className="w-full relative">
          <nav className="text-stone-950 leading-[1.5] font-[Aeonik,_sans-serif] flex justify-between items-center p-2">
            <div className="mt-[-2px] ml-2 grow-[1] flex">
              <Link
                className="gap-x-[2px] flex items-center cursor-pointer"
                href="/"
              >
                <Image
                  width={28}
                  height={28}
                  src="/logo/yoinkUI.svg"
                  alt="YoinkUI Logo"
                  className="size-7 mt-1 cursor-pointer"
                />

                <span className="mt-[6px] leading-[1.55556] text-lg block font-medium cursor-pointer">
                  YoinkUI
                </span>
              </Link>
            </div>
            <div className="md:hidden flex justify-center content-center">
              <button
                type="button"
                onClick={() => setShowSidebar(true)}
                className="text-zinc-700 bg-transparent inline-flex text-center cursor-pointer justify-center items-center m-[-10px] p-[10px] rounded-md"
              >
                <span className="block absolute text-nowrap whitespace-nowrap overflow-hidden cursor-default m-[-1px] size-px">
                  Open main menu
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="mr-1 fill-zinc-700 stroke-[1px] overflow-hidden cursor-default size-[22px]"
                >
                  <path
                    d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
                    className="fill-zinc-700 stroke-[1px] inline cursor-default"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="gap-x-12 md:flex hidden">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  className="text-zinc-900 leading-[24px] text-sm block font-semibold cursor-pointer"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="gap-x-5 grow-[1] md:flex hidden justify-end items-center">
              {user ? (
                <Link
                  className="text-white leading-[24px] gap-x-1 text-sm bg-black flex font-semibold cursor-pointer px-4 py-1 rounded-[2.68435e+07px]"
                  href="/editor"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  className="text-white leading-[24px] gap-x-1 text-sm bg-black flex font-semibold cursor-pointer px-4 py-1 rounded-[2.68435e+07px]"
                  href="https://chromewebstore.google.com/detail/yoinkui/ihlkclcengelgcfkkmpkhgadepmgijkk"
                >
                  Add to Chrome / Edge
                  {ArrowIcon}
                </Link>
              )}
            </div>
          </nav>
        </header>
      </motion.div>
      <Sidebar
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        links={links}
      />
    </>
  );
};

export default Navbar;
