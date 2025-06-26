import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-white bg-black flex relative flex-col justify-between size-full lg:h-100">
      <div className="pt-8 pb-24 w-full flex flex-col justify-between mx-auto px-4 gap-4 md:max-w-160 lg:max-w-5xl lg:flex-row">
        <div>
          <ul className="mb-2 flex flex-wrap gap-4">
            <li className="text-left">
              <Link
                href="/terms"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Terms &amp; policies
              </Link>
            </li>
            <li className="text-left">
              <Link
                href="/privacy-policy"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
          <p className="mt-4 leading-[1.42857] gap-x-1 text-sm flex items-center">
            <Image
              width={20}
              height={20}
              src="/logo/yoinkUI.svg"
              alt="YoinkUI Logo"
              className="size-5 mt-1 cursor-pointer"
            />
            YoinkUI 2025. All Rights Reserved
          </p>
        </div>
        <div>
          <ul className="mb-4 flex flex-wrap gap-4">
            <li className="text-left">
              <Link
                href="https://x.com/kiannnk"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Twitter
              </Link>
            </li>
            <li className="text-left">
              <Link
                href="https://www.instagram.com/YoinkUI"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Instagram
              </Link>
            </li>
          </ul>
          {/* <div className="mt-4 text-right">
            <button className="leading-[1.42857] text-sm bg-transparent inline-flex text-center items-center">
              Back to top
            </button>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
