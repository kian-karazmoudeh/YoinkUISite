import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { ImportDialogProps } from "./types";
import { YoinkItem } from "./YoinkItem";

export const ImportDialog = ({
  isOpen,
  onOpenChange,
  yoinks,
  isLoading,
  onYoinkSelect,
}: ImportDialogProps) => {
  return (
    <DialogContent className="bg-gray-900 border-gray-800 max-w-xl">
      <DialogHeader>
        <DialogTitle className="text-gray-100">Import Component</DialogTitle>
      </DialogHeader>
      <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : yoinks.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No components found. Create some components first!
          </div>
        ) : (
          yoinks.map((yoink) => (
            <YoinkItem
              key={yoink.id}
              yoink={yoink}
              onSelect={async () => {
                await onYoinkSelect(yoink);
              }}
            />
          ))
        )}
      </div>
    </DialogContent>
  );
};
