import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Upload } from "lucide-react";
import { mapResponsivePage } from "../../export/tailwind";
import { Button } from "@/components/ui/button";

const ExportBtn = () => {
  // TODO: Replace with actual editor instance
  //   const editor = (window as any).yoinkEditor || null;

  const handleExport = async () => {
    mapResponsivePage();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer text-zinc-950 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-950">
          <Upload className="size-4 mr-2" /> Export
        </Button>
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
