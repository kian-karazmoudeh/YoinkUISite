import Link from "next/link";
import Squares from "./Squares";

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
          <Link
            className="text-white pointer-events-auto hover:bg-[#3F6FFF] transition-all gap-x-2 bg-black shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold items-center cursor-pointer px-[30px] py-3 rounded-[2.68435e+07px]"
            href="https://github.com/cluely/releases/releases/latest/download/cluely.dmg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-2 fill-white stroke-[1px] inline overflow-hidden cursor-pointer size-[24px]"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                className="fill-white stroke-[1px] inline cursor-pointer"
              ></path>
            </svg>
            <span className="block cursor-pointer">Add to chrome</span>
          </Link>
          <Link
            className="text-black group hover:text-[#3F6FFF] transition-all gap-x-2 pointer-events-auto shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold items-center cursor-pointer px-[30px] py-3 rounded-[2.68435e+07px]"
            href="https://github.com/cluely/releases/releases/latest/download/cluely.dmg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="26"
              height="26"
              viewBox="0 0 50 50"
              className="mr-2 fill-black group-hover:fill-[#3F6FFF] stroke-[1px] inline overflow-hidden cursor-pointer size-[26px]"
            >
              <path
                d="M 25.300781 3 C 15.790781 3 7.7008594 8.6803125 4.3808594 17.570312 C 7.0908594 14.590313 10.679609 13 14.849609 13 L 14.880859 13 C 21.350859 13.01 28.189219 17.100547 30.449219 22.310547 L 30.439453 22.310547 C 31.249453 23.890547 31.060781 25.520781 30.800781 26.550781 C 30.500781 27.720781 30.050859 28.270234 29.880859 28.490234 L 29.789062 28.609375 C 29.459063 29.019375 29.510391 29.620469 29.900391 29.980469 C 29.970391 30.040469 30.080469 30.120703 30.230469 30.220703 L 30.490234 30.380859 C 31.760234 31.180859 34.630469 32 37.230469 32 C 39.220469 32 41.819766 31.690234 44.259766 29.240234 C 48.359766 25.140234 46.779219 19.419766 46.199219 17.759766 C 45.209219 14.949766 41.100313 5.6101563 29.570312 3.4101562 C 28.170312 3.1401562 26.730781 3 25.300781 3 z M 14.849609 15 C 9.6496094 15 5.4800781 17.910937 3.0800781 23.210938 C 2.2900781 32.370937 7.8394531 40.589531 14.439453 44.269531 C 15.389453 44.799531 18.409141 46.320312 22.619141 46.820312 C 18.899141 45.060313 16.069531 41.99 14.769531 38 C 12.609531 31.37 15.319922 24.290703 21.669922 19.970703 L 21.679688 19.980469 C 22.639688 19.350469 23.809766 18.990234 25.009766 18.990234 C 25.149766 18.990234 25.279922 18.989766 25.419922 19.009766 C 22.609922 16.609766 18.630859 15.01 14.880859 15 L 14.849609 15 z M 19 25.169922 C 16.22 28.739922 15.309687 33.170859 16.679688 37.380859 C 18.489687 42.940859 23.780469 46.460469 30.230469 46.480469 C 35.250469 45.360469 39.619297 42.429219 43.279297 37.699219 L 43.369141 37.580078 C 43.619141 37.210078 43.600313 36.719141 43.320312 36.369141 C 43.030313 36.029141 42.550625 35.909844 42.140625 36.089844 L 41.660156 36.310547 C 41.460156 36.400547 41.280547 36.459063 41.060547 36.539062 C 40.830547 36.619063 40.570469 36.719375 40.230469 36.859375 C 38.940469 37.389375 37.020938 37.689453 34.960938 37.689453 C 33.230937 37.689453 31.540937 37.470312 30.210938 37.070312 C 28.330937 36.510312 22.599375 34.779688 19.609375 28.179688 C 19.239375 27.359688 18.99 26.309922 19 25.169922 z"
                className="stroke-[1px] inline cursor-pointer"
              ></path>
            </svg>
            <span className="block cursor-pointer">Add to Edge</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
