import { twMerge } from "tailwind-merge";

const CurrentPlanBtn = ({ className = "" }: BtnProps) => {
  return (
    <div
      className={twMerge(
        "mt-[42px] text-zinc-900 leading-[24px] w-full text-sm bg-zinc-300 block text-center font-semibold cursor-pointer px-3 py-2 rounded-full",
        className
      )}
    >
      Current plan
    </div>
  );
};

export default CurrentPlanBtn;
