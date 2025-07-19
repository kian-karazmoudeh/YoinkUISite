import {
  directMappings,
  inheritableCss,
  propsToArbitraryMap,
  unmappableProps,
} from "./constants";
import {
  setVisibilityRootAttr,
  setVisibilityTerminateAttrComponent,
  setVisibilityTerminateAttrResponsive,
} from "../../shared/elementVisibility";
import { simplifySVGSpecific } from "../simplify/dom/svgSpecific";
import { simplifyClasses } from "../simplify/classes";
import { simplifyBorderPatterns } from "../simplify/classes/border";
import { getTailwindDefaultStyles } from "../../../utils/defaultStyles/tailwind.ts";
// import { getDefaultStyles } from "../utils/defaultStyles/getDefaultStyles";

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

export function cssToJsonString(el: HTMLElement) {
  const styleMap = el.computedStyleMap();
  // const computedStyle = window.getComputedStyle(el);
  const cssObject: { [key: string]: string } = {};

  // props to arbitrary
  for (const [cssProp, _] of Object.entries(propsToArbitraryMap)) {
    const value = styleMap.get(cssProp)?.toString();

    if (value) {
      cssObject[cssProp] = value;
    }
  }

  // direct mappings
  for (const [prop, map] of Object.entries(directMappings)) {
    const val = styleMap.get(prop)?.toString().trim();

    if (val && map[val]) {
      cssObject[prop] = val;
    }
  }

  for (const cssProp of unmappableProps) {
    const value = styleMap.get(cssProp)?.toString();

    if (value) {
      cssObject[cssProp] = value;
    }
  }

  return JSON.stringify(cssObject);
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
  node: HTMLElement,
  viewport: "sm" | "md" | "lg"
) {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    !(node instanceof HTMLBRElement) &&
    !(node instanceof HTMLPictureElement) &&
    !(node instanceof HTMLSourceElement) &&
    !(node instanceof HTMLTrackElement)
  ) {
    const cssString = cssToJsonString(node);
    node.setAttribute(`data-yoink-${viewport}`, cssString);
    setVisibilityRootAttr(node, viewport);
    setVisibilityTerminateAttrResponsive(node);
  }

  node.childNodes.forEach((child) =>
    addCSSAttributesRecursivelyResponsive(child as HTMLElement, viewport)
  );
}

export function addCSSAttributesRecursivelyComponent(node: HTMLElement) {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    !(node instanceof HTMLBRElement) &&
    !(node instanceof HTMLPictureElement) &&
    !(node instanceof HTMLSourceElement) &&
    !(node instanceof HTMLTrackElement)
  ) {
    const cssString = cssToJsonString(node);
    node.setAttribute(`data-yoink-sm`, cssString);
    setVisibilityRootAttr(node, "sm");
    setVisibilityTerminateAttrComponent(node);
  }

  node.childNodes.forEach((child) =>
    addCSSAttributesRecursivelyComponent(child as HTMLElement)
  );
}

export function convertNodeToTailwindLgRecurse(node: HTMLElement) {
  const lgData = node.getAttribute("data-yoink-lg");
  const mdData = node.getAttribute("data-yoink-md");

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
    lgTailwindClasses = simplifySVGSpecific(node, lgTailwindClasses);
    lgTailwindClasses = simplifyClasses(lgTailwindClasses);

    lgTailwindClasses = lgTailwindClasses
      .filter((cls) => cls.length > 0)
      .map((cls) => `lg:${cls}`);

    node.setAttribute("data-yoink-classes", lgTailwindClasses.join(" "));
  }

  // Recurse on children
  for (const child of Array.from(node.children)) {
    convertNodeToTailwindLgRecurse(child as HTMLElement);
  }
}

export function convertNodeToTailwindMdRecurse(node: HTMLElement) {
  const mdData = node.getAttribute("data-yoink-md");
  const smData = node.getAttribute("data-yoink-sm");

  if (smData && mdData) {
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
    mdTailwindClasses = simplifySVGSpecific(node, mdTailwindClasses);
    mdTailwindClasses = simplifyClasses(mdTailwindClasses);

    mdTailwindClasses = mdTailwindClasses
      .filter((cls) => cls.length > 0)
      .map((cls) => `md:${cls}`);

    node.setAttribute(
      "data-yoink-classes",
      mdTailwindClasses.join(" ") +
        " " +
        node.getAttribute("data-yoink-classes")
    );
  }

  // Recurse on children
  for (const child of Array.from(node.children)) {
    convertNodeToTailwindMdRecurse(child as HTMLElement);
  }
}

export async function convertNodeToTailwindSmRecurse(
  node: HTMLElement,
  inherited = {}
) {
  const smData = node.getAttribute("data-yoink-sm");

  if (smData) {
    let smStyles: Record<string, string>;

    try {
      smStyles = JSON.parse(smData);
    } catch (e) {
      console.warn("Invalid JSON in data-yoink attributes:", e);
      return;
    }

    let cleanedStyles = removeInheritedStyles(smStyles, inherited);

    let smTailwindClasses: string[] = cssToTailwind(cleanedStyles);
    let defaultTailwindClasses: string[] = cssToTailwind(
      await getTailwindDefaultStyles(node)
    );

    smTailwindClasses = smTailwindClasses.filter(
      (cls) => !defaultTailwindClasses.includes(cls)
    );
    smTailwindClasses = simplifySVGSpecific(node, smTailwindClasses);
    // for explanation on why border patterns is only checked in sm, go to the function definition
    smTailwindClasses = simplifyBorderPatterns(smTailwindClasses);
    smTailwindClasses = simplifyClasses(smTailwindClasses);

    const existing = node.getAttribute("data-yoink-classes");
    const combined =
      smTailwindClasses.join(" ") + (existing ? " " + existing : "");
    node.setAttribute("data-yoink-classes", combined);

    // Recurse on children
    for (const child of Array.from(node.children)) {
      convertNodeToTailwindSmRecurse(child as HTMLElement, smStyles);
    }
  } else {
    // Recurse on children
    for (const child of Array.from(node.children)) {
      convertNodeToTailwindSmRecurse(child as HTMLElement, inherited);
    }
  }
}
