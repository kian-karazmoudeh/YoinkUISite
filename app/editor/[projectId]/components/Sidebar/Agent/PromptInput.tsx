import { ChangeEvent, FormEvent } from "react";

type PromptInputProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function PromptInput({
  onSubmit,
  onChange,
  value,
}: PromptInputProps) {
  return (
    <form
      className='text-white leading-[1.5] z-20 font-[GeistSans,_"GeistSans_Fallback",_ui-sans-serif,_system-ui,_sans-serif,_"Apple_Color_Emoji",_"Segoe_UI_Emoji",_"Segoe_UI_Symbol",_"Noto_Color_Emoji",_system-ui,_sans-serif] bg-neutral-900 bg-clip-padding relative p-3 border-zinc-800 border-[0.8px] rounded-xl'
      onSubmit={onSubmit}
    >
      <div className="pt-px pb-2 leading-[20px] min-h-11 max-h-50 text-sm relative [white-space:break-spaces] overflow-auto size-full">
        <div role="textbox" className="h-full relative">
          <input
            className="focus:outline-none focus:ring-0"
            placeholder="Ask a follow up..."
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="submit"
          className="text-zinc-500 leading-[1.42857] h-7 text-sm bg-zinc-900 shadow-[_#3b82f6_0px_0px_0px_0px] shrink-0 outline-zinc-500 flex text-center text-nowrap font-medium whitespace-nowrap justify-center items-center cursor-not-allowed gap-[6px] ml-auto overflow-hidden border-white/12 border-[0.8px] rounded-lg"
        >
          <div className="outline-zinc-500 grid relative justify-items-center justify-center items-center content-center cursor-not-allowed">
            <div className="outline-zinc-500 cursor-not-allowed col-start-1 row-start-1">
              <span className="w-[26px] outline-zinc-500 flex justify-center items-center cursor-not-allowed gap-[6px]">
                <svg
                  height="16"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  width="16"
                  className="shrink-0 outline-zinc-500 align-middle cursor-not-allowed overflow-hidden size-4"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
                    fill="rgb(113, 113, 122)"
                    className="outline-zinc-500 inline cursor-not-allowed"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </button>
      </div>
    </form>
  );
}
