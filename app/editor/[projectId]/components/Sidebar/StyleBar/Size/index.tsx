import { useEditorStore } from "@/app/editor/[projectId]/store";
import Category from "../shared/Category";
import DraggableInput from "../shared/DraggableInput";
import { useShallow } from "zustand/react/shallow";
import { ColumnIcon, RowIcon } from "../shared/icons";
import { useState } from "react";
import { Ellipsis } from "lucide-react";

const MinWidthIcon = (
  <span className="text-zinc-400 text-xs font-medium">Min W</span>
);

const MinHeightIcon = (
  <span className="text-zinc-400 text-xs font-medium">Min H</span>
);

const MaxWidthIcon = (
  <span className="text-zinc-400 text-xs font-medium">Max W</span>
);

const MaxHeightIcon = (
  <span className="text-zinc-400 text-xs font-medium">Max H</span>
);

const Size = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );

  return (
    <Category
      title="Size"
      icon={
        <Ellipsis
          className="w-4 h-4 cursor-pointer"
          style={{
            color: isExpanded ? "white" : "#9f9fa9",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      }
    >
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-between gap-2">
          <div className="grow grid grid-cols-2 items-center gap-3">
            <DraggableInput
              value={styleValues.width}
              onChange={(value) =>
                updateComponentStyle("width", value.toString())
              }
              icon={RowIcon}
            />
            <DraggableInput
              value={styleValues.height}
              onChange={(value) =>
                updateComponentStyle("height", value.toString())
              }
              icon={ColumnIcon}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-2 gap-3">
            <DraggableInput
              value={styleValues["min-width"]}
              onChange={(value) =>
                updateComponentStyle("min-width", value.toString())
              }
              icon={MinWidthIcon}
            />
            <DraggableInput
              value={styleValues["min-height"]}
              onChange={(value) =>
                updateComponentStyle("min-height", value.toString())
              }
              icon={MinHeightIcon}
            />
            <DraggableInput
              value={styleValues["max-width"]}
              onChange={(value) =>
                updateComponentStyle("max-width", value.toString())
              }
              icon={MaxWidthIcon}
            />
            <DraggableInput
              value={styleValues["max-height"]}
              onChange={(value) =>
                updateComponentStyle("max-height", value.toString())
              }
              icon={MaxHeightIcon}
            />
          </div>
        )}
      </div>
    </Category>
  );
};

export default Size;
