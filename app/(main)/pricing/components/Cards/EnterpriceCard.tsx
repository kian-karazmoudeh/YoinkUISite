import { ReactNode } from "react";
import TalkToSalesBtn from "../Btns/TalkToSalesBtn";

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="text-white w-4 h-6 shrink-[0] fill-white stroke-[1px] overflow-hidden"
    >
      <path
        fillRule="evenodd"
        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
        className="fill-white stroke-[1px] inline"
      ></path>
    </svg>
  );
};

const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="text-white w-4 h-6 shrink-[0] fill-white stroke-[1px] overflow-hidden"
    >
      <path
        d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
        className="fill-white stroke-[1px] inline"
      ></path>
    </svg>
  );
};

const features: { icon: ReactNode; label: ReactNode }[] = [
  {
    icon: <CheckIcon />,
    label: <>Custom number of accounts</>,
  },
  {
    icon: <PlusIcon />,
    label: <>Everything in Basic plan</>,
  },
];

const EnterpriseCard = () => {
  // console.log(session);
  return (
    <div className="bg-zinc-900 shadow-[_oklch(0.21_0.006_285.885)_0px_0px_0px_1px] p-[26px] rounded-lg">
      <h3
        id="tier-enterprise"
        className="text-white leading-[32px] text-[40px]"
      >
        Enterprise
      </h3>
      <p className="mt-3 gap-x-1 flex items-baseline">
        <span className="text-zinc-400 leading-[1.11111] tracking-[-0.9px] text-4xl block">
          custom
        </span>
      </p>
      <p className="mt-16 text-zinc-300 leading-[18px] text-sm">
        For Teams who want full control.
      </p>
      <TalkToSalesBtn />
      <ul className="mt-8 text-zinc-300 leading-[24px] text-sm [translate:0px]">
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

export default EnterpriseCard;
