import { ReactNode } from "react";
import AddExtensionBtn from "../Btns/AddExtensionBtn";
import CurrentPlanBtn from "../Btns/CurrentPlanBtn";
import { CardProps } from "./types";
import LoadingBtn from "../Btns/LoadingBtn";

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="text-emerald-600 w-4 h-6 shrink-[0] fill-emerald-600 stroke-[1px] overflow-hidden"
    >
      <path
        fillRule="evenodd"
        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
        className="fill-emerald-600 stroke-[1px] inline"
      ></path>
    </svg>
  );
};

const features: { icon: ReactNode; label: ReactNode }[] = [
  {
    icon: <CheckIcon />,
    label: <>5 Yoinks per month</>,
  },
  {
    icon: <CheckIcon />,
    label: <>Full page static Yoinks</>,
  },
  {
    icon: <CheckIcon />,
    label: <>Static Component Yoinks</>,
  },
  {
    icon: <CheckIcon />,
    label: <>Available on any web page</>,
  },
];

const BasicCard = ({ type, userMembership, loading }: CardProps) => {
  return (
    <div className="shadow-[_oklch(0.92_0.004_286.32)_0px_0px_0px_1px] p-[26px] rounded-lg">
      <h3 id="tier-free" className="text-zinc-900 leading-[32px] text-[40px]">
        Basic
      </h3>
      <p className="mt-3 gap-x-1 flex items-baseline">
        <span className="text-zinc-600 leading-[1.11111] tracking-[-0.9px] text-4xl block">
          $0
        </span>
        <span className="text-zinc-600 leading-[24px] text-3xl block">
          /{type == "Monthly" ? "mo" : "yr"}
        </span>
      </p>
      <p className="mt-16 text-zinc-800 leading-[18px] text-sm">
        For curious devs who want to test the waters.
      </p>
      {loading ? (
        <LoadingBtn className="bg-sky-100 text-sky-950" />
      ) : userMembership == "free" ? (
        <CurrentPlanBtn className="bg-sky-100 text-sky-950" />
      ) : (
        <AddExtensionBtn />
      )}
      <ul className="mt-8 text-zinc-600 leading-[24px] text-sm [translate:0px]">
        {features.map((feature, idx) => (
          <li className="mb-3 gap-x-3 flex text-left" key={idx}>
            {feature.icon}
            {feature.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BasicCard;
