import { colorToHex } from "@/app/editor/[projectId]/export/tailwind/utils/colors/colorToHex";

const colorProps: string[] = [
  "background-color",
  "color",
  "border-top-color",
  "border-bottom-color",
  "border-left-color",
  "border-right-color",
  "text-decoration-color",
  "text-decoration-color",
];

export function colorsToHex(
  styles: Record<string, string>
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in styles) {
    const value = styles[key];

    if (colorProps.includes(key)) {
      try {
        result[key] = `#${colorToHex(value)}`;
      } catch (e) {
        result[key] = value; // Keep original if conversion fails
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}
