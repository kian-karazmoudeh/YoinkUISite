import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { blocks } from "../blocks";

const BlocksModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded absolute top-5 left-5 z-[999999]">
          Open Blocks
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Blocks</DialogTitle>
        </DialogHeader>
        <div id="blocks"></div>
      </DialogContent>
    </Dialog>
  );
};

export default BlocksModal;
