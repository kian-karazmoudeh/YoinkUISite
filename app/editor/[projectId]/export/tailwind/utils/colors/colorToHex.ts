// helper functions
function rgbaToHex(r: number, g: number, b: number, a = 1) {
  const toHex = (x: number) => x.toString(16).padStart(2, "0");

  const rHex = toHex(r);
  const gHex = toHex(g);
  const bHex = toHex(b);

  if (a === 1) {
    return `${rHex}${gHex}${bHex}`;
  }

  const aHex = toHex(Math.round(a * 255));
  return `${rHex}${gHex}${bHex}${aHex}`;
}

function oklabToHex(
  L: number,
  a: number,
  b: number,
  alpha: number = 1
): string {
  // 1. OKLab → Linear sRGB
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const rLinear = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // 2. Linear → sRGB with gamma correction
  function gammaCorrect(c: number) {
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  }

  const rSRGB = gammaCorrect(rLinear);
  const gSRGB = gammaCorrect(gLinear);
  const bSRGB = gammaCorrect(bLinear);

  // 3. Clamp and scale
  const toHex = (x: number) =>
    Math.round(Math.max(0, Math.min(1, x)) * 255)
      .toString(16)
      .padStart(2, "0");

  const rgbHex = `${toHex(rSRGB)}${toHex(gSRGB)}${toHex(bSRGB)}`;

  if (alpha === 1) {
    return rgbHex;
  }

  const aHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${rgbHex}${aHex}`;
}

function oklchToHex(L: number, C: number, H: number, a: number = 1): string {
  // 1. Convert OKLCH → OKLab
  const hRad = (H * Math.PI) / 180;
  const a_ = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // 2. OKLab → Linear sRGB
  const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a_ - 1.291485548 * b;

  const l = Math.pow(l_, 3);
  const m = Math.pow(m_, 3);
  const s = Math.pow(s_, 3);

  const rLinear = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // 3. Gamma correction (linear → sRGB)
  function gammaCorrect(c: number): number {
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  }

  const rSRGB = gammaCorrect(rLinear);
  const gSRGB = gammaCorrect(gLinear);
  const bSRGB = gammaCorrect(bLinear);

  // 4. Clamp and convert to hex
  function toHex(x: number): string {
    return Math.round(Math.max(0, Math.min(1, x)) * 255)
      .toString(16)
      .padStart(2, "0");
  }

  const rgbHex = `${toHex(rSRGB)}${toHex(gSRGB)}${toHex(bSRGB)}`;

  // Return 6-char hex if alpha is 1, otherwise append alpha channel
  if (a === 1) {
    return rgbHex;
  }

  const aHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");
  return `${rgbHex}${aHex}`;
}

// main function to convert a tailwind class [rgba(...)] to hex.
export function colorToHex(colorString: string): string {
  // Remove brackets and whitespace
  const cleaned = colorString.replace(/[\[\]]/g, "").trim();

  // Check if it's rgb format
  if (cleaned.startsWith("rgb(")) {
    const values = cleaned
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((v) => v.replace("_", "").trim());

    const [r, g, b] = values.map((v) => parseInt(v));

    return rgbaToHex(r, g, b);
  }

  // Check if it's rgba format
  if (cleaned.startsWith("rgba")) {
    const values = cleaned
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((v) => v.replace("_", "").trim());

    const [r, g, b, a] = values.map((v) => parseFloat(v));

    return rgbaToHex(r, g, b, a);
  }

  // Check if it's oklch format
  if (cleaned.startsWith("oklch")) {
    let alpha;
    const parts = cleaned.replace("oklch(", "").replace(")", "").split("/");
    const main = parts[0].split("_").map((v) => v.replace("_", "").trim());
    if (parts.length == 2) {
      alpha = parseFloat(parts[1].replace("_", ""));
    }

    // Note: This is a simplified conversion.
    // Real OKLCH to RGB conversion requires complex color space transformations
    const [l, c, h] = main.map((v) => parseFloat(v));

    return oklchToHex(l, c, h, alpha ? alpha : 1);
  }

  if (cleaned.startsWith("oklab")) {
    let alpha;
    const parts = cleaned.replace("oklab(", "").replace(")", "").split("/");
    const main = parts[0].split("_").map((v) => v.replace("_", "").trim());
    if (parts.length == 2) {
      alpha = parseFloat(parts[1].replace("_", ""));
    }
    const [l, a_, b_] = main.map((v) => parseFloat(v));
    return oklabToHex(l, a_, b_, alpha ? alpha : 1);
  }

  console.log(cleaned);

  throw new Error("Unsupported color format");
}

// console.log(colorToHex('[oklch(0.766626_0.135433_153.4)]'))

// Example usage:
// colorToHex('[rgb(255,_0,_0)]')        -> '#ff0000'
// colorToHex('[rgba(255,_0,_0,_1)]')    -> '#ff0000ff'
// colorToHex('[oklch(50% 0.5 120)]')    -> '#808080'
