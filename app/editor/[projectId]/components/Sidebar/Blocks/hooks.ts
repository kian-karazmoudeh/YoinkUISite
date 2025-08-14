import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { YoinkFile } from "./types";
import { Block } from "grapesjs";
import { Editor } from "grapesjs";
import { pageToBlock } from "./utils";
import { BUCKET_NAME } from "@/utils/getStorageBucketName";

export const useYoinks = () => {
  const [yoinks, setYoinks] = useState<YoinkFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const fetchYoinks = async () => {
    setIsLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();

      if (userData.user) {
        const { data, error } = await supabase
          .from("yoinks")
          .select("*")
          .eq("user_id", userData.user.id)
          .neq("content_url", null)
          .order("updated_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setYoinks(data);
        }
      }
    } catch (error) {
      console.error("Error fetching yoinks:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const importYoink = async (yoink: YoinkFile, editor: Editor | null) => {
    if (!editor) return;

    try {
      const { data: fileData, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(yoink.content_url);

      if (error || !fileData) {
        throw new Error(error?.message || "Failed to download yoink");
      }

      const content = await fileData.text();
      const parsedContent = JSON.parse(content);

      pageToBlock(parsedContent, editor, yoink);
    } catch (error) {
      console.error("Error importing yoink:", error);
      throw error;
    }
  };

  return {
    yoinks,
    isLoading,
    fetchYoinks,
    importYoink,
  };
};

export const useBlockCategories = (editor: Editor | null) => {
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

  return {
    categories,
    categoryNames: Object.keys(categories),
  };
};

export const useCollapsedCategories = () => {
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return {
    collapsedCategories,
    toggleCategory,
  };
};
