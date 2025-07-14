"use client";

interface StyleValues {
  width: string;
  height: string;
  display: string;
  fontSize: string;
  fontWeight: string;
  textAlign: string;
  backgroundColor: string;
  color: string;
  padding: string;
  margin: string;
  borderWidth: string;
  borderColor: string;
  borderStyle: string;
  borderRadius: string;
  opacity: string;
  boxShadow: string;
}

interface RightSidebarProps {
  selectedComponent: any;
  styleValues: StyleValues;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => void;
}

export default function RightSidebar({
  selectedComponent,
  styleValues,
  updateComponentStyle,
  handleSliderChange,
}: RightSidebarProps) {
  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        {selectedComponent ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Layout</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 100%, 200px"
                  value={styleValues.width}
                  onChange={(e) =>
                    updateComponentStyle("width", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 100%, 200px"
                  value={styleValues.height}
                  onChange={(e) =>
                    updateComponentStyle("height", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={styleValues.display}
                  onChange={(e) =>
                    updateComponentStyle("display", e.target.value)
                  }
                >
                  <option value="block">Block</option>
                  <option value="inline">Inline</option>
                  <option value="flex">Flex</option>
                  <option value="grid">Grid</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Typography
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    min="8"
                    max="72"
                    value={styleValues.fontSize}
                    onChange={(e) =>
                      handleSliderChange(
                        "fontSize",
                        e.target.value,
                        "font-size"
                      )
                    }
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {styleValues.fontSize}px
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Weight
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={styleValues.fontWeight}
                  onChange={(e) =>
                    updateComponentStyle("font-weight", e.target.value)
                  }
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Align
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={styleValues.textAlign}
                  onChange={(e) =>
                    updateComponentStyle("text-align", e.target.value)
                  }
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Colors</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <input
                  type="color"
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                  value={styleValues.backgroundColor}
                  onChange={(e) =>
                    updateComponentStyle("background-color", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                  value={styleValues.color}
                  onChange={(e) =>
                    updateComponentStyle("color", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Spacing</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Padding
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10px, 1rem"
                  value={styleValues.padding}
                  onChange={(e) =>
                    updateComponentStyle("padding", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Margin
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10px, 1rem"
                  value={styleValues.margin}
                  onChange={(e) =>
                    updateComponentStyle("margin", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Border</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Width
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    min="0"
                    max="20"
                    value={styleValues.borderWidth}
                    onChange={(e) =>
                      handleSliderChange(
                        "borderWidth",
                        e.target.value,
                        "border-width"
                      )
                    }
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {styleValues.borderWidth}px
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Color
                </label>
                <input
                  type="color"
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                  value={styleValues.borderColor}
                  onChange={(e) =>
                    updateComponentStyle("border-color", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Style
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={styleValues.borderStyle}
                  onChange={(e) =>
                    updateComponentStyle("border-style", e.target.value)
                  }
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Radius
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    min="0"
                    max="50"
                    value={styleValues.borderRadius}
                    onChange={(e) =>
                      handleSliderChange(
                        "borderRadius",
                        e.target.value,
                        "border-radius"
                      )
                    }
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {styleValues.borderRadius}px
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Effects</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opacity
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    min="0"
                    max="100"
                    value={styleValues.opacity}
                    onChange={(e) =>
                      handleSliderChange("opacity", e.target.value, "opacity")
                    }
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {styleValues.opacity}%
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Box Shadow
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 0 2px 4px rgba(0,0,0,0.1)"
                  value={styleValues.boxShadow}
                  onChange={(e) =>
                    updateComponentStyle("box-shadow", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 italic py-8">
            Select a component to edit its styles
          </div>
        )}
      </div>
    </div>
  );
}
