import Category from "../shared/Category";
import DraggableInput from "../shared/DraggableInput";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { Opacity } from "../shared/icons";
import BoxShadow from "./BoxShadow";
import BackdropFilter from "./BackdropFilter";

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
            value={`${parseFloat(styleValues.opacity) * 100}%`}
            onChange={(val) =>
              updateComponentStyle("opacity", String(parseFloat(val) / 100))
            }
            icon={Opacity}
            min={0}
            max={100}
            unit="%"
          />
        </div>
      </div>
      <div className="grow flex gap-3">
        <BoxShadow />
        <BackdropFilter />
      </div>
    </Category>
  );
};

export default Appearance;
