"use client";

import { useState } from "react";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";

const Padding = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label className="text-zinc-400 leading-[16px] text-xs capitalize">
        Padding
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
                  d="M14.9951 14.1025C14.9438 14.6067 14.5177 15 14 15H2L1.89746 14.9951C1.42703 14.9472 1.05278 14.573 1.00488 14.1025L1 14V2L1.00488 1.89746C1.05278 1.42703 1.42703 1.05278 1.89746 1.00488L2 1H14C14.5177 1 14.9438 1.39333 14.9951 1.89746L15 2V14L14.9951 14.1025ZM2.5 2.5V13.5H13.5V2.5H2.5ZM4.2666 12.375V3.625H5.66699V12.375H4.2666ZM10.333 12.375V3.625H11.7334V12.375H10.333Z"
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
                  d="M14.1025 1.00488C14.6067 1.05621 15 1.48232 15 2V14L14.9951 14.1025C14.9472 14.573 14.573 14.9472 14.1025 14.9951L14 15H2L1.89746 14.9951C1.42703 14.9472 1.05278 14.573 1.00488 14.1025L1 14V2C1 1.48232 1.39333 1.05621 1.89746 1.00488L2 1H14L14.1025 1.00488ZM2.5 13.5H13.5V2.5H2.5V13.5ZM12.375 11.7334H3.625V10.333H12.375V11.7334ZM12.375 5.66699H3.625V4.2666H12.375V5.66699Z"
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

export default Padding;
