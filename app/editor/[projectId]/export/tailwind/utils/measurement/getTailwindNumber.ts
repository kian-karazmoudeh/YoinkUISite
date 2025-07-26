export function getTailwindNumber(value: string, remSize = 16) {
  const isPx = (val: any) => typeof val === "string" && val.endsWith("px");
  // const isPercent = (val: any) => typeof val === "string" && val.endsWith("%");

  if (isPx(value)) {
    let num = parseFloat(value) / (remSize * 0.25);

    if (Number.isInteger(num) && num >= 0) {
      return num.toString();
    } else {
      return `[${value}]`;
    }
  } else {
    return `[${value}]`;
  }
}
