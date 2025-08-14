import { getCategoryIcon } from "./utils";
import { BlockItemProps } from "./types";

export const BlockItem = ({ block, category, onStartDrag }: BlockItemProps) => {
  return (
    <div
      onDragStart={(e) => onStartDrag(block, e)}
      draggable
      className="group relative bg-[#141414] hover:bg-[#27282d] rounded-lg p-3 cursor-move transition-all duration-200 border-[0.8px] border-gray-700/50 hover:border-gray-600"
    >
      <div className="flex items-center gap-3 justify-center">
        <div className="flex-shrink-0 w-8 h-8 rounded bg-[#262729] flex items-center justify-center">
          {getCategoryIcon(category)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-200 truncate">
            {block.getLabel()}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
            {`Add ${block.getLabel().toLowerCase()} component`}
          </p>
        </div>
      </div>
    </div>
  );
};
