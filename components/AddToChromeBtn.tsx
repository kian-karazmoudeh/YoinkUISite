import Link from "next/link";
import ChromeIcon from "./Icons/ChromeIcon";

const AddToChrome = () => {
  return (
    <Link
      className="text-white pointer-events-auto hover:bg-sky-600 transition-all gap-x-2 bg-black shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold items-center cursor-pointer px-[30px] py-3 rounded-[2.68435e+07px]"
      href="https://chromewebstore.google.com/detail/yoinkui/ihlkclcengelgcfkkmpkhgadepmgijkk"
    >
      <ChromeIcon />
      <span className="block cursor-pointer">Get started for Free</span>
    </Link>
  );
};

export default AddToChrome;
