export interface ColorData {
  textColors: Map<string, number>;
  area: number;
}

export interface ColorGroup {
  colors: string[];
  totalArea: number;
}

export interface ColorMapping {
  palletIndex: number;
  backgroundIndex?: number;
  contentColorSetIdx?: number;
  contentColorIdx?: number;
  borderColorIndices?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
}

export class ThemeError extends Error {
  constructor(message: string, public context: unknown) {
    super(message);
    this.name = "ThemeError";
  }
}

export interface BorderColors {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}
