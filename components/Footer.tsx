const Footer = () => {
  return (
    <footer className="text-white bg-black flex relative flex-col justify-between size-full  lg:h-100">
      <div className="pt-8 pb-24 w-full flex flex-col justify-between mx-auto px-4 gap-4 md:max-w-160 lg:max-w-5xl lg:flex-row">
        <div>
          <ul className="mb-2 flex flex-wrap gap-4">
            <li className="text-left">
              <a
                href="/terms"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Terms &amp; policies
              </a>
            </li>
            <li className="text-left">
              <a
                href="/privacy-policy"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Privacy policy
              </a>
            </li>
          </ul>
          <p className="mt-4 leading-[1.42857] gap-x-1 text-sm flex items-center">
            <svg
              className="fill-black stroke-[1px] overflow-hidden size-3"
              viewBox="0 0 80 80"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M67.4307 11.5693C52.005 -3.85643 26.995 -3.85643 11.5693 11.5693C-3.85643 26.995 -3.85643 52.005 11.5693 67.4307C26.995 82.8564 52.005 82.8564 67.4307 67.4307C82.8564 52.005 82.8564 26.995 67.4307 11.5693ZM17.9332 17.9332C29.8442 6.02225 49.1558 6.02225 61.0668 17.9332C72.9777 29.8442 72.9777 49.1558 61.0668 61.0668C59.7316 62.4019 58.3035 63.5874 56.8032 64.6232L56.8241 64.6023C46.8657 54.6439 46.8657 38.4982 56.8241 28.5398L58.2383 27.1256L51.8744 20.7617L50.4602 22.1759C40.5018 32.1343 24.3561 32.1343 14.3977 22.1759L14.3768 22.1968C15.4126 20.6965 16.5981 19.2684 17.9332 17.9332ZM34.0282 38.6078C25.6372 38.9948 17.1318 36.3344 10.3131 30.6265C7.56889 39.6809 9.12599 49.76 14.9844 57.6517L34.0282 38.6078ZM21.3483 64.0156C29.24 69.874 39.3191 71.4311 48.3735 68.6869C42.6656 61.8682 40.0052 53.3628 40.3922 44.9718L21.3483 64.0156Z"
                className="fill-white stroke-[1px] inline"
              ></path>
            </svg>
            Cluely 2025. All Rights Reserved
          </p>
        </div>
        <div>
          <ul className="mb-4 flex flex-wrap gap-4">
            <li className="text-left">
              <a
                href="/careers"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Careers
              </a>
            </li>
            <li className="text-left">
              <a
                href="/manifesto"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Manifesto
              </a>
            </li>
            <li className="text-left">
              <a
                href="/help-center"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Help Center
              </a>
            </li>
            <li className="text-left">
              <a
                href="https://x.com/cluely"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Twitter
              </a>
            </li>
            <li className="text-left">
              <a
                href="https://www.instagram.com/trycluely"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                Instagram
              </a>
            </li>
            <li className="text-left">
              <a
                href="https://github.com/cluely"
                className="leading-[1.42857] text-sm cursor-pointer"
              >
                GitHub
              </a>
            </li>
          </ul>
          <div className="mt-4 text-right">
            <button className="leading-[1.42857] text-sm bg-transparent inline-flex text-center items-center">
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
