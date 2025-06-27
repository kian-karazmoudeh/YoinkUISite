import Image from "next/image";

const Features = () => {
  return (
    <div
      id="features"
      className="py-20 max-w-7xl overflow-hidden mx-auto  lg:py-20 lg:border-x-[0.8px] lg:border-x-zinc-200"
    >
      <div className="max-w-2xl mx-auto px-5 md:text-center lg:px-0">
        <h2 className="text-zinc-500 leading-[40px] text-lg uppercase md:text-center">
          Bridging inspiration and creation
        </h2>
        <p className="mt-2 text-black leading-[1.11111] tracking-[-0.9px] text-4xl text-pretty font-medium md:leading-[1] md:tracking-[-1.2px] md:text-5xl md:text-center md:text-balance">
          Made by developers for developers
        </p>
      </div>
      <div className="mt-20 mb-16 grid  lg:mb-0 lg:grid-cols-[repeat(2,_minmax(0px,_1fr))] lg:border-y-[0.8px] lg:border-y-zinc-200">
        <div className="relative  lg:border-r-[0.8px] lg:border-r-zinc-200">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            alt="YoinkUI Layout"
            src="/landing/Ready to use.png"
            style={{ width: "auto", height: "auto" }}
          />
          <div className="mt-[-144px] w-full bottom-16 left-10 px-8  lg:mt-0 lg:pl-0 lg:w-auto lg:absolute">
            <h2 className="leading-[1.33333] text-2xl font-medium">
              Ready-to-use components
            </h2>
            <p className="mt-3 text-zinc-600 leading-[20px] w-full  lg:w-100">
              Creates ready to use components that you can use instantly in your
              React, Next.js, Remix, and Gatsby projects
            </p>
          </div>
          <div className="w-1 h-[34px] bottom-[114px] left-[-1px] bg-[#0055fe] hidden absolute  lg:block"></div>
        </div>
        <div className="relative">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "auto" }}
            alt="Tailwind"
            src="/landing/Tailwind.png"
          />
          <div className="mt-[-144px] w-full bottom-16 left-10 px-8  lg:mt-0 lg:pl-0 lg:w-auto lg:absolute">
            <h2 className="leading-[1.33333] text-2xl font-medium">
              Tailwind styles
            </h2>
            <p className="mt-3 text-zinc-600 leading-[20px] w-full  lg:w-110">
              Every components is styled with Tailwind so you don&apos;t have to
              worry about compatibility.
            </p>
          </div>
          <div className="w-1 h-[34px] bottom-[114px] left-[-1px] bg-[#0055fe] hidden absolute  lg:block"></div>
        </div>
      </div>
      <div className="relative  lg:border-b-[0.8px] lg:border-b-zinc-200">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
          src="/landing/Clean Code.png"
          alt="Clean Code"
        />
        <div className="mt-8 pl-8 w-full bottom-16 left-10  lg:mt-0 lg:pl-0 lg:w-auto lg:absolute">
          <h2 className="leading-[1.33333] text-2xl font-medium">Clean code</h2>
          <p className="mt-3 text-zinc-600 leading-[20px] w-full  lg:w-100">
            YoinkUI gets rid of all invisble elements, unnecessary tags and only
            gives you what really matters - the visible component.
          </p>
        </div>
        <div className="w-1 h-[34px] bottom-34 left-[-1px] bg-[#0055fe] hidden absolute  lg:block"></div>
      </div>
    </div>
  );
};

export default Features;
