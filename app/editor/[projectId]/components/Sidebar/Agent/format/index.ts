import { colorsToHex } from "./colorsToHex";
import { verboseStylesToCompact } from "./verbose";

export function format(styles: Record<string, string>): Record<string, string> {
  let formattedStyles;

  formattedStyles = colorsToHex(styles);
  formattedStyles = verboseStylesToCompact(formattedStyles);

  return formattedStyles;
}
