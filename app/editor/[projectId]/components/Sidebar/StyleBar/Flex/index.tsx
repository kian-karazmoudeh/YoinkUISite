import Category from "../shared/Category";
import RadioGroup, { Option } from "../shared/RadioGroup";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";
import { ColumnIcon, RowIcon } from "../shared/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FLEX_DIRECTION_BUTTONS: Option[] = [
  { label: "Row", key: "row", icon: RowIcon },
  { label: "Column", key: "column", icon: ColumnIcon },
];

const Flex = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
    }))
  );
  return (
    <Category title="Flex">
      <div title="Direction" className="grow flex">
        <div className="w-full flex flex-col gap-[6px]">
          <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
            Direction
          </label>
          <RadioGroup
            buttons={FLEX_DIRECTION_BUTTONS}
            value={styleValues["flex-direction"]}
            onChange={(value) => updateComponentStyle("flex-direction", value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-3">
        <div title="Justify Content" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Justify Content
            </label>
            <Select
              value={styleValues["justify-content"]}
              onValueChange={(val) =>
                updateComponentStyle("justify-content", val)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "Flex Start", value: "flex-start" },
                  { label: "Flex End", value: "flex-end" },
                  { label: "Center", value: "center" },
                  { label: "Space Between", value: "space-between" },
                  { label: "Space Around", value: "space-around" },
                  { label: "Space Evenly", value: "space-evenly" },
                ].map((opt) => (
                  <SelectItem value={opt.value} key={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div title="Align Items" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Align Items
            </label>
            <Select
              value={styleValues["align-items"]}
              onValueChange={(val) => updateComponentStyle("align-items", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "Flex Start", value: "flex-start" },
                  { label: "Flex End", value: "flex-end" },
                  { label: "Center", value: "center" },
                  { label: "Stretch", value: "stretch" },
                  { label: "Baseline", value: "baseline" },
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

export default Flex;
