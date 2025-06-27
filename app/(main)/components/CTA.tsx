import AddToChrome from "@/components/AddToChromeBtn";
import AddToEdgeBtn from "@/components/AddToEdgeBtn";
import Image from "next/image";

const CTA = () => {
  return (
    <div className="mt-10 max-w-7xl border-[0.8px] border-zinc-200 relative mx-auto py-60  lg:mt-0">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
        alt="CTA-background"
        className="text-transparent z-[0] absolute object-cover size-full inset-0"
        src="/landing/CTA-bg.png"
      />
      <div className="ml-8 z-[1] relative  lg:text-center">
        <span className="text-zinc-500 leading-[1.55556] tracking-[-0.45px] text-lg uppercase  lg:text-center">
          Bridging inspiration and creation
        </span>
        <h1 className="mt-2 text-zinc-900 leading-[1] tracking-[-1.2px] text-5xl text-balance font-medium md:tracking-[-1.5px] md:text-6xl lg:text-center">
          Ship faster than ever.
        </h1>
        <div className="mt-10 ml-2 gap-y-[10px] grid text-center justify-start items-center  lg:ml-0 lg:justify-center">
          <AddToChrome />
          <AddToEdgeBtn />
        </div>
      </div>
    </div>
  );
};

export default CTA;
