"use client";

import { useState } from "react";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";

const Margin = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label className="text-zinc-400 leading-[16px] text-xs capitalize">
        Margin
      </label>
      <div className="w-full flex justify-between gap-2">
        <div className="grow grid grid-cols-2 items-center gap-3">
          <DraggableInput
            icon={
              <svg
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
                className="text-zinc-400 fill-black stroke-[1px] box-border align-middle overflow-hidden size-4"
              >
                <path
                  d="M14 1V15H12.5V1H14ZM5.00488 5.89746C5.05621 5.39333 5.48232 5 6 5H10L10.1025 5.00488C10.573 5.05278 10.9472 5.42703 10.9951 5.89746L11 6V10L10.9951 10.1025C10.9472 10.573 10.573 10.9472 10.1025 10.9951L10 11H6C5.48232 11 5.05621 10.6067 5.00488 10.1025L5 10V6L5.00488 5.89746ZM9.5 9.5V6.5H6.5L6.5 9.5H9.5ZM3.5 1L3.5 15H2L2 1H3.5Z"
                  className="fill-zinc-400 stroke-[1px] inline box-border"
                ></path>
              </svg>
            }
          />

          <DraggableInput
            icon={
              <svg
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
                className="text-zinc-400 fill-black stroke-[1px] box-border align-middle overflow-hidden size-4"
              >
                <path
                  d="M15 14H1V12.5H15V14ZM10.1025 5.00488C10.6067 5.05621 11 5.48232 11 6V10L10.9951 10.1025C10.9472 10.573 10.573 10.9472 10.1025 10.9951L10 11H6L5.89746 10.9951C5.42703 10.9472 5.05278 10.573 5.00488 10.1025L5 10V6C5 5.48232 5.39333 5.05621 5.89746 5.00488L6 5H10L10.1025 5.00488ZM6.5 9.5H9.5V6.5H6.5V9.5ZM15 3.5H1V2H15V3.5Z"
                  className="fill-zinc-400 stroke-[1px] inline box-border"
                ></path>
              </svg>
            }
          />
        </div>
        <ExpandToggle isExpanded={isExpanded} toggleExpand={toggleExpand} />
      </div>
    </div>
  );
};

export default Margin;
