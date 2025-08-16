import { ReactNode } from "react";
import CurrentPlanBtn from "../Btns/CurrentPlanBtn";
import LoadingBtn from "../Btns/LoadingBtn";
import SubscribeBtn from "../Btns/SubscribeBtn";
import { Badge } from "@/components/ui/badge";

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

const paymentLinks: Record<"Monthly" | "Annual", string> = {
  Monthly: `/api/stripe/subscribe/${
    process.env.NODE_ENV === "development"
      ? "price_1RqRWsF3W42U01iFUv4A23H6" // dev
      : "price_1RqSANF3W42U01iFUUpEJuSf" // production
  }`,
  Annual: `/api/stripe/subscribe/${
    process.env.NODE_ENV === "development"
      ? "price_1RqRXfF3W42U01iFKTZTQSBY" // dev
      : "price_1RqSAsF3W42U01iFrXVDLXrj" // production
  }`,
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

const Yearly = ({ userMembership, loading, setLoading }: CardProps) => {
  return (
    <div className="shadow-lg border-4 border-sky-700 p-[26px] rounded-lg relative">
      <div className="absolute -top-4 right-0 left-0 text-sky-700 text-sm font-semibold flex justify-center items-center">
        <span className="text-white bg-sky-700 text-sm font-semibold py-1 px-3 rounded-full">
          Most Popular
        </span>
      </div>
      <h3
        id="tier-free"
        className="text-zinc-900 leading-[32px] text-2xl font-semibold flex items-center gap-2"
      >
        Yearly <Badge variant="success">Save 70%</Badge>
      </h3>
      <p className="mt-3 gap-x-1 flex items-baseline">
        <span className="text-zinc-900 leading-[1.11111] tracking-[-0.9px] text-4xl block">
          $5.75
        </span>
        <span className="text-zinc-500 leading-[24px] text-2xl block">
          /month
        </span>
      </p>
      <p className="mt-16 text-zinc-800 leading-[18px] text-sm">
        For serious developers who want to scale their workflow.
      </p>
      {loading ? (
        <LoadingBtn className="bg-sky-700 text-zinc-50" />
      ) : userMembership != "premium" ? (
        <SubscribeBtn
          href={paymentLinks["Annual"]}
          onClick={() => setLoading(true)}
        />
      ) : (
        <CurrentPlanBtn className="bg-sky-700 text-zinc-50" />
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

export default Yearly;
