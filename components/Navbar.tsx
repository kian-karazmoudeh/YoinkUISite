import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full max-w-304 top-0 z-[12] flex absolute justify-between items-center [translate:0px] mx-auto inset-x-0  lg:mt-5">
      <header className="w-full relative">
        <nav className="text-stone-950 leading-[1.5] font-[Aeonik,_sans-serif] flex justify-between items-center p-2">
          <div className="mt-[-2px] ml-2 grow-[1] flex">
            <Link
              className="gap-x-[2px] flex items-center cursor-pointer"
              href="/"
            >
              <Image
                width={28}
                height={28}
                src="/logo/yoinkUI.svg"
                alt="YoinkUI Logo"
                className="size-7 mt-1 cursor-pointer"
              />

              <span className="mt-[6px] leading-[1.55556] text-lg block font-medium cursor-pointer">
                YoinkUI
              </span>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-zinc-700 bg-transparent inline-flex text-center justify-center items-center m-[-10px] p-[10px] rounded-md"
            >
              <span className="block absolute text-nowrap whitespace-nowrap overflow-hidden cursor-default m-[-1px] size-px">
                Open main menu
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="mr-1 fill-zinc-700 stroke-[1px] overflow-hidden cursor-default size-[22px]"
              >
                <path
                  d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
                  className="fill-zinc-700 stroke-[1px] inline cursor-default"
                ></path>
              </svg>
            </button>
          </div>
          <div className="gap-x-12 md:flex hidden">
            <Link
              className="text-zinc-900 leading-[24px] text-sm block font-semibold cursor-pointer"
              href="/#features"
            >
              How it works
            </Link>
            <Link
              className="text-zinc-900 leading-[24px] text-sm block font-semibold cursor-pointer"
              href="/#usage"
            >
              Use cases
            </Link>
            <Link
              className="text-zinc-900 leading-[24px] text-sm block font-semibold cursor-pointer"
              href="/contact-us"
            >
              Contact us
            </Link>
          </div>
          <div className="gap-x-5 grow-[1] md:flex hidden justify-end items-center">
            <Link
              className="text-white leading-[24px] gap-x-1 text-sm bg-black flex font-semibold cursor-pointer px-4 py-1 rounded-[2.68435e+07px]"
              href="https://app.cluely.com/signup"
            >
              Add to Chrome / Edge
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-[21px] fill-[none] stroke-[1px] overflow-hidden cursor-pointer"
              >
                <circle
                  cx="10"
                  cy="10.9469"
                  r="10"
                  className="fill-neutral-800 stroke-[1px] inline cursor-pointer"
                ></circle>
                <mask
                  id="mask0_1_567"
                  x="0"
                  y="0"
                  width="20"
                  height="21"
                  className="w-5 h-[21px] fill-[none] stroke-[1px] inline cursor-pointer"
                >
                  <circle
                    cx="10"
                    cy="10.9469"
                    r="10"
                    className="fill-neutral-800 stroke-[1px] inline cursor-pointer"
                  ></circle>
                </mask>
                <g className="fill-[none] stroke-[1px] inline cursor-pointer">
                  <path
                    d="M4.78544 8.12311L12.8231 8.12311M12.8231 8.12311L12.8231 16.1608M12.8231 8.12311L3.1779 17.7683"
                    strokeLinecap="square"
                    className="fill-[none] stroke-[1.3px] stroke-white inline cursor-pointer"
                  ></path>
                </g>
              </svg>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
