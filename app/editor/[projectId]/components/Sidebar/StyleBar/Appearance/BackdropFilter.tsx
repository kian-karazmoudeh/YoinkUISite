import { useEditorStore } from "@/app/editor/[projectId]/store/editorStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { PatternIcon } from "../shared/icons";

const BACKDROP_FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: "None", value: "none" },
  { label: "Small", value: "blur(10px)" },
  {
    label: "Medium",
    value: "blur(20px)",
  },
  {
    label: "Large",
    value: "blur(30px)",
  },
];

const BackdropFilter = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <div title="Backdrop Filter" className="grow flex">
      <div className="w-full flex flex-col gap-[6px]">
        <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
          Backdrop Filter
        </label>
        <Select
          value={styleValues["backdrop-filter"]}
          onValueChange={(val) => updateComponentStyle("backdrop-filter", val)}
        >
          <SelectTrigger className="w-full" size="sm">
            {PatternIcon}
            {!BACKDROP_FILTER_OPTIONS.some(
              (opt) => opt.value == styleValues["backdrop-filter"]
            ) ? (
              <p className="text-zinc-500"> Custom</p>
            ) : (
              <SelectValue placeholder="select" />
            )}
          </SelectTrigger>
          <SelectContent>
            {BACKDROP_FILTER_OPTIONS.map((opt) => (
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

export default BackdropFilter;
