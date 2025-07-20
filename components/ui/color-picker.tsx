"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
}

// Helper functions to parse and format colors
function parseColor(color: string): {
  type: "hex" | "rgb" | "rgba";
  value: any;
} {
  if (typeof color !== "string") {
    return { type: "hex", value: "#000000" };
  }

  const trimmed = color.trim();

  // Check if it's a hex color
  if (trimmed.startsWith("#")) {
    return { type: "hex", value: trimmed };
  }

  // Check if it's rgb/rgba
  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const values = rgbMatch[1].split(",").map((v) => parseInt(v.trim()));
    if (values.length === 3) {
      return {
        type: "rgb",
        value: { r: values[0], g: values[1], b: values[2] },
      };
    } else if (values.length === 4) {
      return {
        type: "rgba",
        value: { r: values[0], g: values[1], b: values[2], a: values[3] },
      };
    }
  }

  // Default to hex
  return { type: "hex", value: "#000000" };
}

function formatColor(type: "hex" | "rgb" | "rgba", value: any): string {
  switch (type) {
    case "hex":
      return typeof value === "string" ? value : "#000000";
    case "rgb":
      return `rgb(${value.r}, ${value.g}, ${value.b})`;
    case "rgba":
      return `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`;
    default:
      return "#000000";
  }
}

function hexToRgb(hex: string) {
  if (typeof hex !== "string") return { r: 0, g: 0, b: 0 };

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function ColorPicker({
  value,
  onChange,
  label,
  className,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [colorType, setColorType] = useState<"hex" | "rgb" | "rgba">("hex");
  const [colorValue, setColorValue] = useState<any>("#000000");
  const [inputValue, setInputValue] = useState(value);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { selectedComponent } = useEditorStore(
    useShallow((state) => ({
      selectedComponent: state.selectedComponent,
    }))
  );

  const parsedColor = parseColor(value);

  useEffect(() => {
    setColorType(parsedColor.type);
    setColorValue(parsedColor.value);
    setInputValue(value);
  }, [selectedComponent]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleColorChange = (newColor: any) => {
    if (!newColor) return;

    setColorValue(newColor);
    const formattedColor = formatColor(colorType, newColor);
    setInputValue(formattedColor);
    onChange(formattedColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Try to parse the new value
    const parsed = parseColor(newValue);
    if (parsed.type !== "hex" || parsed.value !== "#000000") {
      setColorType(parsed.type);
      setColorValue(parsed.value);
      onChange(newValue);
    }
  };

  const handleInputBlur = () => {
    // Validate and format the input value
    const parsed = parseColor(inputValue);
    if (parsed.type !== "hex" || parsed.value !== "#000000") {
      const formatted = formatColor(parsed.type, parsed.value);
      setInputValue(formatted);
      setColorType(parsed.type);
      setColorValue(parsed.value);
      onChange(formatted);
    } else {
      // Reset to current value if invalid
      setInputValue(value);
    }
  };

  const getDisplayColor = () => {
    try {
      if (colorType === "hex") {
        return typeof colorValue === "string" ? colorValue : "#000000";
      } else if (colorType === "rgb") {
        return rgbToHex(colorValue.r, colorValue.g, colorValue.b);
      } else if (colorType === "rgba") {
        return rgbToHex(colorValue.r, colorValue.g, colorValue.b);
      }
    } catch (error) {
      console.error("Error getting display color:", error);
    }
    return "#000000";
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className="block text-sm font-medium text-zinc-50 mb-1">
          {label}
        </Label>
      )}
      <div className="flex gap-2">
        <div className="relative" ref={popoverRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-9 p-0 border border-[#363736] bg-[#151515] rounded-md cursor-pointer"
            style={{ backgroundColor: getDisplayColor() }}
            aria-label="Pick a color"
          />

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-auto p-3 bg-[#151515] border border-[#363736] rounded-md shadow-lg">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setColorType("hex")}
                    className={`px-2 py-1 text-xs rounded ${
                      colorType === "hex"
                        ? "bg-blue-600 text-white"
                        : "bg-[#363736] text-zinc-50 hover:bg-[#404040]"
                    }`}
                  >
                    HEX
                  </button>
                  <button
                    type="button"
                    onClick={() => setColorType("rgb")}
                    className={`px-2 py-1 text-xs rounded ${
                      colorType === "rgb"
                        ? "bg-blue-600 text-white"
                        : "bg-[#363736] text-zinc-50 hover:bg-[#404040]"
                    }`}
                  >
                    RGB
                  </button>
                  <button
                    type="button"
                    onClick={() => setColorType("rgba")}
                    className={`px-2 py-1 text-xs rounded ${
                      colorType === "rgba"
                        ? "bg-blue-600 text-white"
                        : "bg-[#363736] text-zinc-50 hover:bg-[#404040]"
                    }`}
                  >
                    RGBA
                  </button>
                </div>

                {colorType === "hex" && (
                  <HexColorPicker
                    color={
                      typeof colorValue === "string" ? colorValue : "#000000"
                    }
                    onChange={handleColorChange}
                  />
                )}

                {(colorType === "rgb" || colorType === "rgba") && (
                  <RgbaColorPicker
                    color={colorValue}
                    onChange={handleColorChange}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={
            colorType === "hex"
              ? "#000000"
              : colorType === "rgb"
              ? "rgb(0, 0, 0)"
              : "rgba(0, 0, 0, 1)"
          }
          className="flex-1 bg-[#151515] border border-[#363736] text-zinc-50"
        />
      </div>
    </div>
  );
}
