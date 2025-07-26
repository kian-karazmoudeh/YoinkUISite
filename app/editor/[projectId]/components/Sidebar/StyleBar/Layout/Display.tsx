import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";

const Display = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
    }))
  );
  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label className="text-zinc-400 leading-[16px] text-xs capitalize">
        Display
      </label>
      <div className="w-full flex justify-between gap-2">
        <div className="grow flex items-center gap-3">
          <div className="w-full relative">
            <Select
              value={styleValues["display"]}
              onValueChange={(val) => updateComponentStyle("display", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "block",
                  "inline",
                  "inline-block",
                  "flex",
                  "inline-flex",
                  "grid",
                  "none",
                ].map((opt) => (
                  <SelectItem value={opt} key={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
