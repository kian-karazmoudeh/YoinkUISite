"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";
import chroma from "chroma-js";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
  presetColors?: string[];
}

export function ColorPicker({
  value,
  onChange,
  className,
  presetColors,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [colorValue, setColorValue] = useState<string>("#000000");
  const [inputValue, setInputValue] = useState(value);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { selectedComponents, currentDevice, theme } = useEditorStore(
    useShallow((state) => ({
      selectedComponents: state.selectedComponents,
      currentDevice: state.currentDevice,
      theme: state.theme,
    }))
  );

  useEffect(() => {
    const parsedColor = chroma(value).hex();
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
  };

  const handleInputBlur = () => {
    // Validate and format the input value
    try {
      const parsed = chroma(inputValue).hex();
      setInputValue(parsed);
      setColorValue(parsed);
      onChange(parsed);
    } catch {
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
              {presetColors && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {presetColors &&
                    presetColors?.map((color) => (
                      <div
                        key={color}
                        className="size-6 rounded-md shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                </div>
              )}
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
