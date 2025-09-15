import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { ImportDialogProps } from "./types";
import { YoinkItem } from "./YoinkItem";

export const ImportDialog = ({
  yoinks,
  isLoading,
  onYoinkSelect,
}: ImportDialogProps) => {
  return (
    <DialogContent className="max-w-xl bg-zinc-900 border border-zinc-800 shadow-2xl text-zinc-100">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-zinc-100">
          <Download className="size-5 text-blue-400" /> Import Component
        </DialogTitle>
        <DialogDescription className="text-zinc-400 mt-1">
          Choose a component to import into your project. You can import
          components you&apos;ve previously created.
        </DialogDescription>
      </DialogHeader>
      <div
        className="my-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-zinc-400" />
          </div>
        ) : yoinks.length === 0 ? (
          <div className="text-zinc-500 text-center py-8">
            No components found. Create some components first!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {yoinks.map((yoink) => (
              <YoinkItem
                key={yoink.id}
                yoink={yoink}
                onSelect={async () => {
                  await onYoinkSelect(yoink);
                }}
              />
            ))}
          </div>
        )}
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
  );
};
