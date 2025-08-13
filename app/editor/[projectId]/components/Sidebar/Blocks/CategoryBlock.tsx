import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CategoryBlockProps } from "./types";
import { BlockItem } from "./BlockItem";

export const CategoryBlock = ({
  category,
  blocks,
  isCollapsed,
  onToggleCollapse,
  onStartDrag,
}: CategoryBlockProps) => {
  return (
    <div className="mb-6">
      <button
        onClick={() => onToggleCollapse(category)}
        className="flex items-center justify-between w-full text-left py-2 px-1 rounded-md hover:bg-gray-800/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
          {category}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            !isCollapsed ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-2 mt-3">
              {blocks.map((block) => (
                <BlockItem
                  key={block.id}
                  block={block}
                  category={category}
                  onStartDrag={onStartDrag}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
