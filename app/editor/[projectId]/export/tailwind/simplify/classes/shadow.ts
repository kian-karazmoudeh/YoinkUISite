// simplify text shadow and bg-shadow

import { colorToHex } from "../../utils/colors/colorToHex";

const shadowProps = ["shadow-", "text-shadow-"];
const colorRegex =
  /(oklch|oklab|rgba?|hsla?|hwb|lab|lch)\([0-9\_\.\,\/\-]+\)/gi;

export function simplifyShadows(classes: string[]) {
  return classes
    .map((cls) => {
      const prop = shadowProps.find((p) => cls.startsWith(p));
      if (!prop) return cls;

      let vals = cls
        .slice(prop.length)
        .replace(/[\[\]]/gi, "")
        .replace(colorRegex, (color) => `#${colorToHex(color)}`)
        .split(",")
        .map((val) => (val.startsWith("_") ? val : `_${val}`));

      //   console.log(vals);

      vals = vals.filter((val) => {
        const hexRegex = /#[0-9a-fA-f]{6}([0-9a-fA-f]{2})?/g;
        const match = val.match(hexRegex);

        if (match && match.length > 0 && match[0] != "#00000000") {
          return true;
        } else {
          return false;
        }
      });

      if (!vals || vals.length == 0) {
        return "";
      }
      return `${prop}[${vals.join(",")}]`;
    })
    .filter((cls) => cls != "");
}

// console.log(
//   simplifyShadows(
//     "relative flex grow-[1] flex-col justify-between rounded-3xl bg-white shadow-[rgba(255,_255,_255,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px]".split(
//       " "
//     )
//   )
// );

// 9  a  b  c  d  e  f
// 9 10 11 12 13 14  15
