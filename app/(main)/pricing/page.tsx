import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PricingSection from "./components/PricingSection";

export default function Page() {
  return (
    <div className="text-stone-950 leading-[1.5] font-[Aeonik,_sans-serif] bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto py-24 md:py-42">
        <div className="max-w-4xl mx-auto px-6  lg:max-w-7xl lg:px-8">
          <h1 className="text-zinc-950 leading-[1] tracking-[-1.2px] text-5xl flex text-balance font-medium flex-col md:tracking-[-1.5px] md:text-6xl lg:text-pretty">
            Start for free.{" "}
            <span className="block md:tracking-[-1.5px] md:text-6xl lg:text-pretty">
              Get used to shipping.
            </span>
          </h1>
          <p className="mt-6 text-zinc-600 leading-[1.55556] max-w-lg text-lg text-pretty mx-auto md:leading-[32px] md:text-xl lg:mx-[0px]">
            Whether you're using Cluely for meetings, homework, sales calls, or
            just curious, it's always free to start.
          </p>
        </div>
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
}
