import Image from "next/image";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center absolute inset-0 justify-center h-full z-[9999] bg-zinc-950">
      <div className="text-center">
        <Image
          src="/logo/YoinkUI transparent logo.png"
          alt="Loading"
          width={100}
          height={100}
          className="animate-pulse size-15 mx-auto select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
