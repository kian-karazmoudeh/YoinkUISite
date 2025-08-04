"use client";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../store";
import { useEffect, useState } from "react";
import { TreeNode, TreeView } from "@/components/tree-view";
import { Component, Components } from "grapesjs";
import { Box, Code, Image, Link, Type } from "lucide-react";

// interface TreeNode {
//   id: string;
//   label: string;
//   children?: TreeNode[];
// }

function generateTreeData(components: Components, parentId = "") {
  let counter = 1;

  const traverse = (comps: Components, parentId: string): TreeNode[] => {
    return comps.map((comp: Component) => {
      const id = parentId ? `${parentId}-${counter}` : `${counter}`;
      const label = (
        comp.get("tagName") ||
        comp.get("type") ||
        "component"
      ).replace(/^./, (c) => c.toUpperCase());
      const data = comp;
      const icon =
        label == "Div" ? (
          <Box />
        ) : label == "Textnode" ? (
          <Type />
        ) : label == "A" ? (
          <Link />
        ) : label == "Img" ? (
          <Image />
        ) : (
          <Code />
        );

      const children: TreeNode[] | undefined = comp.components().length
        ? traverse(comp.components(), id)
        : undefined;

      const node: TreeNode = { id, label, data, icon };
      if (children) node.children = children;

      counter++;
      return node;
    });
  };

  return traverse(components, parentId);
}

const LayerManager = () => {
  const { editor } = useEditorStore(
    useShallow((state) => ({ editor: state.editor }))
  );
  const [data, setData] = useState<TreeNode[] | undefined>(undefined);

  useEffect(() => {
    if (editor) {
      const component = editor.getComponents();
      setData(generateTreeData(component));
      console.log(data);
    }
  }, [editor]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-full min-h-0">
      <div
        className="overflow-y-auto"
        style={{
          height: "100%",
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
      >
        {data && (
          <TreeView
            data={data}
            animateExpand={false}
            defaultExpandedIds={["1"]}
            onNodeClick={(node) => {
              const comp: Component | undefined = node.data;
              if (editor && comp) {
                editor.select(comp);
                const el = comp.view?.el;
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
              }
            }}
            showLines={false}
          />
        )}
      </div>
    </div>
  );
};

export default LayerManager;
