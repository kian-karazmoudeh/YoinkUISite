"use client";

import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../store";

const SaveBtn = () => {
  const { editor } = useEditorStore(
    useShallow((state) => ({ editor: state.editor }))
  );

  const handleSave = () => {
    editor?.store().then(() => {
      alert("saved");
    });
  };
  return <button onClick={handleSave}>Save</button>;
};

export default SaveBtn;
