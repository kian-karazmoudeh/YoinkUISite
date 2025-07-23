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
      className="mr-2 cursor-pointer"
    >
      <SaveIcon className="w-4 h-4 mr-2" />
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
};

export default SaveBtn;
