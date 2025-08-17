import { Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialSmall() {
  return (
    <div className="leading-[1.5] flex text-left justify-center items-start gap-3">
      <div className="sm:flex overflow-hidden hidden">
        <div className="flex relative overflow-hidden border-white border-[4px] rounded-full size-12">
          <Image
            alt="User"
            width="50"
            height="50"
            src="/landing/cust.jpg"
            className="text-transparent max-w-full aspect-[auto_50_/_50] outline-transparent align-middle object-cover overflow-clip size-full"
          />
        </div>
        <div className="-ml-2 flex relative overflow-hidden border-white border-[4px] rounded-full size-12">
          <Image
            alt="User"
            width="50"
            height="50"
            src="/landing/cust1.jpg"
            className="text-transparent max-w-full aspect-[auto_50_/_50] outline-transparent align-middle object-cover overflow-clip size-full"
          />
        </div>
        <div className="-ml-2 flex relative overflow-hidden border-white border-[4px] rounded-full size-12">
          <Image
            alt="User"
            width="50"
            height="50"
            src="/landing/cust2.jpg"
            className="text-transparent max-w-full aspect-[auto_50_/_50] outline-transparent align-middle object-cover overflow-clip size-full"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <div className="flex relative text-yellow-500 justify-center sm:justify-start items-center w-full">
          <Star fill="currentColor" />
          <Star fill="currentColor" />
          <Star fill="currentColor" />
          <Star fill="currentColor" />
          <Star fill="currentColor" />
        </div>
        <div className="text-gray-700/80 leading-[24px] font-semibold">
          Loved by <span className="text-[#223d30]">2,000</span> developers{" "}
        </div>
      </div>
    </div>
  );
}
