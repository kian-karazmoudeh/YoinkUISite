import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/color-picker";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import LocalizedInput from "./LocalizedInput";

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

interface RenderComponentProps {
  cssProp: string;
  config: PropertyConfigType[string];
  value: string;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (property: string, value: string) => void;
  getLabel: (prop: string) => string;
  containerClassName?: string;
  labelClassName?: string;
}

export function RenderComponent({
  cssProp,
  config,
  value,
  updateComponentStyle,
  handleSliderChange,
  getLabel,
  containerClassName,
  labelClassName = "block text-sm font-medium text-zinc-50 mb-1",
}: RenderComponentProps) {
  const finalContainerClassName =
    containerClassName || config.containerClassName || "";

  if (config.type === "color") {
    return (
      <div className={finalContainerClassName}>
        <ColorPicker
          value={value}
          onChange={(color) => updateComponentStyle(cssProp, color)}
        />
      </div>
    );
  }

  if (config.type === "range") {
    // Remove unit from value (e.g., "20px" -> "20", "0.5" -> "0.5")
    let numericValue = value;
    if (typeof value === "string") {
      numericValue = value.replace(/(px|%|em|rem)$/, "");
    }

    if (cssProp == "opacity") {
      numericValue = Math.round(Number(numericValue) * 100).toString();
    }

    if (cssProp == "border-radius") {
      console.log("numericValue", numericValue);
      console.log("value", value);
    }
    return (
      <div className={finalContainerClassName}>
        <Label className={labelClassName}>{getLabel(cssProp)}</Label>
        <div className="space-y-2">
          <Slider
            min={config.min}
            max={config.max}
            value={[Number(numericValue) || 0]}
            onValueChange={([val]) => handleSliderChange(cssProp, String(val))}
          />
          <div className="text-xs text-gray-500 text-center">
            {numericValue}
            {cssProp === "opacity" ? "%" : "px"}
          </div>
        </div>
      </div>
    );
  }

  if (config.type === "select") {
    return (
      <div className={finalContainerClassName}>
        <Label className={labelClassName}>{getLabel(cssProp)}</Label>
        <Select
          value={value}
          onValueChange={(val) => updateComponentStyle(cssProp, val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            {config.options?.map((opt) => (
              <SelectItem value={opt} key={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Default to text input
  return (
    <div className={finalContainerClassName}>
      <Label className={labelClassName}>{getLabel(cssProp)}</Label>
      <LocalizedInput
        config={config}
        value={value}
        updateComponentStyle={updateComponentStyle}
        cssProp={cssProp}
      />
    </div>
  );
}
