const backgroundProp = "bg-";

const tailwindKeywords: Record<string, string> = {
  // bg-size
  "size-[auto]": "auto",
  "size-[cover]": "cover",
  "size-[contain]": "contain",
};

export function simplifyBackground(classes: string[]) {
  return classes.map((cls) => {
    if (!cls.startsWith(backgroundProp)) return cls;

    const suffix = cls.slice(backgroundProp.length); // remove "bg-"
    const simplified = tailwindKeywords[suffix];

    if (simplified) {
      return `${backgroundProp}${simplified}`;
    }

    return cls;
  });
}
