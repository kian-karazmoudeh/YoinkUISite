import { essentialAttributes } from "./constants";

function preprocessDOMAttributes(dom: HTMLElement) {
  const isPreserved = (attrName: string) =>
    essentialAttributes.has(attrName) || attrName.startsWith("data-yoink");
  // attrName.startsWith("aria-");

  Array.from(dom.attributes).forEach((attr) => {
    if (!isPreserved(attr.name)) {
      dom.removeAttribute(attr.name);
    }
  });

  dom.querySelectorAll("*").forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (!isPreserved(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });
  });
}

export function cleanRedundantTags(htmlDoc: HTMLElement) {
  // Remove all script tags
  const scripts = htmlDoc.querySelectorAll("script");
  scripts.forEach((script) => script.remove());

  // Remove all styles
  const styles = htmlDoc.querySelectorAll("style");
  styles.forEach((style) => style.remove());

  const links = htmlDoc.querySelectorAll("link");
  links.forEach((link) => link.remove());

  const heads = htmlDoc.querySelectorAll("head");
  heads.forEach((head) => head.remove);

  preprocessDOMAttributes(htmlDoc);
}
