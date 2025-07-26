export function simplifySVGSpecific(el: Element, tailwindClasses: string[]) {
  
  let tailwindClassSet = new Set(tailwindClasses);

  if (!(el instanceof SVGElement)) {
    for (const cls of tailwindClassSet) {
      if (cls.startsWith("fill-") || cls.startsWith("stroke-")) {
        tailwindClassSet.delete(cls);
      }
    }
  }

  return Array.from(tailwindClassSet);
}