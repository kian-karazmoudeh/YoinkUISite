import { useState } from "react";
import { Loader2 } from "lucide-react";
import { YoinkItemProps } from "./types";
import { formatDate } from "./utils";

export const YoinkItem = ({ yoink, onSelect }: YoinkItemProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      onClick={() => {
        setIsLoading(true);
        onSelect();
      }}
      className="leading-[1.42857] w-full min-w-0 text-sm flex relative flex-col gap-2 p-3 rounded-md cursor-pointer border border-zinc-800 hover:border-l-4 hover:border-l-sky-400 transition-all duration-300"
    >
      <div className="flex cursor-pointer gap-3">
        <div className="flex flex-col cursor-pointer gap-[6px] overflow-hidden">
          <div className="leading-[1] font-medium text-left overflow-hidden cursor-pointer whitespace-nowrap text-ellipsis">
            {yoink.name}
          </div>
          <div className="text-zinc-500 flex items-center cursor-pointer gap-[6px]">
            <span className="leading-[1] text-[13px] block cursor-pointer">
              {formatDate(yoink.updated_at)}
            </span>
          </div>
        </div>
        {isLoading && <Loader2 className="ml-auto w-4 h-4 animate-spin" />}
      </div>
    </button>
  );
};
