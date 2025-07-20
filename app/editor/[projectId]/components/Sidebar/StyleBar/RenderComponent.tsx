import { Input } from "@/components/ui/input";
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
import { twMerge } from "tailwind-merge";

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
  styleValues: any;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => void;
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
          label={getLabel(cssProp)}
        />
      </div>
    );
  }

  if (config.type === "range") {
    return (
      <div>
        <Label className={labelClassName}>{getLabel(cssProp)}</Label>
        <div className="space-y-2">
          <Slider
            min={config.min}
            max={config.max}
            value={[Number(value) || 0]}
            onValueChange={([val]) =>
              handleSliderChange(
                cssProp,
                String(val),
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
      <div>
        <Label className={twMerge(labelClassName, config.containerClassName)}>
          {getLabel(cssProp)}
        </Label>
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
      <Input
        type="text"
        placeholder={config.placeholder}
        className={config.inputClassName || ""}
        value={value}
        onChange={(e) => updateComponentStyle(cssProp, e.target.value)}
      />
    </div>
  );
}
