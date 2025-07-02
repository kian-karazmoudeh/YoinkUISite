import { twMerge } from "tailwind-merge";

const MembershipTypeBtn = ({
  selected,
  label,
  onChange,
}: MembershipTypeBtnProp) => {
  return (
    <span
      onClick={() => onChange()}
      className={twMerge(
        "leading-[1.5] bg-zinc-100 text-zinc-600 text-base block cursor-pointer px-[10px] py-1 rounded-md",
        selected && "bg-zinc-700 text-white"
      )}
    >
      <span className="flex items-center cursor-pointer">
        {selected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="fill-white stroke-[1px] overflow-hidden cursor-pointer size-4"
          >
            <path
              fillRule="evenodd"
              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
              className="fill-white stroke-[1px] inline cursor-pointer"
            ></path>
          </svg>
        )}
        <span className="ml-[6px] block cursor-pointer">{label}</span>
      </span>
    </span>
  );
};

export default MembershipTypeBtn;
