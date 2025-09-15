"use client";
import Squares from "./Squares";
import AddToChrome from "@/components/AddToChromeBtn";
import { motion, Variants } from "framer-motion";
import TestimonialSmall from "./TestimonialSmall";

const Header = () => {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const fadeDownVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2 - i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative lg:border-b lg:border-b-zinc-200">
      <motion.div
        custom={0}
        variants={fadeDownVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        <Squares
          speed={0.025}
          squareSize={60}
          direction="up" // up, down, left, right, diagonal
          borderColor="rgba(12, 140, 233, 0.5)"
          hoverFillColor="rgba(12, 140, 233, 0.5)"
        />
      </motion.div>

      <div className="max-w-3xl relative text-center mx-auto pointer-events-none lg:pb-30 py-32 md:py-48 lg:pt-45 ">
        {/* <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center"
        >
          <Image
            height={48}
            width={163}
            alt="Toolbar"
            src="/landing/Toolbar.png"
            className="h-12 mb-15"
          />
        </motion.div> */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-zinc-900 leading-[1.11111] tracking-[-0.9px] text-4xl font-semibold text-balance md:leading-[1] md:tracking-[-1.8px] md:text-7xl"
        >
          The Web Is Your <br />{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-900">
            Component Library
          </span>
        </motion.div>
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 text-zinc-500 leading-[24px]  text-lg text-balance font-semibold mx-auto  lg:text-xl"
        >
          Copy any UI component from any web page in just one click.
        </motion.div>
        <div className="mt-10 gap-y-[10px] grid justify-center items-center">
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <TestimonialSmall />
          </motion.div>
        </div>
        <div className="mt-10 gap-y-[10px] grid justify-center items-center">
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <AddToChrome />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
