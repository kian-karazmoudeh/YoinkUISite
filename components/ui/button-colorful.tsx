import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ButtonColorfulProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonColorful({
  className,
  label = "Remix",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        "relative h-10 px-4 overflow-hidden",
        "bg-zinc-100",
        "transition-all duration-200",
        "group hover:bg-zinc-200 cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Gradient background effect */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
          "opacity-40 group-hover:opacity-80",
          "blur transition-opacity duration-500"
        )}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <Sparkles
          fill="currentColor"
          className="w-3.5 h-3.5 text-purple-900/90"
        />
        <span className="text-purple-950 font-semibold">{label}</span>
      </div>
    </Button>
  );
}
