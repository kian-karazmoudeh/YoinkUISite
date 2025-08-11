"use client";

import { ButtonColorful } from "@/components/ui/button-colorful";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RemixDialogProps {
  className?: string;
  children?: React.ReactNode;
}

export function RemixDialog({ className, children }: RemixDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonColorful className={className} />
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Remix</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
