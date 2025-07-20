import { create } from "zustand";
import { Component, Device, Editor } from "grapesjs";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { getEditorConfig } from "../config/editorConfig";
import "../styles/editor.css";
import { DeviceName, StyleValues } from "../types";
import { getDefaultStyleValues, parseStyleValues } from "../utils/helpers";

interface EditorState {
  // Editor instance
  editor: Editor | null;
  isEditorReady: boolean;
  contentLoaded: boolean;

  // Component management
  selectedComponent: Component | null;

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
  setSelectedComponent: (component: Component) => void;
  addComponent: (component: Component) => void;

  // Device management
  setCurrentDevice: (device: DeviceName) => void;
  handleDeviceChange: (deviceName: DeviceName) => void;

  // Style management
  setStyleValues: (values: StyleValues) => void;
  changeStyleState: () => void;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
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
    editor.on("component:add", (component: Component) => {
      get().addComponent(component);
    });

    // Component selection events
    editor.on("component:selected", (component: Component) => {
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
    // editor.on("component:remove", (component: any) => {
    //   get().removeComponent(component);
    // });

    // Device selection event
    editor.on("device:select", (device: Device) => {
      const deviceName = device.get("name") as DeviceName;
      get().setCurrentDevice(deviceName);
    });
  },

  // Component management
  setSelectedComponent: (component: Component) => {
    set({ selectedComponent: component, activeTab: "styles" });

    get().changeStyleState();
  },

  addComponent: (component: Component) => {
    const current = component.getAttributes();

    // Apply any existing styles from data-yoink-base if present
    if (current["data-yoink-base"]) {
      try {
        const styles = JSON.parse(current["data-yoink-base"]);
        component.setStyle(styles);
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

  // Device management
  setCurrentDevice: (device: DeviceName) => {
    set({ currentDevice: device });

    const { editor, selectedComponent, defaultStyles } = get();

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
      get().changeStyleState();
    }
  },

  handleDeviceChange: (deviceName: DeviceName) => {
    const { editor, selectedComponent } = get();

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
        get().changeStyleState();
      }
    }
  },

  // Style management
  setStyleValues: (values: StyleValues) => {
    set({ styleValues: values });
  },

  changeStyleState: () => {
    const {
      editor,
      selectedComponent,
      defaultStyles,
      currentDevice,
      setStyleValues,
    } = get();
    if (!selectedComponent) return;

    const styles = editor?.Css.getComponentRules(selectedComponent);
    if (styles) {
      let baseStyles = {};
      let viewportStyles = {};
      let currentStyles = {};
      for (const rule of styles) {
        if (rule.getDevice().getName() != currentDevice) {
          viewportStyles = { ...viewportStyles, ...rule.getStyle() };
        } else {
          currentStyles = { ...currentStyles, ...rule.getStyle() };
        }
      }
      viewportStyles = { ...viewportStyles, ...currentStyles };

      if (defaultStyles) {
        setStyleValues(
          parseStyleValues({
            ...defaultStyles,
            ...baseStyles,
            ...viewportStyles,
          })
        );
      } else {
        setStyleValues(parseStyleValues({ ...baseStyles, ...viewportStyles }));
      }
    }
  },

  updateComponentStyle: (property: string, value: string) => {
    const { selectedComponent } = get();

    if (!selectedComponent) return;

    // Update the component's style in GrapesJS
    selectedComponent.setStyle({ [property]: value });

    // update the style state
    get().changeStyleState();
  },

  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => {
    const { selectedComponent } = get();

    if (!selectedComponent) return;

    const finalValue =
      displayProperty === "opacity" ? `${parseInt(value) / 100}` : `${value}px`;
    const styleProperty = displayProperty || property;

    // Update the component's style in GrapesJS
    selectedComponent.setStyle({ [styleProperty]: finalValue });

    // update the style state
    get().changeStyleState();
  },

  // UI state
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  setDefaultStyles: (styles: Record<string, string> | undefined) => {
    set({ defaultStyles: styles });
  },
}));
