import { colorToHex } from "../../utils/colors/colorToHex";
import { closestTailwindToHex } from "../../utils/colors/hexToTailwind";

// use regex to detect when there is a color, and replace it.
const colorRegex =
  /(\[)(oklch|oklab|rgba?|hsla?|hwb|lab|lch)\([0-9\_\.\,\/\-]+\)(\])/gi;

function hexAlphaToDecimal(alphaHex: string) {
  return Math.floor((parseInt(alphaHex, 16) / 255) * 100);
}

function convertClassColorToTailwind(match: string) {
  // step 1, convert it into hex
  const hex = colorToHex(match);
  let alphaHex, alphaDec;
  let mainHex;

  // step 2, if there's alpha,
  if (hex.length > 6) {
    alphaHex = hex.substring(6, 8);
    alphaDec = hexAlphaToDecimal(alphaHex);
    if (alphaDec == 0) {
      return "transparent";
    }
  }
  mainHex = hex.substring(0, 6);

  // step 3, convert hex to closest tailwind
  const { tailwind, diff } = closestTailwindToHex(mainHex);

  if (diff > 3) {
    return `[#${hex}]`;
  } else {
    return alphaDec ? `${tailwind}/${alphaDec}` : tailwind;
  }
}

// main method. It takes in the class of an element and replaces all the colors with tailwind equivalents.
export function simplifyColors(classes: string[]) {
  let classesJoined = classes.join(" ").trim();
  return classesJoined
    .replace(colorRegex, convertClassColorToTailwind)
    .split(" ");
}

// console.log(
//   simplifyColors(
//     "border-[rgb(229,_231,_235)] bg-[oklab(0.967_0.000281923_-0.000959437_/_0.5)] border-[solid] bg-[rgba(0,_0,_0,_0)] outline-[oklch(0.355192_0.032071_262.989)] shadow-[rgb(0,_0,_0)_0px_0px_0px_0px]".split(
//       " "
//     )
//   )
// );
