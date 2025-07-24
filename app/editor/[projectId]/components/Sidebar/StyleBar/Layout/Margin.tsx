"use client";

import { useState } from "react";
import DraggableInput from "../shared/DraggableInput";
import ExpandToggle from "../shared/ExpandToggle";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";
import {
  MarginBottomIcon,
  MarginHorizontalIcon,
  MarginLeftIcon,
  MarginRightIcon,
  MarginTopIcon,
  MarginVerticalIcon,
} from "../shared/icons";

const Margin = () => {
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
        Margin
      </label>
      <div className="w-full flex justify-between gap-2">
        <div className="grow grid grid-cols-2 items-center gap-3">
          {isExpanded ? (
            <>
              <DraggableInput
                value={styleValues["margin-top"]}
                onChange={(value) =>
                  updateComponentStyle("margin-top", value.toString())
                }
                icon={MarginTopIcon}
              />

              <DraggableInput
                value={styleValues["margin-bottom"]}
                onChange={(value) =>
                  updateComponentStyle("margin-bottom", value.toString())
                }
                icon={MarginBottomIcon}
              />
              <DraggableInput
                value={styleValues["margin-left"]}
                onChange={(value) =>
                  updateComponentStyle("margin-left", value.toString())
                }
                icon={MarginLeftIcon}
              />

              <DraggableInput
                value={styleValues["margin-right"]}
                onChange={(value) =>
                  updateComponentStyle("margin-right", value.toString())
                }
                icon={MarginRightIcon}
              />
            </>
          ) : (
            <>
              <DraggableInput
                value={styleValues["margin-left"]}
                onChange={(value) =>
                  updateComponentStyle("margin-left", value.toString())
                }
                icon={MarginHorizontalIcon}
              />

              <DraggableInput
                value={styleValues["margin-right"]}
                onChange={(value) =>
                  updateComponentStyle("margin-right", value.toString())
                }
                icon={MarginVerticalIcon}
              />
            </>
          )}
        </div>
        <ExpandToggle isExpanded={isExpanded} toggleExpand={toggleExpand} />
      </div>
    </div>
  );
};

export default Margin;
