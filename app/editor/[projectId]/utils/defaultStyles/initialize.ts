import { defaultStyleVersion } from "./defaultStyleVersion";
import { getAllTagStylesNonBlocking } from "./tags";

export async function initDefaultStyles(
  tags: string[],
  cb: (defaultStyles?: Record<string, Record<string, string>>) => void,
  preflightStyles?: string
) {
  const iframe = document.createElement("iframe");
  let preflightStylesheet: HTMLStyleElement | null = null;
  iframe.id = "yoink-iframe";
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  document.body.appendChild(iframe);

  await new Promise<void>((resolve) => {
    iframe.onload = () => resolve();
    // Some browsers may load instantly if src is empty
    if (iframe.contentDocument?.readyState === "complete") resolve();
  });

  if (preflightStyles) {
    preflightStylesheet = document.createElement("style");
    preflightStylesheet.textContent = preflightStyles;
    document.head.appendChild(preflightStylesheet);
  }

  const doc = iframe.contentDocument || iframe.contentWindow!.document;
  if (doc) {
    if (!doc.body) {
      doc.body = doc.createElement("body");
      doc.documentElement.appendChild(doc.body);
    }
    if (!doc.head) {
      const head = doc.createElement("head");
      doc.documentElement.insertBefore(head, doc.body);
    }
    if (preflightStylesheet) {
      doc.head.appendChild(preflightStylesheet);
    }
  }

  getAllTagStylesNonBlocking(tags, iframe, (defaultStyles) => {
    localStorage.setItem("defaultStyleVersion", defaultStyleVersion.toString());
    cb(defaultStyles);
  });
}
