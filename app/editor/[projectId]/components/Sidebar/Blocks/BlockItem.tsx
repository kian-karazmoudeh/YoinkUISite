import { getCategoryIcon } from "./utils";
import { BlockItemProps } from "./types";

export const BlockItem = ({ block, category, onStartDrag }: BlockItemProps) => {
  return (
    <div
      onDragStart={(e) => onStartDrag(block, e)}
      draggable
      className="group relative bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 cursor-move transition-all duration-200 border border-gray-700/50 hover:border-gray-600"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded bg-gray-700/50 flex items-center justify-center">
          {block.getMedia() || getCategoryIcon(category)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-200 truncate">
            {block.getLabel()}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
            {`Add a ${block.getLabel().toLowerCase()} component to your design`}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-all duration-200" />
    </div>
  );
};
