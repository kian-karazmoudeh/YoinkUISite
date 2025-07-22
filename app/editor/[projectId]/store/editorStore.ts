import { create } from "zustand";
import { Component, Device, Editor } from "grapesjs";
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

  // Component management
  selectedComponent: Component | null;

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

  // Yoink metadata
  setYoinkId: (id: string) => void;
  setYoinkName: (name: string) => void;
  setYoinkCreatorId: (id: string) => void;

  // Component management
  setSelectedComponent: (component: Component) => void;
  addComponent: (component: Component) => void;

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
  selectedComponent: null,
  currentDevice: "Desktop",
  styleValues: {},
  activeTab: "blocks",
  defaultBaseStyles: undefined,
  defaultTailwindStyles: undefined,
  yoinkId: null,
  yoinkName: null,
  yoinkCreatorId: null,
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

      // Set up event listeners
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
          styleValues: {},
          activeTab: "blocks",
        });
      });

      // Device selection event
      editor.on("device:select", (device: Device) => {
        const deviceName = device.get("name") as DeviceName;
        get().setCurrentDevice(deviceName);
      });

      editor.Storage.add("remote", {
        // This method will be called when saving the project
        async store(data) {
          console.log("Saving project to Supabase Storage...", data);
          try {
            const supabase = createClient();
            // IMPORTANT: window.projectId must be set by the main page before initializing the editor

            const filePath = `${get().yoinkCreatorId}/${get().yoinkId}.json`;
            // Convert data to string if needed
            const fileContent =
              typeof data === "string" ? data : JSON.stringify(data);
            // console.log(fileContent);
            console.log(filePath);
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

            console.log("Updated yoink in database");

            return { result: "success", filePath };
          } catch (err: any) {
            console.error(
              "Unexpected error uploading project:",
              err?.message || err
            );
            return { error: err?.message || "Unknown error" };
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
            // console.log(textContent);
            return textContent;
          } catch (err: any) {
            console.error(
              "Unexpected error loading project:",
              err?.message || err
            );
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
        selectedComponent: null,
        styleValues: {},
        activeTab: "blocks",
      });
    }
  },

  // Yoink metadata
  setYoinkId: (id: string) => set({ yoinkId: id }),
  setYoinkName: (name: string) => set({ yoinkName: name }),
  setYoinkCreatorId: (id: string) => set({ yoinkCreatorId: id }),

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
  },

  // Device management
  setCurrentDevice: (device: DeviceName) => {
    set({ currentDevice: device });

    const { editor, selectedComponent } = get();

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
  setStyleValues: (values: Record<string, string>) => {
    set({ styleValues: values });
  },

  changeStyleState: () => {
    const {
      editor,
      selectedComponent,
      defaultBaseStyles,
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

      if (defaultBaseStyles && defaultBaseStyles["div"]) {
        console.log(defaultBaseStyles["div"]);
        setStyleValues({
          ...defaultBaseStyles["div"],
          ...baseStyles,
          ...viewportStyles,
        });
      } else {
        setStyleValues({ ...baseStyles, ...viewportStyles });
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
