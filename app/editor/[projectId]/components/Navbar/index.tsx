import { DeviceName } from "../../types";
import Devices from "./Devices";
import ExportBtn from "./ExportBtn";

type EditorNavbarProps = {
  currentDevice: DeviceName;
  setCurrentDevice: (device: DeviceName) => void;
};

const Navbar = ({ currentDevice, setCurrentDevice }: EditorNavbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <a
            className="flex size-[22px] cursor-pointer items-center justify-center rounded-full"
            title="Right-click for brand assets menu"
            href="/home"
          >
            <div className="relative size-full cursor-pointer">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
                className="size-full cursor-pointer overflow-hidden fill-[none] stroke-[1px]"
              >
                <path
                  d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.5 35.5 20 40H40C40 51.0457 31.0457 60 20 60C8.95431 60 0 51.0457 0 40C0 28.9543 9.5 22 20 20H0Z"
                  className="inline cursor-pointer fill-zinc-100 stroke-[1px]"
                ></path>
                <path
                  d="M40 60C51.7324 55.0977 60 43.5117 60 30C60 16.4883 51.7324 4.90234 40 0V60Z"
                  className="inline cursor-pointer fill-zinc-100 stroke-[1px]"
                ></path>
              </svg>
            </div>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <svg
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            className="size-[22px] overflow-hidden fill-zinc-800 stroke-[1px] text-zinc-800"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
              className="inline fill-zinc-800 stroke-[1px]"
            ></path>
          </svg>
          <div className="flex min-w-0 items-center gap-2">
            <a className="block cursor-pointer" href="/shugar">
              <span className="relative flex size-[22px] shrink-0 cursor-pointer overflow-hidden rounded-full shadow-[_#27272a_0px_0px_0px_1px]">
                <img
                  className="aspect-[1_/_1] size-full cursor-pointer"
                  alt="tigran tumasov"
                  src="https://placehold.co/460x460"
                />
              </span>
            </a>
            <p className="text-sm font-medium text-nowrap whitespace-nowrap">
              Feedback
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            className="size-[22px] overflow-hidden fill-zinc-800 stroke-[1px] text-zinc-800"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
              className="inline fill-zinc-800 stroke-[1px]"
            ></path>
          </svg>
          <a className="block cursor-pointer" href="/shugar">
            <span className="relative flex size-[22px] shrink-0 cursor-pointer overflow-hidden rounded-full shadow-[_#27272a_0px_0px_0px_1px]">
              <img
                className="aspect-[1_/_1] size-full cursor-pointer"
                alt="tigran tumasov"
                src="https://placehold.co/460x460"
              />
            </span>
          </a>
          <div className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1">
            <p className="cursor-pointer text-sm font-medium text-nowrap whitespace-nowrap">
              Default
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 cursor-pointer overflow-hidden fill-[none] stroke-[#8f8f99] stroke-[2px] text-[#8f8f99]"
            >
              <path
                d="m6 9 6 6 6-6"
                className="inline cursor-pointer fill-[none] stroke-[#8f8f99] stroke-[2px]"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-1">
        <Devices
          currentDevice={currentDevice}
          setCurrentDevice={setCurrentDevice}
        />

        <ExportBtn />
      </div>
    </div>
  );
};

export default Navbar;
