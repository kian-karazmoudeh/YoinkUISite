"use client";

import { useState } from "react";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";

const Gap = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
    }))
  );
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label className="text-zinc-400 leading-[16px] text-xs capitalize">
        Gap
      </label>
      <div className="w-full flex justify-between gap-2">
        <div className="grow flex items-center gap-3">
          {isExpanded ? (
            <div className="w-full grid grid-cols-2 relative gap-3 items-center">
              <DraggableInput
                value={styleValues["column-gap"]}
                onChange={(val) => updateComponentStyle("column-gap", val)}
                icon={
                  <svg
                    height="16"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    className="text-zinc-400 fill-black stroke-[1px] box-border align-middle overflow-hidden size-4"
                  >
                    <path
                      d="M4.11621 14C4.11621 14.5522 3.6684 14.9999 3.11621 15H0.0078125V13.5H2.61621V2.5H0.0078125V1H3.11621C3.66831 1.00021 4.11621 1.44785 4.11621 2V14ZM7.08203 12.5V3.5H8.58203V12.5H7.08203ZM13.3887 2.5V13.5H15.9971V15H12.8887C12.3365 14.9999 11.8887 14.5522 11.8887 14V2C11.8887 1.44785 12.3366 1.00021 12.8887 1H15.9971V2.5H13.3887Z"
                      className="fill-zinc-400 stroke-[1px] inline box-border"
                    ></path>
                  </svg>
                }
              />
              <DraggableInput
                value={styleValues["row-gap"]}
                onChange={(val) => updateComponentStyle("row-gap", val)}
                icon={
                  <svg
                    height="16"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    className="text-zinc-400 fill-black stroke-[1px] box-border align-middle overflow-hidden size-4"
                  >
                    <path
                      d="M4.11621 14C4.11621 14.5522 3.6684 14.9999 3.11621 15H0.0078125V13.5H2.61621V2.5H0.0078125V1H3.11621C3.66831 1.00021 4.11621 1.44785 4.11621 2V14ZM7.08203 12.5V3.5H8.58203V12.5H7.08203ZM13.3887 2.5V13.5H15.9971V15H12.8887C12.3365 14.9999 11.8887 14.5522 11.8887 14V2C11.8887 1.44785 12.3366 1.00021 12.8887 1H15.9971V2.5H13.3887Z"
                      className="fill-zinc-400 stroke-[1px] inline box-border"
                    ></path>
                  </svg>
                }
              />
            </div>
          ) : (
            <div className="w-full flex items-center">
              <DraggableInput
                value={styleValues["gap"]}
                onChange={(val) => updateComponentStyle("gap", val)}
                icon={
                  <svg
                    height="16"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    className="text-zinc-400 fill-black stroke-[1px] box-border align-middle overflow-hidden size-4"
                  >
                    <path
                      d="M4.11621 14C4.11621 14.5522 3.6684 14.9999 3.11621 15H0.0078125V13.5H2.61621V2.5H0.0078125V1H3.11621C3.66831 1.00021 4.11621 1.44785 4.11621 2V14ZM7.08203 12.5V3.5H8.58203V12.5H7.08203ZM13.3887 2.5V13.5H15.9971V15H12.8887C12.3365 14.9999 11.8887 14.5522 11.8887 14V2C11.8887 1.44785 12.3366 1.00021 12.8887 1H15.9971V2.5H13.3887Z"
                      className="fill-zinc-400 stroke-[1px] inline box-border"
                    ></path>
                  </svg>
                }
              />
            </div>
          )}
        </div>
        <ExpandToggle isExpanded={isExpanded} toggleExpand={toggleExpand} />
      </div>
    </div>
  );
};

export default Gap;
