// for fonts, simplify font-weight and font-size

import { getRemSize } from "../../utils/measurement/getRemSize";

// import { getRemSize } from "../utils/measurement/getRemSize"

const fontSizeProp = "text-"
const tailwindKeywords = {
    [`[${getRemSize() * 0.75}px]`]: "xs",
    [`[${getRemSize() * 0.875}px]`]: "sm",
    [`[${getRemSize()}px]`]: "base",
    [`[${getRemSize() * 1.125}px]`]: "lg",
    [`[${getRemSize() * 1.25}px]`]: "xl",
    [`[${getRemSize() * 1.5}px]`]: "2xl",
    [`[${getRemSize() * 1.875}px]`]: "3xl",
    [`[${getRemSize() * 2.25}px]`]: "4xl",
    [`[${getRemSize() * 3}px]`]: "5xl",
    [`[${getRemSize() * 3.75}px]`]: "6xl",
    [`[${getRemSize() * 4.5}px]`]: "7xl",
    [`[${getRemSize() * 6}px]`]: "8xl",
    [`[${getRemSize() * 8}px]`]: "9xl",
}

export function simplfyFontSize(classes : string[]) {
    let parts : string[], value : string;

    classes.forEach((cls, idx) => {
        // Support for prefixes like md:, lg:, etc.
        // Extract prefix (if any) and the actual class
        const match = cls.match(/^([a-z]+:)?(.+)$/);
        const prefix = match && match[1] ? match[1] : "";
        const baseClass = match ? match[2] : cls;
        if (baseClass.startsWith(fontSizeProp)) {
            parts = baseClass.split("-");
            value = parts[parts.length - 1];
            Object.entries(tailwindKeywords).forEach(([key, keywordValue]) => {
                if (value === key) {
                    // Assign the replaced string back to the array with prefix
                    classes[idx] = prefix + baseClass.replace(value, keywordValue);
                }
            });
        }
    })

    return classes;
}

// console.log(simplfyFontSize("text-[12px]".split(" ")))