import {
  addCSSAttributesRecursivelyResponsive,
  convertNodeToTailwindLgRecurse,
  convertNodeToTailwindMdRecurse,
  convertNodeToTailwindBaseRecurse,
} from "./CSS/css";
import { cleanRedundantTags } from "./HTML/dom";
import { removeCommentsFromDOM } from "./simplify/dom/removeComments";
import {
  removeYoinkAttributes,
  removeYoinkAttributesFromCanvas,
  removeYoinkElements,
  swapYoinkClasses,
} from "./simplify/dom/removeYoink";
import { removeInvisibleNodesRecurse } from "../shared/elementVisibility";
import { useEditorStore } from "../../store";
import { Component } from "grapesjs";

function convertToComponent(root: Element): HTMLElement {
  const rootClone = root.cloneNode(true) as HTMLElement;

  // console.log(rootClone);

  cleanRedundantTags(rootClone);
  // const docBody = rootClone.querySelector("body");

  // // changeTrackTagSrc(htmlDoc);
  // let htmlClasses = rootClone.getAttribute("data-yoink-classes");
  // let bodyClasses = docBody?.getAttribute("data-yoink-classes");
  // create a new div to hold the children of body

  removeInvisibleNodesRecurse(rootClone);
  swapYoinkClasses(rootClone);
  removeYoinkAttributes(rootClone);
  removeYoinkElements(rootClone);
  removeCommentsFromDOM(rootClone);

  return rootClone;
}

export async function mapResponsivePage() {
  return new Promise<HTMLElement>((resolve) => {
    const editor = useEditorStore.getState().editor;
    let root = editor?.getWrapper() as Component | undefined;
    if (!root) return;
    addCSSAttributesRecursivelyResponsive(root, "Desktop");
    addCSSAttributesRecursivelyResponsive(root, "Tablet");
    addCSSAttributesRecursivelyResponsive(root, "Mobile");

    convertNodeToTailwindLgRecurse(root);
    convertNodeToTailwindMdRecurse(root);
    convertNodeToTailwindBaseRecurse(root);

    let converted = convertToComponent(root.getEl()!);

    removeYoinkAttributesFromCanvas(root);
    resolve(converted);
  });
}
