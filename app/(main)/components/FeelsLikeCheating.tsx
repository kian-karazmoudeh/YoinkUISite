const FeelsLikeCheating = () => {
  return (
    <div className="max-w-7xl mx-auto py-36 md:text-center">
      <p className="mt-2 text-black leading-[1.11111] tracking-[-0.9px] text-4xl text-center text-pretty font-medium md:leading-[1] md:tracking-[-1.2px] md:text-5xl md:text-balance">
        “This feels like Stealing.”
      </p>
      <a
        className="mt-8 text-white leading-[1.55556] group w-40 gap-x-2 text-lg bg-black shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_2px_0px] flex font-semibold items-center cursor-pointer mx-auto px-6 py-[10px] rounded-[2.68435e+07px] md:text-center"
        href="/manifesto"
      >
        We agree.
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-[21px] fill-[none] stroke-[1px] overflow-hidden cursor-pointer md:text-center"
        >
          <circle
            cx="10"
            cy="10.9469"
            r="10"
            className="fill-neutral-800 stroke-[1px] inline cursor-pointer md:text-center"
          ></circle>
          <g className="fill-[none] stroke-[1px] inline cursor-pointer md:text-center">
            <path
              d="M4.78544 8.12311L12.8231 8.12311M12.8231 8.12311L12.8231 16.1608M12.8231 8.12311L3.1779 17.7683"
              stroke-linecap="square"
              className="fill-[none] stroke-[1.3px] stroke-white inline cursor-pointer md:text-center"
            ></path>
          </g>
        </svg>
      </a>
    </div>
  );
};

export default FeelsLikeCheating;
