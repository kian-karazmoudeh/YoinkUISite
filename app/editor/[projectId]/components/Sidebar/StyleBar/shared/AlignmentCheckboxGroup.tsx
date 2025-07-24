import React, { useState } from "react";

const ALIGNMENTS = [
  {
    key: "left",
    label: "Align Left",
    svg: (
      <svg
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        className="text-zinc-400 opacity-[0.5] align-middle cursor-pointer overflow-hidden size-4"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.46967 9.09099L5 9.62132L6.06066 8.56066L5.53033 8.03033L3.56063 6.06063H10.125C11.989 6.06063 13.5 7.57167 13.5 9.43563C13.5 11.2996 11.989 12.8106 10.125 12.8106H4.5H3.75V14.3106H4.5H10.125C12.8174 14.3106 15 12.128 15 9.43563C15 6.74324 12.8174 4.56063 10.125 4.56063H3.56069L5.53033 2.59099L6.06066 2.06066L5 1L4.46967 1.53033L1.21967 4.78033C0.926777 5.07322 0.926777 5.5481 1.21967 5.84099L4.46967 9.09099Z"
          className="fill-zinc-400 inline cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "center",
    label: "Align Center",
    svg: (
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
    key: "right",
    label: "Align Right",
    svg: (
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
    key: "justify",
    label: "Justify",
    svg: (
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
    key: "full",
    label: "Full Align",
    svg: (
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

export type CheckboxButton = {
  key: string;
  label: string;
  svg: React.ReactNode;
};

interface AlignmentCheckboxGroupProps {
  buttons?: CheckboxButton[];
}

const AlignmentCheckboxGroup: React.FC<AlignmentCheckboxGroupProps> = ({
  buttons,
}) => {
  const btns = buttons || ALIGNMENTS;
  const [selected, setSelected] = useState<string>(btns[0].key);

  return (
    <div className="leading-[1.42857] w-full h-8 text-sm bg-neutral-900 flex p-[2px] gap-[2px] border-zinc-800 border-[0.8px] rounded-md">
      {btns.map((btn) => (
        <button
          key={btn.key}
          className={`text-neutral-200 grow flex text-center justify-center items-center cursor-pointer py-1 rounded-sm ${
            selected === btn.key ? "bg-zinc-800" : ""
          }`}
          aria-pressed={selected === btn.key}
          onClick={() => setSelected(btn.key)}
          type="button"
          tabIndex={0}
        >
          {btn.svg}
        </button>
      ))}
    </div>
  );
};

export default AlignmentCheckboxGroup;
