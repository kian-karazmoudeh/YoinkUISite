import { simplifyMeasurement } from "../../utils/measurement/simplifyMeasurement";

const spacingProps = [
  "m-",
  "ml-",
  "mr-",
  "mt-",
  "mb-",
  "mx-",
  "my-",
  "-m-",
  "-ml-",
  "-mr-",
  "-mt-",
  "-mb-",
  "-mx-",
  "-my-",
  "scroll-m-",
  "scroll-ml-",
  "scroll-mr-",
  "scroll-mt-",
  "scroll-mb-",
  "scroll-mx-",
  "scroll-my-",
  "-scroll-m-",
  "-scroll-ml-",
  "-scroll-mr-",
  "-scroll-mt-",
  "-scroll-mb-",
  "-scroll-mx-",
  "-scroll-my-",
  "p-",
  "pl-",
  "pr-",
  "pt-",
  "pb-",
  "px-",
  "py-",
  "scroll-p-",
  "scroll-pl-",
  "scroll-pr-",
  "scroll-pt-",
  "scroll-pb-",
  "scroll-px-",
  "scroll-py-",
  "-scroll-p-",
  "-scroll-pl-",
  "-scroll-pr-",
  "-scroll-pt-",
  "-scroll-pb-",
  "-scroll-px-",
  "-scroll-py-",
];

const tailwindKeywords = {
  "[auto]": "auto",
  "[1px]": "px",
};

export function simplifySpacing(classes: string[]) {
  return simplifyMeasurement(classes, spacingProps, tailwindKeywords);
}

// console.log(simplifySpacing("mx-[auto] w-[256px] shrink-[0] border-[solid] border-gray-200 bg-transparent text-center outline-gray-700 lg:mx-[1px] lg:text-left".split(" ")))
