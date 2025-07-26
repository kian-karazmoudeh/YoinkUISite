import TextCursor from "@/components/ui/TextCursor";
import Image from "next/image";

const Features = () => {
  return (
    <div className="bg-[#0F0F10]">
      <div
        id="howitworks"
        className="py-20 max-w-7xl overflow-hidden mx-auto  lg:py-20 lg:border-x-[0.8px] lg:border-x-zinc-700 text-zinc-50"
      >
        <div className="max-w-2xl mx-auto px-5 md:text-center lg:px-0">
          <p className="mt-2 text-zinc-50 leading-[1.11111] tracking-[-0.9px] text-4xl text-pretty font-semibold md:leading-[1] md:tracking-[-1.2px] md:text-5xl text-center md:text-balance">
            How it works
          </p>
        </div>
        <div className="mt-20 mb-16 grid  lg:mb-0 lg:grid-cols-[repeat(2,_minmax(0px,_1fr))] lg:border-y-[0.8px] lg:border-y-zinc-700">
          <div className="relative  lg:border-r-[0.8px] lg:border-r-zinc-700">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              alt="YoinkUI Layout"
              src="/landing/Select.png"
              style={{ width: "auto", height: "auto" }}
            />
            <div className="mt-[-100px] w-full bottom-16 left-10 px-8  lg:mt-0 lg:pl-0 lg:w-auto lg:absolute">
              <h2 className="leading-[1.33333] text-2xl font-semibold">
                1. Select a component
              </h2>
              <p className="mt-3 text-zinc-400 leading-[20px] w-full lg:w-100">
                Whenever you spot a component you like, just fire up YoinkUI and
                click on it
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
              src="/landing/Editor.png"
            />
            <div className="mt-[-100px] w-full bottom-16 left-10 px-8  lg:mt-0 lg:pl-0 lg:w-auto lg:absolute">
              <h2 className="leading-[1.33333] text-2xl font-semibold">
                2. Make it yours
              </h2>
              <p className="mt-3 text-zinc-400 leading-[20px] w-full lg:w-110">
                Edit the component in the YoinkUI editor and make it yours
              </p>
            </div>
            <div className="w-1 h-[34px] bottom-[114px] left-[-1px] bg-[#0055fe] hidden absolute  lg:block"></div>
          </div>
        </div>
        <div className="relative  lg:border-b-[0.8px] lg:border-b-zinc-700">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "auto" }}
            className="hidden md:block"
            src="/landing/Large-Layout.png"
            alt="Clean Code"
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "auto" }}
            className="block md:hidden"
            src="/landing/Small-Layout.png"
            alt="Clean Code"
          />
          <div className="mt-8 pl-8 w-full bottom-16 left-10  lg:mt-0 lg:pl-0 lg:w-auto lg:absolute">
            <h2 className="leading-[1.33333] text-2xl font-semibold">
              3. Export
            </h2>
            <p className="mt-3 text-zinc-400 leading-[20px] w-full lg:w-100">
              Export the component and start using it in your project!
            </p>
          </div>
        </div>

        <div className="text-zinc-50  leading-[1.5] max-w-7xl font-[Aeonik,_sans-serif] text-center mx-auto py-36 relative">
          <TextCursor
            text="Yoink!"
            delay={0.01}
            spacing={100}
            followMouseDirection={true}
            randomFloat={true}
          />
          <p className="mt-2 text-zinc-50 leading-[1] tracking-[-1.2px] text-5xl text-balance font-semibold">
            Yes, its that simple!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
