import { simplifyImagePosition } from "./image-position";
import { simplifyBorderWidth, simplifyRounded } from "./border";
import { simplifyColors } from "./colors";
import { simplfyFontSize } from "./font";
import { simplifyGap } from "./gap";
import { simplifyGrid } from "./grid";
import { simplifyPosition } from "./position";
import { simplifyShadows } from "./shadow";
import { simplifySize } from "./size";
import { simplifySpacing } from "./spacing";
import { simplifyVerboseTailwindClasses } from "./verbose";
import { simplifyBackground } from "./background";
import { simplifyNegatives } from "./negative";
import { simplifyOneVal } from "./oneVal";

export function simplifyClasses(classes: string[]) {
  classes = simplifyBorderWidth(classes);
  classes = simplifyVerboseTailwindClasses(classes);
  classes = simplifyNegatives(classes);
  classes = simplifyColors(classes);
  classes = simplifyPosition(classes);
  classes = simplifyGap(classes);
  classes = simplifySize(classes);
  classes = simplifySpacing(classes);
  classes = simplfyFontSize(classes);
  classes = simplifyRounded(classes);
  classes = simplifyGrid(classes);
  classes = simplifyShadows(classes);
  classes = simplifyImagePosition(classes);
  classes = simplifyBackground(classes);
  classes = simplifyOneVal(classes);

  return classes;
}
