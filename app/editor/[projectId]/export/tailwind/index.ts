// import { twMerge } from "tailwind-merge";
import {
  addCSSAttributesRecursivelyResponsive,
  convertNodeToTailwindLgRecurse,
  convertNodeToTailwindMdRecurse,
  convertNodeToTailwindBaseRecurse,
} from "./CSS/css";
import { cleanRedundantTags } from "./HTML/dom";
// import {
//   changeImgTagSrc,
//   changeSourceTagSrc,
//   changeVideoTagSrc,
// } from "./HTML/placeholder";
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

  // const componentContainer = document.createElement("div");
  // componentContainer.setAttribute(
  //   "data-yoink-classes",
  //   twMerge(htmlClasses, bodyClasses)
  // );

  // Move all children from body to component div
  // while (docBody!.firstChild) {
  //   componentContainer.appendChild(docBody!.firstChild);
  // }

  removeInvisibleNodesRecurse(rootClone);
  swapYoinkClasses(rootClone);
  removeYoinkAttributes(rootClone);
  removeYoinkElements(rootClone);
  removeCommentsFromDOM(rootClone);

  return rootClone;
}

export function mapResponsivePage() {
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
  console.log(converted);
}
