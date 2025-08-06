"use client";

import { useState } from "react";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import {
  BorderBottom,
  BorderLeft,
  BorderRight,
  BorderTop,
  BorderWidthIcon,
} from "../shared/icons";

const BorderWidth = () => {
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
    <div className="w-full flex justify-between gap-2">
      <div className="grow flex items-center gap-3">
        {isExpanded ? (
          <div className="w-full grid grid-cols-2 relative gap-3 items-center">
            <DraggableInput
              key="border-top-width"
              value={styleValues["border-top-width"]}
              onChange={(val) => updateComponentStyle("border-top-width", val)}
              icon={BorderTop}
            />
            <DraggableInput
              key="border-bottom-width"
              value={styleValues["border-bottom-width"]}
              onChange={(val) =>
                updateComponentStyle("border-bottom-width", val)
              }
              icon={BorderBottom}
            />
            <DraggableInput
              key="border-left-width"
              value={styleValues["border-left-width"]}
              onChange={(val) => updateComponentStyle("border-left-width", val)}
              icon={BorderLeft}
            />
            <DraggableInput
              key="border-right-width"
              value={styleValues["border-right-width"]}
              onChange={(val) =>
                updateComponentStyle("border-right-width", val)
              }
              icon={BorderRight}
            />
          </div>
        ) : (
          <div className="w-full flex items-center">
            <DraggableInput
              value={
                (styleValues["border-top-width"] ===
                  styleValues["border-bottom-width"] &&
                  styleValues["border-left-width"] ===
                    styleValues["border-right-width"]) ||
                (styleValues["border-top-width"] ===
                  styleValues["border-left-width"] &&
                  styleValues["border-bottom-width"] ===
                    styleValues["border-right-width"])
                  ? styleValues["border-top-width"]
                  : undefined
              }
              onChange={(val) => {
                updateComponentStyle("border-top-width", val);
                updateComponentStyle("border-bottom-width", val);
                updateComponentStyle("border-left-width", val);
                updateComponentStyle("border-right-width", val);
              }}
              icon={BorderWidthIcon}
            />
          </div>
        )}
      </div>
      <ExpandToggle isExpanded={isExpanded} toggleExpand={toggleExpand} />
    </div>
  );
};

export default BorderWidth;
