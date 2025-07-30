import Link from "next/link";

export default function TalkToSalesBtn() {
  return (
    <Link
      href="/contact-us"
      className="mt-[42px] text-white block leading-[24px] w-full text-sm font-[Aeonik,_sans-serif,_system-ui,_sans-serif] bg-white/10 text-center font-semibold cursor-pointer px-3 py-2 rounded-full"
    >
      Talk to Sales
    </Link>
  );
}
