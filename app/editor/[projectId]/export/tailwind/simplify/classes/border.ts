// if a border is set, no need to add border-solid.
// also remove outline when outline width = 0 or style = none
// also simplify rounded

import { getRemSize } from "../../utils/measurement/getRemSize";

const borderStyleProp = "border-solid";
const outlineStyleProp = "outline-[solid]";

const borderWidthProps = [
  "border-t-",
  "border-b-",
  "border-r-",
  "border-l-",
  "border-x-",
  "border-y-",
  "border-",
  "outline-",
];

export function simplifyVerboseBorderPatterns(classes: string[]) {
  // Find all border style patterns
  const borderStylePatterns = classes.filter((cls) =>
    cls.match(/\[border-(top|right|bottom|left)-style:[^\]]+\]/)
  );

  if (borderStylePatterns.length === 0) {
    return classes;
  }

  // Extract values for each side
  const sideValues: Record<string, string> = {};

  borderStylePatterns.forEach((cls) => {
    const match = cls.match(
      /\[border-(top|right|bottom|left)-style:([^\]]+)\]/
    );
    if (match) {
      const side = match[1];
      const value = match[2];
      sideValues[side] = value;
    }
  });

  // Check if all four sides have the same value
  const sides = ["top", "right", "bottom", "left"];
  const allSidesPresent = sides.every((side) => sideValues[side] !== undefined);

  if (allSidesPresent) {
    const firstValue = sideValues.top;
    const allSameValue = sides.every((side) => sideValues[side] === firstValue);

    if (allSameValue) {
      // Convert to single Tailwind class
      let tailwindClass = "";

      if (firstValue === "solid") {
        tailwindClass = "border-solid";
      } else if (firstValue === "none") {
        tailwindClass = "border-none";
      } else if (firstValue === "dashed") {
        tailwindClass = "border-dashed";
      } else if (firstValue === "dotted") {
        tailwindClass = "border-dotted";
      } else if (firstValue === "double") {
        tailwindClass = "border-double";
      } else if (firstValue === "hidden") {
        tailwindClass = "border-hidden";
      } else if (firstValue === "groove") {
        tailwindClass = "border-groove";
      } else if (firstValue === "ridge") {
        tailwindClass = "border-ridge";
      } else if (firstValue === "inset") {
        tailwindClass = "border-inset";
      } else if (firstValue === "outset") {
        tailwindClass = "border-outset";
      }

      if (tailwindClass) {
        // Remove the individual border style patterns and add the unified class
        const filteredClasses = classes.filter(
          (cls) => !cls.match(/\[border-(top|right|bottom|left)-style:[^\]]+\]/)
        );
        return [...filteredClasses, tailwindClass];
      }
    }
  }

  // If not all sides are present or values don't match, return original classes
  return classes;
}

// const outlineWidthProp = "outline-";

// only use this in sm. The reason for it is because if border style is found in md or lg, that means it was changed in sm and
// is being reverted in md or lg. But if its found in sm, then its redundent.
export function simplifyBorderPatterns(classes: string[]) {
  classes = simplifyVerboseBorderPatterns(classes);
  return classes.filter(
    (cls) => cls !== borderStyleProp && cls !== outlineStyleProp
  );
}

export function simplifyBorderWidth(classes: string[]) {
  //   Remove all classes that start with a prop in widthProps if any class with that prop has value [0px]
  borderWidthProps.forEach((prop) => {
    const hasZero = classes.some(
      (cls) =>
        cls.startsWith(prop) && (cls.includes("[0px]") || cls.includes("none"))
    );
    if (hasZero) {
      classes = classes.filter((cls) => !cls.startsWith(prop));
    }
  });
  return classes;
}

const roundedProps = [
  "rounded-tr-",
  "rounded-tl-",
  "rounded-br",
  "rounded-bl-",
  "rounded-t-",
  "rounded-b-",
  "rounded-r-",
  "rounded-l-",
  "rounded-",
];

const tailwindKeywords = {
  "[0px]": "none",
  [`[${getRemSize() * 0.125}px]`]: "xs",
  [`[${getRemSize() * 0.25}px]`]: "sm",
  [`[${getRemSize() * 0.375}px]`]: "md",
  [`[${getRemSize() * 0.5}px]`]: "lg",
  [`[${getRemSize() * 0.75}px]`]: "xl",
  [`[${getRemSize() * 1}px]`]: "2xl",
  [`[${getRemSize() * 1.5}px]`]: "3xl",
  [`[${getRemSize() * 2}px]`]: "4xl",
  [`[9999px]`]: "full",
};

export function simplifyRounded(classes: string[]) {
  let parts: string[], value: string;

  classes.forEach((cls, idx) => {
    // Support for prefixes like md:, lg:, etc.
    // Extract prefix (if any) and the actual class
    roundedProps.forEach((roundedProp) => {
      const match = cls.match(/^([a-z]+:)?(.+)$/);
      const prefix = match && match[1] ? match[1] : "";
      const baseClass = match ? match[2] : cls;
      if (baseClass.startsWith(roundedProp)) {
        parts = baseClass.split("-");
        value = parts[parts.length - 1];
        Object.entries(tailwindKeywords).forEach(([key, keywordValue]) => {
          if (value === key) {
            // Assign the replaced string back to the array with prefix
            classes[idx] = prefix + baseClass.replace(value, keywordValue);
          }
        });
      }
    });
  });

  return classes;
}
