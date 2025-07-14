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
    content:
      '<div data-gjs-type="text" class="text-base">Insert your text here</div>',
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
    content:
      '<div class="map h-80 bg-gray-200 flex items-center justify-center rounded-lg">Map placeholder</div>',
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
    content:
      '<blockquote class="quote border-l-4 border-blue-500 pl-4 italic text-gray-700">Insert a quote here</blockquote>',
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
    content:
      '<a href="#" class="link text-blue-600 hover:text-blue-800 underline">Insert a link here</a>',
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-2 bg-blue-500 rounded w-full underline"></div>
      </div>`,
  },
  {
    id: "button",
    label: "Button",
    category: "Basic",
    content:
      '<button class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click me</button>',
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-6 bg-blue-500 rounded w-20 mx-auto"></div>
      </div>`,
  },
  {
    id: "div",
    label: "Div",
    category: "Basic",
    content: '<div class="div p-4 border border-gray-300 rounded"></div>',
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-12 border border-gray-300 rounded"></div>
      </div>`,
  },
  {
    id: "heading",
    label: "Heading",
    category: "Basic",
    content:
      '<h1 class="heading text-3xl font-bold text-gray-900">Insert a heading</h1>',
    media: `<div class="block-preview bg-white p-3 rounded border">
        <div class="h-4 bg-gray-800 rounded w-full mb-1"></div>
      </div>`,
  },
  {
    id: "paragraph",
    label: "Paragraph",
    category: "Basic",
    content:
      '<p class="paragraph text-base text-gray-700 leading-relaxed">Insert a paragraph</p>',
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
