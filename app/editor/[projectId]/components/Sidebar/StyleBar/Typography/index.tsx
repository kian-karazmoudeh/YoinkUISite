import AlignmentCheckboxGroup, {
  CheckboxButton,
} from "../shared/AlignmentCheckboxGroup";
import Category from "../shared/Category";

const DECORATION_BUTTONS: CheckboxButton[] = [
  {
    key: "bold",
    label: "Bold",
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
          d="M4.25 1H5H13.75H14.5V2.5H13.75H10.5475L7.02746 13.5H11H11.75V15H11H2.25H1.5V13.5H2.25H5.45254L8.97254 2.5H5H4.25V1Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "italic",
    label: "Italic",
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
          d="M8.00001 0.583374C6.15186 0.583374 4.89601 1.20742 4.10921 2.08165C3.34402 2.93186 3.08334 3.95168 3.08334 4.66671C3.08334 5.30246 3.25446 5.98764 3.73035 6.62516C3.82673 6.75427 3.934 6.8793 4.05254 7H1.75H1V8.5H1.75H14.25H15V7H14.25H7.01815L6.51769 6.8024C5.6688 6.46724 5.19511 6.07985 4.93239 5.72789C4.67477 5.38278 4.58334 5.0232 4.58334 4.66671C4.58334 4.27063 4.73934 3.62378 5.22415 3.0851C5.68734 2.57044 6.51483 2.08337 8.00001 2.08337C9.99003 2.08337 10.8295 2.95573 11.1785 3.6895L11.5006 4.36679L12.8552 3.72252L12.5331 3.04522C11.9243 1.76535 10.5425 0.583374 8.00001 0.583374ZM12.9167 11.25V10.5H11.4167V11.25C11.4167 11.6491 11.2587 12.3206 10.7686 12.8815C10.302 13.4155 9.47586 13.9167 8.00001 13.9167C6.13953 13.9167 5.27285 13.0402 4.87848 12.3L4.52584 11.638L3.20199 12.3433L3.55464 13.0053C4.18889 14.1958 5.54264 15.4167 8.00001 15.4167C9.85749 15.4167 11.1147 14.7652 11.8981 13.8685C12.658 12.9988 12.9167 11.9621 12.9167 11.25Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
  {
    key: "underline",
    label: "Underline",
    svg: (
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
    key: "strike",
    label: "Strikethrough",
    svg: (
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
  {
    key: "code",
    label: "Code",
    svg: (
      <svg
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        className="text-zinc-400 fill-black stroke-[1px] box-border align-middle cursor-pointer overflow-hidden size-4"
      >
        <path
          d="M8.00371 14.804C5.07771 14.804 3.23471 12.068 3.23471 7.774C3.23471 3.442 5.07771 0.706 8.00371 0.706C10.9297 0.706 12.7727 3.442 12.7727 7.774C12.7727 12.068 10.9297 14.804 8.00371 14.804ZM4.88771 7.774C4.88771 9.047 5.05871 10.149 5.40071 11.023L9.80871 3.1C9.31471 2.568 8.70671 2.264 8.00371 2.264C6.10371 2.264 4.88771 4.392 4.88771 7.774ZM6.17971 12.41C6.67371 12.942 7.30071 13.246 8.00371 13.246C9.90371 13.246 11.1197 11.118 11.1197 7.774C11.1197 6.463 10.9297 5.323 10.5877 4.43L6.17971 12.41Z"
          className="fill-zinc-400 stroke-[1px] inline box-border cursor-pointer"
        ></path>
      </svg>
    ),
  },
];

const Typography = () => {
  return (
    <Category title="Typography">
      <div className="w-full flex flex-wrap gap-3">
        <div className="grow flex flex-col gap-[6px]">
          <label className="leading-[16px] text-xs opacity-[0.6] fill-black stroke-[1px] box-border capitalize cursor-default">
            Line Height
          </label>
          <div className="w-full flex justify-between gap-2">
            <div className="grow flex items-center gap-3">
              <div className="w-full relative">
                <span className="w-3 h-full -left-1 absolute"></span>
                <div className="bg-neutral-950 flex flex-col overflow-hidden size-full">
                  <label className="absolute text-nowrap whitespace-nowrap cursor-default -m-px overflow-hidden size-px"></label>
                  <div className="">
                    <div className="w-full flex flex-col">
                      <div className="w-full h-8 bg-neutral-950 shrink-0 flex items-center px-2 py-1 border-white/12 border-[0.8px] rounded-lg">
                        <input
                          role="combobox"
                          type="text"
                          value="1.75rem"
                          className="leading-[20px] w-full text-sm cursor-text overflow-clip"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow flex flex-col gap-[6px]">
          <label className="leading-[16px] text-xs opacity-[0.6] capitalize cursor-default">
            Letter Spacing
          </label>
          <div className="w-full flex justify-between gap-2">
            <div className="grow flex items-center gap-3">
              <div className="w-full relative">
                <span className="w-3 h-full -left-1 absolute"></span>
                <div className="bg-neutral-950 flex flex-col overflow-hidden size-full">
                  <label className="absolute text-nowrap whitespace-nowrap cursor-default -m-px overflow-hidden size-px"></label>
                  <div>
                    <div className="w-full flex flex-col">
                      <div className="w-full h-8 bg-neutral-950 shrink-0 flex items-center px-2 py-1 border-white/12 border-[0.8px] rounded-lg">
                        <input
                          role="combobox"
                          type="text"
                          value="0em"
                          className="leading-[20px] w-full text-sm cursor-text overflow-clip"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-3">
        <div title="Alignment" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Alignment
            </label>
            <AlignmentCheckboxGroup />
          </div>
        </div>
        <div title="Decoration" className="grow flex">
          <div className="w-full flex flex-col gap-[6px]">
            <label className="text-zinc-400 leading-[16px] text-xs capitalize cursor-default">
              Decoration
            </label>
            <AlignmentCheckboxGroup buttons={DECORATION_BUTTONS} />
          </div>
        </div>
      </div>
    </Category>
  );
};

export default Typography;
