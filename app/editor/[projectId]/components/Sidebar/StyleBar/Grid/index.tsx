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

const GRID_OPTIONS: { label: string; value: string }[] = [
  { label: "None", value: "none" },
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
];

const extractGridNumber = (value: string): string | null => {
  // If it's just a number
  if (/^\d+$/.test(value)) {
    return value;
  }
  // If it's in repeat format: repeat(number, anything)
  const match = value.match(/^repeat\((\d+),/);
  if (match) {
    return match[1];
  }
  return null;
};

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
              <SelectTrigger className="w-full" size="sm">
                {!GRID_OPTIONS.some(
                  (opt) => opt.value == styleValues["grid-template-rows"]
                ) ? (
                  <p className="text-zinc-500">
                    {extractGridNumber(
                      styleValues["grid-template-rows"] || ""
                    ) || "Custom"}
                  </p>
                ) : (
                  <SelectValue placeholder="select" />
                )}
              </SelectTrigger>
              <SelectContent>
                {GRID_OPTIONS.map((opt) => (
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
              <SelectTrigger className="w-full" size="sm">
                {!GRID_OPTIONS.some(
                  (opt) => opt.value == styleValues["grid-template-columns"]
                ) ? (
                  <p
                    style={{
                      color: extractGridNumber(
                        styleValues["grid-template-columns"] || ""
                      )
                        ? "white"
                        : "#71717b",
                    }}
                  >
                    {extractGridNumber(
                      styleValues["grid-template-columns"] || ""
                    ) || "Custom"}
                  </p>
                ) : (
                  <SelectValue placeholder="select" />
                )}
              </SelectTrigger>
              <SelectContent>
                {GRID_OPTIONS.map((opt) => (
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
