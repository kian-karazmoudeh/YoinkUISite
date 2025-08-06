const shorthandMap: Record<string, string> = {
  "border-top-color|border-bottom-color|border-left-color|border-right-color":
    "border-color",
  "border-top-width|border-bottom-width|border-left-width|border-right-width":
    "border-width",
  "border-top-style|border-bottom-style|border-left-style|border-right-style":
    "border-style",
  "border-bottom-left-radius|border-bottom-right-radius|border-top-left-radius|border-top-right-radius":
    "border-radius",
  "overflow-x|overflow-y": "overflow",
  "row-gap|column-gap": "gap",
  "margin-top|margin-bottom|margin-left|margin-right": "margin",
  "padding-top|padding-bottom|padding-left|padding-right": "padding",
};

export function verboseStylesToCompact(
  styles: Record<string, string>
): Record<string, string> {
  let result = { ...styles };
  let simplified = false;

  while (!simplified) {
    simplified = true;

    for (const pattern in shorthandMap) {
      const verboseProps = pattern.split("|");
      const shorthand = shorthandMap[pattern];

      // Check if all verbose props exist in the current result object
      const values = verboseProps.map((prop) => result[prop]);

      // If any prop is missing, skip this shorthand
      if (values.some((v) => v === undefined)) continue;

      // Check if all values are equal
      const firstValue = values[0];
      const allMatch = values.every((v) => v === firstValue);

      if (allMatch) {
        // Replace verbose props with shorthand
        for (const prop of verboseProps) {
          delete result[prop];
        }
        result[shorthand] = firstValue;
        simplified = false;
      }
    }
  }

  return result;
}

// Invert the shorthandMap for easy lookup
const expandedMap: Record<string, string[]> = {};
for (const pattern in shorthandMap) {
  const shorthand = shorthandMap[pattern];
  const longhands = pattern.split("|");
  expandedMap[shorthand] = longhands;
}

export function compactStylesToVerbose(
  styles: Record<string, string>
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const prop in styles) {
    const value = styles[prop];

    if (expandedMap[prop]) {
      // It's a shorthand — expand to verbose
      for (const longhand of expandedMap[prop]) {
        result[longhand] = value;
      }
    } else {
      // Not a shorthand — keep as is
      result[prop] = value;
    }
  }

  return result;
}

// console.log(
//   compactStylesToVerbose(
//     verboseStylesToCompact({
//       "background-color": "rgb(246, 246, 239)",
//       color: "rgb(0, 0, 0)",
//       "border-top-width": "0px",
//       "border-top-color": "rgb(0, 0, 0)",
//       "border-right-width": "0px",
//       "border-right-color": "rgb(0, 0, 0)",
//       "border-bottom-width": "0px",
//       "border-bottom-color": "rgb(0, 0, 0)",
//       "border-left-width": "0px",
//       "border-left-color": "rgb(0, 0, 0)",
//       fill: "rgb(0, 0, 0)",
//       "stroke-width": "1px",
//       "scroll-behavior": "smooth",
//       "box-sizing": "border-box",
//       "font-family": "sans-serif, system-ui, sans-serif",
//       "font-variant": "normal",
//       "font-size": "10px",
//       "text-decoration-color": "rgb(0, 0, 0)",
//       "word-spacing": "0px",
//     })
//   )
// );
