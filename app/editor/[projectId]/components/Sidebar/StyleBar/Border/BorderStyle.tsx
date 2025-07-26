"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { PatternIcon } from "../shared/icons";
import { SquareRoundCorner } from "lucide-react";

const BorderStyle = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
    }))
  );
  return (
    <div className="grow flex gap-3">
      <div title="Border Style" className="w-full flex flex-col gap-[6px]">
        <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
          Border Style
        </label>
        <Select
          value={
            styleValues["border-top-style"] ==
              styleValues["border-bottom-style"] &&
            styleValues["border-left-style"] ==
              styleValues["border-right-style"] &&
            styleValues["border-top-style"] ==
              styleValues["border-left-style"] &&
            styleValues["border-bottom-style"] ==
              styleValues["border-right-style"]
              ? styleValues["border-top-style"]
              : undefined
          }
          onValueChange={(val) => {
            updateComponentStyle("border-top-style", val);
            updateComponentStyle("border-bottom-style", val);
            updateComponentStyle("border-left-style", val);
            updateComponentStyle("border-right-style", val);
          }}
        >
          <SelectTrigger className="w-full">
            {PatternIcon}
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            {[
              { label: "Solid", value: "solid" },
              { label: "Dashed", value: "dashed" },
              { label: "Dotted", value: "dotted" },
              { label: "Double", value: "double" },
            ].map((opt) => (
              <SelectItem value={opt.value} key={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div title="Border radius" className="w-full flex flex-col gap-[6px]">
        <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
          Border radius
        </label>
        <Select
          value={
            styleValues["border-top-right-radius"] ==
              styleValues["border-top-left-radius"] &&
            styleValues["border-bottom-right-radius"] ==
              styleValues["border-bottom-left-radius"] &&
            styleValues["border-bottom-left-radius"] ==
              styleValues["border-top-right-radius"] &&
            styleValues["border-top-left-radius"] ==
              styleValues["border-bottom-right-radius"]
              ? styleValues["border-top-right-radius"]
              : undefined
          }
          onValueChange={(val) => {
            updateComponentStyle("border-top-right-radius", val);
            updateComponentStyle("border-top-left-radius", val);
            updateComponentStyle("border-bottom-right-radius", val);
            updateComponentStyle("border-bottom-left-radius", val);
          }}
        >
          <SelectTrigger className="w-full">
            <SquareRoundCorner />
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            {[
              { label: "0px", value: "0px" },
              { label: "10px", value: "10px" },
              { label: "20px", value: "20px" },
              { label: "30px", value: "30px" },
              { label: "40px", value: "40px" },
              { label: "50px", value: "50px" },
              { label: "60px", value: "60px" },
              { label: "70px", value: "70px" },
              { label: "80px", value: "80px" },
              { label: "90px", value: "90px" },
            ].map((opt) => (
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

export default BorderStyle;
