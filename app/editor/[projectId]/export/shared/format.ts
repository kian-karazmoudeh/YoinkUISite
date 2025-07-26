import { html as beautify, type HTMLBeautifyOptions } from "js-beautify";

const formatterOptions: HTMLBeautifyOptions = {
  indent_size: 1,
  indent_char: "\t",
  max_preserve_newlines: 1,
  preserve_newlines: true,
  indent_scripts: "normal",
  end_with_newline: false,
  wrap_line_length: 80,
  indent_inner_html: false,
  indent_empty_lines: false,
  inline: [],
};

export function formatJsxString(htmlString: string) {
  let formatted = addExtraIndents(
    beautify(replace(htmlString), formatterOptions)
  );

  return `
export default function Component() {
  return (
  ${formatted}
  );
}
      `;
}

export function formatHTMLString(htmlString: string) {
  return beautify(htmlString, formatterOptions);
}

function addExtraIndents(str: string, indent = "\t") {
  return str
    .split("\n")
    .map((line) => indent + line) // 2 extra indents
    .join("\n");
}

function replace(htmlString: string) {
  htmlString = replaceClassAttrWithClassName(htmlString);
  htmlString = replaceSvgAttrWithProperFormat(htmlString);
  htmlString = replaceImgTagsWithProperFormat(htmlString);
  htmlString = replaceBrTagsWithProperFormat(htmlString);
  htmlString = replaceHrTagsWithProperFormat(htmlString);
  htmlString = replaceWbrTagsWithProperFormat(htmlString);
  htmlString = replaceInputTagsWithProperFormat(htmlString);
  htmlString = replaceColTagsWithProperFormat(htmlString);
  htmlString = replaceSourceTagsWithProperFormat(htmlString);

  return htmlString;
}

function replaceClassAttrWithClassName(htmlString: string) {
  return htmlString.replace(/class=/g, "className=");
}

function replaceSvgAttrWithProperFormat(htmlString: string) {
  htmlString = htmlString.replace(/fill-rule=/g, "fillRule=");
  htmlString = htmlString.replace(/clip-rule=/g, "clipRule=");
  htmlString = htmlString.replace(/stroke-width=/g, "strokeWidth=");
  htmlString = htmlString.replace(/stroke-linejoin=/g, "strokeLinejoin=");
  htmlString = htmlString.replace(/stroke-linecap=/g, "strokeLinecap=");

  return htmlString;
}

function replaceImgTagsWithProperFormat(htmlString: string) {
  return htmlString.replace(/<\s*img\b([^>]*?)>/g, (match, attrs) => {
    return match.endsWith("/>") ? match : `<img${attrs} />`;
  });
}

function replaceBrTagsWithProperFormat(htmlString: string) {
  return htmlString.replace(/<\s*br\b([^>]*?)>/g, (match, attrs) => {
    return match.endsWith("/>") ? match : `<br${attrs} />`;
  });
}

function replaceSourceTagsWithProperFormat(htmlString: string) {
  return htmlString.replace(/<\s*source\b([^>]*?)>/g, (match, attrs) => {
    return match.endsWith("/>") ? match : `<source${attrs} />`;
  });
}

function replaceHrTagsWithProperFormat(htmlString: string) {
  return htmlString.replace(/<\s*hr\b([^>]*?)>/g, (match, attrs) => {
    return match.endsWith("/>") ? match : `<hr${attrs} />`;
  });
}

function replaceInputTagsWithProperFormat(htmlString: string) {
  return htmlString.replace(/<\s*input\b([^>]*?)>/g, (match, attrs) => {
    return match.endsWith("/>") ? match : `<input${attrs} />`;
  });
}

function replaceWbrTagsWithProperFormat(htmlString: string) {
  return htmlString.replace(/<\s*wbr\b([^>]*?)>/g, (match, attrs) => {
    return match.endsWith("/>") ? match : `<wbr${attrs} />`;
  });
}

function replaceColTagsWithProperFormat(htmlString: string) {
  return htmlString.replace(/<\s*col\b([^>]*?)>/g, (match, attrs) => {
    return match.endsWith("/>") ? match : `<col${attrs} />`;
  });
}

export function downloadStringAsFile(
  content: string,
  filename: string,
  mimeType = "text/plain"
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url); // Clean up
}
