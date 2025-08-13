import { Block } from "grapesjs";

export interface YoinkFile {
  id: string;
  name: string;
  updated_at: string;
  content_url: string;
  user_id: string;
  created_at?: string; // Made optional since it's not always required
}

export interface CategoryBlockProps {
  category: string;
  blocks: Block[];
  isCollapsed: boolean;
  onToggleCollapse: (category: string) => void;
  onStartDrag: (block: Block, e: React.DragEvent<HTMLDivElement>) => void;
}

export interface BlockItemProps {
  block: Block;
  category: string;
  onStartDrag: (block: Block, e: React.DragEvent<HTMLDivElement>) => void;
}

export interface YoinkItemProps {
  yoink: YoinkFile;
  onSelect: () => void;
}

export interface ImportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  yoinks: YoinkFile[];
  isLoading: boolean;
  onYoinkSelect: (yoink: YoinkFile) => Promise<void>;
}
