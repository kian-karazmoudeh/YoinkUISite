import { useEditorStore } from "@/app/editor/[projectId]/store/editorStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { BoxShadow as BoxShadowIcon } from "../shared/icons";

const BOX_SHADOW_OPTIONS: { label: string; value: string }[] = [
  { label: "None", value: "none" },
  { label: "Small", value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
  {
    label: "Medium",
    value:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  {
    label: "Large",
    value:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
];

const BoxShadow = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <div title="Box Shadow" className="grow flex">
      <div className="w-full flex flex-col gap-[6px]">
        <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
          Box Shadow
        </label>
        <Select
          value={styleValues["box-shadow"]}
          onValueChange={(val) => updateComponentStyle("box-shadow", val)}
        >
          <SelectTrigger className="w-full" size="sm">
            {BoxShadowIcon}
            {!BOX_SHADOW_OPTIONS.some(
              (opt) => opt.value == styleValues["box-shadow"]
            ) ? (
              <p className="text-zinc-500"> Custom</p>
            ) : (
              <SelectValue placeholder="select" />
            )}
          </SelectTrigger>
          <SelectContent>
            {BOX_SHADOW_OPTIONS.map((opt) => (
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

export default BoxShadow;
