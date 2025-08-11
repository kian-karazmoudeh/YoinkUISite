import chroma from "chroma-js";
import { normalize } from "../../utils/helpers";

export class ThemeUtils {
  static normalizeColor(color: string): string {
    return chroma(color).alpha(1).hex();
  }

  static isValidColor(color: string): boolean {
    try {
      return chroma(color).alpha() > 0;
    } catch {
      return false;
    }
  }

  static calculateArea(element: HTMLElement): number {
    return normalize(element.offsetWidth * element.offsetHeight);
  }

  static calculateTextArea(fontSize: number, textContent: string): number {
    return normalize(fontSize * textContent.length);
  }

  static getComputedColor(
    styles: StylePropertyMapReadOnly,
    property: string,
    defaultColor: string = ""
  ): string | null {
    try {
      const color = chroma(
        styles.get(property)?.toString() || defaultColor
      ).hex();
      return ThemeUtils.isValidColor(color) ? color : null;
    } catch {
      return null;
    }
  }
}

export class Logger {
  static logColorError(type: string, value: string) {
    console.log(`Invalid ${type} Color:`, value);
  }
}
