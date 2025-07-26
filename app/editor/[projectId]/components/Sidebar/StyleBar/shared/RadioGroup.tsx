import React, { useState } from "react";

const ALIGNMENTS = [
  {
    key: "left",
    label: "Align Left",
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
          d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM1 7H1.75H9.25H10V8.5H9.25H1.75H1V7ZM1 12H1.75H11.25H12V13.5H11.25H1.75H1V12Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "center",
    label: "Align Center",
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
          d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM3.5 7.25H4.25H11.75H12.5V8.75H11.75H4.25H3.5V7.25ZM2.5 12.5H3.25H12.75H13.5V14H12.75H3.25H2.5V12.5Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "right",
    label: "Align Right",
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
          d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM6 7.25H6.75H14.25H15V8.75H14.25H6.75H6V7.25ZM4 12.5H4.75H14.25H15V14H14.25H4.75H4V12.5Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "justify",
    label: "Justify",
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
          d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
];

export type Option = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

interface RadioGroupProps {
  value?: string;
  buttons?: Option[];
  onChange?: (key: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  buttons,
  onChange,
}) => {
  const btns = buttons || ALIGNMENTS;
  const [selected, setSelected] = useState<string>(value || btns[0].key);

  return (
    <div className="leading-[1.42857] w-full h-8 text-sm bg-neutral-900 flex p-[2px] gap-[2px] border-zinc-800 border-[0.8px] rounded-md">
      {btns.map((btn) => (
        <button
          key={btn.key}
          className={`text-neutral-200 grow flex text-center justify-center items-center cursor-pointer py-1 rounded-sm`}
          style={{
            backgroundColor: selected === btn.key ? "rgb(32 32 35)" : "",
          }}
          aria-pressed={selected === btn.key}
          onClick={() => {
            setSelected(btn.key);
            onChange?.(btn.key);
          }}
          type="button"
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export default RadioGroup;
