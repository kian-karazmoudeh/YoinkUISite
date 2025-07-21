export function getRemSize() {
  if (typeof window === "undefined") return 16; // fallback for SSR
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
