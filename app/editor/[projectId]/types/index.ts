export type DeviceKey = "lg" | "md" | "sm";
export type DeviceName = "Desktop" | "Tablet" | "Mobile";

export interface Theme {
  pallet: Pallet[]; // different pallets -> Main, Primary, Accent, Secondary...
}

export interface Pallet {
  background: ColorSet; // color values
  text: ColorSet[]; // color values
}

export type ColorSet = string[];

export interface ThemeRef {
  palletIndex?: number;
  backgroundIndex?: number;
  contentColorSetIdx?: number;
  contentColorIdx?: number;
  borderLeftColorPalletIndex?: number;
  borderLeftColorIndex?: number;
  borderRightColorPalletIndex?: number;
  borderRightColorIndex?: number;
  borderTopColorPalletIndex?: number;
  borderTopColorIndex?: number;
  borderBottomColorPalletIndex?: number;
  borderBottomColorIndex?: number;
}
