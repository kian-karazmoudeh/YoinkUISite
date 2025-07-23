import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Copy } from "lucide-react";
import { mapResponsivePage } from "../../export/tailwind";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ExportBtn = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("download");

  // type: 'html-download' | 'jsx-download' | 'html-copy' | 'jsx-copy'
  const handleExport = async (type: string) => {
    mapResponsivePage();
    setOpen(false);
    // TODO: Implement export logic based on type
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer text-zinc-50 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700">
          <Upload className="size-4 mr-2" /> Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-zinc-100">
            <Upload className="size-5 text-blue-400" /> Export Project
          </DialogTitle>
          <DialogDescription className="text-zinc-400 mt-1">
            Choose how you want to export your project. Download the code or
            copy it to your clipboard.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="w-full flex justify-center mb-4 bg-zinc-800 text-zinc-400">
              <TabsTrigger
                value="download"
                className="flex-1 data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-100"
              >
                Download
              </TabsTrigger>
              <TabsTrigger
                value="copy"
                className="flex-1 data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-100"
              >
                Copy
              </TabsTrigger>
            </TabsList>
            <TabsContent value="download">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="justify-start gap-3 text-base bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-blue-400"
                  onClick={() => handleExport("html-download")}
                >
                  <Download className="size-4 text-blue-400" /> Download as HTML
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-3 text-base bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-green-400"
                  onClick={() => handleExport("jsx-download")}
                >
                  <Download className="size-4 text-green-400" /> Download as JSX
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="copy">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="justify-start gap-3 text-base bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-blue-400"
                  onClick={() => handleExport("html-copy")}
                >
                  <Copy className="size-4 text-blue-400" /> Copy as HTML
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-3 text-base bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-green-400"
                  onClick={() => handleExport("jsx-copy")}
                >
                  <Copy className="size-4 text-green-400" /> Copy as JSX
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="border-t border-zinc-800 my-2" />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="w-full mt-2 bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportBtn;
