export type DeviceKey = "lg" | "md" | "sm";
export type DeviceName = "Desktop" | "Tablet" | "Mobile";

export type Theme = {
  background: string;
  // typography: Typography;
  priority: number;
};

export type Typography = {
  fontWeights: ThemeValue[];
  fontFamilies: ThemeValue[];
  fontSizes: ThemeValue[];
  fontColors: ThemeValue[];
};

export type ThemeValue = {
  priority: number;
  value: string;
};
