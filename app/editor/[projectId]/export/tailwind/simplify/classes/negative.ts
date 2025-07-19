const propsWithNegatives = [
  "m-",
  "ml-",
  "mr-",
  "mt-",
  "mb-",
  "mx-",
  "my-",
  "z-",
  "top-",
  "right-",
  "bottom-",
  "left-",
  "inset-x-",
  "inset-y-",
  "inset-",
  "scroll-m-",
  "scroll-ml-",
  "scroll-mr-",
  "scroll-mt-",
  "scroll-mb-",
  "scroll-mx-",
  "scroll-my-",
  "scroll-p-",
  "scroll-pl-",
  "scroll-pr-",
  "scroll-pt-",
  "scroll-pb-",
  "scroll-px-",
  "scroll-py-",
];

export function simplifyNegatives(classes: string[]) {
  return classes.map((cls) => {
    const prefix = propsWithNegatives.find((p) => cls.startsWith(p));
    if (!prefix) return cls;

    const value = cls.slice(prefix.length);

    const match = value.match(/^\[\s*-(.+?)\s*\]$/); // Match things like [-4px], [-10%], with optional spaces

    if (match) {
      const positiveValue = match[1].trim(); // remove negative and trim
      return `-${prefix}[${positiveValue}]`; // move negative outside
    }

    return cls;
  });
}

// console.log(simplifyNegatives("ml-[-10px] mt-[10px] top-[-50%]".split(" ")));
