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
  {
    id: "testtt",
    label: "Testtt",
    category: "Basic",
    content: {
      attributes: {
        style:
          'margin-top: 80px; margin-right: auto; margin-bottom: 80px; margin-left: auto; padding-top: 32px; padding-right: 32px; padding-bottom: 32px; padding-left: 32px; background-color: rgb(253, 253, 255); color: rgb(0, 0, 0); width: 600px; border-top-right-radius: 8px; border-top-left-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); box-shadow: rgba(0, 0, 0, 0.02) 2px 3px 7px 2px; font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;',
      },
      tagName: "div",
      components: [
        {
          type: "textnode",
          content: "\n    ",
        },
        {
          attributes: {
            style:
              'margin-top: 21.44px; margin-bottom: 21.44px; color: rgb(0, 0, 0); border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; font-weight: 700; font-size: 32px; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;',
          },
          tagName: "h1",
          components: [
            {
              type: "textnode",
              content: "Example Domain",
            },
          ],
        },
        {
          type: "textnode",
          content: "\n    ",
        },
        {
          attributes: {
            style:
              'margin-top: 16px; margin-bottom: 16px; color: rgb(0, 0, 0); border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;',
          },
          tagName: "p",
          components: [
            {
              type: "textnode",
              content:
                "This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.",
            },
          ],
        },
        {
          type: "textnode",
          content: "\n    ",
        },
        {
          attributes: {
            style:
              'margin-top: 16px; margin-bottom: 16px; color: rgb(0, 0, 0); border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;',
          },
          tagName: "p",
          components: [
            {
              attributes: {
                href: "https://www.iana.org/domains/example",
                style:
                  'color: rgb(56, 72, 143); border-top-width: 0px; border-top-color: rgb(56, 72, 143); border-right-width: 0px; border-right-color: rgb(56, 72, 143); border-bottom-width: 0px; border-bottom-color: rgb(56, 72, 143); border-left-width: 0px; border-left-color: rgb(56, 72, 143); display: inline; font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; cursor: pointer; outline-color: rgb(56, 72, 143); text-decoration-color: rgb(56, 72, 143); word-spacing: 0px;',
              },
              tagName: "a",
              components: [
                {
                  type: "textnode",
                  content: "More information...",
                },
              ],
            },
          ],
        },
        {
          type: "textnode",
          content: "\n",
        },
      ],
    },
  },
];
