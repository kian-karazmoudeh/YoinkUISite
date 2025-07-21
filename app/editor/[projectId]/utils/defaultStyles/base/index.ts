import { useEditorStore } from "../../../../(project)/store";
import { tags } from "./tags";

export function initBaseDefaultStyles() {
  const { setDefaultBaseStyles } = useEditorStore.getState();
  const stored = localStorage.getItem("baseDefaultStyles");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      setDefaultBaseStyles(parsed);
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
            "baseDefaultStyles",
            JSON.stringify(defaultStyles)
          );
          setDefaultBaseStyles(defaultStyles);
        }
      }
    );
  });
}
