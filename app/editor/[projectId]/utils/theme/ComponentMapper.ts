import { Component } from "grapesjs";
import { Pallet } from "../../types";
import { ThemeUtils, Logger } from "./ThemeUtils";
import { ThemeRef } from "../../types";

export class ComponentMapper {
  constructor(private componentToThemeMap: Map<string, ThemeRef>) {}

  mapComponentsToPalette(
    component: Component,
    pallet: Pallet[],
    parentBg: string = ""
  ): void {
    const element = component.getEl();
    const isTextNode = component.getType() === "textnode";

    if (!element) return;

    if (isTextNode) {
      this.mapTextComponent(component, parentBg, pallet);
    } else {
      parentBg = this.mapNonTextComponent(component, parentBg, pallet);
    }

    // Recurse through children
    component
      .components()
      .forEach((child: Component) =>
        this.mapComponentsToPalette(child, pallet, parentBg)
      );
  }

  private mapTextComponent(
    component: Component,
    parentBg: string,
    pallet: Pallet[]
  ): void {
    const parentComponent = component.parent();
    if (!parentComponent) return;

    const parentElement = parentComponent.getEl();
    if (!parentElement) return;

    const parentStyles = parentElement.computedStyleMap();
    const textColor = ThemeUtils.getComputedColor(parentStyles, "color");

    if (textColor && parentBg) {
      const normalizedColor = ThemeUtils.normalizeColor(textColor);
      const palletIndex = pallet.findIndex((p) =>
        p.background.includes(parentBg)
      );

      if (palletIndex !== -1) {
        const contentColorSetIdx = pallet[palletIndex].text.findIndex((group) =>
          group.includes(normalizedColor)
        );

        if (contentColorSetIdx !== -1) {
          const contentColorIdx =
            pallet[palletIndex].text[contentColorSetIdx].indexOf(
              normalizedColor
            );
          const existingMapping =
            this.componentToThemeMap.get(parentComponent.getId()) || {};

          this.componentToThemeMap.set(parentComponent.getId(), {
            ...existingMapping,
            palletIndex,
            contentColorSetIdx,
            contentColorIdx,
          });
        }
      }
    }
  }

  private mapNonTextComponent(
    component: Component,
    parentBg: string,
    pallet: Pallet[]
  ): string {
    const element = component.getEl();
    if (!element) return parentBg;
    const styles = element.computedStyleMap();
    let newParentBg = parentBg;

    // Process background color
    const bgColor = ThemeUtils.getComputedColor(
      styles,
      "background-color",
      parentBg
    );
    if (bgColor && bgColor !== parentBg) {
      const normalizedColor = ThemeUtils.normalizeColor(bgColor);
      const palletIndex = pallet.findIndex((p) =>
        p.background.includes(normalizedColor)
      );

      if (palletIndex !== -1) {
        const backgroundIndex =
          pallet[palletIndex].background.indexOf(normalizedColor);
        this.componentToThemeMap.set(component.getId(), {
          palletIndex,
          backgroundIndex,
        });
        newParentBg = normalizedColor;
      }
    }

    // Process border colors
    this.processBorderColors(component, styles, pallet);

    return newParentBg;
  }

  private processBorderColors(
    component: Component,
    styles: StylePropertyMapReadOnly,
    pallet: Pallet[]
  ): void {
    const borderSides = ["left", "right", "top", "bottom"] as const;
    const componentId = component.getId();
    let updatedMapping = this.componentToThemeMap.get(componentId) || {};

    borderSides.forEach((side) => {
      const property = `border-${side}-color`;
      const borderColor = ThemeUtils.getComputedColor(styles, property);

      if (borderColor) {
        const normalizedColor = ThemeUtils.normalizeColor(borderColor);
        const palletIndex = pallet.findIndex((p) =>
          p.background.includes(normalizedColor)
        );

        if (palletIndex !== -1) {
          const colorIndex =
            pallet[palletIndex].background.indexOf(normalizedColor);
          if (colorIndex !== -1) {
            updatedMapping = {
              ...updatedMapping,
              [`border${
                side.charAt(0).toUpperCase() + side.slice(1)
              }ColorPalletIndex`]: palletIndex,
              [`border${
                side.charAt(0).toUpperCase() + side.slice(1)
              }ColorIndex`]: colorIndex,
            };
          }
        }
      }
    });

    // Only update the map once with all border colors
    if (Object.keys(updatedMapping).length > 0) {
      this.componentToThemeMap.set(componentId, updatedMapping);
    }
  }
}
