import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PricingSection from "./components/PricingSection";

export const metadata = {
  title: "Pricing | YoinkUI",
  description: "YoinkUI - pricing and subscriptions",
};

export default function Page() {
  return (
    <div className="text-stone-950 leading-[1.5] font-[Aeonik,_sans-serif] bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto py-24 md:py-42">
        <div className="max-w-4xl mx-auto px-6  lg:max-w-7xl lg:px-8">
          <h1 className="text-zinc-950 tracking-[-1.2px] text-5xl flex font-semibold flex-col md:tracking-[-1.5px] md:text-6xl ">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-900">
              Less time,{" "}
            </span>
            <span className="block md:tracking-[-1.5px] md:text-6xl">
              Better design.
            </span>
          </h1>
          <p className="mt-6 text-zinc-600 leading-[1.55556] max-w-lg text-lg text-pretty mx-auto md:leading-[32px] md:text-xl lg:mx-[0px]">
            Whether you&apos;re prototyping ideas or building full products,
            YoinkUI has the tools to help you make it happen.
          </p>
        </div>
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
}
