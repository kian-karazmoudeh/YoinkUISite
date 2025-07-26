import { BGPattern } from "@/components/bg-pattern";
import Badge from "./Badge";

const Header = () => {
  return (
    <div className="py-17 my-3 w-full flex flex-col mx-auto gap-4 relative">
      <BGPattern variant="grid" mask="fade-edges" />
      <Badge />
      <h1 className="tracking-[-2.3px] text-[46px] text-center text-pretty font-semibold">
        Welcome back to YoinkUI
      </h1>
    </div>
  );
};

export default Header;
