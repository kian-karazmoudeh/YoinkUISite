export function removeGrapeJsIdsRecurse(root: Element) {
  if (root.hasAttribute("id") && !root.hasAttribute("id-exists")) {
    root.removeAttribute("id");
    root.removeAttribute("id-exists");
  }
  for (const child of root.children) {
    removeGrapeJsIdsRecurse(child);
  }
}
