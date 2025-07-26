const positionProps = ["bg-position-", "object-", "mask-position-"];

const tailwindKeywords: Record<string, string> = {
  // bg-position
  "[0px_0px]": "top-left",
  "[0%_0%]": "top-left",
  "[top_left]": "top-left",

  "[100%_0%]": "top-right",
  "[100%_0px]": "top-right",
  "[top_right]": "top-right",

  "[100%_100%]": "bottom-right",
  "[bottom_right]": "bottom-right",

  "[0%_100%]": "bottom-left",
  "[0px_100%]": "bottom-left",
  "[bottom_left]": "bottom-left",

  "[50%_50%]": "center",
  "[center]": "center",

  "[50%_0%]": "top",
  "[50%_0px]": "top",
  "[top]": "top",

  "[50%_100%]": "bottom",
  "[bottom]": "bottom",

  "[100%_50%]": "right",
  "[right]": "right",

  "[0%_50%]": "left",
  "[0px_50%]": "left",
  "[left]": "left",
};

export function simplifyImagePosition(classes: string[]) {
  return classes.map((cls) => {
    const prefix = positionProps.find((p) => cls.startsWith(p));
    if (!prefix) return cls;

    const suffix = cls.slice(prefix.length); // get part after "bg-", "object-", or "mask-"
    const simplified = tailwindKeywords[suffix];

    if (simplified) {
      return `${prefix}${simplified}`;
    }

    return cls;
  });
}

// console.log(
//   simplifyBackground([
//     "text-white",
//     "bg-position-[50%_50%]",
//     "bg-size-[cover]",
//     "bg-position-[0%_0%]",
//     "bg-blue-500",
//   ])
// );
