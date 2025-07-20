import { create } from "zustand";
import { Component, Editor } from "grapesjs";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { getEditorConfig } from "../config/editorConfig";
import "../styles/editor.css";
import { StylesHashTable, DeviceKey, DeviceName, StyleValues } from "../types";
import {
  generateUID,
  getDeviceKey,
  getDefaultStyleValues,
  parseStyleValues,
} from "../utils/helpers";
import { changeStyleStateHandler } from "../utils/changeStyleStateHandler";

interface EditorState {
  // Editor instance
  editor: Editor | null;
  isEditorReady: boolean;
  contentLoaded: boolean;

  // Component management
  selectedComponent: any;
  stylesHashTable: StylesHashTable;

  // Device management
  currentDevice: DeviceName;

  // Style management
  styleValues: StyleValues;
  activeTab: string;

  // Default styles
  defaultStyles: Record<string, string> | undefined;
}

interface EditorActions {
  // Editor initialization
  initializeEditor: (content: string) => void;
  destroyEditor: () => void;
  setupEventListeners: (editor: Editor) => void;

  // Component management
  setSelectedComponent: (component: any) => void;
  addComponent: (component: any) => void;
  removeComponent: (component: any) => void;

  // Device management
  setCurrentDevice: (device: DeviceName) => void;
  handleDeviceChange: (deviceName: DeviceName) => void;

  // Style management
  setStyleValues: (values: StyleValues) => void;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => void;
  updateStyleHashTable: (
    uid: string,
    deviceKey: DeviceKey,
    property: string,
    value: string
  ) => void;

  // UI state
  setActiveTab: (tab: string) => void;
  setDefaultStyles: (styles: Record<string, string> | undefined) => void;
}

type EditorStore = EditorState & EditorActions;

export const useEditorStore = create<EditorStore>((set, get) => ({
  // Initial state
  editor: null,
  isEditorReady: false,
  contentLoaded: false,
  selectedComponent: null,
  stylesHashTable: {},
  currentDevice: "Desktop",
  styleValues: getDefaultStyleValues(),
  activeTab: "blocks",
  defaultStyles: undefined,

  // Editor initialization
  initializeEditor: (content: string) => {
    const container = document.getElementById("gjs-container");
    if (!container) {
      console.error("Editor container not found");
      return;
    }

    try {
      const editor = grapesjs.init(getEditorConfig({ content }));

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

      set({ editor, isEditorReady: true });

      // Set up event listeners
      get().setupEventListeners(editor);

      // Load content if provided
      if (content) {
        setTimeout(() => {
          editor.setComponents(content);
          set({ contentLoaded: true });
        }, 100);
      }
    } catch (error) {
      console.error("Error initializing editor:", error);
    }
  },

  destroyEditor: () => {
    const { editor } = get();
    if (editor) {
      editor.destroy();
      set({
        editor: null,
        isEditorReady: false,
        contentLoaded: false,
        selectedComponent: null,
        styleValues: getDefaultStyleValues(),
        activeTab: "blocks",
      });
    }
  },

  // Event listeners setup
  setupEventListeners: (editor: Editor) => {
    // Component add event
    editor.on("component:add", (component: any) => {
      console.log(get().stylesHashTable);
      get().addComponent(component);
    });

    // Component selection events
    editor.on("component:selected", (component: any) => {
      get().setSelectedComponent(component);
    });

    editor.on("component:deselected", () => {
      set({
        selectedComponent: null,
        styleValues: getDefaultStyleValues(),
        activeTab: "blocks",
      });
    });

    // Component removal event
    editor.on("component:remove", (component: any) => {
      get().removeComponent(component);
    });

    // Device selection event
    editor.on("device:select", (device: any) => {
      const deviceName = device.get("name") as DeviceName;
      get().setCurrentDevice(deviceName);
    });
  },

  // Component management
  setSelectedComponent: (component: any) => {
    set({ selectedComponent: component, activeTab: "styles" });

    const { stylesHashTable, currentDevice, defaultStyles } = get();
    const uid = component.getAttributes()["data-yoink-uid"];

    if (uid) {
      changeStyleStateHandler(
        component,
        stylesHashTable,
        currentDevice,
        (values: StyleValues) => set({ styleValues: values }),
        defaultStyles
      );
    }
  },

  addComponent: (component: Component) => {
    const current = component.getAttributes();

    // // Check if component already has a UID to prevent duplicate entries
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
    set((state) => ({
      stylesHashTable: {
        ...state.stylesHashTable,
        [uid]: {
          base: {},
          sm: {},
          md: {},
          lg: {},
        },
      },
    }));

    // Apply any existing styles from data-yoink-base if present
    if (current["data-yoink-base"]) {
      try {
        const styles = JSON.parse(current["data-yoink-base"]);
        component.setStyle(styles);

        // Update our styles object
        set((state) => ({
          stylesHashTable: {
            ...state.stylesHashTable,
            [uid]: {
              ...state.stylesHashTable[uid],
              base: styles,
            },
          },
        }));
      } catch (e) {
        console.error("Error parsing existing styles:", e);
      }
    }

    // Automatically select the component after it's added
    // setTimeout(() => {
    //   const { editor } = get();
    //   if (editor) {
    //     editor.select(component);
    //   }
    // }, 0);
  },

  removeComponent: (component: any) => {
    const current = component.getAttributes();
    const uid = current["data-yoink-uid"];

    if (uid) {
      set((state) => {
        const newStyles = { ...state.stylesHashTable };
        delete newStyles[uid];
        return { stylesHashTable: newStyles };
      });
    }
  },

  // Device management
  setCurrentDevice: (device: DeviceName) => {
    set({ currentDevice: device });

    const { editor, selectedComponent, stylesHashTable, defaultStyles } = get();

    // Update panel button states
    if (editor) {
      const panel = editor.Panels.getPanel("device-manager-panel");
      if (panel) {
        const buttons = panel.get("buttons");
        if (buttons) {
          buttons.each((btn: any) => {
            btn.set(
              "active",
              btn.get("id") === `device-${device.toLowerCase()}`
            );
          });
        }
      }
    }

    if (selectedComponent) {
      changeStyleStateHandler(
        selectedComponent,
        stylesHashTable,
        device,
        (values: StyleValues) => set({ styleValues: values }),
        defaultStyles
      );
    }
  },

  handleDeviceChange: (deviceName: DeviceName) => {
    const { editor, selectedComponent, stylesHashTable, defaultStyles } = get();

    if (!editor) return;

    const deviceManager = editor.DeviceManager;
    const devices = deviceManager.getAll();
    const targetDevice = devices.find(
      (device: any) => device.get("name") === deviceName
    );

    if (targetDevice) {
      deviceManager.select(targetDevice);
      set({ currentDevice: deviceName });

      if (selectedComponent) {
        changeStyleStateHandler(
          selectedComponent,
          stylesHashTable,
          deviceName,
          (values: StyleValues) => set({ styleValues: values }),
          defaultStyles
        );
      }
    }
  },

  // Style management
  setStyleValues: (values: StyleValues) => {
    set({ styleValues: values });
  },

  updateStyleHashTable: (
    uid: string,
    deviceKey: DeviceKey,
    property: string,
    value: string
  ) => {
    // Update our separate styles object
    set((state) => {
      const updated = { ...state.stylesHashTable };
      if (!updated[uid]) return state;

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

      return { stylesHashTable: updated };
    });
  },

  updateComponentStyle: (property: string, value: string) => {
    const { selectedComponent, currentDevice, updateStyleHashTable } = get();

    if (!selectedComponent) return;

    console.log(get().editor?.Css.getComponentRules(selectedComponent));

    // Get the component's UID
    const uid = selectedComponent.getAttributes()["data-yoink-uid"];
    if (!uid) return;

    // Get the current device key
    const deviceKey = getDeviceKey(currentDevice);

    // Update the component's style in GrapesJS
    selectedComponent.setStyle({ [property]: value });

    updateStyleHashTable(uid, deviceKey, property, value);

    // Update the UI state
    set((state) => ({
      styleValues: { ...state.styleValues, [property]: value },
    }));
  },

  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => {
    const { selectedComponent, currentDevice, updateStyleHashTable } = get();

    if (!selectedComponent) return;

    // Get the component's UID
    const uid = selectedComponent.getAttributes()["data-yoink-uid"];
    if (!uid) return;

    // Get the current device key
    const deviceKey = getDeviceKey(currentDevice);

    const finalValue =
      displayProperty === "opacity" ? `${parseInt(value) / 100}` : `${value}px`;
    const styleProperty = displayProperty || property;

    // Update the component's style in GrapesJS
    selectedComponent.setStyle({ [styleProperty]: finalValue });

    // Update our separate styles object (same logic as updateComponentStyle)
    updateStyleHashTable(uid, deviceKey, property, finalValue);

    // Update the UI state
    set((state) => ({
      styleValues: { ...state.styleValues, [property]: value },
    }));
  },

  // UI state
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  setDefaultStyles: (styles: Record<string, string> | undefined) => {
    set({ defaultStyles: styles });
  },
}));
