import { tags } from "./tags";

import { Dispatch, SetStateAction } from "react";

type BaseDefaultStylesProps = {
  setBaseDefaultStyles: Dispatch<
    SetStateAction<Record<string, Record<string, string>> | undefined>
  >;
};

export function getBaseDefaultStyles({
  setBaseDefaultStyles,
}: BaseDefaultStylesProps) {
  const stored = localStorage.getItem("baseDefaultStyles");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      setBaseDefaultStyles(parsed);
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
          setBaseDefaultStyles(defaultStyles);
        }
      }
    );
  });
}
