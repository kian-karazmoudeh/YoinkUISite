import { Component } from "grapesjs";
import { ColorData, BorderColors } from "./types";
import { ThemeUtils, Logger } from "./ThemeUtils";

export class ColorProcessor {
  constructor(private colorData: Map<string, ColorData>) {}

  processBackgroundColor(element: HTMLElement, parentBg: string): string {
    const styles = element.computedStyleMap();
    const rawBg = styles.get("background-color")?.toString() || parentBg;

    try {
      const bgColor = ThemeUtils.getComputedColor(
        styles,
        "background-color",
        parentBg
      );
      if (bgColor && bgColor !== parentBg) {
        const normalizedColor = ThemeUtils.normalizeColor(bgColor);
        const area = ThemeUtils.calculateArea(element);

        if (!this.colorData.has(normalizedColor)) {
          this.colorData.set(normalizedColor, {
            textColors: new Map(),
            area,
          });
        } else {
          this.colorData.get(normalizedColor)!.area += area;
        }
        return normalizedColor;
      }
    } catch {
      Logger.logColorError("Background", rawBg);
    }
    return parentBg;
  }

  processBorderColors(element: HTMLElement): BorderColors {
    const styles = element.computedStyleMap();
    const borders: BorderColors = {};
    const borderSides = ["left", "right", "top", "bottom"] as const;

    borderSides.forEach((side) => {
      const property = `border-${side}-color`;
      const rawColor = styles.get(property)?.toString() || "";

      try {
        const color = ThemeUtils.getComputedColor(styles, property);
        if (color) {
          const normalizedColor = ThemeUtils.normalizeColor(color);
          if (!this.colorData.has(normalizedColor)) {
            this.colorData.set(normalizedColor, {
              textColors: new Map(),
              area: 0,
            });
          }
          borders[side] = normalizedColor;
        }
      } catch {
        Logger.logColorError(`Border ${side}`, rawColor);
      }
    });

    return borders;
  }

  processTextColor(component: Component, parentBg: string): void {
    const parentElement = component.parent()?.getEl();
    if (!parentElement) return;

    const parentStyles = parentElement.computedStyleMap();
    const textContent = component.get("content") || "";

    try {
      const textColor = ThemeUtils.getComputedColor(parentStyles, "color");
      if (textColor && parentBg) {
        const normalizedColor = ThemeUtils.normalizeColor(textColor);
        const fontSize = parseFloat(
          parentStyles.get("font-size")?.toString() || "16"
        );
        const textArea = ThemeUtils.calculateTextArea(fontSize, textContent);

        if (!this.colorData.has(parentBg)) {
          this.colorData.set(parentBg, {
            textColors: new Map(),
            area: 0,
          });
        }

        const existingArea =
          this.colorData.get(parentBg)!.textColors.get(normalizedColor) || 0;
        this.colorData
          .get(parentBg)!
          .textColors.set(normalizedColor, existingArea + textArea);
      }
    } catch {
      Logger.logColorError("Text", parentStyles.get("color")?.toString() || "");
    }
  }
}
