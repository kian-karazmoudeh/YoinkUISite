"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useRef, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../store";

const FileName = () => {
  const { yoinkName, yoinkId } = useEditorStore(
    useShallow((state) => ({
      yoinkName: state.yoinkName,
      yoinkId: state.yoinkId,
    }))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState(yoinkName || "Untitled");
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    supabase.from("yoinks").update({ name: newFileName }).eq("id", yoinkId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className="flex items-center gap-1 rounded-md px-2 py-1"
      onClick={handleEdit}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className="text-sm font-medium text-nowrap whitespace-nowrap">
          {newFileName}
        </p>
      )}
    </div>
  );
};

export default FileName;
