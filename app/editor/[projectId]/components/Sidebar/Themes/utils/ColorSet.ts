import chroma from "chroma-js";

export class ColorSet {
  private _colors: string[] = [];

  constructor(colors: string[]) {
    this._colors = colors;
  }

  get colors() {
    return this._colors;
  }

  set colors(colors: string[]) {
    this._colors = colors;
  }

  _sortColors() {
    return this._colors.sort((a, b) => {
      const aColor = chroma(a);
      const bColor = chroma(b);
      return aColor.hsl()[2] - bColor.hsl()[2];
    });
  }
}
