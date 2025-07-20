"use client";

import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../../store/editorStore";
import { RenderComponent } from "./RenderComponent";
import { ChevronDownIcon } from "lucide-react";

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
    inputClassName?: string;
    containerClassName?: string;
  };
}

// Helper: categorize properties and define input types
const propertyConfig: PropertyConfigType = {
  display: {
    label: "Display",
    type: "select",
    options: ["block", "inline", "flex", "grid", "none"],
    category: "Layout",
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
    containerClassName: LEFT_CELL_CLASSES,
  },
  "min-height": {
    label: "Min Height",
    type: "text",
    category: "Layout",
    containerClassName: RIGHT_CELL_CLASSES,
  },
  "max-width": {
    label: "Max Width",
    type: "text",
    category: "Layout",
    containerClassName: LEFT_CELL_CLASSES,
  },
  "max-height": {
    label: "Max Height",
    type: "text",
    category: "Layout",
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
  "z-index": { label: "Z-Index", type: "text", category: "Layout" },
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
    selectedComponent,
    styleValues,
    updateComponentStyle,
    handleSliderChange,
  } = useEditorStore(
    useShallow((state) => ({
      editor: state.editor,
      selectedComponent: state.selectedComponent,
      styleValues: state.styleValues,
      updateComponentStyle: state.updateComponentStyle,
      handleSliderChange: state.handleSliderChange,
    }))
  );

  const sectors = editor?.StyleManager.getSectors() || [];

  console.log(sectors);

  // Group properties by category
  const categorized = useMemo(() => {
    const groups: { [cat: string]: string[] } = {};
    // Use properties from propertyConfig instead of cssProperties to ensure all configured properties are included
    Object.keys(propertyConfig).forEach((prop) => {
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
                      <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                        {cat}
                      </h3>
                      {categorized[cat].map((cssProp) => {
                        const config = propertyConfig[cssProp] || {};
                        const value = (styleValues as any)[cssProp] ?? "";

                        // Skip if this is a longhand and should be shown as longhand
                        if (shouldShowAsLonghand(cssProp, styleValues)) {
                          return null;
                        }

                        // If this is a shorthand with longhands
                        if (config.longhands) {
                          if (shouldShowShorthand(cssProp, styleValues)) {
                            // All longhands match, show shorthand input with popover
                            return (
                              <div
                                key={cssProp}
                                className={twMerge(
                                  "flex items-start gap-2",
                                  config.containerClassName
                                )}
                              >
                                <RenderComponent
                                  cssProp={cssProp}
                                  config={config}
                                  value={getLonghandValues(
                                    cssProp,
                                    styleValues
                                  )}
                                  styleValues={styleValues}
                                  updateComponentStyle={(_prop, val) => {
                                    // When shorthand changes, update all longhands
                                    Object.keys(config.longhands!).forEach(
                                      (longhand) => {
                                        updateComponentStyle(longhand, val);
                                      }
                                    );
                                  }}
                                  handleSliderChange={handleSliderChange}
                                  getLabel={getLabel}
                                  containerClassName="flex-1"
                                  labelClassName="block text-sm font-medium text-zinc-50 mb-1 flex-shrink-0"
                                />
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <ChevronDownIcon className="size-4 shrink-0 text-zinc-50 hover:bg-zinc-700 rounded-md cursor-pointer" />
                                    {/* <button
                                      type="button"
                                      className="size-6 rounded bg-zinc-700 text-zinc-100 hover:bg-zinc-600 focus:outline-none shrink-0"
                                      title="Show individual sides"
                                    >
                                    </button> */}
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="p-5 min-w-[200px]">
                                    {Object.entries(config.longhands).map(
                                      ([longhand, longhandConfig]) => {
                                        const longhandValue =
                                          (styleValues as any)[longhand] ?? "";
                                        return (
                                          <div key={longhand} className="mb-2">
                                            <RenderComponent
                                              cssProp={longhand}
                                              config={longhandConfig}
                                              value={longhandValue}
                                              styleValues={styleValues}
                                              updateComponentStyle={
                                                updateComponentStyle
                                              }
                                              handleSliderChange={
                                                handleSliderChange
                                              }
                                              getLabel={getLabel}
                                              labelClassName="block text-xs font-medium text-zinc-50 mb-1"
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            );
                          } else {
                            // Longhands differ, show all longhand inputs
                            return Object.entries(config.longhands).map(
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
                                    updateComponentStyle={updateComponentStyle}
                                    handleSliderChange={handleSliderChange}
                                    getLabel={getLabel}
                                  />
                                );
                              }
                            );
                          }
                        }

                        // Visibility logic
                        if (config.visibleWhen) {
                          const { property, values } = config.visibleWhen;
                          const currentValue =
                            (styleValues as any)[property] ?? "";
                          if (!values.includes(currentValue)) {
                            return null; // Don't render this property
                          }
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
