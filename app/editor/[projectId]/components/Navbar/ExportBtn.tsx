import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Upload } from "lucide-react";

const ExportBtn = () => {
  // TODO: Replace with actual editor instance
  //   const editor = (window as any).yoinkEditor || null;

  const handleExport = async (value: string) => {
    console.log("Exporting", value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="-ml-px flex h-8 cursor-pointer items-center justify-center rounded-lg border-l-[0.8px] border-l-zinc-900/30 px-3 text-center text-sm leading-[20px] font-medium text-nowrap whitespace-nowrap text-zinc-950 bg-zinc-100">
          <Upload className="size-4 mr-2" /> Export
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => {}}>
          Download as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleExport("download-jsx")}>
          Download as JSX
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}}>Copy as HTML</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}}>Copy as JSX</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportBtn;
