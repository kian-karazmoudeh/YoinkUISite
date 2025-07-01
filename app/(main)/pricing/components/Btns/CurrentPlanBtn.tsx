import { twMerge } from "tailwind-merge";

const CurrentPlanBtn = ({ className = "" }: BtnProps) => {
  return (
    <div
      className={twMerge(
        "mt-[42px] text-white leading-[24px] w-full text-sm bg-blue-600 block text-center font-semibold px-3 py-2 rounded-full",
        className
      )}
    >
      Current plan
    </div>
  );
};

export default CurrentPlanBtn;
