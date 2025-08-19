import { ColorPicker } from "@/components/ui/color-picker";
import Category from "../shared/Category";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";

const Color = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <Category title="Color">
      <div className="w-full flex gap-3">
        <div className="w-full flex flex-col gap-[6px]">
          <label className="text-zinc-400 leading-[16px] text-xs capitalize">
            Background
          </label>
          <div className="w-full flex justify-between gap-2">
            <ColorPicker
              value={styleValues["background-color"]}
              onChange={(color) =>
                updateComponentStyle("background-color", color)
              }
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-[6px]">
          <label className="text-zinc-400 leading-[16px] text-xs capitalize">
            Text
          </label>
          <div className="w-full flex justify-between gap-2">
            <ColorPicker
              value={styleValues.color}
              onChange={(color) => updateComponentStyle("color", color)}
            />
          </div>
        </div>
      </div>
    </Category>
  );
};

export default Color;
