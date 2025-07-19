import { simplifyMeasurement } from "../../utils/measurement/simplifyMeasurement";

const gapProp = ["gap-", "gap-x-", "gap-y-"];

export function simplifyGap(classes: string[]) {
  return simplifyMeasurement(classes, gapProp);
}
