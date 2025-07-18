const Badge = () => {
  return (
    <div className="max-w-3xl bg-black shadow-[_#ffffff1a_0px_0px_0px_1px,_#0000000a_0px_2px_1px_0px] overflow-hidden mx-auto rounded-[2.68435e+07px]">
      <div className="grid relative justify-items-center justify-center items-center content-center">
        <div className="col-start-1 row-start-1">
          <button className="bg-transparent flex text-center text-nowrap whitespace-nowrap overflow-hidden justify-between items-center px-2 py-[6px]">
            <div className="flex items-center gap-[6px]">
              <div className="text-teal-400 h-5 text-[11px] bg-teal-950 shrink-0 flex font-medium justify-center items-center px-[6px] gap-[6px] border-teal-950 border-[0.8px] rounded-[2.68435e+07px]">
                New
              </div>
              <span className="leading-[1.42857] text-sm block font-medium">
                Edit projects effortlessly with drag‑and‑drop
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Badge;
