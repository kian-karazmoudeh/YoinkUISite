import Link from "next/link";
import EdgeIcon from "./Icons/EdgeIcon";

const AddToEdgeBtn = () => {
  return (
    <Link
      className="text-black group hover:bg-[#3F6FFF] hover:text-white transition-all gap-x-2 pointer-events-auto shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold items-center cursor-pointer px-[30px] py-3 rounded-[2.68435e+07px]"
      href="https://chromewebstore.google.com/detail/yoinkui/ihlkclcengelgcfkkmpkhgadepmgijkk"
    >
      <EdgeIcon />
      <span className="block cursor-pointer">Add to Edge</span>
    </Link>
  );
};

export default AddToEdgeBtn;
