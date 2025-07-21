import { Component } from "grapesjs";
import { useEditorStore } from "../../../../(project)/store";
import { tags } from "./tags";

export function initTailwindDefaultStyles() {
  const setDefaultTailwindStyles =
    useEditorStore.getState().setDefaultTailwindStyles;
  const stored = localStorage.getItem("tailwindDefaultStyles");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      setDefaultTailwindStyles(parsed);
    } catch (e) {
      console.error("Error parsing base default styles", e);
    }
  }
  // Dynamically import initialize to avoid circular deps if any
  import("../initialize").then(({ initDefaultStyles }) => {
    initDefaultStyles(
      tags,
      (defaultStyles?: Record<string, Record<string, string>>) => {
        if (defaultStyles) {
          localStorage.setItem(
            "tailwindDefaultStyles",
            JSON.stringify(defaultStyles)
          );
          setDefaultTailwindStyles(defaultStyles);
        }
      }
    );
  });
}

export function getDefaultTailwindStyles(node: Component) {
  const { defaultTailwindStyles } = useEditorStore.getState();
  if (defaultTailwindStyles) {
    if (tags.includes(node.getAttributes().tagName)) {
      return defaultTailwindStyles[node.getAttributes().tagName];
    } else {
      return defaultTailwindStyles["div"];
    }
  }
  return undefined;
}
