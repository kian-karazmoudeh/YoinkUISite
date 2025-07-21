import { getTailwindNumber } from "./getTailwindNumber";

export function simplifyMeasurement(
  classes: string[],
  matchClasses: string[],
  keywords: { [key: string]: string } = {}
) {
  let parts: string[], value: string;
  let changed: boolean = false;

  classes.forEach((cls, idx) => {
    matchClasses.forEach((prop) => {
      changed = false;

      // Support for prefixes like md:, lg:, etc. (redundant actually becuase these checks get done before the prefixes are added)
      // Extract prefix (if any) and the actual class
      const match = cls.match(/^([a-z]+:)?(.+)$/);
      const prefix = match && match[1] ? match[1] : "";
      const baseClass = match ? match[2] : cls;

      if (baseClass.startsWith(prop)) {
        parts = baseClass.split("-");
        // Use regex to capture everything inside square brackets, e.g., [fit-content]
        const bracketMatch = baseClass.match(/(\[[^\]]+\])/);
        value = bracketMatch ? bracketMatch[1] : parts[parts.length - 1];

        Object.entries(keywords).forEach(([key, keywordValue]) => {
          if (value === key) {
            // Assign the replaced string back to the array with prefix
            classes[idx] = prefix + baseClass.replace(value, keywordValue);
            changed = true;
          }
        });

        if (!changed) {
          value = value.replace(/[\[\]]/g, "");
          classes[idx] =
            prefix + baseClass.replace(`[${value}]`, getTailwindNumber(value));
        }
      }
    });
  });
  return classes;
}
