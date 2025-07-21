export function getUpdatedSize(el: Element) {
  const { width, height } = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);

  let updatedWidth =
    width +
    parseFloat(style.marginRight) +
    parseFloat(style.marginLeft) +
    parseFloat(style.borderLeftWidth) +
    parseFloat(style.borderRightWidth) +
    parseFloat(style.outlineWidth);
  let updatedHeight =
    height +
    parseFloat(style.marginTop) +
    parseFloat(style.marginBottom) +
    parseFloat(style.borderTopWidth) +
    parseFloat(style.borderBottomWidth) +
    parseFloat(style.outlineWidth);

  if (el instanceof SVGPathElement) {
    updatedHeight += parseFloat(style.strokeWidth);
    updatedWidth += parseFloat(style.strokeWidth);
  }
  return { updatedWidth, updatedHeight };
}
