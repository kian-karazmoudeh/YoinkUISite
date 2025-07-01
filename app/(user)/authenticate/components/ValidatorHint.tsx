"use client";

import { twMerge } from "tailwind-merge";

const ValidatorHint = ({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        "text-sm text-rose-500",
        visible ? "visible" : "invisible hidden"
      )}
    >
      {children}
    </p>
  );
};

export default ValidatorHint;
