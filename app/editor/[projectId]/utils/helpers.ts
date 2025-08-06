import { useEditorStore } from "../store";
import { DeviceKey, DeviceName } from "../types";
import { Component, Editor } from "grapesjs";

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
  component: Component; // GrapesJS Component
  device: DeviceName;
  editor: Editor | null;
  defaultBaseStyles: Record<string, Record<string, string>> | undefined;
}): Record<string, string> {
  const styles = editor?.Css.getComponentRules(component);
  if (!styles || !editor) return {};

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

export function getViewportComponentStyles({
  component,
  device,
}: {
  component: Component;
  device: DeviceName;
}): Record<string, string> {
  const editor = useEditorStore.getState().editor;
  const styles = editor?.Css.getComponentRules(component);

  if (!styles || !editor) return {};

  let viewportStyles = {};

  for (const rule of styles) {
    const deviceName = rule.getDevice().getName();
    if (deviceName === device) {
      viewportStyles = rule.getStyle();
    }
  }

  return viewportStyles;
}
