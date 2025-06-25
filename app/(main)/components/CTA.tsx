const CTA = () => {
  return (
    <div className="mt-10 max-w-7xl border-[0.8px] border-zinc-200 relative mx-auto py-60  lg:mt-0">
      <img
        alt="CTA-background"
        className="text-transparent z-[0] absolute object-cover size-full inset-0"
        src="CTA-bg.png"
      />
      <div className="ml-8 z-[1] relative  lg:text-center">
        <span className="text-zinc-500 leading-[1.55556] tracking-[-0.45px] text-lg uppercase  lg:text-center">
          Bridging inspiration and creation
        </span>
        <h1 className="mt-2 text-zinc-900 leading-[1] tracking-[-1.2px] text-5xl text-balance font-medium md:tracking-[-1.5px] md:text-6xl lg:text-center">
          Ship faster than ever.
        </h1>
        <div className="mt-10 ml-2 gap-y-[10px] grid text-center justify-start items-center  lg:ml-0 lg:justify-center">
          <a
            className="text-white gap-x-2 bg-black shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold items-center cursor-pointer px-[30px] py-3 rounded-[2.68435e+07px]"
            href="https://github.com/cluely/releases/releases/latest/download/cluely.dmg"
          >
            <svg
              viewBox="0 0 24 24"
              className="mb-[2px] fill-white stroke-[0px] stroke-white overflow-hidden cursor-pointer size-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6734 7.22198C10.7974 7.22198 9.44138 6.22598 8.01338 6.26198C6.12938 6.28598 4.40138 7.35397 3.42938 9.04597C1.47338 12.442 2.92538 17.458 4.83338 20.218C5.76938 21.562 6.87338 23.074 8.33738 23.026C9.74138 22.966 10.2694 22.114 11.9734 22.114C13.6654 22.114 14.1454 23.026 15.6334 22.99C17.1454 22.966 18.1054 21.622 19.0294 20.266C20.0974 18.706 20.5414 17.194 20.5654 17.11C20.5294 17.098 17.6254 15.982 17.5894 12.622C17.5654 9.81397 19.8814 8.46998 19.9894 8.40998C18.6694 6.47798 16.6414 6.26198 15.9334 6.21398C14.0854 6.06998 12.5374 7.22198 11.6734 7.22198ZM14.7934 4.38998C15.5734 3.45398 16.0894 2.14598 15.9454 0.849976C14.8294 0.897976 13.4854 1.59398 12.6814 2.52998C11.9614 3.35798 11.3374 4.68998 11.5054 5.96198C12.7414 6.05798 14.0134 5.32598 14.7934 4.38998Z"
                className="fill-white stroke-[0px] stroke-white inline cursor-pointer"
              ></path>
            </svg>
            <span className="block cursor-pointer">Download for Mac</span>
          </a>
          <a
            className="text-[oklab(0.21_0.00164225_-0.00577088_/_0.6)] leading-[24px] text-sm block font-semibold underline cursor-pointer"
            href="https://github.com/cluely/releases/releases/latest/download/cluely-setup.exe"
          >
            Download for windows
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;
