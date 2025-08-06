import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";
import Category from "../shared/Category";

const Grid = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyleProperty,
    }))
  );
  return (
    <Category title="Grid">
      <div className="w-full flex flex-wrap gap-3">
        <div title="Rows" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Rows
            </label>
            <Select
              value={styleValues["grid-template-rows"]}
              onValueChange={(val) =>
                updateComponentStyle("grid-template-rows", val)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "1", value: "repeat(1, minmax(0, 1fr))" },
                  { label: "2", value: "repeat(2, minmax(0, 1fr))" },
                  { label: "3", value: "repeat(3, minmax(0, 1fr))" },
                  { label: "4", value: "repeat(4, minmax(0, 1fr))" },
                  { label: "5", value: "repeat(5, minmax(0, 1fr))" },
                  { label: "6", value: "repeat(6, minmax(0, 1fr))" },
                  { label: "7", value: "repeat(7, minmax(0, 1fr))" },
                  { label: "8", value: "repeat(8, minmax(0, 1fr))" },
                  { label: "9", value: "repeat(9, minmax(0, 1fr))" },
                  { label: "10", value: "repeat(10, minmax(0, 1fr))" },
                  { label: "11", value: "repeat(11, minmax(0, 1fr))" },
                  { label: "12", value: "repeat(12, minmax(0, 1fr))" },
                ].map((opt) => (
                  <SelectItem value={opt.value} key={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div title="Columns" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Columns
            </label>
            <Select
              value={styleValues["grid-template-columns"]}
              onValueChange={(val) =>
                updateComponentStyle("grid-template-columns", val)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "1", value: "repeat(1, minmax(0, 1fr))" },
                  { label: "2", value: "repeat(2, minmax(0, 1fr))" },
                  { label: "3", value: "repeat(3, minmax(0, 1fr))" },
                  { label: "4", value: "repeat(4, minmax(0, 1fr))" },
                  { label: "5", value: "repeat(5, minmax(0, 1fr))" },
                  { label: "6", value: "repeat(6, minmax(0, 1fr))" },
                  { label: "7", value: "repeat(7, minmax(0, 1fr))" },
                  { label: "8", value: "repeat(8, minmax(0, 1fr))" },
                  { label: "9", value: "repeat(9, minmax(0, 1fr))" },
                  { label: "10", value: "repeat(10, minmax(0, 1fr))" },
                  { label: "11", value: "repeat(11, minmax(0, 1fr))" },
                  { label: "12", value: "repeat(12, minmax(0, 1fr))" },
                ].map((opt) => (
                  <SelectItem value={opt.value} key={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Category>
  );
};

export default Grid;
