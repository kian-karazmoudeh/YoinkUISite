"use client";

import { useState } from "react";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";
import {
  PaddingBottomIcon,
  PaddingHorizontalIcon,
  PaddingLeftIcon,
  PaddingRightIcon,
  PaddingTopIcon,
  PaddingVerticalIcon,
} from "../shared/icons";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";

const Padding = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
    }))
  );
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
          {isExpanded ? (
            <>
              <DraggableInput
                key="p-top"
                value={styleValues["padding-top"]}
                onChange={(value) =>
                  updateComponentStyle("padding-top", value.toString())
                }
                icon={PaddingTopIcon}
              />
              <DraggableInput
                key="p-bottom"
                value={styleValues["padding-bottom"]}
                onChange={(value) =>
                  updateComponentStyle("padding-bottom", value.toString())
                }
                icon={PaddingBottomIcon}
              />
              <DraggableInput
                key="p-left"
                value={styleValues["padding-left"]}
                onChange={(value) =>
                  updateComponentStyle("padding-left", value.toString())
                }
                icon={PaddingLeftIcon}
              />
              <DraggableInput
                key="p-right"
                value={styleValues["padding-right"]}
                onChange={(value) =>
                  updateComponentStyle("padding-right", value.toString())
                }
                icon={PaddingRightIcon}
              />
            </>
          ) : (
            <>
              <DraggableInput
                key="p-horizontal"
                value={
                  styleValues["padding-left"] == styleValues["padding-right"]
                    ? styleValues["padding-left"]
                    : undefined
                }
                onChange={(value) => {
                  updateComponentStyle("padding-left", value.toString());
                  updateComponentStyle("padding-right", value.toString());
                }}
                icon={PaddingHorizontalIcon}
              />
              <DraggableInput
                key="p-vertical"
                value={
                  styleValues["padding-top"] == styleValues["padding-bottom"]
                    ? styleValues["padding-top"]
                    : undefined
                }
                onChange={(value) => {
                  updateComponentStyle("padding-top", value.toString());
                  updateComponentStyle("padding-bottom", value.toString());
                }}
                icon={PaddingVerticalIcon}
              />
            </>
          )}
        </div>
        <ExpandToggle isExpanded={isExpanded} toggleExpand={toggleExpand} />
      </div>
    </div>
  );
};

export default Padding;
