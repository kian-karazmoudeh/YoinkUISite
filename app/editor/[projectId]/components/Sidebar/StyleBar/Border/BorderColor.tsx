"use client";

import { useState } from "react";
import ExpandToggle from "../shared/ExpandToggle";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";
import { ColorPicker } from "@/components/ui/color-picker";

const BorderColor = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label className="text-zinc-400 leading-[16px] text-xs capitalize">
        Border Color
      </label>
      <div className="w-full flex justify-between gap-2">
        <div
          className="grow grid items-center gap-3"
          style={{
            gridTemplateColumns: isExpanded ? "1fr 1fr" : "1fr",
          }}
        >
          {isExpanded ? (
            <>
              <ColorPicker
                value={styleValues["border-top-color"]}
                onChange={(value) =>
                  updateComponentStyle("border-top-color", value)
                }
              />
              <ColorPicker
                value={styleValues["border-right-color"]}
                onChange={(value) =>
                  updateComponentStyle("border-right-color", value)
                }
              />
              <ColorPicker
                value={styleValues["border-bottom-color"]}
                onChange={(value) =>
                  updateComponentStyle("border-bottom-color", value)
                }
              />
              <ColorPicker
                value={styleValues["border-left-color"]}
                onChange={(value) =>
                  updateComponentStyle("border-left-color", value)
                }
              />
            </>
          ) : (
            <>
              <ColorPicker
                key="border-color-vertical"
                value={
                  styleValues["border-top-color"] ==
                    styleValues["border-bottom-color"] &&
                  styleValues["border-left-color"] ==
                    styleValues["border-right-color"]
                    ? styleValues["border-top-color"]
                    : ""
                }
                onChange={(value) => {
                  updateComponentStyle("border-top-color", value);
                  updateComponentStyle("border-bottom-color", value);
                  updateComponentStyle("border-left-color", value);
                  updateComponentStyle("border-right-color", value);
                }}
              />
            </>
          )}
        </div>
        <ExpandToggle isExpanded={isExpanded} toggleExpand={toggleExpand} />
      </div>
    </div>
  );
};

export default BorderColor;
