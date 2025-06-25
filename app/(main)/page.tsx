import CTA from "./components/CTA";
import Features from "./components/Features";
import Footer from "../../components/Footer";
import Header from "./components/Header";
import Navbar from "../../components/Navbar";
import HowItWorks from "./components/HowItWorks";
import Usage from "./components/Usage";

const LandingPage = () => {
  return (
    <div className="text-stone-950 leading-[1.5] font-[inter,_sans-serif] bg-white">
      <Navbar />
      <Header />
      <Features />
      <HowItWorks />
      <Usage />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
