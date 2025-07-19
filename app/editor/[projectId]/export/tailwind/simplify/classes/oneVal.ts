const zIndexProp = "z-";
const flexProps = ["grow-", "shrink-"];

function simplifyZIndex(classes: string[]) {
  return classes.map((cls) => {
    if (!cls.startsWith(zIndexProp)) return cls;

    const suffix = cls
      .slice(zIndexProp.length)
      .replace("[", "")
      .replace("]", "");

    const simplified = parseFloat(suffix);

    if (simplified != null && simplified >= 0) {
      return `${zIndexProp}${simplified}`;
    }

    return cls;
  });
}

function simplifyFlexGrowShrink(classes: string[]) {
  return classes.map((cls) => {
    const prefix = flexProps.find((p) => cls.startsWith(p));
    if (!prefix) return cls;

    const suffix = cls.slice(prefix.length).replace("[", "").replace("]", "");
    const simplified = parseFloat(suffix);

    if (simplified != null && simplified >= 0) {
      if (simplified == 1) {
        return prefix.replace("-", "");
      } else {
        return `${prefix}${simplified}`;
      }
    }

    return cls;
  });
}

export function simplifyOneVal(classes: string[]) {
  classes = simplifyFlexGrowShrink(classes);
  classes = simplifyZIndex(classes);

  return classes;
}

// console.log(simplifyFlexGrowShrink("shrink-[0]".split(" ")));
