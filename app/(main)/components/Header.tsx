import Squares from "./Squares";
import AddToChrome from "@/components/AddToChromeBtn";
import AddToEdgeBtn from "@/components/AddToEdgeBtn";

const Header = () => {
  return (
    <div className="relative lg:border-b-[0.8px] lg:border-b-zinc-200">
      <div className="absolute inset-0">
        <Squares
          speed={0.025}
          squareSize={60}
          direction="up" // up, down, left, right, diagonal
          borderColor="rgba(12, 140, 233, 0.5)"
          hoverFillColor="rgba(12, 140, 233, 0.5)"
        />
      </div>

      <div className="max-w-3xl z-[1] relative text-center mx-auto pointer-events-none lg:pb-12 py-32 md:py-48 lg:pt-33 ">
        <div className="flex items-center justify-center">
          <img src="/Toolbar.png" className="h-12 mb-15" />
        </div>
        <h1 className="text-zinc-900 leading-[1.11111] tracking-[-0.9px] text-4xl font-semibold text-balance md:leading-[1] md:tracking-[-1.8px] md:text-7xl">
          The Web Is Your Component Library
        </h1>
        <p className="mt-5 text-zinc-500 leading-[24px] max-w-lg text-lg text-balance font-medium mx-auto  lg:text-xl">
          YoinkUI lets you copy any UI component from any web page in just one
          click.
        </p>
        <div className="mt-10 gap-y-[10px] grid justify-center items-center">
          <AddToChrome />
          <AddToEdgeBtn />
        </div>
      </div>
    </div>
  );
};

export default Header;
