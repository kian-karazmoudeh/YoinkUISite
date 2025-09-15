import CTA from "./components/CTA";
import HowItWorks from "./components/HowItWorks";
import Footer from "../../components/Footer";
import Header from "./components/Header";
import Navbar from "../../components/Navbar";
// import Usage from "./components/Usage";

export const metadata = {
  title: "YoinkUI",
  description: "YoinkUI - Copy any component with 1 click",
};

const LandingPage = () => {
  return (
    <div className="text-stone-950 leading-[1.5] font-[inter,_sans-serif] bg-white">
      <Navbar />
      <Header />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
