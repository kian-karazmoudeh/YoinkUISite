import { getRemSize } from "../../export/tailwind/utils/measurement/getRemSize";
import { safeRequestIdleCallback } from "./safeRequestIdleCallback";

// Get all defaults styles for a given tag
function getTagStyles(
  tagname: string,
  iframe: HTMLIFrameElement
): Record<string, string> {
  const doc = iframe.contentDocument || iframe.contentWindow!.document;
  const defaultEl = doc.createElement(tagname);
  doc.body.appendChild(defaultEl);
  //   let stylesComp = iframe.contentWindow!.getComputedStyle(defaultEl);
  let stylesMap = defaultEl.computedStyleMap();

  const defaultCSS: Record<string, string> = {
    "margin-top": stylesMap.get("margin-top")?.toString() || "0px",
    "margin-right": stylesMap.get("margin-right")?.toString() || "0px",
    "margin-bottom": stylesMap.get("margin-bottom")?.toString() || "0px",
    "margin-left": stylesMap.get("margin-left")?.toString() || "0px",
    margin: stylesMap.get("margin")?.toString() || "0px",
    "scroll-margin-top":
      stylesMap.get("scroll-margin-top")?.toString() || "0px",
    "scroll-margin-right":
      stylesMap.get("scroll-margin-right")?.toString() || "0px",
    "scroll-margin-bottom":
      stylesMap.get("scroll-margin-bottom")?.toString() || "0px",
    "scroll-margin-left":
      stylesMap.get("scroll-margin-left")?.toString() || "0px",
    "padding-top": stylesMap.get("padding-top")?.toString() || "0px",
    "padding-right": stylesMap.get("padding-right")?.toString() || "0px",
    "padding-bottom": stylesMap.get("padding-bottom")?.toString() || "0px",
    "padding-left": stylesMap.get("padding-left")?.toString() || "0px",
    padding: stylesMap.get("padding")?.toString() || "0px",
    "scroll-padding-top":
      stylesMap.get("scroll-padding-top")?.toString() || "0px",
    "scroll-padding-right":
      stylesMap.get("scroll-padding-right")?.toString() || "0px",
    "scroll-padding-bottom":
      stylesMap.get("scroll-padding-bottom")?.toString() || "0px",
    "scroll-padding-left":
      stylesMap.get("scroll-padding-left")?.toString() || "0px",
    "background-color":
      stylesMap.get("background-color")?.toString() || "rgba(0, 0, 0, 0)",
    "line-height": "normal",
    width: stylesMap.get("width")?.toString() || "auto",
    height: stylesMap.get("height")?.toString() || "auto",
    "min-width": stylesMap.get("min-width")?.toString() || "auto",
    "min-height": stylesMap.get("min-height")?.toString() || "auto",
    "max-width": stylesMap.get("max-width")?.toString() || "none",
    "max-height": stylesMap.get("max-height")?.toString() || "none",
    "border-top-right-radius":
      stylesMap.get("border-top-right-radius")?.toString() || "0px",
    "border-top-left-radius":
      stylesMap.get("border-top-left-radius")?.toString() || "0px",
    "border-bottom-right-radius":
      stylesMap.get("border-bottom-right-radius")?.toString() || "0px",
    "border-bottom-left-radius":
      stylesMap.get("border-bottom-left-radius")?.toString() || "0px",
    // "border-radius": stylesMap.get("border-radius")?.toString() || "0px",
    // "border-width": "0px",
    // "border-style": stylesMap.get("border-style")?.toString() || "none",
    // "border-top-width": "0px",
    "border-top-style": stylesMap.get("border-top-style")?.toString() || "none",
    // "border-right-width": "0px",
    "border-right-style":
      stylesMap.get("border-right-style")?.toString() || "none",
    // "border-bottom-width": "0px",
    "border-bottom-style":
      stylesMap.get("border-bottom-style")?.toString() || "none",
    // "border-left-width": "0px",
    "border-left-style":
      stylesMap.get("border-left-style")?.toString() || "none",
    top: stylesMap.get("top")?.toString() || "auto",
    right: stylesMap.get("right")?.toString() || "auto",
    bottom: stylesMap.get("bottom")?.toString() || "auto",
    left: stylesMap.get("left")?.toString() || "auto",
    "z-index": stylesMap.get("z-index")?.toString() || "auto",
    gap: stylesMap.get("gap")?.toString() || "normal",
    "row-gap": stylesMap.get("row-gap")?.toString() || "normal",
    "column-gap": stylesMap.get("column-gap")?.toString() || "normal",
    "grid-template-columns":
      stylesMap.get("grid-template-columns")?.toString() || "none",
    "grid-template-rows":
      stylesMap.get("grid-template-rows")?.toString() || "none",
    "background-position":
      stylesMap.get("background-position")?.toString() || "0% 0%",
    "background-repeat":
      stylesMap.get("background-repeat")?.toString() || "repeat",
    "background-size": stylesMap.get("background-size")?.toString() || "auto",
    "background-image": stylesMap.get("background-image")?.toString() || "none",
    "background-clip":
      stylesMap.get("background-clip")?.toString() || "border-box",
    "background-origin":
      stylesMap.get("background-origin")?.toString() || "padding-box",
    "background-attachment":
      stylesMap.get("background-attachment")?.toString() || "scroll",
    "box-shadow": stylesMap.get("box-shadow")?.toString() || "none",
    "text-wrap": stylesMap.get("text-wrap")?.toString() || "wrap",
    "text-align": stylesMap.get("text-align")?.toString() || "start",
    opacity: stylesMap.get("opacity")?.toString() || "1",
    "fill-opacity": stylesMap.get("fill-opacity")?.toString() || "",
    "stroke-opacity": stylesMap.get("stroke-opacity")?.toString() || "",
    stroke: stylesMap.get("stroke")?.toString() || "none",
    "object-fit": stylesMap.get("object-fit")?.toString() || "fill",
    "text-indent": stylesMap.get("text-indent")?.toString() || "0px",
    columns: stylesMap.get("columns")?.toString() || "auto auto",
    transform: stylesMap.get("transform")?.toString() || "none",
    "transform-style": stylesMap.get("transform-style")?.toString() || "flat",
    perspective: stylesMap.get("perspective")?.toString() || "none",
    "perspective-origin":
      stylesMap.get("perspective-origin")?.toString() || "50% 50%",
    "backface-visibility":
      stylesMap.get("backface-visibility")?.toString() || "visible",
    "text-shadow": stylesMap.get("text-shadow")?.toString() || "none",
    "vertical-align": stylesMap.get("vertical-align")?.toString() || "baseline",
    "flex-grow": stylesMap.get("flex-grow")?.toString() || "0",
    "flex-shrink": stylesMap.get("flex-shrink")?.toString() || "1",
    order: stylesMap.get("order")?.toString() || "0",
    "scroll-behavior": stylesMap.get("scroll-behavior")?.toString() || "auto",
    display: stylesMap.get("display")?.toString() || "block",
    "box-sizing": stylesMap.get("box-sizing")?.toString() || "border-box",
    position: stylesMap.get("position")?.toString() || "static",
    overflow: stylesMap.get("overflow")?.toString() || "visible",
    "overflow-x": stylesMap.get("overflow-x")?.toString() || "visible",
    "overflow-y": stylesMap.get("overflow-y")?.toString() || "visible",
    visibility: stylesMap.get("visibility")?.toString() || "visible",
    "text-decoration-line":
      stylesMap.get("text-decoration-line")?.toString() || "none",
    filter: stylesMap.get("filter")?.toString() || "none",
    "backdrop-filter": stylesMap.get("backdrop-filter")?.toString() || "none",
    "clip-path": stylesMap.get("clip-path")?.toString() || "none",
    translate: stylesMap.get("translate")?.toString() || "none",
    "aspect-ratio": stylesMap.get("aspect-ratio")?.toString() || "auto",
    "font-style": stylesMap.get("font-style")?.toString() || "normal",
    "flex-wrap": stylesMap.get("flex-wrap")?.toString() || "nowrap",
    "flex-direction": stylesMap.get("flex-direction")?.toString() || "row",
    "justify-content":
      stylesMap.get("justify-content")?.toString() || "flex-start",
    "align-content": stylesMap.get("align-content")?.toString() || "normal",
    "align-items": stylesMap.get("align-items")?.toString() || "stretch",
    "align-self": stylesMap.get("align-self")?.toString() || "auto",
    "list-style-type": stylesMap.get("list-style-type")?.toString() || "disc",
    cursor: stylesMap.get("cursor")?.toString() || "auto",
    float: stylesMap.get("float")?.toString() || "none",
    clear: stylesMap.get("clear")?.toString() || "none",
    "table-layout": stylesMap.get("table-layout")?.toString() || "auto",
    "border-collapse":
      stylesMap.get("border-collapse")?.toString() || "separate",
    "grid-auto-flow": stylesMap.get("grid-auto-flow")?.toString() || "row",
    "grid-column-start":
      stylesMap.get("grid-column-start")?.toString() || "auto",
    "grid-column-end": stylesMap.get("grid-column-end")?.toString() || "auto",
    "grid-row-start": stylesMap.get("grid-row-start")?.toString() || "auto",
    "grid-row-end": stylesMap.get("grid-row-end")?.toString() || "auto",
    "outline-style": stylesMap.get("outline-style")?.toString() || "none",
    "letter-spacing": stylesMap.get("letter-spacing")?.toString() || "normal",
    "white-space": stylesMap.get("white-space")?.toString() || "normal",
    "font-weight": stylesMap.get("font-weight")?.toString() || "400",
    "text-transform": stylesMap.get("text-transform")?.toString() || "none",
    "font-size": stylesMap.get("font-size")?.toString() || `${getRemSize()}px`,
    isolation: stylesMap.get("isolation")?.toString() || `auto`,
    "justify-self": stylesMap.get("justify-self")?.toString() || `auto`,
    "justify-items": stylesMap.get("justify-items")?.toString() || `stretch`,
    "overscroll-behavior-x":
      stylesMap.get("overscroll-behavior-x")?.toString() || `auto`,
    "overscroll-behavior-y":
      stylesMap.get("overscroll-behavior-y")?.toString() || `auto`,
    "box-decoration-break":
      stylesMap.get("box-decoration-break")?.toString() || `slice`,
    "break-inside": stylesMap.get("break-inside")?.toString() || `auto`,
    "break-before": stylesMap.get("break-before")?.toString() || `auto`,
    "break-after": stylesMap.get("break-after")?.toString() || `auto`,
    "list-style-image": stylesMap.get("list-style-image")?.toString() || `none`,
    "list-style-position":
      stylesMap.get("list-style-position")?.toString() || `outside`,
    // "text-decoration-color":
    //   stylesMap.get("text-decoration-color")?.toString() || `${getRemSize()}px`, figure out later
    "text-decoration-style":
      stylesMap.get("text-decoration-style")?.toString() || `solid`,
    "text-overflow": stylesMap.get("text-overflow")?.toString() || `clip`,
    "word-break": stylesMap.get("word-break")?.toString() || `normal`,
    "mask-clip": stylesMap.get("mask-clip")?.toString() || `border-box`,
    "mask-composite": stylesMap.get("mask-composite")?.toString() || `add`,
    "mask-image": stylesMap.get("mask-image")?.toString() || `none`,
    "mask-mode": stylesMap.get("mask-mode")?.toString() || `match-source`,
    "mask-origin": stylesMap.get("mask-origin")?.toString() || `border-box`,
    "mask-repeat": stylesMap.get("mask-repeat")?.toString() || `repeat`,
    "mask-position": stylesMap.get("mask-position")?.toString() || `0% 0%`,
    "object-position": stylesMap.get("object-position")?.toString() || `0% 0%`,
    "background-blend-mode":
      stylesMap.get("background-blend-mode")?.toString() || `normal`,
    "mix-blend-mode": stylesMap.get("mix-blend-mode")?.toString() || `normal`,
    "mask-size": stylesMap.get("mask-size")?.toString() || `auto`,
    "mask-type": stylesMap.get("mask-type")?.toString() || `luminance`,
  };

  defaultEl.remove();

  return defaultCSS;
}

// iterates through all tags and gets the default styles for each tag
export function getAllTagStylesNonBlocking(
  tags: string[],
  iframe: HTMLIFrameElement,
  onComplete: (defaultCSS?: Record<string, Record<string, string>>) => void
) {
  let index = 0;
  let defaultCSS: Record<string, Record<string, string>> = {};

  function processNextBatch(deadline: IdleDeadline) {
    while (deadline.timeRemaining() > 0 && index < tags.length) {
      const tag = tags[index++];
      defaultCSS[tag] = getTagStyles(tag, iframe);
    }

    if (index < tags.length) {
      requestIdleCallback(processNextBatch);
    } else {
      iframe.remove();
      onComplete(defaultCSS);
    }
  }

  safeRequestIdleCallback(processNextBatch);
}
