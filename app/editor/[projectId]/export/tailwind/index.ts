import { twMerge } from "tailwind-merge";
import {
  addCSSAttributesRecursivelyResponsive,
  convertNodeToTailwindLgRecurse,
  convertNodeToTailwindMdRecurse,
  convertNodeToTailwindBaseRecurse,
} from "./CSS/css";
import { cleanRedundantTags } from "./HTML/dom";
import {
  changeImgTagSrc,
  changeSourceTagSrc,
  changeVideoTagSrc,
} from "./HTML/placeholder";
import { removeCommentsFromDOM } from "./simplify/dom/removeComments";
import {
  removeYoinkAttributes,
  removeYoinkElements,
  swapYoinkClasses,
} from "./simplify/dom/removeYoink";
import { removeInvisibleNodesRecurse } from "../shared/elementVisibility";
import { useEditorStore } from "../../store";
import { Component } from "grapesjs";

// function convertToComponent(): HTMLElement {
//   const htmlDoc = document.documentElement.cloneNode(true) as HTMLElement;

//   cleanRedundantTags(htmlDoc);
//   const docBody = htmlDoc.querySelector("body");

//   changeImgTagSrc(htmlDoc);
//   changeVideoTagSrc(htmlDoc);
//   changeSourceTagSrc(htmlDoc);
//   // changeTrackTagSrc(htmlDoc);

//   let htmlClasses = htmlDoc.getAttribute("data-yoink-classes");
//   let bodyClasses = docBody?.getAttribute("data-yoink-classes");
//   // create a new div to hold the children of body

//   const componentContainer = document.createElement("div");
//   componentContainer.setAttribute(
//     "data-yoink-classes",
//     twMerge(htmlClasses, bodyClasses)
//   );

//   // Move all children from body to component div
//   while (docBody!.firstChild) {
//     componentContainer.appendChild(docBody!.firstChild);
//   }

//   removeInvisibleNodesRecurse(componentContainer);
//   swapYoinkClasses(componentContainer);
//   removeYoinkAttributes(componentContainer);
//   removeYoinkElements(componentContainer);
//   removeCommentsFromDOM(componentContainer);

//   removeYoinkAttributes(document.documentElement);

//   return componentContainer;
// }

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

  console.log(root.getEl());
}
