export function simplifyVerboseTailwindClasses(classes: string[]): string[] {
  const classSet = new Set(classes);
  let simplified = false;

  // Define pairs and their shorthands
  const shorthandMap: { [key: string]: string } = {
    "ml-|mr-": "mx-",
    "mt-|mb-": "my-",
    "mx-|my-": "m-",
    "scroll-ml-|scroll-mr-": "scroll-mx-",
    "scroll-mt-|scroll-mb-": "scroll-my-",
    "scroll-mx-|scroll-my-": "scroll-m-",
    "pl-|pr-": "px-",
    "pt-|pb-": "py-",
    "px-|py-": "p-",
    "scroll-pl-|scroll-pr-": "scroll-px-",
    "scroll-pt-|scroll-pb-": "scroll-py-",
    "scroll-px-|scroll-py-": "scroll-p-",
    "gap-x-|gap-y-": "gap-",
    "overflow-x-|overflow-y-": "overflow-",
    "border-l-|border-r-": "border-x-",
    "border-t-|border-b-": "border-y-",
    "border-x-|border-y-": "border-",
    "rounded-tr-|rounded-tl-": "rounded-t-",
    "rounded-br-|rounded-bl-": "rounded-b-",
    "rounded-t-|rounded-b-": "rounded-",
    "w-|h-": "size-",
    "left-|right-": "inset-x-",
    "top-|bottom-": "inset-y-",
    "inset-x-|inset-y-": "inset-",
    "overscroll-x-|overscroll-y-": "overscroll-",
  };

  while (!simplified) {
    simplified = true;

    for (const pattern in shorthandMap) {
      const [prefixA, prefixB] = pattern.split("|");

      // Find all matching classes for each prefix
      const matchesA = Array.from(classSet).filter((cls) =>
        cls.startsWith(prefixA)
      );
      const matchesB = Array.from(classSet).filter((cls) =>
        cls.startsWith(prefixB)
      );

      // Compare all pairs of matches
      for (const valueA of matchesA) {
        for (const valueB of matchesB) {
          const suffixA = valueA.slice(prefixA.length);
          const suffixB = valueB.slice(prefixB.length);

          if (suffixA === suffixB) {
            classSet.delete(valueA);
            classSet.delete(valueB);
            classSet.add(shorthandMap[pattern] + suffixA);
            simplified = false;
          }
        }
      }
    }
  }

  return [...classSet];
}
