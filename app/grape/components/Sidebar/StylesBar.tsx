"use client";

import { cssProperties } from "../../types/cssProperties";
import { useMemo } from "react";

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
  styleValues: import("../../types").StyleValues;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => void;
}

// Helper: categorize properties and define input types
const propertyConfig: {
  [key: string]: {
    label: string;
    type: "text" | "color" | "range" | "select";
    min?: number;
    max?: number;
    options?: string[];
    step?: number;
    category: string;
    displayProperty?: string;
    placeholder?: string;
  };
} = {
  width: {
    label: "Width",
    type: "text",
    category: "Layout",
    placeholder: "e.g., 100%, 200px",
  },
  height: {
    label: "Height",
    type: "text",
    category: "Layout",
    placeholder: "e.g., 100%, 200px",
  },
  "min-width": { label: "Min Width", type: "text", category: "Layout" },
  "min-height": { label: "Min Height", type: "text", category: "Layout" },
  "max-width": { label: "Max Width", type: "text", category: "Layout" },
  "max-height": { label: "Max Height", type: "text", category: "Layout" },
  display: {
    label: "Display",
    type: "select",
    options: ["block", "inline", "flex", "grid", "none"],
    category: "Layout",
  },
  position: {
    label: "Position",
    type: "select",
    options: ["static", "relative", "absolute", "fixed", "sticky"],
    category: "Layout",
  },
  top: { label: "Top", type: "text", category: "Layout" },
  right: { label: "Right", type: "text", category: "Layout" },
  bottom: { label: "Bottom", type: "text", category: "Layout" },
  left: { label: "Left", type: "text", category: "Layout" },
  "z-index": { label: "Z-Index", type: "text", category: "Layout" },
  margin: {
    label: "Margin",
    type: "text",
    category: "Spacing",
    placeholder: "e.g., 10px, 1rem",
  },
  "margin-top": { label: "Margin Top", type: "text", category: "Spacing" },
  "margin-right": { label: "Margin Right", type: "text", category: "Spacing" },
  "margin-bottom": {
    label: "Margin Bottom",
    type: "text",
    category: "Spacing",
  },
  "margin-left": { label: "Margin Left", type: "text", category: "Spacing" },
  padding: {
    label: "Padding",
    type: "text",
    category: "Spacing",
    placeholder: "e.g., 10px, 1rem",
  },
  "padding-top": { label: "Padding Top", type: "text", category: "Spacing" },
  "padding-right": {
    label: "Padding Right",
    type: "text",
    category: "Spacing",
  },
  "padding-bottom": {
    label: "Padding Bottom",
    type: "text",
    category: "Spacing",
  },
  "padding-left": { label: "Padding Left", type: "text", category: "Spacing" },
  "background-color": {
    label: "Background Color",
    type: "color",
    category: "Colors",
  },
  color: { label: "Text Color", type: "color", category: "Colors" },
  "border-color": { label: "Border Color", type: "color", category: "Border" },
  "border-width": {
    label: "Border Width",
    type: "range",
    min: 0,
    max: 20,
    category: "Border",
    displayProperty: "border-width",
  },
  "border-style": {
    label: "Border Style",
    type: "select",
    options: ["solid", "dashed", "dotted", "double"],
    category: "Border",
  },
  "border-radius": {
    label: "Border Radius",
    type: "range",
    min: 0,
    max: 50,
    category: "Border",
    displayProperty: "border-radius",
  },
  "box-shadow": {
    label: "Box Shadow",
    type: "text",
    category: "Effects",
    placeholder: "e.g., 0 2px 4px rgba(0,0,0,0.1)",
  },
  opacity: {
    label: "Opacity",
    type: "range",
    min: 0,
    max: 100,
    category: "Effects",
    displayProperty: "opacity",
  },
  "font-size": {
    label: "Font Size",
    type: "range",
    min: 8,
    max: 72,
    category: "Typography",
    displayProperty: "font-size",
  },
  "font-weight": {
    label: "Font Weight",
    type: "select",
    options: [
      "normal",
      "bold",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ],
    category: "Typography",
  },
  "text-align": {
    label: "Text Align",
    type: "select",
    options: ["left", "center", "right", "justify"],
    category: "Typography",
    displayProperty: "text-align",
  },
  "line-height": { label: "Line Height", type: "text", category: "Typography" },
  "text-shadow": { label: "Text Shadow", type: "text", category: "Typography" },
  // ...add more as needed
};

const categoryOrder = [
  "Layout",
  "Spacing",
  "Border",
  "Typography",
  "Colors",
  "Effects",
  "Grid",
  "Flex",
  "Other",
];

function getCategory(prop: string) {
  return propertyConfig[prop]?.category || "Other";
}

function getLabel(prop: string) {
  return (
    propertyConfig[prop]?.label ||
    prop.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

export default function StylesBar({
  selectedComponent,
  styleValues,
  updateComponentStyle,
  handleSliderChange,
}: RightSidebarProps) {
  // Group properties by category
  const categorized = useMemo(() => {
    const groups: { [cat: string]: string[] } = {};
    cssProperties.forEach((prop) => {
      const cat = getCategory(prop);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(prop);
    });
    return groups;
  }, []);

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col h-full min-h-0">
      <div
        className="overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
      >
        <div className="p-4">
          {selectedComponent ? (
            <div className="space-y-6">
              {categoryOrder.map(
                (cat) =>
                  categorized[cat] && (
                    <div className="space-y-3" key={cat}>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {cat}
                      </h3>
                      {categorized[cat].map((cssProp) => {
                        const config = propertyConfig[cssProp] || {};
                        const value = (styleValues as any)[cssProp] ?? "";
                        // Input rendering logic
                        if (config.type === "color") {
                          return (
                            <div key={cssProp}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {getLabel(cssProp)}
                              </label>
                              <input
                                type="color"
                                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                                value={value}
                                onChange={(e) =>
                                  updateComponentStyle(cssProp, e.target.value)
                                }
                              />
                            </div>
                          );
                        }
                        if (config.type === "range") {
                          return (
                            <div key={cssProp}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {getLabel(cssProp)}
                              </label>
                              <div className="space-y-2">
                                <input
                                  type="range"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                  min={config.min}
                                  max={config.max}
                                  value={value}
                                  onChange={(e) =>
                                    handleSliderChange(
                                      cssProp,
                                      e.target.value,
                                      config.displayProperty || cssProp
                                    )
                                  }
                                />
                                <div className="text-xs text-gray-500 text-center">
                                  {value}
                                  {cssProp === "opacity" ? "%" : "px"}
                                </div>
                              </div>
                            </div>
                          );
                        }
                        if (config.type === "select") {
                          return (
                            <div key={cssProp}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {getLabel(cssProp)}
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={value}
                                onChange={(e) =>
                                  updateComponentStyle(cssProp, e.target.value)
                                }
                              >
                                {config.options?.map((opt) => (
                                  <option value={opt} key={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );
                        }
                        // Default to text input
                        return (
                          <div key={cssProp}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {getLabel(cssProp)}
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={config.placeholder}
                              value={value}
                              onChange={(e) =>
                                updateComponentStyle(cssProp, e.target.value)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 italic py-8">
              Select a component to edit its styles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
