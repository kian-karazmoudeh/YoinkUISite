import { Editor, Component } from "grapesjs";
import { Theme, ThemeRef } from "../../types";
import { ColorData } from "./types";
import { ColorProcessor } from "./ColorProcessor";
import { PaletteGenerator } from "./PaletteGenerator";
import { ComponentMapper } from "./ComponentMapper";
import chroma from "chroma-js";

export class ThemeCalculator {
  private colorData: Map<string, ColorData>;
  private componentToThemeMap: Map<string, ThemeRef>;
  private colorProcessor: ColorProcessor;
  private paletteGenerator: PaletteGenerator;
  private componentMapper: ComponentMapper;

  constructor() {
    this.colorData = new Map();
    this.componentToThemeMap = new Map();
    this.colorProcessor = new ColorProcessor(this.colorData);
    this.paletteGenerator = new PaletteGenerator();
    this.componentMapper = new ComponentMapper(this.componentToThemeMap);
  }

  calculateThemes(editor: Editor): {
    theme: Theme;
    componentMap: Map<string, ThemeRef>;
  } {
    this.colorData.clear();
    this.componentToThemeMap.clear();

    const wrapper = editor.getWrapper();
    if (!wrapper) return { theme: { pallet: [] }, componentMap: new Map() };

    // Step 1: Collect color data
    let wrapperBackground = "";
    const wrapperEl = wrapper.getEl();
    if (wrapperEl) {
      const bgColor =
        wrapperEl.computedStyleMap().get("background-color")?.toString() || "";
      // Normalize the color (assume ThemeUtils.normalizeColor is available)
      const normalizedBg = chroma(bgColor);
      wrapperBackground = normalizedBg.alpha() == 0 ? "" : normalizedBg.hex();
      // If transparent, use white; else use normalized color
    }
    this.processComponentsForColorData(wrapper, wrapperBackground);

    // Step 2: Generate palette
    const pallet = this.paletteGenerator.generatePalette(this.colorData);

    // Step 3: Map components to palette
    this.componentMapper.mapComponentsToPalette(wrapper, pallet);

    return {
      theme: { pallet },
      componentMap: this.componentToThemeMap,
    };
  }

  private processComponentsForColorData(
    component: Component,
    parentBg: string = ""
  ): void {
    const element = component.getEl();
    const isTextNode = component.getType() === "textnode";

    if (!element) return;

    if (isTextNode) {
      this.colorProcessor.processTextColor(component, parentBg);
    } else {
      // Process background and get new parent background
      const newParentBg = this.colorProcessor.processBackgroundColor(
        element,
        parentBg
      );

      // Process borders
      this.colorProcessor.processBorderColors(element);

      // Update parent background for children
      parentBg = newParentBg;
    }

    // Process children
    component
      .components()
      .forEach((child: Component) =>
        this.processComponentsForColorData(child, parentBg)
      );
  }
}
