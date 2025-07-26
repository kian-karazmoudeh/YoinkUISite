"use client";

import { ToggleExpand, ToggleShrink } from "./icons";

const ExpandToggle = ({
  isExpanded,
  toggleExpand,
}: {
  isExpanded: boolean;
  toggleExpand: () => void;
}) => {
  return (
    <button
      onClick={toggleExpand}
      className="leading-[1.42857] text-sm shrink-0 fill-black stroke-[1px] flex box-border text-center text-nowrap font-medium whitespace-nowrap justify-center items-center cursor-pointer px-2 gap-[6px] border-transparent border-[0.8px] rounded-lg size-8"
    >
      {isExpanded ? ToggleShrink : ToggleExpand}
    </button>
  );
};

export default ExpandToggle;
