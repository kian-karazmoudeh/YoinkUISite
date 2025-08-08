export type DeviceKey = "lg" | "md" | "sm";
export type DeviceName = "Desktop" | "Tablet" | "Mobile";

export interface Theme {
  pallet: Pallet[]; // different pallets -> Main, Primary, Accent, Secondary...
}

export interface Pallet {
  background: string[]; // color values
  text: string[]; // color values
}

export interface ThemeRef {
  palletIndex: number;
  backgroundIndex?: number;
  textIndex?: number;
}
