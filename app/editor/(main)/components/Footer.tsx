const Footer = () => {
  return (
    <div className="py-4">
      <footer className="leading-[1.33333] text-xs flex flex-col items-center gap-2">
        <div className="text-zinc-300 opacity-[0]">
          By messaging v0, you agree to our{" "}
          <a className="underline cursor-pointer" href="/agreement">
            Terms
          </a>{" "}
          and{" "}
          <a className="underline cursor-pointer" href="/policy">
            AI Policy
          </a>
          .
        </div>
        <nav className="h-4 flex">
          <a
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="/pricing"
          >
            Pricing
          </a>
          <a
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="/enterprise"
          >
            Enterprise
          </a>
          <a
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="/faq"
          >
            FAQ
          </a>
          <div className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center px-2 gap-1">
            <button
              type="button"
              id="radix-_R_abqtilubsnpfqivkiknpfivb_"
              className="bg-transparent block text-center cursor-pointer"
            >
              Legal
            </button>
          </div>
          <a
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="https://vercel.com/legal/privacy-policy"
          >
            Privacy
          </a>
          <a
            className="text-zinc-300 border-r-[0.8px] border-r-white/12 flex items-center cursor-pointer px-2 gap-1"
            href="https://community.vercel.com/c/v0/59"
          >
            Vercel Community
          </a>
          <a
            className="text-zinc-300 flex items-center cursor-pointer px-2 gap-1"
            href="https://vercel.com/?utm_source=v0-site&amp;utm_medium=banner&amp;utm_campaign=home"
          >
            Vercel
            <span className="block cursor-pointer">
              <svg
                className="fill-black stroke-[1px] overflow-hidden cursor-pointer size-[10px]"
                height="16"
                stroke-linejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.5 10.25V13.25C13.5 13.3881 13.3881 13.5 13.25 13.5H2.75C2.61193 13.5 2.5 13.3881 2.5 13.25L2.5 2.75C2.5 2.61193 2.61193 2.5 2.75 2.5H5.75H6.5V1H5.75H2.75C1.7835 1 1 1.7835 1 2.75V13.25C1 14.2165 1.7835 15 2.75 15H13.25C14.2165 15 15 14.2165 15 13.25V10.25V9.5H13.5V10.25ZM9 1H9.75H14.2495C14.6637 1 14.9995 1.33579 14.9995 1.75V6.25V7H13.4995V6.25V3.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L12.4388 2.5H9.75H9V1Z"
                  className="fill-zinc-300 stroke-[1px] inline cursor-pointer"
                ></path>
              </svg>
            </span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
