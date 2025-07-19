"use client";

import { useRef } from "react";
import { Block, Editor } from "grapesjs";
import { useEditorStore } from "../../store/editorStore";
import { useShallow } from "zustand/react/shallow";

const Blocks = () => {
  const { editor } = useEditorStore(
    useShallow((state) => ({
      editor: state.editor,
    }))
  );
  const blocksRef = useRef<HTMLDivElement>(null);

  const startDrag = (block: Block, e: React.DragEvent<HTMLDivElement>) => {
    if (!editor) return;
    editor.BlockManager.startDrag(block, e.nativeEvent);
  };

  // Group blocks by category
  let blocks = editor?.BlockManager.getAll() || [];
  const categories: { [key: string]: Block[] } = {};
  blocks.forEach((block: Block) => {
    const categoryRaw = block.get("category");
    let category: string;
    if (typeof categoryRaw === "string") {
      category = categoryRaw;
    } else if (categoryRaw && typeof categoryRaw === "object") {
      category = categoryRaw.label || categoryRaw.id || "Other";
    } else {
      category = "Other";
    }
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(block);
  });
  const categoryNames = Object.keys(categories);

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col h-full min-h-0">
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
      >
        {categoryNames.map((cat) => (
          <div key={cat} className="mb-6">
            <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
              {cat}
            </div>
            <div className="space-y-2">
              {categories[cat].map((block: Block) => (
                <div
                  key={block.id}
                  onDragStart={(e) => startDrag(block, e)}
                  draggable
                >
                  {block.getLabel()}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blocks;
