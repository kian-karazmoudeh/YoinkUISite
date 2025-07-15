export const blocks = [
  {
    id: "section",
    label: "Section",
    category: "Basic",
    content: `
        <section class="section p-8 bg-gray-50">
          <h2 class="text-2xl font-bold mb-4">This is a section</h2>
          <p class="text-gray-600">This is a box</p>
        </section>
      `,
    media: `<div class="block-preview bg-gray-50 p-3 rounded border">
        <div class="bg-white p-2 rounded border">
          <div class="h-3 bg-gray-300 rounded mb-1"></div>
          <div class="h-2 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>`,
  },
  {
    id: "text",
    label: "Text",
    category: "Basic",
    content: `<div data-gjs-type="text" class="text-base">Insert your text here</div>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-2 bg-gray-300 rounded w-full"></div>
      </div>`,
  },
  {
    id: "image",
    label: "Image",
    category: "Basic",
    content: { type: "image" },
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-16 bg-gray-200 rounded flex items-center justify-center">
          <div class="text-gray-500 text-xs">IMG</div>
        </div>
      </div>`,
  },
  {
    id: "video",
    label: "Video",
    category: "Basic",
    content: { type: "video" },
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-16 bg-gray-200 rounded flex items-center justify-center">
          <div class="text-gray-500 text-xs">▶</div>
        </div>
      </div>`,
  },
  {
    id: "map",
    label: "Map",
    category: "Basic",
    content: `<div class="map h-80 bg-gray-200 flex items-center justify-center rounded-lg">Map placeholder</div>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-16 bg-gray-200 rounded flex items-center justify-center">
          <div class="text-gray-500 text-xs">🗺️</div>
        </div>
      </div>`,
  },
  {
    id: "quote",
    label: "Quote",
    category: "Basic",
    content: `<blockquote class="quote border-l-4 border-blue-500 pl-4 italic text-gray-700">Insert a quote here</blockquote>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="border-l-4 border-blue-500 pl-2">
          <div class="h-2 bg-gray-300 rounded w-full mb-1"></div>
          <div class="h-2 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>`,
  },
  {
    id: "link",
    label: "Link",
    category: "Basic",
    content: `<a href="#" class="link text-blue-600 hover:text-blue-800 underline">Insert a link here</a>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-2 bg-blue-500 rounded w-full underline"></div>
      </div>`,
  },
  {
    id: "button",
    label: "Button",
    category: "Basic",
    content: `<button class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click me</button>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-6 bg-blue-500 rounded w-20 mx-auto"></div>
      </div>`,
  },
  {
    id: "div",
    label: "Div",
    category: "Basic",
    content: `<div class="div p-4 border border-gray-300 rounded"></div>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-12 border border-gray-300 rounded"></div>
      </div>`,
  },
  {
    id: "heading",
    label: "Heading",
    category: "Basic",
    content: `<h1 data-yoink-sm='${JSON.stringify({
      "box-shadow": "rgba(0, 0, 0, 0.5) 10px 10px 10px 10px",
      "font-size": "24px",
      "font-weight": "bold",
      width: "auto",
    })}'>Insert a heading</h1>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-4 bg-gray-800 rounded w-full mb-1"></div>
      </div>`,
  },
  {
    id: "Example with inherits",
    label: "example with inherits",
    category: "Basic",
    content: `<div bis_skin_checked="1"
	data-yoink-sm="{&quot;margin-top&quot;:&quot;80px&quot;,&quot;margin-right&quot;:&quot;auto&quot;,&quot;margin-bottom&quot;:&quot;80px&quot;,&quot;margin-left&quot;:&quot;auto&quot;,&quot;scroll-margin-top&quot;:&quot;0px&quot;,&quot;scroll-margin-right&quot;:&quot;0px&quot;,&quot;scroll-margin-bottom&quot;:&quot;0px&quot;,&quot;scroll-margin-left&quot;:&quot;0px&quot;,&quot;padding-top&quot;:&quot;32px&quot;,&quot;padding-right&quot;:&quot;32px&quot;,&quot;padding-bottom&quot;:&quot;32px&quot;,&quot;padding-left&quot;:&quot;32px&quot;,&quot;scroll-padding-top&quot;:&quot;auto&quot;,&quot;scroll-padding-right&quot;:&quot;auto&quot;,&quot;scroll-padding-bottom&quot;:&quot;auto&quot;,&quot;scroll-padding-left&quot;:&quot;auto&quot;,&quot;color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;line-height&quot;:&quot;normal&quot;,&quot;letter-spacing&quot;:&quot;normal&quot;,&quot;width&quot;:&quot;600px&quot;,&quot;height&quot;:&quot;auto&quot;,&quot;min-width&quot;:&quot;auto&quot;,&quot;min-height&quot;:&quot;auto&quot;,&quot;max-width&quot;:&quot;none&quot;,&quot;max-height&quot;:&quot;none&quot;,&quot;border-top-right-radius&quot;:&quot;8px&quot;,&quot;border-top-left-radius&quot;:&quot;8px&quot;,&quot;border-bottom-right-radius&quot;:&quot;8px&quot;,&quot;border-bottom-left-radius&quot;:&quot;8px&quot;,&quot;border-bottom-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-bottom-width&quot;:&quot;0px&quot;,&quot;border-left-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-left-width&quot;:&quot;0px&quot;,&quot;border-top-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-top-width&quot;:&quot;0px&quot;,&quot;border-right-width&quot;:&quot;0px&quot;,&quot;border-right-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;transform&quot;:&quot;none&quot;,&quot;transform-style&quot;:&quot;flat&quot;,&quot;perspective&quot;:&quot;none&quot;,&quot;perspective-origin&quot;:&quot;50% 50%&quot;,&quot;aspect-ratio&quot;:&quot;auto&quot;,&quot;list-style-image&quot;:&quot;none&quot;,&quot;top&quot;:&quot;auto&quot;,&quot;right&quot;:&quot;auto&quot;,&quot;bottom&quot;:&quot;auto&quot;,&quot;left&quot;:&quot;auto&quot;,&quot;z-index&quot;:&quot;auto&quot;,&quot;columns&quot;:&quot;auto auto&quot;,&quot;row-gap&quot;:&quot;normal&quot;,&quot;column-gap&quot;:&quot;normal&quot;,&quot;grid-template-columns&quot;:&quot;none&quot;,&quot;grid-template-rows&quot;:&quot;none&quot;,&quot;font-size&quot;:&quot;16px&quot;,&quot;font-family&quot;:&quot;-apple-system, system-ui, BlinkMacSystemFont, \\\&quot;Segoe UI\\\&quot;, \\\&quot;Open Sans\\\&quot;, \\\&quot;Helvetica Neue\\\&quot;, Helvetica, Arial, sans-serif&quot;,&quot;background-color&quot;:&quot;rgb(253, 253, 255)&quot;,&quot;background-position&quot;:&quot;0% 0%&quot;,&quot;background-size&quot;:&quot;auto&quot;,&quot;background-image&quot;:&quot;none&quot;,&quot;box-shadow&quot;:&quot;rgba(0, 0, 0, 0.02) 2px 3px 7px 2px&quot;,&quot;opacity&quot;:&quot;1&quot;,&quot;text-indent&quot;:&quot;0px&quot;,&quot;text-shadow&quot;:&quot;none&quot;,&quot;flex-grow&quot;:&quot;0&quot;,&quot;flex-shrink&quot;:&quot;1&quot;,&quot;order&quot;:&quot;0&quot;,&quot;outline-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;outline-width&quot;:&quot;0px&quot;,&quot;outline-style&quot;:&quot;none&quot;,&quot;fill&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;stroke-width&quot;:&quot;1px&quot;,&quot;stroke&quot;:&quot;none&quot;,&quot;stroke-opacity&quot;:&quot;1&quot;,&quot;fill-opacity&quot;:&quot;1&quot;,&quot;mask-image&quot;:&quot;none&quot;,&quot;mask-size&quot;:&quot;auto&quot;,&quot;mask-position&quot;:&quot;0% 0%&quot;,&quot;object-position&quot;:&quot;50% 50%&quot;,&quot;display&quot;:&quot;block&quot;,&quot;isolation&quot;:&quot;auto&quot;,&quot;background-attachment&quot;:&quot;scroll&quot;,&quot;background-clip&quot;:&quot;border-box&quot;,&quot;background-origin&quot;:&quot;padding-box&quot;,&quot;background-repeat&quot;:&quot;repeat&quot;,&quot;mix-blend-mode&quot;:&quot;normal&quot;,&quot;background-blend-mode&quot;:&quot;normal&quot;,&quot;mask-clip&quot;:&quot;border-box&quot;,&quot;mask-composite&quot;:&quot;add&quot;,&quot;mask-mode&quot;:&quot;match-source&quot;,&quot;mask-origin&quot;:&quot;border-box&quot;,&quot;mask-repeat&quot;:&quot;repeat&quot;,&quot;mask-type&quot;:&quot;luminance&quot;,&quot;position&quot;:&quot;static&quot;,&quot;word-break&quot;:&quot;normal&quot;,&quot;text-wrap&quot;:&quot;wrap&quot;,&quot;font-weight&quot;:&quot;400&quot;,&quot;border-style&quot;:&quot;none&quot;,&quot;text-transform&quot;:&quot;none&quot;,&quot;white-space&quot;:&quot;normal&quot;,&quot;overflow&quot;:&quot;visible&quot;,&quot;overflow-x&quot;:&quot;visible&quot;,&quot;backface-visibility&quot;:&quot;visible&quot;,&quot;overflow-y&quot;:&quot;visible&quot;,&quot;scroll-behavior&quot;:&quot;auto&quot;,&quot;text-decoration-line&quot;:&quot;none&quot;,&quot;text-overflow&quot;:&quot;clip&quot;,&quot;text-decoration-style&quot;:&quot;solid&quot;,&quot;font-style&quot;:&quot;normal&quot;,&quot;vertical-align&quot;:&quot;baseline&quot;,&quot;flex-wrap&quot;:&quot;nowrap&quot;,&quot;flex-direction&quot;:&quot;row&quot;,&quot;justify-items&quot;:&quot;normal&quot;,&quot;justify-self&quot;:&quot;auto&quot;,&quot;align-content&quot;:&quot;normal&quot;,&quot;align-self&quot;:&quot;auto&quot;,&quot;break-before&quot;:&quot;auto&quot;,&quot;break-after&quot;:&quot;auto&quot;,&quot;break-inside&quot;:&quot;auto&quot;,&quot;box-decoration-break&quot;:&quot;slice&quot;,&quot;overscroll-behavior-x&quot;:&quot;auto&quot;,&quot;overscroll-behavior-y&quot;:&quot;auto&quot;,&quot;object-fit&quot;:&quot;fill&quot;,&quot;list-style-type&quot;:&quot;disc&quot;,&quot;list-style-position&quot;:&quot;outside&quot;,&quot;cursor&quot;:&quot;auto&quot;,&quot;float&quot;:&quot;none&quot;,&quot;clear&quot;:&quot;none&quot;,&quot;table-layout&quot;:&quot;auto&quot;,&quot;border-collapse&quot;:&quot;separate&quot;,&quot;visibility&quot;:&quot;visible&quot;,&quot;grid-auto-flow&quot;:&quot;row&quot;,&quot;grid-column-start&quot;:&quot;auto&quot;,&quot;grid-column-end&quot;:&quot;auto&quot;,&quot;grid-row-start&quot;:&quot;auto&quot;,&quot;grid-row-end&quot;:&quot;auto&quot;,&quot;translate&quot;:&quot;none&quot;,&quot;filter&quot;:&quot;none&quot;,&quot;clip-path&quot;:&quot;none&quot;,&quot;backdrop-filter&quot;:&quot;none&quot;}">
	<h1
		data-yoink-sm="{&quot;margin-top&quot;:&quot;21.44px&quot;,&quot;margin-right&quot;:&quot;0px&quot;,&quot;margin-bottom&quot;:&quot;21.44px&quot;,&quot;margin-left&quot;:&quot;0px&quot;,&quot;scroll-margin-top&quot;:&quot;0px&quot;,&quot;scroll-margin-right&quot;:&quot;0px&quot;,&quot;scroll-margin-bottom&quot;:&quot;0px&quot;,&quot;scroll-margin-left&quot;:&quot;0px&quot;,&quot;padding-top&quot;:&quot;0px&quot;,&quot;padding-right&quot;:&quot;0px&quot;,&quot;padding-bottom&quot;:&quot;0px&quot;,&quot;padding-left&quot;:&quot;0px&quot;,&quot;scroll-padding-top&quot;:&quot;auto&quot;,&quot;scroll-padding-right&quot;:&quot;auto&quot;,&quot;scroll-padding-bottom&quot;:&quot;auto&quot;,&quot;scroll-padding-left&quot;:&quot;auto&quot;,&quot;color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;line-height&quot;:&quot;normal&quot;,&quot;letter-spacing&quot;:&quot;normal&quot;,&quot;width&quot;:&quot;auto&quot;,&quot;height&quot;:&quot;auto&quot;,&quot;min-width&quot;:&quot;auto&quot;,&quot;min-height&quot;:&quot;auto&quot;,&quot;max-width&quot;:&quot;none&quot;,&quot;max-height&quot;:&quot;none&quot;,&quot;border-top-right-radius&quot;:&quot;0px&quot;,&quot;border-top-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-right-radius&quot;:&quot;0px&quot;,&quot;border-bottom-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-bottom-width&quot;:&quot;0px&quot;,&quot;border-left-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-left-width&quot;:&quot;0px&quot;,&quot;border-top-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-top-width&quot;:&quot;0px&quot;,&quot;border-right-width&quot;:&quot;0px&quot;,&quot;border-right-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;transform&quot;:&quot;none&quot;,&quot;transform-style&quot;:&quot;flat&quot;,&quot;perspective&quot;:&quot;none&quot;,&quot;perspective-origin&quot;:&quot;50% 50%&quot;,&quot;aspect-ratio&quot;:&quot;auto&quot;,&quot;list-style-image&quot;:&quot;none&quot;,&quot;top&quot;:&quot;auto&quot;,&quot;right&quot;:&quot;auto&quot;,&quot;bottom&quot;:&quot;auto&quot;,&quot;left&quot;:&quot;auto&quot;,&quot;z-index&quot;:&quot;auto&quot;,&quot;columns&quot;:&quot;auto auto&quot;,&quot;row-gap&quot;:&quot;normal&quot;,&quot;column-gap&quot;:&quot;normal&quot;,&quot;grid-template-columns&quot;:&quot;none&quot;,&quot;grid-template-rows&quot;:&quot;none&quot;,&quot;font-size&quot;:&quot;32px&quot;,&quot;font-family&quot;:&quot;-apple-system, system-ui, BlinkMacSystemFont, \\\&quot;Segoe UI\\\&quot;, \\\&quot;Open Sans\\\&quot;, \\\&quot;Helvetica Neue\\\&quot;, Helvetica, Arial, sans-serif&quot;,&quot;background-color&quot;:&quot;rgba(0, 0, 0, 0)&quot;,&quot;background-position&quot;:&quot;0% 0%&quot;,&quot;background-size&quot;:&quot;auto&quot;,&quot;background-image&quot;:&quot;none&quot;,&quot;box-shadow&quot;:&quot;none&quot;,&quot;opacity&quot;:&quot;1&quot;,&quot;text-indent&quot;:&quot;0px&quot;,&quot;text-shadow&quot;:&quot;none&quot;,&quot;flex-grow&quot;:&quot;0&quot;,&quot;flex-shrink&quot;:&quot;1&quot;,&quot;order&quot;:&quot;0&quot;,&quot;outline-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;outline-width&quot;:&quot;0px&quot;,&quot;outline-style&quot;:&quot;none&quot;,&quot;fill&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;stroke-width&quot;:&quot;1px&quot;,&quot;stroke&quot;:&quot;none&quot;,&quot;stroke-opacity&quot;:&quot;1&quot;,&quot;fill-opacity&quot;:&quot;1&quot;,&quot;mask-image&quot;:&quot;none&quot;,&quot;mask-size&quot;:&quot;auto&quot;,&quot;mask-position&quot;:&quot;0% 0%&quot;,&quot;object-position&quot;:&quot;50% 50%&quot;,&quot;display&quot;:&quot;block&quot;,&quot;isolation&quot;:&quot;auto&quot;,&quot;background-attachment&quot;:&quot;scroll&quot;,&quot;background-clip&quot;:&quot;border-box&quot;,&quot;background-origin&quot;:&quot;padding-box&quot;,&quot;background-repeat&quot;:&quot;repeat&quot;,&quot;mix-blend-mode&quot;:&quot;normal&quot;,&quot;background-blend-mode&quot;:&quot;normal&quot;,&quot;mask-clip&quot;:&quot;border-box&quot;,&quot;mask-composite&quot;:&quot;add&quot;,&quot;mask-mode&quot;:&quot;match-source&quot;,&quot;mask-origin&quot;:&quot;border-box&quot;,&quot;mask-repeat&quot;:&quot;repeat&quot;,&quot;mask-type&quot;:&quot;luminance&quot;,&quot;position&quot;:&quot;static&quot;,&quot;word-break&quot;:&quot;normal&quot;,&quot;text-wrap&quot;:&quot;wrap&quot;,&quot;font-weight&quot;:&quot;700&quot;,&quot;border-style&quot;:&quot;none&quot;,&quot;text-transform&quot;:&quot;none&quot;,&quot;white-space&quot;:&quot;normal&quot;,&quot;overflow&quot;:&quot;visible&quot;,&quot;overflow-x&quot;:&quot;visible&quot;,&quot;backface-visibility&quot;:&quot;visible&quot;,&quot;overflow-y&quot;:&quot;visible&quot;,&quot;scroll-behavior&quot;:&quot;auto&quot;,&quot;text-decoration-line&quot;:&quot;none&quot;,&quot;text-overflow&quot;:&quot;clip&quot;,&quot;text-decoration-style&quot;:&quot;solid&quot;,&quot;font-style&quot;:&quot;normal&quot;,&quot;vertical-align&quot;:&quot;baseline&quot;,&quot;flex-wrap&quot;:&quot;nowrap&quot;,&quot;flex-direction&quot;:&quot;row&quot;,&quot;justify-items&quot;:&quot;normal&quot;,&quot;justify-self&quot;:&quot;auto&quot;,&quot;align-content&quot;:&quot;normal&quot;,&quot;align-self&quot;:&quot;auto&quot;,&quot;break-before&quot;:&quot;auto&quot;,&quot;break-after&quot;:&quot;auto&quot;,&quot;break-inside&quot;:&quot;auto&quot;,&quot;box-decoration-break&quot;:&quot;slice&quot;,&quot;overscroll-behavior-x&quot;:&quot;auto&quot;,&quot;overscroll-behavior-y&quot;:&quot;auto&quot;,&quot;object-fit&quot;:&quot;fill&quot;,&quot;list-style-type&quot;:&quot;disc&quot;,&quot;list-style-position&quot;:&quot;outside&quot;,&quot;cursor&quot;:&quot;auto&quot;,&quot;float&quot;:&quot;none&quot;,&quot;clear&quot;:&quot;none&quot;,&quot;table-layout&quot;:&quot;auto&quot;,&quot;border-collapse&quot;:&quot;separate&quot;,&quot;visibility&quot;:&quot;visible&quot;,&quot;grid-auto-flow&quot;:&quot;row&quot;,&quot;grid-column-start&quot;:&quot;auto&quot;,&quot;grid-column-end&quot;:&quot;auto&quot;,&quot;grid-row-start&quot;:&quot;auto&quot;,&quot;grid-row-end&quot;:&quot;auto&quot;,&quot;translate&quot;:&quot;none&quot;,&quot;filter&quot;:&quot;none&quot;,&quot;clip-path&quot;:&quot;none&quot;,&quot;backdrop-filter&quot;:&quot;none&quot;}">
		Example Domain</h1>
	<p
		data-yoink-sm="{&quot;margin-top&quot;:&quot;16px&quot;,&quot;margin-right&quot;:&quot;0px&quot;,&quot;margin-bottom&quot;:&quot;16px&quot;,&quot;margin-left&quot;:&quot;0px&quot;,&quot;scroll-margin-top&quot;:&quot;0px&quot;,&quot;scroll-margin-right&quot;:&quot;0px&quot;,&quot;scroll-margin-bottom&quot;:&quot;0px&quot;,&quot;scroll-margin-left&quot;:&quot;0px&quot;,&quot;padding-top&quot;:&quot;0px&quot;,&quot;padding-right&quot;:&quot;0px&quot;,&quot;padding-bottom&quot;:&quot;0px&quot;,&quot;padding-left&quot;:&quot;0px&quot;,&quot;scroll-padding-top&quot;:&quot;auto&quot;,&quot;scroll-padding-right&quot;:&quot;auto&quot;,&quot;scroll-padding-bottom&quot;:&quot;auto&quot;,&quot;scroll-padding-left&quot;:&quot;auto&quot;,&quot;color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;line-height&quot;:&quot;normal&quot;,&quot;letter-spacing&quot;:&quot;normal&quot;,&quot;width&quot;:&quot;auto&quot;,&quot;height&quot;:&quot;auto&quot;,&quot;min-width&quot;:&quot;auto&quot;,&quot;min-height&quot;:&quot;auto&quot;,&quot;max-width&quot;:&quot;none&quot;,&quot;max-height&quot;:&quot;none&quot;,&quot;border-top-right-radius&quot;:&quot;0px&quot;,&quot;border-top-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-right-radius&quot;:&quot;0px&quot;,&quot;border-bottom-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-bottom-width&quot;:&quot;0px&quot;,&quot;border-left-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-left-width&quot;:&quot;0px&quot;,&quot;border-top-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-top-width&quot;:&quot;0px&quot;,&quot;border-right-width&quot;:&quot;0px&quot;,&quot;border-right-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;transform&quot;:&quot;none&quot;,&quot;transform-style&quot;:&quot;flat&quot;,&quot;perspective&quot;:&quot;none&quot;,&quot;perspective-origin&quot;:&quot;50% 50%&quot;,&quot;aspect-ratio&quot;:&quot;auto&quot;,&quot;list-style-image&quot;:&quot;none&quot;,&quot;top&quot;:&quot;auto&quot;,&quot;right&quot;:&quot;auto&quot;,&quot;bottom&quot;:&quot;auto&quot;,&quot;left&quot;:&quot;auto&quot;,&quot;z-index&quot;:&quot;auto&quot;,&quot;columns&quot;:&quot;auto auto&quot;,&quot;row-gap&quot;:&quot;normal&quot;,&quot;column-gap&quot;:&quot;normal&quot;,&quot;grid-template-columns&quot;:&quot;none&quot;,&quot;grid-template-rows&quot;:&quot;none&quot;,&quot;font-size&quot;:&quot;16px&quot;,&quot;font-family&quot;:&quot;-apple-system, system-ui, BlinkMacSystemFont, \\\&quot;Segoe UI\\\&quot;, \\\&quot;Open Sans\\\&quot;, \\\&quot;Helvetica Neue\\\&quot;, Helvetica, Arial, sans-serif&quot;,&quot;background-color&quot;:&quot;rgba(0, 0, 0, 0)&quot;,&quot;background-position&quot;:&quot;0% 0%&quot;,&quot;background-size&quot;:&quot;auto&quot;,&quot;background-image&quot;:&quot;none&quot;,&quot;box-shadow&quot;:&quot;none&quot;,&quot;opacity&quot;:&quot;1&quot;,&quot;text-indent&quot;:&quot;0px&quot;,&quot;text-shadow&quot;:&quot;none&quot;,&quot;flex-grow&quot;:&quot;0&quot;,&quot;flex-shrink&quot;:&quot;1&quot;,&quot;order&quot;:&quot;0&quot;,&quot;outline-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;outline-width&quot;:&quot;0px&quot;,&quot;outline-style&quot;:&quot;none&quot;,&quot;fill&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;stroke-width&quot;:&quot;1px&quot;,&quot;stroke&quot;:&quot;none&quot;,&quot;stroke-opacity&quot;:&quot;1&quot;,&quot;fill-opacity&quot;:&quot;1&quot;,&quot;mask-image&quot;:&quot;none&quot;,&quot;mask-size&quot;:&quot;auto&quot;,&quot;mask-position&quot;:&quot;0% 0%&quot;,&quot;object-position&quot;:&quot;50% 50%&quot;,&quot;display&quot;:&quot;block&quot;,&quot;isolation&quot;:&quot;auto&quot;,&quot;background-attachment&quot;:&quot;scroll&quot;,&quot;background-clip&quot;:&quot;border-box&quot;,&quot;background-origin&quot;:&quot;padding-box&quot;,&quot;background-repeat&quot;:&quot;repeat&quot;,&quot;mix-blend-mode&quot;:&quot;normal&quot;,&quot;background-blend-mode&quot;:&quot;normal&quot;,&quot;mask-clip&quot;:&quot;border-box&quot;,&quot;mask-composite&quot;:&quot;add&quot;,&quot;mask-mode&quot;:&quot;match-source&quot;,&quot;mask-origin&quot;:&quot;border-box&quot;,&quot;mask-repeat&quot;:&quot;repeat&quot;,&quot;mask-type&quot;:&quot;luminance&quot;,&quot;position&quot;:&quot;static&quot;,&quot;word-break&quot;:&quot;normal&quot;,&quot;text-wrap&quot;:&quot;wrap&quot;,&quot;font-weight&quot;:&quot;400&quot;,&quot;border-style&quot;:&quot;none&quot;,&quot;text-transform&quot;:&quot;none&quot;,&quot;white-space&quot;:&quot;normal&quot;,&quot;overflow&quot;:&quot;visible&quot;,&quot;overflow-x&quot;:&quot;visible&quot;,&quot;backface-visibility&quot;:&quot;visible&quot;,&quot;overflow-y&quot;:&quot;visible&quot;,&quot;scroll-behavior&quot;:&quot;auto&quot;,&quot;text-decoration-line&quot;:&quot;none&quot;,&quot;text-overflow&quot;:&quot;clip&quot;,&quot;text-decoration-style&quot;:&quot;solid&quot;,&quot;font-style&quot;:&quot;normal&quot;,&quot;vertical-align&quot;:&quot;baseline&quot;,&quot;flex-wrap&quot;:&quot;nowrap&quot;,&quot;flex-direction&quot;:&quot;row&quot;,&quot;justify-items&quot;:&quot;normal&quot;,&quot;justify-self&quot;:&quot;auto&quot;,&quot;align-content&quot;:&quot;normal&quot;,&quot;align-self&quot;:&quot;auto&quot;,&quot;break-before&quot;:&quot;auto&quot;,&quot;break-after&quot;:&quot;auto&quot;,&quot;break-inside&quot;:&quot;auto&quot;,&quot;box-decoration-break&quot;:&quot;slice&quot;,&quot;overscroll-behavior-x&quot;:&quot;auto&quot;,&quot;overscroll-behavior-y&quot;:&quot;auto&quot;,&quot;object-fit&quot;:&quot;fill&quot;,&quot;list-style-type&quot;:&quot;disc&quot;,&quot;list-style-position&quot;:&quot;outside&quot;,&quot;cursor&quot;:&quot;auto&quot;,&quot;float&quot;:&quot;none&quot;,&quot;clear&quot;:&quot;none&quot;,&quot;table-layout&quot;:&quot;auto&quot;,&quot;border-collapse&quot;:&quot;separate&quot;,&quot;visibility&quot;:&quot;visible&quot;,&quot;grid-auto-flow&quot;:&quot;row&quot;,&quot;grid-column-start&quot;:&quot;auto&quot;,&quot;grid-column-end&quot;:&quot;auto&quot;,&quot;grid-row-start&quot;:&quot;auto&quot;,&quot;grid-row-end&quot;:&quot;auto&quot;,&quot;translate&quot;:&quot;none&quot;,&quot;filter&quot;:&quot;none&quot;,&quot;clip-path&quot;:&quot;none&quot;,&quot;backdrop-filter&quot;:&quot;none&quot;}">
		This domain is for use in illustrative examples in documents. You may
		use this
		domain in literature without prior coordination or asking for
		permission.</p>
	<p
		data-yoink-sm="{&quot;margin-top&quot;:&quot;16px&quot;,&quot;margin-right&quot;:&quot;0px&quot;,&quot;margin-bottom&quot;:&quot;16px&quot;,&quot;margin-left&quot;:&quot;0px&quot;,&quot;scroll-margin-top&quot;:&quot;0px&quot;,&quot;scroll-margin-right&quot;:&quot;0px&quot;,&quot;scroll-margin-bottom&quot;:&quot;0px&quot;,&quot;scroll-margin-left&quot;:&quot;0px&quot;,&quot;padding-top&quot;:&quot;0px&quot;,&quot;padding-right&quot;:&quot;0px&quot;,&quot;padding-bottom&quot;:&quot;0px&quot;,&quot;padding-left&quot;:&quot;0px&quot;,&quot;scroll-padding-top&quot;:&quot;auto&quot;,&quot;scroll-padding-right&quot;:&quot;auto&quot;,&quot;scroll-padding-bottom&quot;:&quot;auto&quot;,&quot;scroll-padding-left&quot;:&quot;auto&quot;,&quot;color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;line-height&quot;:&quot;normal&quot;,&quot;letter-spacing&quot;:&quot;normal&quot;,&quot;width&quot;:&quot;auto&quot;,&quot;height&quot;:&quot;auto&quot;,&quot;min-width&quot;:&quot;auto&quot;,&quot;min-height&quot;:&quot;auto&quot;,&quot;max-width&quot;:&quot;none&quot;,&quot;max-height&quot;:&quot;none&quot;,&quot;border-top-right-radius&quot;:&quot;0px&quot;,&quot;border-top-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-right-radius&quot;:&quot;0px&quot;,&quot;border-bottom-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-bottom-width&quot;:&quot;0px&quot;,&quot;border-left-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-left-width&quot;:&quot;0px&quot;,&quot;border-top-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;border-top-width&quot;:&quot;0px&quot;,&quot;border-right-width&quot;:&quot;0px&quot;,&quot;border-right-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;transform&quot;:&quot;none&quot;,&quot;transform-style&quot;:&quot;flat&quot;,&quot;perspective&quot;:&quot;none&quot;,&quot;perspective-origin&quot;:&quot;50% 50%&quot;,&quot;aspect-ratio&quot;:&quot;auto&quot;,&quot;list-style-image&quot;:&quot;none&quot;,&quot;top&quot;:&quot;auto&quot;,&quot;right&quot;:&quot;auto&quot;,&quot;bottom&quot;:&quot;auto&quot;,&quot;left&quot;:&quot;auto&quot;,&quot;z-index&quot;:&quot;auto&quot;,&quot;columns&quot;:&quot;auto auto&quot;,&quot;row-gap&quot;:&quot;normal&quot;,&quot;column-gap&quot;:&quot;normal&quot;,&quot;grid-template-columns&quot;:&quot;none&quot;,&quot;grid-template-rows&quot;:&quot;none&quot;,&quot;font-size&quot;:&quot;16px&quot;,&quot;font-family&quot;:&quot;-apple-system, system-ui, BlinkMacSystemFont, \\\&quot;Segoe UI\\\&quot;, \\\&quot;Open Sans\\\&quot;, \\\&quot;Helvetica Neue\\\&quot;, Helvetica, Arial, sans-serif&quot;,&quot;background-color&quot;:&quot;rgba(0, 0, 0, 0)&quot;,&quot;background-position&quot;:&quot;0% 0%&quot;,&quot;background-size&quot;:&quot;auto&quot;,&quot;background-image&quot;:&quot;none&quot;,&quot;box-shadow&quot;:&quot;none&quot;,&quot;opacity&quot;:&quot;1&quot;,&quot;text-indent&quot;:&quot;0px&quot;,&quot;text-shadow&quot;:&quot;none&quot;,&quot;flex-grow&quot;:&quot;0&quot;,&quot;flex-shrink&quot;:&quot;1&quot;,&quot;order&quot;:&quot;0&quot;,&quot;outline-color&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;outline-width&quot;:&quot;0px&quot;,&quot;outline-style&quot;:&quot;none&quot;,&quot;fill&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;stroke-width&quot;:&quot;1px&quot;,&quot;stroke&quot;:&quot;none&quot;,&quot;stroke-opacity&quot;:&quot;1&quot;,&quot;fill-opacity&quot;:&quot;1&quot;,&quot;mask-image&quot;:&quot;none&quot;,&quot;mask-size&quot;:&quot;auto&quot;,&quot;mask-position&quot;:&quot;0% 0%&quot;,&quot;object-position&quot;:&quot;50% 50%&quot;,&quot;display&quot;:&quot;block&quot;,&quot;isolation&quot;:&quot;auto&quot;,&quot;background-attachment&quot;:&quot;scroll&quot;,&quot;background-clip&quot;:&quot;border-box&quot;,&quot;background-origin&quot;:&quot;padding-box&quot;,&quot;background-repeat&quot;:&quot;repeat&quot;,&quot;mix-blend-mode&quot;:&quot;normal&quot;,&quot;background-blend-mode&quot;:&quot;normal&quot;,&quot;mask-clip&quot;:&quot;border-box&quot;,&quot;mask-composite&quot;:&quot;add&quot;,&quot;mask-mode&quot;:&quot;match-source&quot;,&quot;mask-origin&quot;:&quot;border-box&quot;,&quot;mask-repeat&quot;:&quot;repeat&quot;,&quot;mask-type&quot;:&quot;luminance&quot;,&quot;position&quot;:&quot;static&quot;,&quot;word-break&quot;:&quot;normal&quot;,&quot;text-wrap&quot;:&quot;wrap&quot;,&quot;font-weight&quot;:&quot;400&quot;,&quot;border-style&quot;:&quot;none&quot;,&quot;text-transform&quot;:&quot;none&quot;,&quot;white-space&quot;:&quot;normal&quot;,&quot;overflow&quot;:&quot;visible&quot;,&quot;overflow-x&quot;:&quot;visible&quot;,&quot;backface-visibility&quot;:&quot;visible&quot;,&quot;overflow-y&quot;:&quot;visible&quot;,&quot;scroll-behavior&quot;:&quot;auto&quot;,&quot;text-decoration-line&quot;:&quot;none&quot;,&quot;text-overflow&quot;:&quot;clip&quot;,&quot;text-decoration-style&quot;:&quot;solid&quot;,&quot;font-style&quot;:&quot;normal&quot;,&quot;vertical-align&quot;:&quot;baseline&quot;,&quot;flex-wrap&quot;:&quot;nowrap&quot;,&quot;flex-direction&quot;:&quot;row&quot;,&quot;justify-items&quot;:&quot;normal&quot;,&quot;justify-self&quot;:&quot;auto&quot;,&quot;align-content&quot;:&quot;normal&quot;,&quot;align-self&quot;:&quot;auto&quot;,&quot;break-before&quot;:&quot;auto&quot;,&quot;break-after&quot;:&quot;auto&quot;,&quot;break-inside&quot;:&quot;auto&quot;,&quot;box-decoration-break&quot;:&quot;slice&quot;,&quot;overscroll-behavior-x&quot;:&quot;auto&quot;,&quot;overscroll-behavior-y&quot;:&quot;auto&quot;,&quot;object-fit&quot;:&quot;fill&quot;,&quot;list-style-type&quot;:&quot;disc&quot;,&quot;list-style-position&quot;:&quot;outside&quot;,&quot;cursor&quot;:&quot;auto&quot;,&quot;float&quot;:&quot;none&quot;,&quot;clear&quot;:&quot;none&quot;,&quot;table-layout&quot;:&quot;auto&quot;,&quot;border-collapse&quot;:&quot;separate&quot;,&quot;visibility&quot;:&quot;visible&quot;,&quot;grid-auto-flow&quot;:&quot;row&quot;,&quot;grid-column-start&quot;:&quot;auto&quot;,&quot;grid-column-end&quot;:&quot;auto&quot;,&quot;grid-row-start&quot;:&quot;auto&quot;,&quot;grid-row-end&quot;:&quot;auto&quot;,&quot;translate&quot;:&quot;none&quot;,&quot;filter&quot;:&quot;none&quot;,&quot;clip-path&quot;:&quot;none&quot;,&quot;backdrop-filter&quot;:&quot;none&quot;}">
		<a href="https://www.iana.org/domains/example"
			data-yoink-sm="{&quot;margin-top&quot;:&quot;0px&quot;,&quot;margin-right&quot;:&quot;0px&quot;,&quot;margin-bottom&quot;:&quot;0px&quot;,&quot;margin-left&quot;:&quot;0px&quot;,&quot;scroll-margin-top&quot;:&quot;0px&quot;,&quot;scroll-margin-right&quot;:&quot;0px&quot;,&quot;scroll-margin-bottom&quot;:&quot;0px&quot;,&quot;scroll-margin-left&quot;:&quot;0px&quot;,&quot;padding-top&quot;:&quot;0px&quot;,&quot;padding-right&quot;:&quot;0px&quot;,&quot;padding-bottom&quot;:&quot;0px&quot;,&quot;padding-left&quot;:&quot;0px&quot;,&quot;scroll-padding-top&quot;:&quot;auto&quot;,&quot;scroll-padding-right&quot;:&quot;auto&quot;,&quot;scroll-padding-bottom&quot;:&quot;auto&quot;,&quot;scroll-padding-left&quot;:&quot;auto&quot;,&quot;color&quot;:&quot;rgb(56, 72, 143)&quot;,&quot;line-height&quot;:&quot;normal&quot;,&quot;letter-spacing&quot;:&quot;normal&quot;,&quot;width&quot;:&quot;auto&quot;,&quot;height&quot;:&quot;auto&quot;,&quot;min-width&quot;:&quot;auto&quot;,&quot;min-height&quot;:&quot;auto&quot;,&quot;max-width&quot;:&quot;none&quot;,&quot;max-height&quot;:&quot;none&quot;,&quot;border-top-right-radius&quot;:&quot;0px&quot;,&quot;border-top-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-right-radius&quot;:&quot;0px&quot;,&quot;border-bottom-left-radius&quot;:&quot;0px&quot;,&quot;border-bottom-color&quot;:&quot;rgb(56, 72, 143)&quot;,&quot;border-bottom-width&quot;:&quot;0px&quot;,&quot;border-left-color&quot;:&quot;rgb(56, 72, 143)&quot;,&quot;border-left-width&quot;:&quot;0px&quot;,&quot;border-top-color&quot;:&quot;rgb(56, 72, 143)&quot;,&quot;border-top-width&quot;:&quot;0px&quot;,&quot;border-right-width&quot;:&quot;0px&quot;,&quot;border-right-color&quot;:&quot;rgb(56, 72, 143)&quot;,&quot;transform&quot;:&quot;none&quot;,&quot;transform-style&quot;:&quot;flat&quot;,&quot;perspective&quot;:&quot;none&quot;,&quot;perspective-origin&quot;:&quot;50% 50%&quot;,&quot;aspect-ratio&quot;:&quot;auto&quot;,&quot;list-style-image&quot;:&quot;none&quot;,&quot;top&quot;:&quot;auto&quot;,&quot;right&quot;:&quot;auto&quot;,&quot;bottom&quot;:&quot;auto&quot;,&quot;left&quot;:&quot;auto&quot;,&quot;z-index&quot;:&quot;auto&quot;,&quot;columns&quot;:&quot;auto auto&quot;,&quot;row-gap&quot;:&quot;normal&quot;,&quot;column-gap&quot;:&quot;normal&quot;,&quot;grid-template-columns&quot;:&quot;none&quot;,&quot;grid-template-rows&quot;:&quot;none&quot;,&quot;font-size&quot;:&quot;16px&quot;,&quot;font-family&quot;:&quot;-apple-system, system-ui, BlinkMacSystemFont, \\\&quot;Segoe UI\\\&quot;, \\\&quot;Open Sans\\\&quot;, \\\&quot;Helvetica Neue\\\&quot;, Helvetica, Arial, sans-serif&quot;,&quot;background-color&quot;:&quot;rgba(0, 0, 0, 0)&quot;,&quot;background-position&quot;:&quot;0% 0%&quot;,&quot;background-size&quot;:&quot;auto&quot;,&quot;background-image&quot;:&quot;none&quot;,&quot;box-shadow&quot;:&quot;none&quot;,&quot;opacity&quot;:&quot;1&quot;,&quot;text-indent&quot;:&quot;0px&quot;,&quot;text-shadow&quot;:&quot;none&quot;,&quot;flex-grow&quot;:&quot;0&quot;,&quot;flex-shrink&quot;:&quot;1&quot;,&quot;order&quot;:&quot;0&quot;,&quot;outline-color&quot;:&quot;rgb(56, 72, 143)&quot;,&quot;outline-width&quot;:&quot;0px&quot;,&quot;outline-style&quot;:&quot;none&quot;,&quot;fill&quot;:&quot;rgb(0, 0, 0)&quot;,&quot;stroke-width&quot;:&quot;1px&quot;,&quot;stroke&quot;:&quot;none&quot;,&quot;stroke-opacity&quot;:&quot;1&quot;,&quot;fill-opacity&quot;:&quot;1&quot;,&quot;mask-image&quot;:&quot;none&quot;,&quot;mask-size&quot;:&quot;auto&quot;,&quot;mask-position&quot;:&quot;0% 0%&quot;,&quot;object-position&quot;:&quot;50% 50%&quot;,&quot;display&quot;:&quot;inline&quot;,&quot;isolation&quot;:&quot;auto&quot;,&quot;background-attachment&quot;:&quot;scroll&quot;,&quot;background-clip&quot;:&quot;border-box&quot;,&quot;background-origin&quot;:&quot;padding-box&quot;,&quot;background-repeat&quot;:&quot;repeat&quot;,&quot;mix-blend-mode&quot;:&quot;normal&quot;,&quot;background-blend-mode&quot;:&quot;normal&quot;,&quot;mask-clip&quot;:&quot;border-box&quot;,&quot;mask-composite&quot;:&quot;add&quot;,&quot;mask-mode&quot;:&quot;match-source&quot;,&quot;mask-origin&quot;:&quot;border-box&quot;,&quot;mask-repeat&quot;:&quot;repeat&quot;,&quot;mask-type&quot;:&quot;luminance&quot;,&quot;position&quot;:&quot;static&quot;,&quot;word-break&quot;:&quot;normal&quot;,&quot;text-wrap&quot;:&quot;wrap&quot;,&quot;font-weight&quot;:&quot;400&quot;,&quot;border-style&quot;:&quot;none&quot;,&quot;text-transform&quot;:&quot;none&quot;,&quot;white-space&quot;:&quot;normal&quot;,&quot;overflow&quot;:&quot;visible&quot;,&quot;overflow-x&quot;:&quot;visible&quot;,&quot;backface-visibility&quot;:&quot;visible&quot;,&quot;overflow-y&quot;:&quot;visible&quot;,&quot;scroll-behavior&quot;:&quot;auto&quot;,&quot;text-decoration-line&quot;:&quot;none&quot;,&quot;text-overflow&quot;:&quot;clip&quot;,&quot;text-decoration-style&quot;:&quot;solid&quot;,&quot;font-style&quot;:&quot;normal&quot;,&quot;vertical-align&quot;:&quot;baseline&quot;,&quot;flex-wrap&quot;:&quot;nowrap&quot;,&quot;flex-direction&quot;:&quot;row&quot;,&quot;justify-items&quot;:&quot;normal&quot;,&quot;justify-self&quot;:&quot;auto&quot;,&quot;align-content&quot;:&quot;normal&quot;,&quot;align-self&quot;:&quot;auto&quot;,&quot;break-before&quot;:&quot;auto&quot;,&quot;break-after&quot;:&quot;auto&quot;,&quot;break-inside&quot;:&quot;auto&quot;,&quot;box-decoration-break&quot;:&quot;slice&quot;,&quot;overscroll-behavior-x&quot;:&quot;auto&quot;,&quot;overscroll-behavior-y&quot;:&quot;auto&quot;,&quot;object-fit&quot;:&quot;fill&quot;,&quot;list-style-type&quot;:&quot;disc&quot;,&quot;list-style-position&quot;:&quot;outside&quot;,&quot;cursor&quot;:&quot;pointer&quot;,&quot;float&quot;:&quot;none&quot;,&quot;clear&quot;:&quot;none&quot;,&quot;table-layout&quot;:&quot;auto&quot;,&quot;border-collapse&quot;:&quot;separate&quot;,&quot;visibility&quot;:&quot;visible&quot;,&quot;grid-auto-flow&quot;:&quot;row&quot;,&quot;grid-column-start&quot;:&quot;auto&quot;,&quot;grid-column-end&quot;:&quot;auto&quot;,&quot;grid-row-start&quot;:&quot;auto&quot;,&quot;grid-row-end&quot;:&quot;auto&quot;,&quot;translate&quot;:&quot;none&quot;,&quot;filter&quot;:&quot;none&quot;,&quot;clip-path&quot;:&quot;none&quot;,&quot;backdrop-filter&quot;:&quot;none&quot;}">
			More information...</a>
	</p>
</div>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-4 bg-gray-800 rounded w-full mb-1"></div>
      </div>`,
  },
  {
    id: "paragraph",
    label: "Paragraph",
    category: "Basic",
    content: `<p class="paragraph text-base text-gray-700 leading-relaxed">Insert a paragraph</p>`,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-2 bg-gray-300 rounded w-full mb-1"></div>
        <div class="h-2 bg-gray-200 rounded w-5/6"></div>
      </div>`,
  },
  {
    id: "card",
    label: "Card",
    category: "Components",
    content: `
        <div class="card bg-white border border-gray-200 rounded-lg p-6 m-4 shadow-md">
          <h3 class="text-xl font-semibold mb-3 text-gray-900">Card Title</h3>
          <p class="text-gray-600 mb-4">This is a card component with some content.</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">Action</button>
        </div>
      `,
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="bg-white border border-gray-200 rounded p-2 shadow-sm">
          <div class="h-3 bg-gray-800 rounded mb-2"></div>
          <div class="h-2 bg-gray-300 rounded w-full mb-2"></div>
          <div class="h-4 bg-blue-500 rounded w-16"></div>
        </div>
      </div>`,
  },
  {
    id: "hero",
    label: "Hero Section",
    category: "Components",
    content: `
        <div class="hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-8 text-center">
          <h1 class="text-5xl font-bold mb-6">Welcome to Our Site</h1>
          <p class="text-xl mb-8 opacity-90">This is a hero section with a call to action</p>
          <button class="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">Get Started</button>
        </div>
      `,
    media: `<div class="block-preview bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded border">
        <div class="h-3 bg-white rounded mb-2 opacity-90"></div>
        <div class="h-2 bg-white rounded w-3/4 mb-3 opacity-70"></div>
        <div class="h-4 bg-white rounded w-20 mx-auto opacity-90"></div>
      </div>`,
  },
  {
    id: "navbar",
    label: "Navigation",
    category: "Components",
    content: `
        <nav class="navbar bg-gray-800 text-white px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="text-2xl font-bold">Logo</div>
            <ul class="flex space-x-6">
              <li><a href="#" class="text-white hover:text-gray-300 transition-colors">Home</a></li>
              <li><a href="#" class="text-white hover:text-gray-300 transition-colors">About</a></li>
              <li><a href="#" class="text-white hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </div>
        </nav>
      `,
    media: `<div class="block-preview bg-gray-800 p-3 rounded border">
        <div class="flex justify-between items-center">
          <div class="h-3 bg-white rounded w-8"></div>
          <div class="flex space-x-2">
            <div class="h-2 bg-white rounded w-6"></div>
            <div class="h-2 bg-white rounded w-6"></div>
            <div class="h-2 bg-white rounded w-6"></div>
          </div>
        </div>
      </div>`,
  },
  {
    id: "footer",
    label: "Footer",
    category: "Components",
    content: `
        <footer class="footer bg-gray-800 text-white py-12 px-6 text-center">
          <p class="text-gray-300">&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      `,
    media: `<div class="block-preview bg-gray-800 p-3 rounded border">
        <div class="h-2 bg-gray-300 rounded w-full"></div>
      </div>`,
  },
];
