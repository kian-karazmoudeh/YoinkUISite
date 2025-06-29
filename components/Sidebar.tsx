import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  show: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
};

export default function Sidebar({ show, onClose, links }: SidebarProps) {
  return (
    <div
      className="text-stone-950 leading-[1.5] w-full md:max-w-sm right-[0px] z-[20] font-[Aeonik,_sans-serif] bg-white shadow-[_oklab(0.21_0.00164225_-0.00577088_/_0.1)_0px_0px_0px_1px] fixed overflow-auto p-6 inset-y-[0px]"
      style={{
        display: show ? "block" : "none",
      }}
    >
      <div className="flex justify-between items-center">
        <Link className="gap-x-[2px] flex items-center cursor-pointer" href="/">
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
        <button
          type="button"
          className="text-zinc-700 bg-transparent block text-center m-[-10px] p-[10px] rounded-md"
          onClick={() => onClose()}
        >
          <span className="block absolute text-nowrap whitespace-nowrap overflow-hidden cursor-default m-[-1px] size-px">
            Close menu
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            className="fill-zinc-700 stroke-[1px] overflow-hidden cursor-default size-6"
          >
            <path
              d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
              className="fill-zinc-700 stroke-[1px] inline cursor-default"
            ></path>
          </svg>
        </button>
      </div>
      <div className="mt-6">
        <div className="my-[-24px]">
          <div className="border-b-[oklab(0.552_0.00439355_-0.015385_/_0.1)] border-b-[0.8px] py-6">
            {links.map((link, idx) => (
              <Link
                onClick={() => onClose()}
                key={idx}
                className="mb-2 text-zinc-900 leading-[28px] block font-semibold cursor-pointer mx-[-12px] px-3 py-2 rounded-lg"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="py-6">
            <Link
              className="text-zinc-900 leading-[28px] block font-semibold cursor-pointer mx-[-12px] px-3 py-[10px] rounded-lg"
              href="#"
            >
              View in the Chrome Web Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
