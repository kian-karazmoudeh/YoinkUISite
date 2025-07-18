import { ComponentStyles, DeviceKey, DeviceName, StyleValues } from "../types";
import { getDeviceKey } from "../utils/helpers";

interface UseStyleManagementProps {
  selectedComponent: any;
  currentDevice: DeviceName;
  componentStyles: ComponentStyles;
  setComponentStyles: React.Dispatch<React.SetStateAction<ComponentStyles>>;
  setStyleValues: React.Dispatch<React.SetStateAction<StyleValues>>;
}

export const useStyleManagement = ({
  selectedComponent,
  currentDevice,
  componentStyles,
  setComponentStyles,
  setStyleValues,
}: UseStyleManagementProps) => {
  // Helper function to update component styles in the object
  const updateComponentStylesObject = (
    uid: string,
    deviceKey: DeviceKey,
    property: string,
    value: string
  ) => {
    setComponentStyles((prev) => {
      const updated = { ...prev };
      if (!updated[uid]) return prev;
      // Helper to check if a property exists for a device
      const hasProp = (dev: DeviceKey) =>
        !!updated[uid][dev]?.hasOwnProperty(property);

      if (deviceKey === "lg") {
        const smHas = hasProp("sm");
        const mdHas = hasProp("md");
        if (!smHas && !mdHas) {
          // Both md and sm don't have it: add to all
          updated[uid]["sm"] = { ...updated[uid]["sm"], [property]: value };
          updated[uid]["md"] = { ...updated[uid]["md"], [property]: value };
          updated[uid]["lg"] = { ...updated[uid]["lg"], [property]: value };
        } else if (smHas && !mdHas) {
          // Only md doesn't have it: add to md and lg
          updated[uid]["md"] = { ...updated[uid]["md"], [property]: value };
          updated[uid]["lg"] = { ...updated[uid]["lg"], [property]: value };
        } else {
          // Both have it: add to lg only
          updated[uid]["lg"] = { ...updated[uid]["lg"], [property]: value };
        }
      } else if (deviceKey === "md") {
        const smHas = hasProp("sm");
        if (!smHas) {
          // If sm doesn't have it, add to both sm and md
          updated[uid]["sm"] = { ...updated[uid]["sm"], [property]: value };
          updated[uid]["md"] = { ...updated[uid]["md"], [property]: value };
        } else {
          // sm has: add to md only
          updated[uid]["md"] = { ...updated[uid]["md"], [property]: value };
        }
      } else if (deviceKey === "sm") {
        // Just add to sm
        updated[uid]["sm"] = { ...updated[uid]["sm"], [property]: value };
      }
      return updated;
    });
  };

  // Function to update component styles
  const updateComponentStyle = (property: string, value: string) => {
    if (!selectedComponent) return;

    // Get the component's UID
    const uid = selectedComponent.getAttributes()["data-yoink-uid"];
    if (!uid) return;

    // Get the current device key
    const deviceKey = getDeviceKey(currentDevice);

    // Update the component's style in GrapesJS
    selectedComponent.setStyle({ [property]: value });

    // Update our separate styles object
    updateComponentStylesObject(uid, deviceKey, property, value);

    // Update the UI state
    setStyleValues((prev) => ({ ...prev, [property]: value }));
    console.log(componentStyles);
  };

  // Function to handle slider changes
  const handleSliderChange = (
    property: string,
    value: string,
    displayProperty?: string
  ) => {
    if (!selectedComponent) return;

    // Get the component's UID
    const uid = selectedComponent.getAttributes()["data-yoink-uid"];
    if (!uid) return;

    // Get the current device key
    const deviceKey = getDeviceKey(currentDevice);

    const finalValue =
      displayProperty === "opacity" ? `${parseInt(value) / 100}` : `${value}`;
    const styleProperty = displayProperty || property;

    // Update the component's style in GrapesJS
    selectedComponent.setStyle({ [styleProperty]: finalValue });

    // Update our separate styles object
    updateComponentStylesObject(uid, deviceKey, styleProperty, finalValue);

    // Update the UI state
    setStyleValues((prev) => ({ ...prev, [property]: value }));
  };

  return {
    updateComponentStyle,
    handleSliderChange,
    updateComponentStylesObject,
  };
};
