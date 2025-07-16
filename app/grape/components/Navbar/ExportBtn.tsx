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

  //   const handleExport = async (value: string) => {
  //     if (!editor) return;
  //     const html = editor.getHtml ? editor.getHtml() : "";
  //     const css = editor.getCss ? editor.getCss() : "";
  //     const fullHTML = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Exported from YoinkUI</title>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n</body>\n</html>`;
  //     if (value === "download-html") {
  //       const blob = new Blob([fullHTML], { type: "text/html" });
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "yoinkui-export.html";
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       URL.revokeObjectURL(url);
  //     } else if (value === "download-jsx") {
  //       // Placeholder: just download HTML as .jsx
  //       const blob = new Blob([html], { type: "text/plain" });
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "yoinkui-export.jsx";
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       URL.revokeObjectURL(url);
  //     } else if (value === "copy-html") {
  //       await navigator.clipboard.writeText(fullHTML);
  //     } else if (value === "copy-jsx") {
  //       // Placeholder: just copy HTML
  //       await navigator.clipboard.writeText(html);
  //     }
  //   };

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
        <DropdownMenuItem onSelect={() => {}}>Download as JSX</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}}>Copy as HTML</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}}>Copy as JSX</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportBtn;
