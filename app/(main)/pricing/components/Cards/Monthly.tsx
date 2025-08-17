import { ReactNode } from "react";
import CurrentPlanBtn from "../Btns/CurrentPlanBtn";
import LoadingBtn from "../Btns/LoadingBtn";
import SubscribeBtn from "../Btns/SubscribeBtn";
import { paymentLinks } from "./prices";

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
    label: <>Unlimited Yoinks</>,
  },
  {
    icon: <CheckIcon />,
    label: <>Drag/Drop editor to customize your components</>,
  },
  {
    icon: <CheckIcon />,
    label: <>Available on any web page</>,
  },
  {
    icon: <CheckIcon />,
    label: (
      <>
        Modularized code
        <span className="mt-1 h-4 text-[10px] bg-zinc-300 flex justify-center items-center px-[6px] rounded-[2.68435e+07px]">
          Coming soon
        </span>
      </>
    ),
  },
];

const Monthly = ({ userMembership, loading, setLoading }: CardProps) => {
  return (
    <div className="border-2 border-zinc-200 p-[26px] rounded-lg relative">
      <h3
        id="tier-free"
        className="text-zinc-700 leading-[32px] text-xl font-semibold"
      >
        Monthly
      </h3>
      <p className="mt-3 text-zinc-800 leading-[18px] text-sm">
        For serious developers who want to scale their workflow.
      </p>
      <p className="mt-8 gap-x-1 flex items-baseline">
        <span className="text-zinc-900 leading-[1.11111] tracking-[-0.9px] text-4xl font-bold block">
          $19.99
        </span>
        <span className="text-zinc-500 leading-[24px] text-2xl block">
          /month
        </span>
      </p>
      {loading ? (
        <LoadingBtn className="bg-zinc-300 text-zinc-900" />
      ) : userMembership != "premium" ? (
        <SubscribeBtn
          href={paymentLinks["Monthly"]}
          onClick={() => setLoading(true)}
          className="bg-zinc-300 text-zinc-900"
        />
      ) : (
        <CurrentPlanBtn className="bg-zinc-300 text-zinc-900" />
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

export default Monthly;
