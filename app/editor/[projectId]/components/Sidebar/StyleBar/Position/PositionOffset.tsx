import { useEditorStore } from "@/app/editor/[projectId]/store";
import DraggableInput from "../shared/DraggableInput";
import { useShallow } from "zustand/react/shallow";
import {
  PaddingTopIcon,
  PaddingRightIcon,
  PaddingBottomIcon,
  PaddingLeftIcon,
} from "../shared/icons";

const Offset = ({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
        {label}
      </label>
      <DraggableInput value={value} onChange={onChange} icon={icon} />
    </div>
  );
};

const OFFSETS = [
  { label: "Top", value: "top", icon: PaddingTopIcon },
  { label: "Right", value: "right", icon: PaddingRightIcon },
  { label: "Bottom", value: "bottom", icon: PaddingBottomIcon },
  { label: "Left", value: "left", icon: PaddingLeftIcon },
];

const PositionOffset = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <div className="grid grid-cols-2 gap-3">
      {OFFSETS.map((offset) => (
        <Offset
          key={offset.value}
          label={offset.label}
          value={styleValues[offset.value]}
          onChange={(val) => updateComponentStyle(offset.value, val)}
          icon={offset.icon}
        />
      ))}
    </div>
  );
};

export default PositionOffset;
