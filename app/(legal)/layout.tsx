import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Related from "./Related";
import { ReactNode } from "react";
import RelatedMin from "./RelatedMin";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="text-stone-950 leading-[1.5] font-[Aeonik,_sans-serif] bg-white">
      <Navbar />
      <div className="w-full container max-w-7xl mx-auto px-4">
        <div className="lg:grid-cols-12 lg:grid">
          <div className="col-span-12 lg:col-span-8">
            <RelatedMin />
            <div className="max-w-7xl mx-auto py-24 md:py-42">{children}</div>
          </div>
          <Related />
        </div>
      </div>
      <Footer />
    </div>
  );
}
