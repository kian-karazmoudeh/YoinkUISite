export const blocks = [
  {
    id: "container",
    label: "Container",
    category: "Layout",
    content: `
        <section data-gjs-type="container" style="padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;"></section>
      `,
  },
  {
    id: "grid-2-col",
    label: "Grid 2 Column",
    category: "Layout",
    content: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(0px, 1fr)); gap: 16px; padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;">
          	<section data-gjs-type="container" style="padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;"></section>
        	<section data-gjs-type="container" style="padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;"></section>
		</div>
      `,
  },
  {
    id: "grid-3-col",
    label: "Grid 3 Column",
    category: "Layout",
    content: `
        <div style="display: grid; grid-template-columns: repeat(3, minmax(0px, 1fr)); gap: 16px; padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;">
          	<section data-gjs-type="container" style="padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;"></section>
        	<section data-gjs-type="container" style="padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;"></section>
        	<section data-gjs-type="container" style="padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;"></section>
		</div>
      `,
  },
  {
    id: "flex-container",
    label: "Flex Container",
    category: "Layout",
    content: `
        <div data-gjs-type="container" style="display: flex; flex-direction: row; gap: 16px; padding-top: 16px; padding-right: 16px; padding-bottom: 16px; padding-left: 16px; box-sizing: border-box;"></div>
      `,
  },
  {
    id: "text",
    label: "Text",
    category: "Basic",
    content: `<div data-gjs-type="text" style="font-size: 16px; font-family: 'Times New Roman';">Insert your text here</div>`,
  },
  {
    id: "image",
    label: "Image",
    category: "Basic",
    content: `<img src="https://placehold.co/600x400" alt="Image" style="width: 600px; height: 400px; box-sizing: border-box;">`,
  },
  {
    id: "link",
    label: "Link",
    category: "Basic",
    content: `<a href="#">Insert a link here</a>`,
  },
  {
    id: "button",
    label: "Button",
    category: "Basic",
    content: `<button type="button">Click me</button>`,
  },
];
