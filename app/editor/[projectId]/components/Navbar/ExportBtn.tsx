import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Upload } from "lucide-react";
import { mapResponsivePage } from "../../export/tailwind";

const ExportBtn = () => {
  // TODO: Replace with actual editor instance
  //   const editor = (window as any).yoinkEditor || null;

  const handleExport = async () => {
    mapResponsivePage();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="-ml-px flex h-8 cursor-pointer items-center justify-center rounded-lg border-l-[0.8px] border-l-zinc-900/30 px-3 text-center text-sm leading-[20px] font-medium text-nowrap whitespace-nowrap text-zinc-950 bg-zinc-100">
          <Upload className="size-4 mr-2" /> Export
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleExport()}>
          Download as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleExport()}>
          Download as JSX
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleExport()}>
          Copy as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleExport()}>
          Copy as JSX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportBtn;
