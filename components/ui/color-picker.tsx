"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

// Helper functions to parse and format colors
function parseColor(color: string): string {
  if (typeof color !== "string") {
    return "#000000";
  }

  const trimmed = color.trim();

  // Check if it's a hex color
  if (trimmed.startsWith("#")) {
    return trimmed;
  }

  // Check if it's rgb/rgba and convert to hex
  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const values = rgbMatch[1].split(",").map((v) => parseInt(v.trim()));
    if (values.length >= 3) {
      return rgbToHex(values[0], values[1], values[2]);
    }
  }

  // Default to hex
  return "#000000";
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [colorValue, setColorValue] = useState<string>("#000000");
  const [inputValue, setInputValue] = useState(value);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { selectedComponents, currentDevice } = useEditorStore(
    useShallow((state) => ({
      selectedComponents: state.selectedComponents,
      currentDevice: state.currentDevice,
    }))
  );

  useEffect(() => {
    const parsedColor = parseColor(value);
    setColorValue(parsedColor);
    setInputValue(parsedColor);
  }, [value, selectedComponents, currentDevice]);

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

  const handleColorChange = (newColor: string) => {
    if (!newColor) return;

    setColorValue(newColor);
    setInputValue(newColor);
    onChange(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Try to parse the new value
    const parsed = parseColor(newValue);
    if (parsed !== "#000000") {
      setColorValue(parsed);
      onChange(parsed);
    }
  };

  const handleInputBlur = () => {
    // Validate and format the input value
    const parsed = parseColor(inputValue);
    if (parsed !== "#000000") {
      setInputValue(parsed);
      setColorValue(parsed);
      onChange(parsed);
    } else {
      // Reset to current value if invalid
      setInputValue(value);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <div className="relative" ref={popoverRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-9 p-0 border border-[#363736] bg-[#151515] rounded-md cursor-pointer"
            style={{ backgroundColor: colorValue }}
            aria-label="Pick a color"
          />

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-auto p-3 bg-[#151515] border border-[#363736] rounded-md shadow-lg">
              <HexColorPicker color={colorValue} onChange={handleColorChange} />
            </div>
          )}
        </div>

        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="#000000"
          className="flex-1 bg-[#151515] border border-[#363736] text-zinc-50"
        />
      </div>
    </div>
  );
}
