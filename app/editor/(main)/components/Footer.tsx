import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-4">
      <footer className="leading-[1.33333] text-xs flex flex-col items-center gap-2">
        <div className="text-zinc-300 opacity-[0]">
          By using YoinkUI, you agree to our{" "}
          <Link className="underline cursor-pointer" href="/terms">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="underline cursor-pointer" href="/privacy-policy">
            Privacy Policy
          </Link>
          .
        </div>
        <nav className="h-4 flex">
          <Link
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="/privacy-policy"
          >
            Terms of Service
          </Link>
          <Link
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="/terms"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-zinc-300 flex items-center cursor-pointer px-2 gap-1"
            href="/contact-us"
          >
            Contact us
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
