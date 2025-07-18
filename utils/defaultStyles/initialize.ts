import { getAllTagStylesNonBlocking } from "./tags";

export async function initDefaultStyles(
  tags: string[],
  cb: (defaultStyles?: Record<string, Record<string, string>>) => void
) {
  const iframe = document.createElement("iframe");
  iframe.id = "yoink-iframe";
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  document.body.appendChild(iframe);

  await new Promise<void>((resolve) => {
    iframe.onload = () => resolve();
    // Some browsers may load instantly if src is empty
    if (iframe.contentDocument?.readyState === "complete") resolve();
  });

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
  }

  getAllTagStylesNonBlocking(tags, iframe, (defaultStyles) => {
    cb(defaultStyles);
  });
}
