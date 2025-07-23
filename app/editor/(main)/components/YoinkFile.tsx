import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export const YoinkFileSkeleton = () => {
  return (
    <div className="leading-[1.42857] w-full min-w-0 text-sm flex relative flex-col gap-2  p-3 rounded-md cursor-pointer border border-zinc-800 hover:bg-zinc-900 hover:border-l-4 hover:border-l-sky-400 transition-all duration-300">
      <div className="pr-1 flex items-center gap-3 w-full">
        <div className="flex items-center cursor-pointer gap-3 w-full">
          <div className="flex flex-col cursor-pointer gap-[6px] w-full">
            <div className="leading-[1] font-medium overflow-hidden cursor-pointer w-full opacity-50">
              <Skeleton className="w-1/2 h-4" />
            </div>
            <div className="flex items-center cursor-pointer gap-[6px] w-full opacity-50">
              <Skeleton className="w-1/3 h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const YoinkFile = (props: YoinkFile) => {
  return (
    <Link
      href={`/editor/${props.id}`}
      className="leading-[1.42857] w-full min-w-0 text-sm flex relative flex-col gap-2 p-3 rounded-md cursor-pointer border border-zinc-300 hover:border-l-4 hover:border-l-sky-400 transition-all duration-300"
    >
      <div className="pr-1 flex items-center gap-3">
        <div className="flex items-center cursor-pointer gap-3">
          <div className="flex flex-col cursor-pointer gap-[6px]">
            <div className="leading-[1] font-medium overflow-hidden cursor-pointer">
              {props.name}
            </div>
            <div className="text-zinc-500 flex items-center cursor-pointer gap-[6px]">
              <span className="leading-[1] text-[13px] block cursor-pointer">
                {formatDate(props.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default YoinkFile;
