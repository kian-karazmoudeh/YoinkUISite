// takes in a node and viewport, if it is invisible, then sets a corresponding attribute
// import { getUpdatedSize } from "./measurement/getUpdatedSize";

import { getUpdatedSize } from "./getUpdatedSize";

const visibilityRules = [
  {
    parentCondition: (el: Element) => {
      const style = getComputedStyle(el);
      return (
        ["absolute", "fixed"].includes(style.position) &&
        getComputedStyle(el).visibility === "hidden"
      );
    },
    childCondition: (childEl: Element) =>
      getComputedStyle(childEl).visibility === "visible",
  },
  {
    parentCondition: (el: Element) => {
      const style = getComputedStyle(el);
      return style.display === "none";
    },
    childCondition: (_childEl: Element) => false,
  },
  {
    parentCondition: (el: Element) => {
      const style = getComputedStyle(el);
      return (
        ["absolute", "fixed"].includes(style.position) &&
        getComputedStyle(el).opacity === "0"
      );
    },
    childCondition: (_childEl: Element) => false,
  },
  {
    parentCondition: (el: Element) => {
      const style = getComputedStyle(el);
      const { updatedHeight, updatedWidth } = getUpdatedSize(el);
      return (
        ["relative", "sticky", "static"].includes(style.position) &&
        ((updatedHeight === 0 && style.overflowY === "hidden") ||
          (updatedWidth === 0 && style.overflowX === "hidden"))
      );
    },
    childCondition: (childEl: Element) => {
      const pos = getComputedStyle(childEl).position;
      return pos === "absolute" || pos === "fixed";
    },
  },
  {
    parentCondition: (el: Element) => {
      const style = getComputedStyle(el);
      const { updatedWidth, updatedHeight } = getUpdatedSize(el);
      return (
        ["fixed", "absolute"].includes(style.position) &&
        ((updatedWidth === 0 && style.overflowX === "hidden") ||
          (updatedHeight === 0 && style.overflowY === "hidden"))
      );
    },
    childCondition: (childEl: Element) =>
      getComputedStyle(childEl).position === "fixed",
  },
  {
    parentCondition: (el: Element) => {
      const parent = el.parentElement;
      const { updatedHeight } = getUpdatedSize(el);
      if (!parent) {
        return updatedHeight === 0;
      } else {
        const parentStyles = getComputedStyle(parent);

        return (
          parentStyles.display !== "grid" &&
          parentStyles.display !== "flex" &&
          updatedHeight == 0
        );
      }
    },
    childCondition: (childEl: Element) => {
      if (!childEl) {
        return false;
      } else {
        const { updatedHeight } = getUpdatedSize(childEl);
        return updatedHeight > 0;
      }
    },
  },
  {
    parentCondition: (el: Element) => {
      const parent = el.parentElement;
      const { updatedWidth } = getUpdatedSize(el);
      if (!parent) {
        return updatedWidth === 0;
      } else {
        const parentStyles = getComputedStyle(parent);

        return (
          parentStyles.display !== "grid" &&
          parentStyles.display !== "flex" &&
          updatedWidth == 0
        );
      }
    },
    childCondition: (childEl: Element) => {
      const { updatedWidth } = getUpdatedSize(childEl);
      return updatedWidth > 0;
    },
  },
];

function isElementInisibleRoot(el: HTMLElement) {
  if (!el || !(el instanceof Element)) return true;
  if (
    el instanceof HTMLBRElement ||
    el instanceof HTMLHRElement ||
    el instanceof HTMLPictureElement ||
    el instanceof HTMLSourceElement ||
    el instanceof HTMLTrackElement
  )
    return false;

  for (const rule of visibilityRules) {
    if (rule.parentCondition(el)) {
      return true;
    }
  }
  return false;
}

function getApplicableChildCondition(
  parentEl: HTMLElement
): null | ((el: HTMLElement) => boolean) {
  for (const rule of visibilityRules) {
    if (rule.parentCondition(parentEl)) {
      return rule.childCondition;
    }
  }
  return null;
}

function isThereAVisibleChild(
  el: HTMLElement | null,
  condition: (el: HTMLElement) => boolean
): boolean {
  if (!el) {
    return false;
  }

  if (condition(el)) {
    return true;
  }

  for (const child of Array.from(el.children)) {
    if (isThereAVisibleChild(child as HTMLElement, condition)) {
      return true;
    }
  }

  return false;
}

export function setVisibilityRootAttr(
  node: HTMLElement,
  viewport: "base" | "md" | "lg"
) {
  let visibleRoot: boolean = isElementInisibleRoot(node);

  if (visibleRoot) {
    node.setAttribute(`data-yoink-invisible-root-${viewport}`, "");
  }
}

export function setVisibilityTerminateAttrResponsive(node: HTMLElement) {
  if (
    node.hasAttribute("data-yoink-invisible-root-sm") &&
    node.hasAttribute("data-yoink-invisible-root-md") &&
    node.hasAttribute("data-yoink-invisible-root-lg")
  ) {
    let childConditions = getApplicableChildCondition(node);
    if (childConditions != null) {
      let visibleChild = false;

      for (const child of Array.from(node.children)) {
        if (isThereAVisibleChild(child as HTMLElement, childConditions)) {
          visibleChild = true;
        }
      }

      if (!visibleChild) {
        node.setAttribute("data-yoink-invisible-terminate", "");
      }
    } else {
      console.log("childconditions are null");
      console.log(node);
    }
  }
}

export function setVisibilityTerminateAttrComponent(node: HTMLElement) {
  if (node.hasAttribute("data-yoink-invisible-root-sm")) {
    let childConditions = getApplicableChildCondition(node);
    if (childConditions != null) {
      let visibleChild = false;

      for (const child of Array.from(node.children)) {
        if (isThereAVisibleChild(child as HTMLElement, childConditions)) {
          visibleChild = true;
        }
      }

      if (!visibleChild) {
        node.setAttribute("data-yoink-invisible-terminate", "");
      }
    } else {
      console.log("childconditions are null");
      console.log(node);
    }
  }
}

// another method which takes in root cloned node, and deletes all elements which are never visible.

export function removeInvisibleNodesRecurse(componentRoot: HTMLElement) {
  if (
    componentRoot.nodeType === 1 &&
    componentRoot.hasAttribute("data-yoink-invisible-terminate")
  ) {
    componentRoot.parentNode?.removeChild(componentRoot);

    return; // ⛔️ Stop recursion if this node is removed
  }

  // Copy childNodes to array first to avoid mutation issues
  const children = Array.from(componentRoot.children);

  for (const child of children) {
    removeInvisibleNodesRecurse(child as HTMLElement);
  }
}

// export function removeInvisibleNodesRecurseComponent(componentRoot: Element) {
//   if (
//     componentRoot.nodeType === 1 &&
//     componentRoot.hasAttribute("data-yoink-invisible-root-sm")
//   ) {
//     componentRoot.parentNode?.removeChild(componentRoot);

//     return; // ⛔️ Stop recursion if this node is removed
//   }

//   // Copy childNodes to array first to avoid mutation issues
//   const children = Array.from(componentRoot.children);

//   for (const child of children) {
//     removeInvisibleNodesRecurse(child as HTMLElement);
//   }
// }
