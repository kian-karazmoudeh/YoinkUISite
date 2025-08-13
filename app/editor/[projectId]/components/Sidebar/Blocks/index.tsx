"use client";

import { useEditorStore } from "../../../store";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import { Import } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Block } from "grapesjs";
import { useYoinks, useBlockCategories, useCollapsedCategories } from "./hooks";
import { CategoryBlock } from "./CategoryBlock";
import { ImportDialog } from "./ImportDialog";
import { YoinkFile } from "./types";

const Blocks = () => {
  const { editor } = useEditorStore(
    useShallow((state) => ({
      editor: state.editor,
    }))
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const { yoinks, isLoading, fetchYoinks, importYoink } = useYoinks();
  const { categories, categoryNames } = useBlockCategories(editor);
  const { collapsedCategories, toggleCategory } = useCollapsedCategories();

  const startDrag = (block: Block, e: React.DragEvent<HTMLDivElement>) => {
    if (!editor) return;
    editor.BlockManager.startDrag(block, e.nativeEvent);
  };

  const handleYoinkSelect = async (yoink: YoinkFile) => {
    await importYoink(yoink, editor);
    setDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <motion.div
        className="flex-1 overflow-y-auto min-h-0 px-3 py-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {categoryNames.map((category) => (
          <CategoryBlock
            key={category}
            category={category}
            blocks={categories[category]}
            isCollapsed={collapsedCategories[category]}
            onToggleCollapse={toggleCategory}
            onStartDrag={startDrag}
          />
        ))}
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="p-3">
            <Button
              className="w-full bg-gradient-to-br from-sky-900 via-sky-800 to-blue-900 text-zinc-100 hover:from-sky-800 hover:via-sky-700 hover:to-blue-800 flex items-center justify-center gap-2"
              onClick={fetchYoinks}
            >
              <Import className="w-4 h-4" />
              Import Component
            </Button>
          </div>
        </DialogTrigger>
        <ImportDialog
          isOpen={dialogOpen}
          onOpenChange={setDialogOpen}
          yoinks={yoinks}
          isLoading={isLoading}
          onYoinkSelect={handleYoinkSelect}
        />
      </Dialog>
    </div>
  );
};

export default Blocks;
