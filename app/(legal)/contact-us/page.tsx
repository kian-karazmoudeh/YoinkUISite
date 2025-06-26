import Link from "next/link";

export const metadata = {
  title: "Contact us | YoinkUI",
  // description: "YoinkUI - Copy any component with 1 click",
};

export default function ContactUsPage() {
  return (
    <>
      <div className="px-6  lg:max-w-7xl lg:px-8">
        <h1 className="text-zinc-950 leading-[1] tracking-[-1.2px] text-5xl flex text-balance font-medium flex-col md:tracking-[-1.5px] md:text-6xl lg:text-pretty">
          Contact us
        </h1>
      </div>
      <div className="mt-18 max-w-3xl text-pretty px-6  lg:px-8">
        <p className="mb-6">
          If you have any questions or concerns, please contact us at:
          <Link
            href="mailto:kianthecreator@gmail.com"
            className="text-sky-500 cursor-pointer"
          >
            kianthecreator@gmail.com
          </Link>
        </p>
      </div>
    </>
  );
}
