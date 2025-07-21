import { DeviceKey, DeviceName } from "../types";

// Helper function to validate CSS values
export const isValidCssValue = (value: string): boolean => {
  if (!value || value.trim() === "") return false;

  const trimmedValue = value.trim();

  // Check for common CSS keywords
  const cssKeywords = ["auto", "none"];

  if (cssKeywords.includes(trimmedValue.toLowerCase())) {
    return true;
  }

  // Check for numbers with units (px, em, rem, %, vh, vw, etc.)
  const unitRegex =
    /^-?\d*\.?\d+(px|em|rem|%|vh|vw|vmin|vmax|pt|pc|in|cm|mm|ex|ch|fr|deg|rad|grad|turn|s|ms|hz|khz)?$/i;
  if (unitRegex.test(trimmedValue)) {
    return true;
  }

  // Check for color values (hex, rgb, rgba, hsl, hsla, named colors)
  const colorRegex =
    /^(#([0-9A-F]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)|hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)|transparent|currentColor)$/i;
  if (colorRegex.test(trimmedValue)) {
    return true;
  }

  // Check for calc() expressions
  if (trimmedValue.startsWith("calc(") && trimmedValue.endsWith(")")) {
    return true;
  }

  // Check for var() expressions
  if (trimmedValue.startsWith("var(") && trimmedValue.endsWith(")")) {
    return true;
  }

  // Check for url() expressions
  if (trimmedValue.startsWith("url(") && trimmedValue.endsWith(")")) {
    return true;
  }

  // Check for linear-gradient, radial-gradient, etc.
  if (trimmedValue.includes("gradient(")) {
    return true;
  }

  // Check for simple numbers (without units)
  const numberRegex = /^-?\d*\.?\d+$/;
  if (numberRegex.test(trimmedValue)) {
    return true;
  }

  return false;
};

// Helper function to get device key
export const getDeviceKey = (deviceName: DeviceName): DeviceKey => {
  switch (deviceName) {
    case "Desktop":
      return "lg";
    case "Tablet":
      return "md";
    case "Mobile":
      return "sm";
    default:
      return "lg";
  }
};

// Helper function to get device width
export const getDeviceWidth = (deviceName: DeviceName): string => {
  switch (deviceName) {
    case "Desktop":
      return "100%";
    case "Tablet":
      return "768px";
    case "Mobile":
      return "375px";
    default:
      return "100%";
  }
};

// Helper function to parse style values from component
export const parseStyleValues = (styles: any) => {
  return {
    width: styles["width"] || "",
    height: styles.height || "",
    display: styles.display || "block",
    "font-size": styles["font-size"] || "16",
    "font-weight": styles["font-weight"] || "normal",
    "text-align": styles["text-align"] || "left",
    "background-color": styles["background-color"] || "#ffffff",
    color: styles.color || "#000000",
    padding: styles.padding || "",
    margin: styles.margin || "",
    borderWidth: styles["border-width"] || "0",
    borderColor: styles["border-color"] || "#000000",
    borderStyle: styles["border-style"] || "solid",
    borderRadius: styles["border-radius"] || "0",
    opacity: styles.opacity
      ? Math.round(parseFloat(styles.opacity) * 100).toString()
      : "100",
    "box-shadow": styles["box-shadow"] || "",
    "margin-top": styles["margin-top"] || "",
    "margin-right": styles["margin-right"] || "",
    "margin-bottom": styles["margin-bottom"] || "",
    "margin-left": styles["margin-left"] || "",
    "scroll-margin-top": styles["scroll-margin-top"] || "",
    "scroll-margin-right": styles["scroll-margin-right"] || "",
    "scroll-margin-bottom": styles["scroll-margin-bottom"] || "",
    "scroll-margin-left": styles["scroll-margin-left"] || "",
    "padding-top": styles["padding-top"] || "",
    "padding-right": styles["padding-right"] || "",
    "padding-bottom": styles["padding-bottom"] || "",
    "padding-left": styles["padding-left"] || "",
    "scroll-padding-top": styles["scroll-padding-top"] || "",
    "scroll-padding-right": styles["scroll-padding-right"] || "",
    "scroll-padding-bottom": styles["scroll-padding-bottom"] || "",
    "scroll-padding-left": styles["scroll-padding-left"] || "",
    "line-height": styles["line-height"] || "",
    "min-width": styles["min-width"] || "",
    "min-height": styles["min-height"] || "",
    "max-width": styles["max-width"] || "",
    "max-height": styles["max-height"] || "",
    "border-top-right-radius": styles["border-top-right-radius"] || "",
    "border-top-left-radius": styles["border-top-left-radius"] || "",
    "border-bottom-right-radius": styles["border-bottom-right-radius"] || "",
    "border-bottom-left-radius": styles["border-bottom-left-radius"] || "",
    "border-radius": styles["border-radius"] || "",
    "border-width": styles["border-width"] || "",
    "border-style": styles["border-style"] || "",
    "border-top-width": styles["border-top-width"] || "",
    "border-top-style": styles["border-top-style"] || "",
    "border-right-width": styles["border-right-width"] || "",
    "border-right-style": styles["border-right-style"] || "",
    "border-bottom-width": styles["border-bottom-width"] || "",
    "border-bottom-style": styles["border-bottom-style"] || "",
    "border-left-width": styles["border-left-width"] || "",
    "border-left-style": styles["border-left-style"] || "",
    top: styles.top || "",
    right: styles.right || "",
    bottom: styles.bottom || "",
    left: styles.left || "",
    "z-index": styles["z-index"] || "",
    gap: styles["gap"] || "",
    "row-gap": styles["row-gap"] || "",
    "column-gap": styles["column-gap"] || "",
    "grid-template-columns": styles["grid-template-columns"] || "",
    "grid-template-rows": styles["grid-template-rows"] || "",
    "background-position": styles["background-position"] || "",
    "background-repeat": styles["background-repeat"] || "",
    "background-size": styles["background-size"] || "",
    "background-image": styles["background-image"] || "",
    "background-clip": styles["background-clip"] || "",
    "background-origin": styles["background-origin"] || "",
    "background-attachment": styles["background-attachment"] || "",
    "text-wrap": styles["text-wrap"] || "",
    "fill-opacity": styles["fill-opacity"] || "",
    "stroke-opacity": styles["stroke-opacity"] || "",
    stroke: styles.stroke || "",
    "object-fit": styles["object-fit"] || "",
    "text-indent": styles["text-indent"] || "",
    columns: styles.columns || "",
    transform: styles.transform || "",
    "transform-style": styles["transform-style"] || "",
    perspective: styles.perspective || "",
    "perspective-origin": styles["perspective-origin"] || "",
    "backface-visibility": styles["backface-visibility"] || "",
    "text-shadow": styles["text-shadow"] || "",
    "vertical-align": styles["vertical-align"] || "",
    "flex-grow": styles["flex-grow"] || "",
    "flex-shrink": styles["flex-shrink"] || "",
    order: styles.order || "",
    "scroll-behavior": styles["scroll-behavior"] || "",
    "box-sizing": styles["box-sizing"] || "",
    position: styles.position || "",
    overflow: styles.overflow || "",
    "overflow-x": styles["overflow-x"] || "",
    "overflow-y": styles["overflow-y"] || "",
    visibility: styles.visibility || "",
    "text-decoration-line": styles["text-decoration-line"] || "",
    filter: styles.filter || "",
    "backdrop-filter": styles["backdrop-filter"] || "",
    "clip-path": styles["clip-path"] || "",
    translate: styles.translate || "",
    "aspect-ratio": styles["aspect-ratio"] || "",
    "font-style": styles["font-style"] || "",
    "flex-wrap": styles["flex-wrap"] || "",
    "flex-direction": styles["flex-direction"] || "",
    "justify-content": styles["justify-content"] || "",
    "align-content": styles["align-content"] || "",
    "align-items": styles["align-items"] || "",
    "align-self": styles["align-self"] || "",
    "list-style-type": styles["list-style-type"] || "",
    cursor: styles.cursor || "",
    float: styles.float || "",
    clear: styles.clear || "",
    "table-layout": styles["table-layout"] || "",
    "border-collapse": styles["border-collapse"] || "",
    "grid-auto-flow": styles["grid-auto-flow"] || "",
    "grid-column-start": styles["grid-column-start"] || "",
    "grid-column-end": styles["grid-column-end"] || "",
    "grid-row-start": styles["grid-row-start"] || "",
    "grid-row-end": styles["grid-row-end"] || "",
    "outline-style": styles["outline-style"] || "",
    "letter-spacing": styles["letter-spacing"] || "",
    "white-space": styles["white-space"] || "",
    "text-transform": styles["text-transform"] || "",
    isolation: styles.isolation || "",
    "justify-self": styles["justify-self"] || "",
    "justify-items": styles["justify-items"] || "",
    "overscroll-behavior-x": styles["overscroll-behavior-x"] || "",
    "overscroll-behavior-y": styles["overscroll-behavior-y"] || "",
    "box-decoration-break": styles["box-decoration-break"] || "",
    "break-inside": styles["break-inside"] || "",
    "break-before": styles["break-before"] || "",
    "break-after": styles["break-after"] || "",
    "list-style-image": styles["list-style-image"] || "",
    "list-style-position": styles["list-style-position"] || "",
    "text-decoration-color": styles["text-decoration-color"] || "",
    "text-decoration-style": styles["text-decoration-style"] || "",
    "text-overflow": styles["text-overflow"] || "",
    "word-break": styles["word-break"] || "",
    "mask-clip": styles["mask-clip"] || "",
    "mask-composite": styles["mask-composite"] || "",
    "mask-image": styles["mask-image"] || "",
    "mask-mode": styles["mask-mode"] || "",
    "mask-origin": styles["mask-origin"] || "",
    "mask-repe": styles["mask-repe"] || "",
    "mask-position": styles["mask-position"] || "",
    "object-position": styles["object-position"] || "",
    "background-blend-mode": styles["background-blend-mode"] || "",
    "mix-blend-mode": styles["mix-blend-mode"] || "",
    "mask-size": styles["mask-size"] || "",
    "mask-type": styles["mask-type"] || "",
  };
};

// Helper function to get default style values
export const getDefaultStyleValues = (): import("../types").StyleValues => {
  return {
    width: "",
    height: "",
    display: "block",
    color: "#000000",
    padding: "",
    margin: "",
    opacity: "100",
    "margin-top": "",
    "margin-right": "",
    "margin-bottom": "",
    "margin-left": "",
    "scroll-margin-top": "",
    "scroll-margin-right": "",
    "scroll-margin-bottom": "",
    "scroll-margin-left": "",
    "padding-top": "",
    "padding-right": "",
    "padding-bottom": "",
    "padding-left": "",
    "scroll-padding-top": "",
    "scroll-padding-right": "",
    "scroll-padding-bottom": "",
    "scroll-padding-left": "",
    "background-color": "",
    "line-height": "",
    "min-width": "",
    "min-height": "",
    "max-width": "",
    "max-height": "",
    "border-top-right-radius": "",
    "border-top-left-radius": "",
    "border-bottom-right-radius": "",
    "border-bottom-left-radius": "",
    "border-radius": "",
    "border-width": "",
    "border-style": "",
    "border-top-width": "",
    "border-top-style": "",
    "border-right-width": "",
    "border-right-style": "",
    "border-bottom-width": "",
    "border-bottom-style": "",
    "border-left-width": "",
    "border-left-style": "",
    top: "",
    right: "",
    bottom: "",
    left: "",
    "z-index": "",
    gap: "",
    "row-gap": "",
    "column-gap": "",
    "grid-template-columns": "",
    "grid-template-rows": "",
    "background-position": "",
    "background-repeat": "",
    "background-size": "",
    "background-image": "",
    "background-clip": "",
    "background-origin": "",
    "background-attachment": "",
    "box-shadow": "",
    "text-wrap": "",
    "fill-opacity": "",
    "stroke-opacity": "",
    stroke: "",
    "object-fit": "",
    "text-indent": "",
    columns: "",
    transform: "",
    "transform-style": "",
    perspective: "",
    "perspective-origin": "",
    "backface-visibility": "",
    "text-shadow": "",
    "vertical-align": "",
    "flex-grow": "",
    "flex-shrink": "",
    order: "",
    "scroll-behavior": "",
    "box-sizing": "",
    position: "",
    overflow: "",
    "overflow-x": "",
    "overflow-y": "",
    visibility: "",
    "text-decoration-line": "",
    filter: "",
    "backdrop-filter": "",
    "clip-path": "",
    translate: "",
    "aspect-ratio": "",
    "font-style": "",
    "flex-wrap": "",
    "flex-direction": "",
    "justify-content": "",
    "align-content": "",
    "align-items": "",
    "align-self": "",
    "list-style-type": "",
    cursor: "",
    float: "",
    clear: "",
    "table-layout": "",
    "border-collapse": "",
    "grid-auto-flow": "",
    "grid-column-start": "",
    "grid-column-end": "",
    "grid-row-start": "",
    "grid-row-end": "",
    "outline-style": "",
    "letter-spacing": "",
    "white-space": "",
    "font-weight": "",
    "text-transform": "",
    "font-size": "",
    isolation: "",
    "justify-self": "",
    "justify-items": "",
    "overscroll-behavior-x": "",
    "overscroll-behavior-y": "",
    "box-decoration-break": "",
    "break-inside": "",
    "break-before": "",
    "break-after": "",
    "list-style-image": "",
    "list-style-position": "",
    "text-decoration-color": "",
    "text-decoration-style": "",
    "text-overflow": "",
    "word-break": "",
    "mask-clip": "",
    "mask-composite": "",
    "mask-image": "",
    "mask-mode": "",
    "mask-origin": "",
    "mask-repe": "",
    "mask-position": "",
    "object-position": "",
    "background-blend-mode": "",
    "mix-blend-mode": "",
    "mask-size": "",
    "mask-type": "",
  };
};

/**
 * Merges defaultBaseStyles['div'] and device-specific styles for a component.
 * For Desktop: default + Desktop styles.
 * For Tablet: default + Desktop + Tablet styles.
 * For Mobile: default + Desktop + Tablet + Mobile styles.
 */
export function getMergedComponentStyles({
  component,
  device,
  editor,
  defaultBaseStyles,
}: {
  component: any; // GrapesJS Component
  device: DeviceName;
  editor: any;
  defaultBaseStyles: Record<string, Record<string, string>> | undefined;
}): Record<string, string> {
  const styles = editor?.Css.getComponentRules(component);
  if (!styles) return {};

  let desktopStyles = {};
  let tabletStyles = {};
  let mobileStyles = {};
  for (const rule of styles) {
    const deviceName = rule.getDevice().getName();
    if (deviceName === "Desktop") {
      desktopStyles = { ...desktopStyles, ...rule.getStyle() };
    } else if (deviceName === "Tablet") {
      tabletStyles = { ...tabletStyles, ...rule.getStyle() };
    } else if (deviceName === "Mobile") {
      mobileStyles = { ...mobileStyles, ...rule.getStyle() };
    }
  }

  let mergedStyles = {};
  if (defaultBaseStyles && defaultBaseStyles["div"]) {
    mergedStyles = { ...defaultBaseStyles["div"] };
  }
  mergedStyles = { ...mergedStyles, ...desktopStyles };
  if (device === "Tablet") {
    mergedStyles = { ...mergedStyles, ...tabletStyles };
  } else if (device === "Mobile") {
    mergedStyles = { ...mergedStyles, ...tabletStyles, ...mobileStyles };
  }
  return mergedStyles;
}
