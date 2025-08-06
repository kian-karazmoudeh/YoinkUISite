"use client";

import { useState } from "react";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { GapIcon } from "../shared/icons";

const Gap = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
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
                key="column-gap"
                value={styleValues["column-gap"]}
                onChange={(val) => updateComponentStyle("column-gap", val)}
                icon={GapIcon}
              />
              <DraggableInput
                key="row-gap"
                value={styleValues["row-gap"]}
                onChange={(val) => updateComponentStyle("row-gap", val)}
                icon={<div className="rotate-90">{GapIcon}</div>}
              />
            </div>
          ) : (
            <div className="w-full flex items-center">
              <DraggableInput
                key="both-gap"
                value={
                  styleValues["row-gap"] == styleValues["column-gap"]
                    ? styleValues["row-gap"]
                    : undefined
                }
                onChange={(val) => {
                  updateComponentStyle("row-gap", val);
                  updateComponentStyle("column-gap", val);
                }}
                icon={GapIcon}
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
