"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { isValidCssValue } from "../../../utils/helpers";
import { useEditorStore } from "../../../store";
import { useShallow } from "zustand/react/shallow";

const LocalizedInput = ({
  config,
  value,
  updateComponentStyle,
  cssProp,
}: {
  config: any;
  value: string;
  updateComponentStyle: (cssProp: string, value: string) => void;
  cssProp: string;
}) => {
  const { selectedComponents, currentDevice } = useEditorStore(
    useShallow((state) => ({
      selectedComponents: state.selectedComponents,
      currentDevice: state.currentDevice,
    }))
  );
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [selectedComponents, currentDevice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    // Only propagate valid values to the canvas
    if (isValidCssValue(val)) {
      updateComponentStyle(cssProp, val);
    }
  };

  const handleBlur = () => {
    // On blur, fallback to a safe value if invalid
    if (!isValidCssValue(localValue)) {
      updateComponentStyle(cssProp, "auto");
      setLocalValue("auto");
    }
  };

  return (
    <Input
      type="text"
      placeholder={config.placeholder}
      className={config.inputClassName || ""}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default LocalizedInput;
