import { tags } from "./tags";

export function getTailwindDefaultStyles(node: Element) {
  return new Promise<Record<string, string>>((resolve, reject) => {
    const stored = localStorage.getItem("tailwindDefaultStyles");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (tags.includes(node.tagName.toLowerCase())) {
          resolve(parsed[node.tagName.toLowerCase()]);
        }
        resolve(parsed["div"]);
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
            resolve(defaultStyles[node.tagName.toLowerCase()]);
          }
        }
      );
    });
  });
}
