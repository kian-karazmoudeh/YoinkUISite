"use client";

import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../../store";
import { RenderComponent } from "./RenderComponent";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const LEFT_CELL_CLASSES = "inline-block w-1/2 pr-1";
const RIGHT_CELL_CLASSES = "inline-block w-1/2 pl-1";

interface PropertyConfigType {
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
    visibleWhen?: { property: string; values: string[] };
    longhands?: PropertyConfigType;
    isExtra?: boolean;
    inputClassName?: string;
    containerClassName?: string;
  };
}

// Helper: categorize properties and define input types
const propertyConfig: PropertyConfigType = {
  display: {
    label: "Display",
    type: "select",
    options: [
      "block",
      "inline",
      "flex",
      "grid",
      "inline-block",
      "inline-flex",
      "inline-grid",
      "contents",
      "none",
    ],
    category: "Layout",
  },
  gap: {
    label: "Gap",
    type: "text",
    category: "Layout",
    placeholder: "e.g., 10px, 1rem",
    visibleWhen: {
      property: "display",
      values: ["grid", "inline-grid", "flex", "inline-flex"],
    },
    longhands: {
      "row-gap": {
        label: "Row Gap",
        type: "text",
        category: "Layout",
        containerClassName: LEFT_CELL_CLASSES,
      },
      "column-gap": {
        label: "Column Gap",
        type: "text",
        category: "Layout",
        containerClassName: RIGHT_CELL_CLASSES,
      },
    },
  },
  width: {
    label: "Width",
    type: "text",
    category: "Layout",
    placeholder: "e.g., 100%, 200px",
    // inputClassName: "w-1/2",
    containerClassName: LEFT_CELL_CLASSES,
  },
  height: {
    label: "Height",
    type: "text",
    category: "Layout",
    placeholder: "e.g., 100%, 200px",
    // inputClassName: "w-1/2",
    containerClassName: RIGHT_CELL_CLASSES,
  },
  "min-width": {
    label: "Min Width",
    type: "text",
    category: "Layout",
    isExtra: true,
    containerClassName: LEFT_CELL_CLASSES,
  },
  "min-height": {
    label: "Min Height",
    type: "text",
    category: "Layout",
    isExtra: true,
    containerClassName: RIGHT_CELL_CLASSES,
  },
  "max-width": {
    label: "Max Width",
    type: "text",
    category: "Layout",
    isExtra: true,
    containerClassName: LEFT_CELL_CLASSES,
  },
  "max-height": {
    label: "Max Height",
    type: "text",
    category: "Layout",
    isExtra: true,
    containerClassName: RIGHT_CELL_CLASSES,
  },
  position: {
    label: "Position",
    type: "select",
    options: ["static", "relative", "absolute", "fixed", "sticky"],
    category: "Layout",
  },
  top: {
    label: "Top",
    type: "text",
    category: "Layout",
    visibleWhen: {
      property: "position",
      values: ["absolute", "sticky", "fixed"],
    },
    containerClassName: LEFT_CELL_CLASSES,
  },
  right: {
    label: "Right",
    type: "text",
    category: "Layout",
    visibleWhen: {
      property: "position",
      values: ["absolute", "sticky", "fixed"],
    },
    containerClassName: RIGHT_CELL_CLASSES,
  },
  bottom: {
    label: "Bottom",
    type: "text",
    category: "Layout",
    visibleWhen: {
      property: "position",
      values: ["absolute", "sticky", "fixed"],
    },
    containerClassName: LEFT_CELL_CLASSES,
  },
  left: {
    label: "Left",
    type: "text",
    category: "Layout",
    visibleWhen: {
      property: "position",
      values: ["absolute", "sticky", "fixed"],
    },
    containerClassName: RIGHT_CELL_CLASSES,
  },
  "grid-template-columns": {
    label: "Grid Columns",
    type: "text",
    visibleWhen: {
      property: "display",
      values: ["grid", "inline-grid"],
    },
    category: "Grid",
    containerClassName: RIGHT_CELL_CLASSES,
  },
  "grid-template-rows": {
    label: "Grid Rows",
    type: "text",
    visibleWhen: {
      property: "display",
      values: ["grid", "inline-grid"],
    },
    category: "Grid",
    containerClassName: LEFT_CELL_CLASSES,
  },
  "grid-auto-flow": {
    label: "Grid Flow Direction",
    type: "select",
    options: ["row", "column", "dense", "row-dense", "col-dense"],
    visibleWhen: {
      property: "display",
      values: ["grid", "inline-grid"],
    },
    category: "Grid",
  },
  "flex-direction": {
    label: "Flex Direction",
    type: "select",
    options: ["row", "row-reverse", "column", "column-reverse"],
    containerClassName: LEFT_CELL_CLASSES,
    visibleWhen: {
      property: "display",
      values: ["flex", "inline-flex"],
    },
    category: "Flex",
  },
  "flex-wrap": {
    label: "Flex Wrap",
    type: "select",
    options: ["nowrap", "wrap", "wrap-reverse"],
    containerClassName: RIGHT_CELL_CLASSES,
    visibleWhen: {
      property: "display",
      values: ["flex", "inline-flex"],
    },
    category: "Flex",
  },
  "justify-content": {
    label: "Justify Content",
    type: "select",
    options: [
      "normal",
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
      "stretch",
      "safe center",
      "safe end",
    ],
    containerClassName: LEFT_CELL_CLASSES,
    visibleWhen: {
      property: "display",
      values: ["flex", "inline-flex"],
    },
    category: "Flex",
  },
  "align-items": {
    label: "Align Items",
    type: "select",
    options: [
      "flex-start",
      "flex-end",
      "center",
      "stretch",
      "baseline",
      "safe center",
      "safe flex-end",
      "last baseline",
    ],
    containerClassName: RIGHT_CELL_CLASSES,
    visibleWhen: {
      property: "display",
      values: ["flex", "inline-flex"],
    },
    category: "Flex",
  },
  "align-content": {
    label: "Align Content",
    type: "select",
    options: [
      "normal",
      "space-evenly",
      "baseline",
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-between",
      "space-around",
    ],
    containerClassName: RIGHT_CELL_CLASSES,
    visibleWhen: {
      property: "display",
      values: ["flex", "inline-flex"],
    },
    category: "Flex",
  },
  "z-index": {
    label: "Z-Index",
    type: "text",
    category: "Layout",
    isExtra: true,
  },
  margin: {
    label: "Margin",
    type: "text",
    category: "Spacing",
    placeholder: "e.g., 10px, 1rem",
    longhands: {
      "margin-top": {
        label: "Margin Top",
        type: "text",
        category: "Spacing",
        containerClassName: LEFT_CELL_CLASSES,
      },
      "margin-right": {
        label: "Margin Right",
        type: "text",
        category: "Spacing",
        containerClassName: RIGHT_CELL_CLASSES,
      },
      "margin-bottom": {
        label: "Margin Bottom",
        type: "text",
        category: "Spacing",
        containerClassName: LEFT_CELL_CLASSES,
      },
      "margin-left": {
        label: "Margin Left",
        type: "text",
        category: "Spacing",
        containerClassName: RIGHT_CELL_CLASSES,
      },
    },
  },
  padding: {
    label: "Padding",
    type: "text",
    category: "Spacing",
    placeholder: "e.g., 10px, 1rem",
    longhands: {
      "padding-top": {
        label: "Padding Top",
        type: "text",
        category: "Spacing",
        containerClassName: LEFT_CELL_CLASSES,
      },
      "padding-right": {
        label: "Padding Right",
        type: "text",
        category: "Spacing",
        containerClassName: RIGHT_CELL_CLASSES,
      },
      "padding-bottom": {
        label: "Padding Bottom",
        type: "text",
        category: "Spacing",
        containerClassName: LEFT_CELL_CLASSES,
      },
      "padding-left": {
        label: "Padding Left",
        type: "text",
        category: "Spacing",
        containerClassName: RIGHT_CELL_CLASSES,
      },
    },
  },

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
    longhands: {
      "border-top-style": {
        label: "Border Style",
        type: "select",
        options: ["solid", "dashed", "dotted", "double"],
        category: "Border",
      },
      "border-right-style": {
        label: "Border Right Style",
        type: "select",
        options: ["solid", "dashed", "dotted", "double"],
        category: "Border",
      },
      "border-bottom-style": {
        label: "Border Bottom Style",
        type: "select",
        options: ["solid", "dashed", "dotted", "double"],
        category: "Border",
      },
      "border-left-style": {
        label: "Border Left Style",
        type: "select",
        options: ["solid", "dashed", "dotted", "double"],
        category: "Border",
      },
    },
  },
  "border-radius": {
    label: "Border Radius",
    type: "range",
    min: 0,
    max: 50,
    category: "Border",
    displayProperty: "border-radius",
    longhands: {
      "border-top-right-radius": {
        label: "Border Top Right Radius",
        type: "range",
        min: 0,
        max: 50,
        category: "Border",
        displayProperty: "border-radius",
      },
      "border-top-left-radius": {
        label: "Border Top left Radius",
        type: "range",
        min: 0,
        max: 50,
        category: "Border",
        displayProperty: "border-radius",
      },
      "border-bottom-right-radius": {
        label: "Border bottom Right Radius",
        type: "range",
        min: 0,
        max: 50,
        category: "Border",
        displayProperty: "border-radius",
      },
      "border-bottom-left-radius": {
        label: "Border Bottom Left Radius",
        type: "range",
        min: 0,
        max: 50,
        category: "Border",
        displayProperty: "border-radius",
      },
    },
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
  "Grid",
  "Flex",
  "Spacing",
  "Colors",
  "Typography",
  "Border",
  "Effects",
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

// Helper function to check if all longhand values match
function allLonghandsMatch(prop: string, styleValues: any): boolean {
  const config = propertyConfig[prop];
  if (!config?.longhands) return false;

  const longhandProps = Object.keys(config.longhands);
  if (longhandProps.length === 0) return false;

  const firstValue = (styleValues as any)[longhandProps[0]] ?? "";
  return longhandProps.every(
    (longhandProp) => (styleValues as any)[longhandProp] === firstValue
  );
}

// Helper function to get a single longhand value (if all match, return that value, else return empty string)
function getLonghandValues(prop: string, styleValues: any): string {
  const config = propertyConfig[prop];
  if (!config?.longhands) return "";

  const longhandProps = Object.keys(config.longhands);
  if (longhandProps.length === 0) return "";

  const firstValue = (styleValues as any)[longhandProps[0]] ?? "";
  const allMatch = longhandProps.every(
    (longhandProp) => (styleValues as any)[longhandProp] === firstValue
  );

  console.log(allMatch ? firstValue : "");
  return allMatch ? firstValue : "";
}

// Helper function to check if a property should be shown as longhand
function shouldShowAsLonghand(prop: string, styleValues: any): boolean {
  // Check if this property is a longhand of another property
  for (const [shorthandProp, config] of Object.entries(propertyConfig)) {
    if (config.longhands && prop in config.longhands) {
      // If all longhands match, show shorthand instead
      if (allLonghandsMatch(shorthandProp, styleValues)) {
        return false;
      }
      return true;
    }
  }
  return false;
}

// Helper function to check if a shorthand should be shown
function shouldShowShorthand(prop: string, styleValues: any): boolean {
  const config = propertyConfig[prop];
  if (!config?.longhands) return true;

  return allLonghandsMatch(prop, styleValues);
}

export default function StylesBar() {
  const {
    editor,
    selectedComponents,
    styleValues,
    updateComponentStyle,
    handleSliderChange,
  } = useEditorStore(
    useShallow((state) => ({
      editor: state.editor,
      selectedComponents: state.selectedComponents,
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
      handleSliderChange: state.handleSliderChange,
    }))
  );

  // Group properties by category
  const categorized = useMemo(() => {
    const groups: { [cat: string]: string[] } = {};
    Object.keys(propertyConfig).forEach((prop) => {
      const cat = getCategory(prop);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(prop);
    });
    return groups;
  }, []);

  // Track which categories have 'show all' enabled
  const [showAllCategories, setShowAllCategories] = useState<{
    [cat: string]: boolean;
  }>({});

  // Track which shorthands are expanded to show longhands
  const [expandedShorthands, setExpandedShorthands] = useState<{
    [prop: string]: boolean;
  }>({});

  const handleToggleShowAll = (cat: string) => {
    setShowAllCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleToggleShorthand = (prop: string) => {
    setExpandedShorthands((prev) => ({ ...prev, [prop]: !prev[prop] }));
  };

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col h-full min-h-0">
      <div
        className="overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
      >
        <div className="p-2 space-y-2">
          {selectedComponents.length > 0 ? (
            <div className="space-y-6">
              {categoryOrder.map((cat) => {
                if (!categorized[cat]) return null;
                const hasExtra = categorized[cat].some(
                  (cssProp) => propertyConfig[cssProp]?.isExtra
                );
                const visibleProps = categorized[cat].filter((cssProp) => {
                  const config = propertyConfig[cssProp] || {};
                  if (config.isExtra && !showAllCategories[cat]) {
                    return false;
                  }
                  if (config.visibleWhen) {
                    const { property, values } = config.visibleWhen;
                    const currentValue = (styleValues as any)[property] ?? "";
                    if (!values.includes(currentValue)) {
                      return false;
                    }
                  }
                  // No auto longhand logic here
                  return true;
                });
                if (visibleProps.length === 0) return null;
                return (
                  <div className="space-y-3" key={cat}>
                    <div className="flex items-center mb-2">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide flex-1">
                        {cat}
                      </h3>
                      {hasExtra && (
                        <button
                          type="button"
                          className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 ml-2"
                          style={{ lineHeight: 1 }}
                          onClick={() => handleToggleShowAll(cat)}
                          tabIndex={0}
                        >
                          {showAllCategories[cat] ? "Hide extras" : "Show all"}
                        </button>
                      )}
                    </div>
                    {visibleProps.map((cssProp) => {
                      const config = propertyConfig[cssProp] || {};
                      const value = (styleValues as any)[cssProp] ?? "";

                      if (config.visibleWhen) {
                        const { property, values } = config.visibleWhen;
                        const currentValue =
                          (styleValues as any)[property] ?? "";
                        if (!values.includes(currentValue)) {
                          return null;
                        }
                      }

                      // If this is a shorthand with longhands
                      if (config.longhands) {
                        const expanded = expandedShorthands[cssProp];
                        return (
                          <div
                            key={cssProp}
                            className={twMerge(
                              "flex flex-col gap-1",
                              config.containerClassName
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {!expanded ? (
                                <RenderComponent
                                  cssProp={cssProp}
                                  config={config}
                                  value={getLonghandValues(
                                    cssProp,
                                    styleValues
                                  )}
                                  styleValues={styleValues}
                                  updateComponentStyle={(_prop, val) => {
                                    Object.keys(config.longhands!).forEach(
                                      (longhand) => {
                                        updateComponentStyle(longhand, val);
                                      }
                                    );
                                  }}
                                  handleSliderChange={(_prop, val) => {
                                    Object.keys(config.longhands!).forEach(
                                      (longhand) => {
                                        handleSliderChange(longhand, val);
                                      }
                                    );
                                  }}
                                  getLabel={getLabel}
                                  containerClassName="flex-1"
                                  labelClassName="block text-sm font-medium text-zinc-50 mb-1 flex-shrink-0"
                                />
                              ) : null}
                              <button
                                type="button"
                                className="ml-1 px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 text-xs flex items-center gap-1"
                                onClick={() => handleToggleShorthand(cssProp)}
                                tabIndex={0}
                              >
                                {expanded ? (
                                  <>
                                    <ChevronUpIcon className="size-3" /> Show
                                    less
                                  </>
                                ) : (
                                  <>
                                    <ChevronDownIcon className="size-3" /> Show
                                    details
                                  </>
                                )}
                              </button>
                            </div>
                            {expanded && (
                              <div className="flex flex-wrap gap-2 mt-1">
                                {Object.entries(config.longhands).map(
                                  ([longhand, longhandConfig]) => {
                                    const longhandValue =
                                      (styleValues as any)[longhand] ?? "";
                                    return (
                                      <RenderComponent
                                        key={longhand}
                                        cssProp={longhand}
                                        config={longhandConfig}
                                        value={longhandValue}
                                        styleValues={styleValues}
                                        updateComponentStyle={(_prop, val) =>
                                          updateComponentStyle(longhand, val)
                                        }
                                        handleSliderChange={(_prop, val) =>
                                          handleSliderChange(longhand, val)
                                        }
                                        getLabel={getLabel}
                                        labelClassName="block text-xs font-medium text-zinc-50 mb-1"
                                      />
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }

                      // Use RenderComponent for all input types
                      return (
                        <RenderComponent
                          key={cssProp}
                          cssProp={cssProp}
                          config={config}
                          value={value}
                          styleValues={styleValues}
                          updateComponentStyle={updateComponentStyle}
                          handleSliderChange={handleSliderChange}
                          getLabel={getLabel}
                        />
                      );
                    })}
                  </div>
                );
              })}
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
