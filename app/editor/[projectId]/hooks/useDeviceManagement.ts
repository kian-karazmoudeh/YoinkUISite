import { useEffect } from "react";
import { Editor } from "grapesjs";
import { DeviceName, StyleValues } from "../types";
import { getDeviceKey, parseStyleValues } from "../utils/helpers";
import { changeStyleStateHandler } from "../utils/changeStyleStateHandler";

interface UseDeviceManagementProps {
  editor: Editor | null;
  currentDevice: DeviceName;
  setCurrentDevice: (device: DeviceName) => void;
  selectedComponent: any;
  setStyleValues: (values: StyleValues) => void;
  componentStyles: { [uid: string]: { lg: any; md: any; sm: any; base: any } };
  defaultStyles: Record<string, string> | undefined;
}

export const useDeviceManagement = ({
  editor,
  currentDevice,
  setCurrentDevice,
  selectedComponent,
  setStyleValues,
  componentStyles,
  defaultStyles,
}: UseDeviceManagementProps) => {
  useEffect(() => {
    if (!editor) return;

    // Listen for device changes
    const handleDeviceSelect = (device: any) => {
      const deviceName = device.get("name") as DeviceName;
      setCurrentDevice(deviceName);

      // Update panel button states
      const panel = editor.Panels.getPanel("device-manager-panel");
      if (panel) {
        const buttons = panel.get("buttons");
        if (buttons) {
          buttons.each((btn: any) => {
            btn.set(
              "active",
              btn.get("id") === `device-${deviceName.toLowerCase()}`
            );
          });
        }
      }

      if (selectedComponent) {
        changeStyleStateHandler(
          selectedComponent,
          componentStyles,
          deviceName,
          setStyleValues,
          defaultStyles
        );
      }
    };

    // Attach event listener
    editor.on("device:select", handleDeviceSelect);

    // Cleanup event listener
    return () => {
      editor.off("device:select", handleDeviceSelect);
    };
  }, [
    editor,
    setCurrentDevice,
    selectedComponent,
    setStyleValues,
    componentStyles,
    currentDevice,
  ]);

  // Function to handle device changes using GrapeJS device manager
  const handleDeviceChange = (deviceName: DeviceName) => {
    if (!editor) return;

    const deviceManager = editor.DeviceManager;
    const devices = deviceManager.getAll();
    const targetDevice = devices.find(
      (device: any) => device.get("name") === deviceName
    );

    if (targetDevice) {
      deviceManager.select(targetDevice);
      setCurrentDevice(deviceName);

      if (selectedComponent) {
        changeStyleStateHandler(
          selectedComponent,
          componentStyles,
          deviceName,
          setStyleValues,
          defaultStyles
        );
      }
    }
  };

  return { handleDeviceChange };
};
