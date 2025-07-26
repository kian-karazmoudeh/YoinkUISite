// check vh, px, etc.
import { getRemSize } from "../../utils/measurement/getRemSize";
import { simplifyMeasurement } from "../../utils/measurement/simplifyMeasurement";

const sizeProps = ["min-w-", "max-w-", "w-", "min-h-", "max-h-", "h-", "size-"];

const tailwindKeywords = {
  "[100vw]": "screen",
  "[100vh]": "screen",
  "[100%]": "full",
  "[none]": "none",
  [`[${(1 / 2) * 100}%]`]: "1/2",
  [`[${(1 / 3) * 100}%]`]: "1/3",
  [`[${(2 / 3) * 100}%]`]: "2/3",
  [`[${(1 / 4) * 100}%]`]: "1/4",
  [`[${(3 / 4) * 100}%]`]: "3/4",
  "[1px]": "px",
  "[auto]": "auto",
  "[fit-content]": "fit",
  "[max-content]": "max",
  "[min-content]": "min",
  [`[${getRemSize() * 16}px]`]: "3xs",
  [`[${getRemSize() * 18}px]`]: "2xs",
  [`[${getRemSize() * 20}px]`]: "xs",
  [`[${getRemSize() * 24}px]`]: "sm",
  [`[${getRemSize() * 28}px]`]: "md",
  [`[${getRemSize() * 32}px]`]: "lg",
  [`[${getRemSize() * 36}px]`]: "xl",
  [`[${getRemSize() * 42}px]`]: "2xl",
  [`[${getRemSize() * 48}px]`]: "3xl",
  [`[${getRemSize() * 56}px]`]: "4xl",
  [`[${getRemSize() * 64}px]`]: "5xl",
  [`[${getRemSize() * 72}px]`]: "6xl",
  [`[${getRemSize() * 80}px]`]: "7xl",
};

export function simplifySize(classes: string[]) {
  return simplifyMeasurement(classes, sizeProps, tailwindKeywords);
}

// console.log(
//   simplifySize(
//     "fixed top-[0px] right-[0px] z-[2.14748e+09] w-[0px] hidden min-h-[1px] w-[100%] border-[solid] border-gray-200 bg-transparent outline-gray-700".split(
//       " "
//     )
//   )
// );
