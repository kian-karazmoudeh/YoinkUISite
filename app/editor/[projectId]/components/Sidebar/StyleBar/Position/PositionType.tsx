import { useEditorStore } from "@/app/editor/[projectId]/store";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { useShallow } from "zustand/react/shallow";

const POSITION_OPTIONS = [
  { value: "static", label: "Static" },
  { value: "relative", label: "Relative" },
  { value: "absolute", label: "Absolute" },
  { value: "fixed", label: "Fixed" },
  { value: "sticky", label: "Sticky" },
];
const PositionType = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <div title="Position" className="grow flex">
      <div className="w-full flex flex-col gap-[6px]">
        <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
          Position
        </label>
        <Select
          value={styleValues["position"]}
          onValueChange={(val) => updateComponentStyle("position", val)}
        >
          <SelectTrigger className="w-full" size="sm">
            {!POSITION_OPTIONS.some(
              (opt) => opt.value == styleValues["position"]
            ) ? (
              <p className="text-zinc-500">Custom</p>
            ) : (
              <SelectValue placeholder="select" />
            )}
          </SelectTrigger>
          <SelectContent>
            {POSITION_OPTIONS.map((opt) => (
              <SelectItem value={opt.value} key={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PositionType;
