import { simplifyMeasurement } from "../../utils/measurement/simplifyMeasurement";

const posProps = [
  "right-",
  "left-",
  "bottom-",
  "top-",
  "inset-x-",
  "inset-y-",
  "inset-",
  "-right-",
  "-left-",
  "-bottom-",
  "-top-",
  "-inset-x-",
  "-inset-y-",
  "-inset-",
];

const tailwindKeywords = {
  "[100vw]": "screen",
  "[100vh]": "screen",
  "[100%]": "full",
  [`[${(1 / 2) * 100}%]`]: "1/2",
  [`[${(1 / 3) * 100}%]`]: "1/3",
  [`[${(2 / 3) * 100}%]`]: "2/3",
  [`[${(1 / 4) * 100}%]`]: "1/4",
  [`[${(3 / 4) * 100}%]`]: "3/4",
  "[1px]": "px",
  "[auto]": "auto",
};

export function simplifyPosition(classes: string[]) {
  return simplifyMeasurement(classes, posProps, tailwindKeywords);
}

// console.log(
//   simplifyPosition(
//     "fixed top-[-40px] lg:right-[40px] z-[2.14748e+09] top-[0px] hidden min-h-[100%] w-[100%] border-[solid] border-gray-200 bg-transparent outline-gray-700".split(
//       " "
//     )
//   )
// );
