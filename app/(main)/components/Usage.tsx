"use client";

import { useInView } from "react-intersection-observer";

const Usage = () => {
  const step2 = useInView({ threshold: 0.3 });
  const step3 = useInView({ threshold: 0.3 });

  return (
    <div
      id="usage"
      className="pt-32 max-w-7xl mx-auto border-x-[0.8px] border-x-zinc-200"
    >
      <h1 className="ml-8 leading-[1.11111] max-w-md text-4xl font-medium lg:mb-[-48px]">
        You can even Yoink the whole page
      </h1>
      <div className="flex flex-col  lg:flex-row">
        <div className="w-full justify-center hidden lg:flex items-center lg:w-[60%] lg:h-216 lg:top-0 lg:sticky">
          <div className="flex relative justify-center items-center size-full">
            <div className="z-[10] flex absolute justify-center items-center size-full">
              <img
                src="/landing/Responsive step 1.png"
                alt="Section 1 image"
                className="max-h-full rounded-tr-[18px] rounded-br-[18px] border-r-[0.8px] object-contain border-y-[0.8px] border-zinc-200 p-3 bg-[#ECECEC]"
              />
            </div>
            <div className="z-[10] flex absolute justify-center items-center size-full">
              <img
                src="/landing/Responsive step 2.png"
                alt="Section 1 image"
                className={`max-h-full transition-all rounded-tr-[18px] rounded-br-[18px] border-r-[0.8px] object-contain border-y-[0.8px] border-zinc-200 p-3 bg-[#ECECEC]`}
                style={{ opacity: step2.inView ? 1 : 0 }}
              />
            </div>
            <div className="z-[10] flex absolute justify-center items-center size-full">
              <img
                src="/landing/Responsive step 3.png"
                alt="Section 1 image"
                className={`max-h-full transition-all rounded-tr-[18px] rounded-br-[18px] border-r-[0.8px] object-contain border-y-[0.8px] border-zinc-200 p-3 bg-[#ECECEC]`}
                style={{ opacity: step3.inView ? 1 : 0 }}
              />
            </div>
          </div>
        </div>
        <div className="w-full  lg:ml-auto lg:w-[50%]">
          <div className="h-180 flex overflow-hidden items-center  lg:min-h-216">
            <div className="max-w-xl">
              <div className="p-8  lg:pl-20">
                <h2 className="mb-4 leading-[1] text-5xl font-medium">
                  Select the page tool
                </h2>
                <p className="text-zinc-600 leading-[1.4] max-w-94 text-xl">
                  The page tool lets you yoink the entire page, and make the UI
                  responsive!
                </p>
              </div>
              <div className="mt-6 h-xs flex justify-center items-center  lg:hidden">
                <img
                  alt="Section 1 image (mobile view)"
                  className="max-h-full object-contain p-3 bg-[#ECECEC]"
                  src="/landing/Responsive step 1.png"
                />
              </div>
            </div>
          </div>
          <div
            className="h-180 flex overflow-hidden items-center  lg:min-h-216"
            ref={step2.ref}
          >
            <div className="max-w-xl">
              <div className="p-8  lg:pl-20">
                <h2 className="mb-4 leading-[1] text-5xl font-medium">
                  Resize the window
                </h2>
                <p className="text-zinc-600 leading-[1.4] max-w-94 text-xl">
                  To generate responsive UI, YoinkUI needs to capture Large,
                  Medium and Small viewports.
                  <br />
                  Pro-tip: Using the browser Dev tools makes it super easy to
                  resize the window.
                </p>
              </div>
              <div className="mt-6 h-xs flex justify-center items-center  lg:hidden">
                <img
                  alt="Section 2 image (mobile view)"
                  className="max-h-full object-contain"
                  src="/landing/Responsive step 2.png"
                />
              </div>
            </div>
          </div>
          <div
            className="h-180 flex overflow-hidden items-center  lg:min-h-216"
            ref={step3.ref}
          >
            <div className="max-w-xl">
              <div className="p-8  lg:pl-20">
                <h2 className="mb-4 leading-[1] text-5xl font-medium">Done!</h2>
                <p className="text-zinc-600 leading-[1.4] max-w-94 text-xl">
                  Once YoinkUI has captured the three Viewports, it generates
                  your responsive component.
                </p>
              </div>
              <div className="mt-6 h-xs flex justify-center items-center  lg:hidden">
                <img
                  alt="Section 3 image (mobile view)"
                  className="max-h-full object-contain"
                  src="/landing/Responsive step 3.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usage;
