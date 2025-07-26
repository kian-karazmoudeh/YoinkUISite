import { useShallow } from "zustand/react/shallow";
import RadioGroup, { Option } from "../shared/RadioGroup";
import Category from "../shared/Category";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { Ban, Type } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DraggableInput from "../shared/DraggableInput";

const DECORATION_BUTTONS: Option[] = [
  {
    key: "none",
    label: "None",
    icon: (
      <Ban className="text-zinc-400 fill-black stroke-[1px] box-border align-middle cursor-pointer overflow-hidden size-4" />
    ),
  },
  {
    key: "underline",
    label: "Underline",
    icon: (
      <svg
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        className="text-zinc-400 fill-black stroke-[1px] box-border align-middle cursor-pointer overflow-hidden size-4"
      >
        <path
          d="M13.75 14.7504H2.25V13.2504H13.75V14.7504ZM5.25 8.00037C5.25009 8.8024 5.54638 9.4272 6.00977 9.85583C6.47885 10.2896 7.16404 10.5629 8 10.5629C8.83596 10.5629 9.52115 10.2896 9.99023 9.85583C10.4536 9.4272 10.7499 8.8024 10.75 8.00037V1.00037H12.25V8.00037C12.2499 9.19792 11.7961 10.2299 11.0098 10.9574C10.2289 11.6796 9.16375 12.0629 8 12.0629C6.83625 12.0629 5.77113 11.6796 4.99023 10.9574C4.20387 10.2299 3.75009 9.19792 3.75 8.00037V1.00037H5.25V8.00037Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "line-through",
    label: "Strikethrough",
    icon: (
      <svg
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        className="text-zinc-400 fill-black stroke-[1px] box-border align-middle cursor-pointer overflow-hidden size-4"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00001 0.583374C6.15186 0.583374 4.89601 1.20742 4.10921 2.08165C3.34402 2.93186 3.08334 3.95168 3.08334 4.66671C3.08334 5.30246 3.25446 5.98764 3.73035 6.62516C3.82673 6.75427 3.934 6.8793 4.05254 7H1.75H1V8.5H1.75H14.25H15V7H14.25H7.01815L6.51769 6.8024C5.6688 6.46724 5.19511 6.07985 4.93239 5.72789C4.67477 5.38278 4.58334 5.0232 4.58334 4.66671C4.58334 4.27063 4.73934 3.62378 5.22415 3.0851C5.68734 2.57044 6.51483 2.08337 8.00001 2.08337C9.99003 2.08337 10.8295 2.95573 11.1785 3.6895L11.5006 4.36679L12.8552 3.72252L12.5331 3.04522C11.9243 1.76535 10.5425 0.583374 8.00001 0.583374ZM12.9167 11.25V10.5H11.4167V11.25C11.4167 11.6491 11.2587 12.3206 10.7686 12.8815C10.302 13.4155 9.47586 13.9167 8.00001 13.9167C6.13953 13.9167 5.27285 13.0402 4.87848 12.3L4.52584 11.638L3.20199 12.3433L3.55464 13.0053C4.18889 14.1958 5.54264 15.4167 8.00001 15.4167C9.85749 15.4167 11.1147 14.7652 11.8981 13.8685C12.658 12.9988 12.9167 11.9621 12.9167 11.25Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "overline",
    label: "Overline",
    icon: (
      <svg
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        className="text-zinc-400 fill-black stroke-[1px] box-border align-middle cursor-pointer overflow-hidden size-4"
      >
        <path
          d="M11.2002 9.25C11.2002 7.48269 9.76731 6.0498 8 6.0498C6.23269 6.0498 4.7998 7.48269 4.7998 9.25C4.7998 11.0173 6.23269 12.4502 8 12.4502V14.25C5.23858 14.25 3 12.0114 3 9.25C3 6.48858 5.23858 4.25 8 4.25C10.7614 4.25 13 6.48858 13 9.25C13 12.0114 10.7614 14.25 8 14.25V12.4502C9.76731 12.4502 11.2002 11.0173 11.2002 9.25Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
        <path
          d="M3 1.25H13V2.75H3V1.25Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
];

const Typography = () => {
  const { styleValues, updateComponentStyle } = useEditorStore(
    useShallow((state) => ({
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
    }))
  );
  return (
    <Category title="Typography">
      <div className="w-full grid grid-cols-2 gap-3">
        <div title="Font weight" className="flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Weight
            </label>
            <Select
              value={styleValues["font-weight"]}
              onValueChange={(val) => updateComponentStyle("font-weight", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "100",
                  "200",
                  "300",
                  "400",
                  "500",
                  "600",
                  "700",
                  "800",
                  "900",
                ].map((opt) => (
                  <SelectItem value={opt} key={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div title="Font size" className="flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Font size
            </label>
            <DraggableInput
              value={styleValues["font-size"]}
              onChange={(val) => updateComponentStyle("font-size", val)}
              icon={
                <Type className="text-zinc-400 align-middle overflow-hidden size-4" />
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-3">
        <div title="Alignment" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Alignment
            </label>
            <RadioGroup
              value={styleValues["text-align"]}
              onChange={(value) => updateComponentStyle("text-align", value)}
            />
          </div>
        </div>
        <div title="Decoration" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Decoration
            </label>
            <RadioGroup
              buttons={DECORATION_BUTTONS}
              value={styleValues["text-decoration"]}
              onChange={(value) =>
                updateComponentStyle("text-decoration", value)
              }
            />
          </div>
        </div>
      </div>
    </Category>
  );
};

export default Typography;
