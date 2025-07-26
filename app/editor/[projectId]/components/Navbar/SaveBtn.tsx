"use client";

import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SaveIcon } from "lucide-react";

const SaveBtn = () => {
  const { editor } = useEditorStore(
    useShallow((state) => ({ editor: state.editor }))
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    editor?.store().then(() => {
      setIsSaving(false);
    });
  };
  return (
    <Button
      onClick={handleSave}
      disabled={isSaving}
      variant="ghost"
      className="mr-2 cursor-pointer text-zinc-50 bg-zinc-900 hover:bg-zinc-800 border hover:text-text-200 border-zinc-800"
    >
      <SaveIcon className="w-4 h-4 mr-2" />
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
};

export default SaveBtn;
