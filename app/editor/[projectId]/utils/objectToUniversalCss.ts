export function objectToUniversalCss(styleObj: Record<string, string>) {
  const rulesStr = Object.entries(styleObj)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(" ");
  return `*:not([data-gjs-type="wrapper"]):not(head):not(iframe):not(style):not(body):not(html) { ${rulesStr} }`;
}
