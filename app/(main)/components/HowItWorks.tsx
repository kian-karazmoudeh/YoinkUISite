const HowItWorks = () => {
  return (
    <div className="bg-zinc-900">
      <div className="pt-18 max-w-6xl mx-auto md:text-center lg:pt-26">
        <div className="max-w-xs mx-auto md:text-center lg:max-w-6xl">
          <h2 className="mt-2 text-white leading-[1.2] tracking-[-0.75px] text-3xl font-medium md:leading-[1] md:tracking-[-1.2px] md:text-5xl md:text-center md:text-balance">
            How it works
          </h2>
          <p className="mt-4 text-zinc-400 leading-[24px] tracking-[-0.45px] max-w-lg text-lg mx-auto md:text-center lg:tracking-[-0.5px] lg:text-xl">
            Everything you need in two clicks
          </p>
        </div>
        <div className="mt-12 md:text-center">
          <div className="gap-y-16 gap-x-12 grid-cols-[repeat(1,_minmax(0px,_1fr))] grid items-center mx-auto py-16 md:gap-y-20 md:text-center lg:grid-cols-[repeat(5,_minmax(0px,_1fr))] lg:mx-0">
            <div className="pl-8 col-span-2 md:text-center lg:pr-8 lg:pl-0">
              <div className="text-left">
                <h2 className="mb-4 text-white leading-[1.33333] tracking-[-0.6px] text-2xl font-medium">
                  Select the Component Tool
                </h2>
                <p className="text-zinc-300">That's one click</p>
              </div>
            </div>
            <div className="mt-[-56px] col-span-3 p-8 md:text-center lg:mt-0 lg:order-[2] lg:p-0">
              <img
                alt="Doesn’t join meetings-screenshot"
                src="/step 1.png"
                className="w-full max-w-[none] shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_oklab(0.999994_0.0000455678_0.0000200868_/_0.05)_0px_0px_0px_1px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px] rounded-[18px] md:text-center"
              />
            </div>
          </div>
          <div className="gap-y-16 gap-x-12 grid-cols-[repeat(1,_minmax(0px,_1fr))] grid items-center mx-auto py-16 md:gap-y-20 md:text-center lg:grid-cols-[repeat(5,_minmax(0px,_1fr))] lg:mx-0">
            <div className="pl-8 col-span-2 md:text-center lg:ml-auto lg:order-[2]">
              <div className="text-left">
                <h2 className="mb-4 text-white leading-[1.33333] tracking-[-0.6px] text-2xl font-medium">
                  Select the component
                </h2>
                <p className="text-zinc-300">
                  Click on the component you want to yoink
                </p>
              </div>
            </div>
            <div className="mt-[-56px] col-span-3 p-8 md:text-center lg:mt-0 lg:order-[1] lg:p-0">
              <img
                alt="Invisible to screen-share-screenshot"
                src="Step 2.png"
                className="w-full max-w-[none] bg-[#1d2025] shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_oklab(0.999994_0.0000455678_0.0000200868_/_0.05)_0px_0px_0px_1px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px] rounded-[18px] md:text-center"
              />
            </div>
          </div>
          <div className="gap-y-16 gap-x-12 grid-cols-[repeat(1,_minmax(0px,_1fr))] grid items-center mx-auto py-16 md:gap-y-20 md:text-center lg:grid-cols-[repeat(5,_minmax(0px,_1fr))] lg:mx-0">
            <div className="pl-8 col-span-2 md:text-center lg:pr-8 lg:pl-0">
              <div className="text-left">
                <h2 className="mb-4 text-white leading-[1.33333] tracking-[-0.6px] text-2xl font-medium">
                  Done!
                </h2>
                <p className="text-zinc-300">
                  Choose where you want to save your component - it's that
                  simple!
                </p>
              </div>
            </div>
            <div className="mt-[-56px] col-span-3 p-8 md:text-center lg:mt-0 lg:order-[2] lg:p-0">
              <img
                alt="Follow your eyes-screenshot"
                src="Step 3.png"
                className="w-full max-w-[none] bg-[#1d2025] shadow-[rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_oklab(0.999994_0.0000455678_0.0000200868_/_0.05)_0px_0px_0px_1px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px] rounded-[18px] md:text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
