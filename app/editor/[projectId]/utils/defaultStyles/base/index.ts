import { useEditorStore } from "../../../store";
import { tags } from "./tags";

export function initBaseDefaultStyles(): Promise<
  Record<string, Record<string, string>> | undefined
> {
  const { setDefaultBaseStyles } = useEditorStore.getState();
  const stored = localStorage.getItem("baseDefaultStyles");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      setDefaultBaseStyles(parsed);
      return Promise.resolve(parsed);
    } catch (e) {
      console.error("Error parsing base default styles", e);
      // If parsing fails, fall through to re-initialize
    }
  }
  // Dynamically import initialize to avoid circular deps if any
  return import("../initialize").then(({ initDefaultStyles }) => {
    return new Promise<Record<string, Record<string, string>> | undefined>(
      (resolve) => {
        initDefaultStyles(
          tags,
          (defaultStyles?: Record<string, Record<string, string>>) => {
            if (defaultStyles) {
              localStorage.setItem(
                "baseDefaultStyles",
                JSON.stringify(defaultStyles)
              );
              setDefaultBaseStyles(defaultStyles);
              resolve(defaultStyles);
            } else {
              resolve(undefined);
            }
          }
        );
      }
    );
  });
}
