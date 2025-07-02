import Link from "next/link";

export const metadata = {
  title: "Thank You | YoinkUI",
  description: "YoinkUI - Copy any component with 1 click",
};

const ThanksPage = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex space-x-5 items-center mx-auto">
          <h1 className="md:text-6xl text-4xl font-bold text-center w-full">
            Thank you!
          </h1>
        </div>
        <p className="text-zinc-700 text-center w-full">
          You now have full access to YoinkUI. <br />
          If you have any queries don't hesitate to contact us through{" "}
          <Link
            href="mailto:kianthecreator@gmail.com"
            className="text-blue-500"
          >
            this email.
          </Link>
          <br />
          <br />
          Happy Yoinking!
        </p>
      </main>
      <footer className="flex flex-col items-center justify-center row-start-3">
        <p className="text-zinc-500 text-sm">
          Copyright © 2025 YoinkUI®. All rights reserved.
        </p>
      </footer>
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>
    </div>
  );
};

export default ThanksPage;
