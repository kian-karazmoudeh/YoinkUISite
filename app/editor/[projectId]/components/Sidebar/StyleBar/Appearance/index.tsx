import Category from "../shared/Category";
import DraggableInput from "../shared/DraggableInput";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { BoxShadow, Opacity } from "../shared/icons";

const Appearance = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <Category title="Appearance">
      <div className="w-full flex flex-col gap-[6px]">
        <label className="text-zinc-400 leading-[16px] text-xs capitalize">
          Opacity
        </label>
        <div className="w-full flex justify-between gap-2">
          <DraggableInput
            value={styleValues.opacity}
            onChange={(val) => updateComponentStyle("opacity", val)}
            icon={Opacity}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[6px]">
        <label className="text-zinc-400 leading-[16px] text-xs capitalize">
          Box shadow
        </label>
        <div className="w-full flex justify-between gap-2">
          <DraggableInput
            value={styleValues.color}
            onChange={(val) => updateComponentStyle("color", val)}
            icon={BoxShadow}
          />
        </div>
      </div>
    </Category>
  );
};

export default Appearance;
