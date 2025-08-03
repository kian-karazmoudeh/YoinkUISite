import { create } from "zustand";
import { Button, Component, Device, Editor } from "grapesjs";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { getEditorConfig } from "../config/editorConfig";
import "../styles/editor.css";
import { DeviceName } from "../types";
import { initBaseDefaultStyles } from "../utils/defaultStyles/base";
import { initTailwindDefaultStyles } from "../utils/defaultStyles/tailwind";
import { objectToUniversalCss } from "../utils/objectToUniversalCss";
import { createClient } from "@/utils/supabase/client";

interface EditorState {
  // Editor instance
  editor: Editor | null;
  isEditorReady: boolean;

  // Yoink metadata
  yoinkId: string | null;
  yoinkName: string | null;
  yoinkCreatorId: string | null;
  defaultBgColor: string | undefined;

  // Component management
  selectedComponents: Component[];

  // Device management
  currentDevice: DeviceName;

  // Style management
  styleValues: Record<string, string>;
  activeTab: string;

  // Default styles
  defaultBaseStyles: Record<string, Record<string, string>> | undefined;
  defaultTailwindStyles: Record<string, Record<string, string>> | undefined;
}

interface EditorActions {
  // Editor initialization
  initializeEditor: () => Promise<void>;
  destroyEditor: () => void;
  resetStore: () => void;

  // Yoink metadata
  setYoinkId: (id: string) => void;
  setYoinkName: (name: string) => void;
  setYoinkCreatorId: (id: string) => void;
  setDefaultBgColor: (color: string) => void;
  // Component management
  setSelectedComponents: () => void;

  // Device management
  setCurrentDevice: (device: DeviceName) => void;
  handleDeviceChange: (deviceName: DeviceName) => void;

  // Style management
  setStyleValues: (values: Record<string, string>) => void;
  changeStyleState: () => void;
  updateComponentStyle: (property: string, value: string) => void;
  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => void;

  // UI state
  setActiveTab: (tab: string) => void;
  setDefaultBaseStyles: (
    styles: Record<string, Record<string, string>> | undefined
  ) => void;
  setDefaultTailwindStyles: (
    styles: Record<string, Record<string, string>> | undefined
  ) => void;
}

type EditorStore = EditorState & EditorActions;

export const useEditorStore = create<EditorStore>((set, get) => ({
  // Initial state
  editor: null,
  isEditorReady: false,
  selectedComponents: [],
  currentDevice: "Desktop",
  styleValues: {},
  activeTab: "blocks",
  defaultBaseStyles: undefined,
  defaultTailwindStyles: undefined,
  yoinkId: null,
  yoinkName: null,
  yoinkCreatorId: null,
  defaultBgColor: undefined,
  // Editor initialization
  initializeEditor: async () => {
    // const { defaultBaseStyles } = get();

    const container = document.getElementById("gjs-container");
    if (!container) {
      console.error("Editor container not found");
      return;
    }

    try {
      const editor = grapesjs.init(getEditorConfig());
      // Load base default styles
      const defaultBaseStyles = await initBaseDefaultStyles();
      // Load tailwind default styles
      initTailwindDefaultStyles();

      if (defaultBaseStyles) {
        const cssString = objectToUniversalCss(defaultBaseStyles["div"]);
        editor.addStyle(cssString);
      }

      // Add device switching commands
      editor.Commands.add("set-device-desktop", {
        run: () => {
          const deviceManager = editor.DeviceManager;
          const desktopDevice = deviceManager
            .getAll()
            .find((device: Device) => device.get("name") === "Desktop");
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
            .find((device: Device) => device.get("name") === "Tablet");
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
            .find((device: Device) => device.get("name") === "Mobile");
          if (mobileDevice) {
            deviceManager.select(mobileDevice);
          }
        },
      });

      // Set up event listeners

      // Component selection events
      editor.on("component:selected", () => {
        get().setSelectedComponents();
        console.log(get().selectedComponents[0].getStyle());
      });

      editor.on("component:deselected", () => {
        set({
          selectedComponents: [],
          styleValues: {},
          activeTab: "blocks",
        });
      });

      // Device selection event
      editor.on("device:select", (device: Device) => {
        const deviceName = device.get("name") as DeviceName;
        get().setCurrentDevice(deviceName);
      });

      editor.on("asset:open", () => {
        editor.AssetManager.close();
      });

      editor.Storage.add("remote", {
        // This method will be called when saving the project
        async store(data) {
          try {
            const supabase = createClient();
            // IMPORTANT: window.projectId must be set by the main page before initializing the editor

            const filePath = `${get().yoinkCreatorId}/${get().yoinkId}.json`;
            // Convert data to string if needed
            const fileContent =
              typeof data === "string" ? data : JSON.stringify(data);
            const { error } = await supabase.storage
              .from("yoink-content")
              .upload(filePath, fileContent, {
                upsert: true,
                contentType: "application/json",
              });
            if (error) {
              console.error("Error uploading project:", error.message);
              return { error: error.message };
            }

            supabase
              .from("yoinks")
              .update({
                updated_at: new Date().toISOString(),
                content_url: filePath,
              })
              .eq("id", get().yoinkId);

            return { result: "success", filePath };
          } catch (err: unknown) {
            const errorMessage =
              err instanceof Error ? err.message : String(err);
            console.error("Unexpected error uploading project:", errorMessage);
            return { error: errorMessage };
          }
        },
        // This method will be called when loading the project
        async load() {
          try {
            const supabase = createClient();
            const filePath = `${get().yoinkCreatorId}/${get().yoinkId}.json`;
            const { data: fileData, error } = await supabase.storage
              .from("yoink-content")
              .download(filePath);
            if (error || !fileData) {
              console.error("Error downloading project:", error?.message);
              return {};
            }
            const textContent = JSON.parse(await fileData.text());
            return textContent;
          } catch (err: unknown) {
            const errorMessage =
              err instanceof Error ? err.message : String(err);
            console.error("Unexpected error loading project:", errorMessage);
            return {};
          }
        },
      });

      // Load content if provided
      set({ editor, isEditorReady: true });
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
        selectedComponents: [],
        styleValues: {},
        activeTab: "blocks",
      });
    }
  },

  resetStore: () => {
    const { editor } = get();
    if (editor) {
      editor.destroy();
    }
    set({
      editor: null,
      isEditorReady: false,
      yoinkId: null,
      yoinkName: null,
      yoinkCreatorId: null,
      currentDevice: "Desktop",
      selectedComponents: [],
      styleValues: {},
      activeTab: "blocks",
      defaultBgColor: undefined,
    });
  },

  // Yoink metadata
  setYoinkId: (id: string) => set({ yoinkId: id }),
  setYoinkName: (name: string) => set({ yoinkName: name }),
  setYoinkCreatorId: (id: string) => set({ yoinkCreatorId: id }),
  setDefaultBgColor: (color: string) => set({ defaultBgColor: color }),
  // Component management
  setSelectedComponents: () => {
    const { editor } = get();
    if (!editor) return;
    const selected = editor.getSelectedAll();
    set({ selectedComponents: selected, activeTab: "styles" });
    get().changeStyleState();
  },

  // Device management
  setCurrentDevice: (device: DeviceName) => {
    set({ currentDevice: device });

    const { editor, selectedComponents } = get();

    // Update panel button states
    if (editor) {
      const panel = editor.Panels.getPanel("device-manager-panel");
      if (panel) {
        const buttons = panel.get("buttons");
        if (buttons) {
          buttons.each((btn: Button) => {
            btn.set(
              "active",
              btn.get("id") === `device-${device.toLowerCase()}`
            );
          });
        }
      }
    }

    if (selectedComponents.length > 0) {
      get().changeStyleState();
    }
  },

  handleDeviceChange: (deviceName: DeviceName) => {
    const { editor, selectedComponents } = get();

    if (!editor) return;

    const deviceManager = editor.DeviceManager;
    const devices = deviceManager.getAll();
    const targetDevice = devices.find(
      (device: Device) => device.get("name") === deviceName
    );

    if (targetDevice) {
      deviceManager.select(targetDevice);
      set({ currentDevice: deviceName });

      if (selectedComponents.length > 0) {
        get().changeStyleState();
      }
    }
  },

  // Style management
  setStyleValues: (values: Record<string, string>) => {
    set({ styleValues: values });
  },

  changeStyleState: () => {
    const {
      editor,
      selectedComponents,
      defaultBaseStyles,
      currentDevice,
      setStyleValues,
    } = get();
    if (!selectedComponents || selectedComponents.length === 0) return;

    // Helper to get styles for a component
    const getComponentStyles = (component: Component) => {
      const styles = editor?.Css.getComponentRules(component);
      let viewportStyles = {};
      let currentStyles = {};
      if (styles) {
        for (const rule of styles) {
          if (rule.getDevice().getName() != currentDevice) {
            viewportStyles = { ...viewportStyles, ...rule.getStyle() };
          } else {
            currentStyles = { ...currentStyles, ...rule.getStyle() };
          }
        }
      }
      return { ...viewportStyles, ...currentStyles };
    };

    // Get intersection of styles
    let intersection: Record<string, string> = {};
    if (selectedComponents.length === 1) {
      intersection = getComponentStyles(selectedComponents[0]);
    } else {
      const allStyles: Record<string, string>[] =
        selectedComponents.map(getComponentStyles);
      const keys = allStyles.reduce(
        (acc: Set<string>, style: Record<string, string>) => {
          Object.keys(style).forEach((k) => acc.add(k));
          return acc;
        },
        new Set<string>()
      );
      Array.from(keys).forEach((key: string) => {
        const firstVal = allStyles[0][key];
        if (allStyles.every((style) => style[key] === firstVal)) {
          intersection[key] = firstVal;
        }
      });
    }

    if (defaultBaseStyles && defaultBaseStyles["div"]) {
      setStyleValues({
        ...defaultBaseStyles["div"],
        ...intersection,
      });
    } else {
      setStyleValues({ ...intersection });
    }
  },

  updateComponentStyle: (property: string, value: string) => {
    const { selectedComponents } = get();
    if (!selectedComponents || selectedComponents.length === 0) return;
    selectedComponents.forEach((component) => {
      component.setStyle({ [property]: value });
    });
    get().changeStyleState();
  },

  handleSliderChange: (
    property: string,
    value: string,
    displayProperty?: string
  ) => {
    const { selectedComponents } = get();
    if (!selectedComponents || selectedComponents.length === 0) return;
    const finalValue =
      displayProperty === "opacity" ? `${parseInt(value) / 100}` : `${value}px`;
    const styleProperty = displayProperty || property;
    selectedComponents.forEach((component) => {
      component.setStyle({ [styleProperty]: finalValue });
    });
    get().changeStyleState();
  },

  // UI state
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  setDefaultBaseStyles: (
    styles: Record<string, Record<string, string>> | undefined
  ) => {
    set({ defaultBaseStyles: styles });
  },

  setDefaultTailwindStyles: (
    styles: Record<string, Record<string, string>> | undefined
  ) => {
    set({ defaultTailwindStyles: styles });
  },
}));
