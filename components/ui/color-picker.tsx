"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/app/editor/[projectId]/store";
import { useShallow } from "zustand/react/shallow";
import chroma from "chroma-js";
import { Select, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import colors, {
  DefaultColors,
} from "@/app/editor/[projectId]/export/tailwind/utils/colors/tailwindDefaultColors";
import { Search } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [colorValue, setColorValue] = useState<string>("#000000");
  const [inputValue, setInputValue] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  const filteredColors = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return colors;

    const filtered: Partial<DefaultColors> = {};
    Object.entries(colors).forEach(([colorName, value]) => {
      if (typeof value === "object") {
        const matchingShades = Object.entries(
          value as Record<string, string>
        ).filter(([shade]) =>
          `${colorName}-${shade}`.toLowerCase().includes(query)
        );
        if (matchingShades.length > 0) {
          filtered[colorName as keyof DefaultColors] = Object.fromEntries(
            matchingShades
          ) as typeof value;
        }
      } else if (
        colorName !== "inherit" &&
        colorName !== "current" &&
        colorName !== "transparent" &&
        colorName.toLowerCase().includes(query)
      ) {
        filtered[colorName as keyof DefaultColors] = value;
      }
    });
    return filtered as DefaultColors;
  }, [searchQuery]);

  const { selectedComponents, currentDevice } = useEditorStore(
    useShallow((state) => ({
      selectedComponents: state.selectedComponents,
      currentDevice: state.currentDevice,
    }))
  );

  useEffect(() => {
    try {
      const parsedColor = chroma(value).hex();
      setColorValue(parsedColor);
      setInputValue(parsedColor);
    } catch {
      setColorValue("#000000");
      setInputValue("#000000");
    }
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
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full" size="sm">
        <div className="flex items-center gap-2">
          <div
            className="size-4 rounded-sm"
            style={{
              backgroundColor: colorValue,
            }}
          />
          <p>{colorValue}</p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <Tabs defaultValue="custom" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent">
            <TabsTrigger
              value="custom"
              className="data-[state=active]:bg-zinc-800"
            >
              Custom
            </TabsTrigger>
            <TabsTrigger
              value="tailwind"
              className="data-[state=active]:bg-zinc-800"
            >
              Tailwind
            </TabsTrigger>
          </TabsList>
          <TabsContent value="custom" className="space-y-4">
            <HexColorPicker
              color={colorValue}
              onChange={handleColorChange}
              style={{
                width: "100%",
              }}
            />
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="#000000"
              className="flex-1 bg-[#151515] border border-[#363736] text-zinc-50"
            />
          </TabsContent>
          <TabsContent
            value="tailwind"
            className="max-h-[300px] overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#26272B #18191A",
            }}
          >
            <div className="space-y-2">
              <div className="sticky top-0">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search colors..."
                  className="flex-1 bg-[#151515] text-sm border-none text-zinc-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none pl-8"
                />
              </div>
              <div className="grid gap-2">
                {Object.entries(filteredColors).map(([colorName, value]) => {
                  if (typeof value === "object") {
                    return Object.entries(value as Record<string, string>).map(
                      ([shade, hexColor]) => (
                        <button
                          key={`${colorName}-${shade}`}
                          className="flex items-center w-full gap-2 px-2 py-1 text-sm rounded hover:bg-zinc-800 cursor-pointer"
                          onClick={() => handleColorChange(hexColor)}
                        >
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: hexColor }}
                          />
                          <span className="font-medium">
                            {colorName}-{shade}
                          </span>
                        </button>
                      )
                    );
                  }
                  if (
                    colorName !== "inherit" &&
                    colorName !== "current" &&
                    colorName !== "transparent"
                  ) {
                    return (
                      <button
                        key={colorName}
                        className="flex items-center w-full gap-2 px-2 py-1 text-sm rounded hover:bg-zinc-800"
                        onClick={() => handleColorChange(value)}
                      >
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: value }}
                        />
                        <span className="font-medium">{colorName}</span>
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SelectContent>
    </Select>
  );
  // return (
  //   <div className={cn("space-y-2", className)}>
  //     <div className="flex gap-2">
  //       <div className="relative" ref={popoverRef}>
  //         <button
  //           type="button"
  //           onClick={() => setIsOpen(!isOpen)}
  //           className="w-12 h-9 p-0 border border-[#363736] bg-[#151515] rounded-md cursor-pointer"
  //           style={{ backgroundColor: colorValue }}
  //           aria-label="Pick a color"
  //         />

  //         {isOpen && (
  //           <div className="absolute top-full left-0 mt-2 z-50 w-auto p-3 bg-[#151515] border border-[#363736] rounded-md shadow-lg">
  //             <HexColorPicker color={colorValue} onChange={handleColorChange} />
  //             {presetColors && (
  //               <div className="flex flex-wrap gap-2 mt-2">
  //                 {presetColors &&
  //                   presetColors?.map((color, index) => (
  //                     <div
  //                       key={index}
  //                       className="size-6 rounded-md shadow-md cursor-pointer"
  //                       onClick={() => handleColorChange(color)}
  //                       style={{ backgroundColor: color }}
  //                     />
  //                   ))}
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </div>

  //       <Input
  //         type="text"
  //         value={inputValue}
  //         onChange={handleInputChange}
  //         onBlur={handleInputBlur}
  //         placeholder="#000000"
  //         className="flex-1 bg-[#151515] border border-[#363736] text-zinc-50"
  //       />
  //     </div>
  //   </div>
  // );
}
