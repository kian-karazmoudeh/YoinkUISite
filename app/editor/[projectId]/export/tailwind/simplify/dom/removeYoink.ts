import { Component } from "grapesjs";

export function swapYoinkClasses(root: Element) {
  // swap the yoink classes
  const yoinkClasses = root.getAttribute("data-yoink-classes");
  if (yoinkClasses && yoinkClasses.trim().length > 0) {
    root.setAttribute("class", yoinkClasses.trim());
  } else {
    root.removeAttribute("class");
  }

  Array.from(root.children).forEach((child) => {
    swapYoinkClasses(child);
  });
}

export function removeYoinkAttributes(root: Element) {
  const attributes = root.getAttributeNames();

  attributes.forEach((attribute) => {
    if (attribute.startsWith("data-yoink-")) {
      root.removeAttribute(attribute);
    }
  });

  for (const child of Array.from(root.children)) {
    removeYoinkAttributes(child as Element);
  }
}

export function removeYoinkAttributesFromCanvas(root: Component) {
  const attributes = root.getAttributes();

  Object.keys(attributes).forEach((attribute) => {
    if (
      attribute === "data-yoink-classes" ||
      attribute === "data-yoink-sm" ||
      attribute === "data-yoink-md" ||
      attribute === "data-yoink-lg"
    ) {
      root.removeAttributes(attribute);
    }
  });

  for (const child of root.components()) {
    removeYoinkAttributesFromCanvas(child);
  }
}

export function removeYoinkElements(root: Element) {
  const els = root.querySelectorAll("*");

  els.forEach((el) => {
    if (el.id.startsWith("yoink-")) {
      el.remove();
    }
  });
}
