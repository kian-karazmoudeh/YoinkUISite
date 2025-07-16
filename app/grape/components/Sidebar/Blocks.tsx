"use client";

import { useEffect, useRef } from "react";
import { Editor } from "grapesjs";
import { blocks } from "../blocks";

const Blocks = ({ editor }: { editor: Editor }) => {
  const blocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editor && blocksRef.current) {
      const el = editor.BlockManager.render(blocks as any);
      if (el) {
        blocksRef.current.innerHTML = ""; // Clear previous
        blocksRef.current.appendChild(el);
      }
    }
  }, [editor]);

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col h-full min-h-0">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Components</h3>
      <div ref={blocksRef} className="flex-1 overflow-y-auto" />
    </div>
  );
};

export default Blocks;
