"use client";

import { useEffect, useRef, useState } from "react";
import grapesjs, { Component, Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { blocks } from "./components/blocks";

// Type for the component styles object
interface ComponentStyles {
  [uid: string]: {
    lg: { [key: string]: string };
    md: { [key: string]: string };
    sm: { [key: string]: string };
  };
}

export default function EditorPage() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const editorRef = useRef<Editor>(null);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [currentDevice, setCurrentDevice] = useState("Desktop");
  const [componentStyles, setComponentStyles] = useState<ComponentStyles>({});
  const [styleValues, setStyleValues] = useState({
    width: "",
    height: "",
    display: "block",
    fontSize: "16",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "",
    margin: "",
    borderWidth: "0",
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: "0",
    opacity: "100",
    boxShadow: "",
  });

  // Helper function to generate UID
  const generateUID = () => {
    return `yoink-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Helper function to get device key
  const getDeviceKey = (deviceName: string) => {
    switch (deviceName) {
      case "Desktop":
        return "lg";
      case "Tablet":
        return "md";
      case "Mobile":
        return "sm";
      default:
        return "lg";
    }
  };

  // Helper function to update component styles in the object
  const updateComponentStylesObject = (
    uid: string,
    deviceKey: "lg" | "md" | "sm",
    property: string,
    value: string
  ) => {
    setComponentStyles((prev) => ({
      ...prev,
      [uid]: {
        ...prev[uid],
        [deviceKey]: {
          ...prev[uid]?.[deviceKey],
          [property]: value,
        },
      },
    }));
  };

  useEffect(() => {
    if (!editorRef.current) {
      // Initialize GrapeJS editor
      const editor = grapesjs.init({
        container: "#gjs-container",
        height: "100vh",
        width: "auto",
        storageManager: false,
        panels: {
          defaults: [
            {
              id: "device-manager-panel",
              el: ".device-manager-panel",
              buttons: [
                {
                  id: "device-desktop",
                  label: "Desktop",
                  command: "set-device-desktop",
                  active: true,
                  togglable: false,
                },
                {
                  id: "device-tablet",
                  label: "Tablet",
                  command: "set-device-tablet",
                  togglable: false,
                },
                {
                  id: "device-mobile",
                  label: "Mobile",
                  command: "set-device-mobile",
                  togglable: false,
                },
              ],
            },
            {
              buttons: [],
            },
          ],
        },
        blockManager: {
          appendTo: "#blocks",
          blocks: blocks,
        },
        layerManager: {
          appendTo: ".layers-container",
        },
        // Add Device Manager configuration
        deviceManager: {
          devices: [
            {
              name: "Desktop",
              width: "", // Full width
              widthMedia: "1200px",
            },
            {
              name: "Tablet",
              width: "768px",
              widthMedia: "768px",
            },
            {
              name: "Mobile",
              width: "375px",
              widthMedia: "375px",
            },
          ],
        },
      });

      // Add device switching commands
      editor.Commands.add("set-device-desktop", {
        run: () => {
          const deviceManager = editor.DeviceManager;
          const desktopDevice = deviceManager
            .getAll()
            .find((device: any) => device.get("name") === "Desktop");
          if (desktopDevice) {
            deviceManager.select(desktopDevice);
          }
        },
      });

      editor.Commands.add("set-device-tablet", {
        run: () => {
          const deviceManager = editor.DeviceManager;
          const tabletDevice = deviceManager
            .getAll()
            .find((device: any) => device.get("name") === "Tablet");
          if (tabletDevice) {
            deviceManager.select(tabletDevice);
          }
        },
      });

      editor.Commands.add("set-device-mobile", {
        run: () => {
          const deviceManager = editor.DeviceManager;
          const mobileDevice = deviceManager
            .getAll()
            .find((device: any) => device.get("name") === "Mobile");
          if (mobileDevice) {
            deviceManager.select(mobileDevice);
          }
        },
      });

      // Listen for component creation
      editor.on("component:add", (component: any) => {
        const current = component.getAttributes();

        // Check if component already has a UID to prevent duplicate entries
        if (current["data-yoink-uid"]) {
          return; // Component already processed, skip
        }

        // Check if this is a text node - only text nodes should get UIDs
        if (component.get("type") == "textnode") {
          return; // Skip non-text nodes
        }

        const uid = generateUID();

        // Set the UID attribute
        component.setAttributes({
          ...current,
          "data-yoink-uid": uid,
        });

        // Initialize the component styles in our object
        setComponentStyles((prev) => ({
          ...prev,
          [uid]: {
            lg: {},
            md: {},
            sm: {},
          },
        }));

        // Apply any existing styles from data-yoink-sm if present
        if (current["data-yoink-sm"]) {
          try {
            const styles = JSON.parse(current["data-yoink-sm"]);
            component.setStyle(styles);

            // Update our styles object
            setComponentStyles((prev) => ({
              ...prev,
              [uid]: {
                ...prev[uid],
                sm: styles,
              },
            }));
          } catch (e) {
            console.error("Error parsing existing styles:", e);
          }
        }
      });

      // Listen for component selection
      editor.on("component:selected", (component: any) => {
        setSelectedComponent(component);
        const styles = component.getStyle();
        setStyleValues({
          width: styles["width"] || "",
          height: styles.height || "",
          display: styles.display || "block",
          fontSize: styles["font-size"] || "16",
          fontWeight: styles["font-weight"] || "normal",
          textAlign: styles["text-align"] || "left",
          backgroundColor: styles["background-color"] || "#ffffff",
          color: styles.color || "#000000",
          padding: styles.padding || "",
          margin: styles.margin || "",
          borderWidth: styles["border-width"] || "0",
          borderColor: styles["border-color"] || "#000000",
          borderStyle: styles["border-style"] || "solid",
          borderRadius: styles["border-radius"] || "0",
          opacity: styles.opacity
            ? Math.round(parseFloat(styles.opacity) * 100).toString()
            : "100",
          boxShadow: styles["box-shadow"] || "",
        });

        // Debug: Log the component's UID and current styles object
        const uid = component.getAttributes()["data-yoink-uid"];
        if (uid) {
          console.log("Selected component UID:", uid);
          console.log("Current componentStyles object:", componentStyles);
        }
      });

      // Listen for component deselection
      editor.on("component:deselected", (component: any) => {
        setSelectedComponent(null);
        setStyleValues({
          width: "",
          height: "",
          display: "block",
          fontSize: "16",
          fontWeight: "normal",
          textAlign: "left",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "",
          margin: "",
          borderWidth: "0",
          borderColor: "#000000",
          borderStyle: "solid",
          borderRadius: "0",
          opacity: "100",
          boxShadow: "",
        });
      });

      // Listen for component removal
      editor.on("component:remove", (component: any) => {
        const current = component.getAttributes();
        const uid = current["data-yoink-uid"];
        if (uid) {
          setComponentStyles((prev) => {
            const newStyles = { ...prev };
            delete newStyles[uid];
            return newStyles;
          });
        }
      });

      // Listen for device changes
      editor.on("device:select", (device: any) => {
        const deviceName = device.get("name");
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
          const styles = selectedComponent.getStyle();
          setStyleValues({
            width: styles["width"] || "",
            height: styles.height || "",
            display: styles.display || "block",
            fontSize: styles["font-size"] || "16",
            fontWeight: styles["font-weight"] || "normal",
            textAlign: styles["text-align"] || "left",
            backgroundColor: styles["background-color"] || "#ffffff",
            color: styles.color || "#000000",
            padding: styles.padding || "",
            margin: styles.margin || "",
            borderWidth: styles["border-width"] || "0",
            borderColor: styles["border-color"] || "#000000",
            borderStyle: styles["border-style"] || "solid",
            borderRadius: styles["border-radius"] || "0",
            opacity: styles.opacity
              ? Math.round(parseFloat(styles.opacity) * 100).toString()
              : "100",
            boxShadow: styles["box-shadow"] || "",
          });
        }
      });

      // Add minimal custom CSS for GrapeJS editor layout
      const style = document.createElement("style");
      style.textContent = `
      .gjs-cv-canvas, .gjs-cv-canvas-wrapper {
        box-sizing: border-box !important;
        border: none !important;
        margin: 0 !important;
        overflow: hidden !important;
      }
      .gjs-cv-canvas {
        top: 0;
        width: 100%;
        height: 100%;
      }
      .panel__basic-actions {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 100;
        background: #374151;
        padding: 10px;
        border-radius: 0 0 0 8px;
      }
      .panel__basic-actions button:hover {
        background: #f3f4f6;
      }
      .gjs-block {
        width: 100%;
        height: auto;
        min-height: auto;
        margin: 0;
        padding: 10px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
      }
      .gjs-block:hover {
        background: #f9fafb;
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      .gjs-block-label {
        font-size: 12px;
        text-align: center;
        margin-top: 5px;
        color: #374151;
      }
      .gjs-block-category {
        font-weight: bold;
        margin-bottom: 10px;
        padding: 5px;
        background: #e5e7eb;
        border-radius: 4px;
        font-size: 14px;
        color: #374151;
      }
      .block-preview {
        pointer-events: none;
      }
      
      /* Device Manager Styles */
      .gjs-cv-canvas {
        transition: all 0.3s ease;
      }
      
      /* Hide default device manager panel */
      .gjs-pn-devices {
        display: none !important;
      }
      
      /* Custom device manager styles */
      .device-manager {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      
      .device-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 12px;
        font-weight: 500;
      }
      
      .device-btn:hover {
        background: #f9fafb;
      }
      
      .device-btn.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
      
      .device-btn svg {
        width: 14px;
        height: 14px;
      }
      
      /* GrapeJS Device Manager Panel Styles */
      .device-manager-panel {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      
      .device-manager-panel .gjs-pn-btn {
        background: #4b5563;
        color: white;
        border: 1px solid #6b7280;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        min-width: 60px;
        text-align: center;
      }
      
      .device-manager-panel .gjs-pn-btn:hover {
        background: #6b7280;
      }
      
      .device-manager-panel .gjs-pn-btn.gjs-pn-active {
        background: #3b82f6;
        border-color: #3b82f6;
      }
      
      /* Device preview styles */
      .gjs-cv-canvas {
        transition: all 0.3s ease;
      }
      
      /* Responsive canvas wrapper */
      .gjs-cv-canvas-wrapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100%;
        /* Remove padding here, will be set dynamically */
        background: #f9fafb;
      }
    `;
      document.head.appendChild(style);

      editorRef.current = editor;
      setEditor(editor);

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
        document.head.removeChild(style);
      };
    }
  }, []);

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

  // Function to handle device changes using GrapeJS device manager
  const handleDeviceChange = (deviceName: string) => {
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
        const styles = selectedComponent.getStyle();
        setStyleValues({
          width: styles["width"] || "",
          height: styles.height || "",
          display: styles.display || "block",
          fontSize: styles["font-size"] || "16",
          fontWeight: styles["font-weight"] || "normal",
          textAlign: styles["text-align"] || "left",
          backgroundColor: styles["background-color"] || "#ffffff",
          color: styles.color || "#000000",
          padding: styles.padding || "",
          margin: styles.margin || "",
          borderWidth: styles["border-width"] || "0",
          borderColor: styles["border-color"] || "#000000",
          borderStyle: styles["border-style"] || "solid",
          borderRadius: styles["border-radius"] || "0",
          opacity: styles.opacity
            ? Math.round(parseFloat(styles.opacity) * 100).toString()
            : "100",
          boxShadow: styles["box-shadow"] || "",
        });
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="panel__top bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Device:</span>
            <span className="text-sm bg-blue-500 px-2 py-1 rounded">
              {currentDevice}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Width:</span>
            <span className="text-sm bg-gray-600 px-2 py-1 rounded">
              {currentDevice === "Desktop"
                ? "100%"
                : currentDevice === "Tablet"
                ? "768px"
                : "375px"}
            </span>
          </div>
        </div>
        {/* Device Manager Panel */}
        <div className="device-manager-panel"></div>
      </div>
      <div className="flex flex-1 h-full">
        <LeftSidebar
          editor={editor}
          setCurrentDevice={handleDeviceChange}
          currentDevice={currentDevice}
        />
        <div className="flex-1 h-full">
          <div id="gjs-container" className="h-full"></div>
        </div>
        <RightSidebar
          selectedComponent={selectedComponent}
          styleValues={styleValues}
          updateComponentStyle={updateComponentStyle}
          handleSliderChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
