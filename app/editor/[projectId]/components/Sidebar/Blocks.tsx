"use client";

import { Block } from "grapesjs";
import { useEditorStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";

const Blocks = () => {
  const { editor } = useEditorStore(
    useShallow((state) => ({
      editor: state.editor,
    }))
  );

  const startDrag = (block: Block, e: React.DragEvent<HTMLDivElement>) => {
    if (!editor) return;
    editor.BlockManager.startDrag(block, e.nativeEvent);
  };

  // Group blocks by category
  const blocks = editor?.BlockManager.getAll() || [];
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
    <div className="flex-1 p-6 overflow-hidden flex flex-col h-full min-h-0">
      <motion.div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
                  {block.getMedia()}
                  {block.getLabel()}
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Blocks;
