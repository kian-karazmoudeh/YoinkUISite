import {
  directMappings,
  inheritableCss,
  propsToArbitraryMap,
  unmappableProps,
} from "./constants";
import { simplifySVGSpecific } from "../simplify/dom/svgSpecific";
import { simplifyClasses } from "../simplify/classes/index";
import { simplifyBorderPatterns } from "../simplify/classes/border";
import { getDefaultTailwindStyles } from "../../../utils/defaultStyles/tailwind";
import { Component } from "grapesjs";
import { DeviceName } from "../../../types/index";
import { useEditorStore } from "../../../store";
import { getMergedComponentStyles } from "../../../utils/helpers";

function cssToTailwind(cssJson: Record<string, string>) {
  let tailwindClasses: string[] = [];
  let value;

  for (const [cssProp, twPrefix] of Object.entries(propsToArbitraryMap)) {
    value = cssJson[cssProp]?.trim().replace(/\s+/g, "_");

    if (value) {
      tailwindClasses.push(`${twPrefix}-[${value}]`);
    }
  }

  for (const [prop, map] of Object.entries(directMappings)) {
    value = cssJson[prop]?.trim();

    if (value && map[value]) {
      tailwindClasses.push(map[value]);
    }
  }

  for (const prop of unmappableProps) {
    value = cssJson[prop]?.replace(/\s+/g, "_").trim();

    if (value) {
      tailwindClasses.push(`[${prop}:${value}]`);
    }
  }

  return tailwindClasses;
}

function getCssObject(component: Component, device: DeviceName) {
  const { editor, defaultBaseStyles } = useEditorStore.getState();
  // console.log(
  //   getMergedComponentStyles({
  //     component,
  //     device,
  //     editor,
  //     defaultBaseStyles,
  //   })
  // );
  return getMergedComponentStyles({
    component,
    device,
    editor,
    defaultBaseStyles,
  });
}

function removeInheritedStyles(
  style: { [key: string]: string },
  inheritedStyle: { [key: string]: string }
) {
  const cleanedStyle: { [key: string]: string } = {};

  for (const key in style) {
    const isInheritable = inheritableCss.includes(key);
    if (isInheritable) {
      if (style[key] !== inheritedStyle[key]) {
        cleanedStyle[key] = style[key];
      }
    } else {
      cleanedStyle[key] = style[key];
    }
  }

  return cleanedStyle;
}

export function addCSSAttributesRecursivelyResponsive(
  node: Component,
  device: DeviceName
) {
  if (
    node.getEl() &&
    node.getEl()?.nodeType === Node.ELEMENT_NODE &&
    !(node.getEl() instanceof HTMLBRElement) &&
    !(node.getEl() instanceof HTMLPictureElement) &&
    !(node.getEl() instanceof HTMLSourceElement) &&
    !(node.getEl() instanceof HTMLTrackElement)
  ) {
    const viewport =
      device === "Desktop" ? "lg" : device === "Tablet" ? "md" : "sm";
    const cssString = JSON.stringify(getCssObject(node, device));
    node.addAttributes({ [`data-yoink-${viewport}`]: cssString });
  }

  node
    .components()
    .forEach((child: Component) =>
      addCSSAttributesRecursivelyResponsive(child, device)
    );
}

export function convertNodeToTailwindLgRecurse(node: Component) {
  if (node.getType() == "textnode") {
    return;
  }
  const el = node.getEl()!;
  const lgData = node.getAttributes()["data-yoink-lg"];
  const mdData = node.getAttributes()["data-yoink-md"];

  if (lgData && mdData) {
    let lgStyles: Record<string, string>;
    let mdStyles: Record<string, string>;

    try {
      lgStyles = JSON.parse(lgData);
      mdStyles = JSON.parse(mdData);
    } catch (e) {
      console.warn("Invalid JSON in data-yoink attributes:", e);
      return;
    }

    let lgTailwindClasses: string[] = cssToTailwind(lgStyles);
    let mdTailwindClasses: string[] = cssToTailwind(mdStyles);

    lgTailwindClasses = lgTailwindClasses.filter(
      (cls) => !mdTailwindClasses.includes(cls)
    );
    lgTailwindClasses = simplifySVGSpecific(el, lgTailwindClasses);
    lgTailwindClasses = simplifyClasses(lgTailwindClasses);

    lgTailwindClasses = lgTailwindClasses
      .filter((cls) => cls.length > 0)
      .map((cls) => `lg:${cls}`);

    node.addAttributes({
      "data-yoink-classes": lgTailwindClasses.join(" "),
    });
  }

  // Recurse on children
  for (const child of node.components()) {
    convertNodeToTailwindLgRecurse(child);
  }
}

export function convertNodeToTailwindMdRecurse(node: Component) {
  const el = node.getEl();
  const mdData = node.getAttributes()["data-yoink-md"];
  const smData = node.getAttributes()["data-yoink-sm"];

  if (smData && mdData && el && node.getType() != "textnode") {
    let mdStyles: Record<string, string>;
    let smStyles: Record<string, string>;

    try {
      mdStyles = JSON.parse(mdData);
      smStyles = JSON.parse(smData);
    } catch (e) {
      console.warn("Invalid JSON in data-yoink attributes:", e);
      return;
    }

    let mdTailwindClasses: string[] = cssToTailwind(mdStyles);
    let smTailwindClasses: string[] = cssToTailwind(smStyles);

    mdTailwindClasses = mdTailwindClasses.filter(
      (cls) => !smTailwindClasses.includes(cls)
    );
    mdTailwindClasses = simplifySVGSpecific(el, mdTailwindClasses);
    mdTailwindClasses = simplifyClasses(mdTailwindClasses);

    mdTailwindClasses = mdTailwindClasses
      .filter((cls) => cls.length > 0)
      .map((cls) => `md:${cls}`);

    node.addAttributes({
      "data-yoink-classes":
        mdTailwindClasses.join(" ") +
        " " +
        node.getAttributes()["data-yoink-classes"],
    });
  }

  // Recurse on children
  for (const child of node.components()) {
    convertNodeToTailwindMdRecurse(child);
  }
}

export async function convertNodeToTailwindBaseRecurse(
  node: Component,
  inherited = {}
) {
  const el = node.getEl();
  const smData = node.getAttributes()["data-yoink-sm"];

  if (smData && el && node.getType() != "textnode") {
    let smStyles: Record<string, string>;

    try {
      smStyles = JSON.parse(smData);
    } catch (e) {
      console.warn("Invalid JSON in data-yoink attributes:", e);
      return;
    }

    let cleanedStyles = removeInheritedStyles(smStyles, inherited);

    let smTailwindClasses: string[] = cssToTailwind(cleanedStyles);
    let defaultTailwindClasses: string[] = [];
    if (getDefaultTailwindStyles(node)) {
      defaultTailwindClasses = cssToTailwind(
        getDefaultTailwindStyles(node) || {}
      );
    }

    smTailwindClasses = smTailwindClasses.filter(
      (cls) => !defaultTailwindClasses.includes(cls)
    );
    smTailwindClasses = simplifySVGSpecific(el, smTailwindClasses);
    // for explanation on why border patterns is only checked in sm, go to the function definition
    smTailwindClasses = simplifyBorderPatterns(smTailwindClasses);
    smTailwindClasses = simplifyClasses(smTailwindClasses);

    const existing = node.getAttributes()["data-yoink-classes"];
    const combined =
      smTailwindClasses.join(" ") + (existing ? " " + existing : "");
    node.addAttributes({
      "data-yoink-classes": combined,
    });

    // Recurse on children
    for (const child of node.components()) {
      convertNodeToTailwindBaseRecurse(child, smStyles);
    }
  } else {
    // Recurse on children
    for (const child of node.components()) {
      convertNodeToTailwindBaseRecurse(child, inherited);
    }
  }
}
