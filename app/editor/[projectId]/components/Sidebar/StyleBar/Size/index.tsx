import { useEditorStore } from "@/app/editor/[projectId]/store";
import Category from "../shared/Category";
import DraggableInput from "../shared/DraggableInput";
import { useShallow } from "zustand/react/shallow";
import { ColumnIcon, RowIcon } from "../shared/icons";

const Size = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );

  return (
    <Category title="Size">
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
    </Category>
  );
};

export default Size;
