import { create } from "zustand";
import { Component, Device, Editor } from "grapesjs";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { getEditorConfig } from "../config/editorConfig";
import "../styles/editor.css";
import { DeviceName, Theme } from "../types";
import { initBaseDefaultStyles } from "../utils/defaultStyles/base";
import { initTailwindDefaultStyles } from "../utils/defaultStyles/tailwind";
import { objectToUniversalCss } from "../utils/objectToUniversalCss";
import { createClient } from "@/utils/supabase/client";
import { getMergedComponentStyles } from "../utils/helpers";
import { colorToHex } from "../export/tailwind/utils/colors/colorToHex";

interface ComponentTheme {
  colorId?: string;
}

interface EditorState {
  // Editor instance
  editor: Editor | null;

  // Yoink metadata
  yoinkId: string | null;
  yoinkName: string | null;
  yoinkCreatorId: string | null;
  defaultBgColor: string | undefined;

  // Theme Management
  themes: Map<string, Theme>;

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
  resetStore: () => void;

  // Yoink metadata
  setYoinkId: (id: string) => void;
  setYoinkName: (name: string) => void;
  setYoinkCreatorId: (id: string) => void;
  setDefaultBgColor: (color: string) => void;

  // Device management
  setCurrentDevice: (deviceName: DeviceName) => void;

  // Style management
  updateComponentStyleProperty: (property: string, value: string) => void;
  calculateThemes: () => void;
  setTheme: (newTheme: Map<string, Theme>) => void;
  refreshThemeColors: () => void;

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

export const useEditorStore = create<EditorStore>((set, get) => {
  let componentToThemeMap = new Map<string, ComponentTheme>();

  const updateStyleState = () => {
    const { editor, selectedComponents, defaultBaseStyles, currentDevice } =
      get();
    if (!selectedComponents || selectedComponents.length === 0) return;

    const newStyleValues = getMergedComponentStyles({
      component: selectedComponents[0],
      defaultBaseStyles,
      device: currentDevice,
      editor,
    });

    set({ styleValues: newStyleValues });
  };

  const onComponentSelect = () => {
    const { editor, activeTab } = get();
    if (!editor) return;
    const selected = editor.getSelectedAll();
    set({
      selectedComponents: selected,
      activeTab: activeTab == "layers" ? "layers" : "styles",
    });
    updateStyleState();
  };

  const onComponentDeselect = () => {
    set({
      selectedComponents: [],
      styleValues: {},
      // activeTab: "blocks",
    });
  };

  function updateThemeMapWithValues(updatedThemes: Map<string, Theme>) {
    const themeMap = get().themes;
    if (!themeMap) return;

    // Step 1: Convert themeMap to array and sort by priority descending
    const sortedThemes = Array.from(themeMap.entries()).sort(
      (a, b) => b[1].priority - a[1].priority
    );

    // Step 2: Sort updatedThemes by priority descending
    const sortedUpdatedThemes = Array.from(updatedThemes.entries()).sort(
      (a, b) => b[1].priority - a[1].priority
    );

    // Step 3: Update the highest priority themes first
    for (
      let i = 0;
      i < sortedThemes.length && i < sortedUpdatedThemes.length;
      i++
    ) {
      const [themeId, originalTheme] = sortedThemes[i];
      const [, updatedTheme] = sortedUpdatedThemes[i];

      themeMap.set(themeId, {
        ...originalTheme,
        background: updatedTheme.background,
        color: updatedTheme.color,
        priority: updatedTheme.priority,
      });
    }

    // Step 4: Commit update
    set({ themes: themeMap });
  }

  function applyThemesToCanvasFromThemeMap() {
    const editor = get().editor;
    const themeMap = get().themes;

    if (!editor || !componentToThemeMap || !themeMap) return;

    // Sort themes by priority to determine which is main, primary, accent
    const sortedThemes = Array.from(themeMap.entries()).sort(
      (a, b) => b[1].priority - a[1].priority
    );

    // Assign semantic roles based on priority
    const mainTheme = sortedThemes[0]?.[1]; // Highest priority = main background
    const primaryTheme = sortedThemes[1]?.[1]; // Second priority = primary elements
    const accentTheme = sortedThemes[2]?.[1]; // Third priority = accent elements

    // First, apply themes to components that have direct theme mappings
    componentToThemeMap.forEach(({ colorId }, componentId) => {
      const component = editor.getWrapper()?.find(`#${componentId}`)[0];
      if (component && colorId) {
        const theme = themeMap.get(colorId);
        if (component && theme) {
          component.setStyle({
            "background-color": theme.background,
          });
          component.setStyle({
            color: theme.color,
          });
        }
      }
    });

    // Then, intelligently apply semantic theme colors to components
    function applySemanticThemeColors(component: Component) {
      const el = component.getEl();
      if (!el || el.nodeType === Node.TEXT_NODE) return;

      const tagName = el.tagName?.toLowerCase();
      const componentId = component.getId();

      // Check if this component already has a direct theme mapping
      const hasDirectTheme = componentToThemeMap.has(componentId);

      if (!hasDirectTheme) {
        // Apply semantic colors based on component characteristics
        const styles = el.computedStyleMap();
        const backgroundColor = colorToHex(
          styles.get("background-color")?.toString() || ""
        );
        const hasBackground = Boolean(
          backgroundColor && backgroundColor !== "00000000"
        );

        // Determine component type and apply appropriate theme
        let themeToApply = null;

        // Main background components (large containers, body-like elements)
        if (isMainBackgroundComponent(component, tagName, hasBackground)) {
          themeToApply = mainTheme;
        }
        // Primary components (buttons, important CTAs, main content areas)
        else if (isPrimaryComponent(component, tagName)) {
          themeToApply = primaryTheme;
        }
        // Accent components (highlights, secondary buttons, decorative elements)
        else if (isAccentComponent(component, tagName)) {
          themeToApply = accentTheme;
        }
        // Text components inherit from their parent's theme
        else if (isTextComponent(tagName) && !hasBackground) {
          themeToApply = getParentTheme(component);
        }

        if (themeToApply) {
          // Apply background if component doesn't have one
          if (!hasBackground) {
            component.setStyle({
              "background-color": themeToApply.background,
            });
          }

          // Apply text color
          component.setStyle({
            color: themeToApply.color,
          });
        }
      }

      // Recurse to children
      component
        .components()
        .forEach((child: Component) => applySemanticThemeColors(child));
    }

    const wrapper = editor.getWrapper();
    if (wrapper) {
      applySemanticThemeColors(wrapper);
    }
  }

  // Helper functions to determine component types
  function isMainBackgroundComponent(
    component: Component,
    tagName: string,
    hasBackground: boolean
  ): boolean {
    // Large containers, body-like elements, or components with significant area
    const el = component.getEl();
    if (!el) return false;

    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const area = width * height;

    // Consider it main background if it's a large container or body-like element
    return (
      tagName === "body" ||
      tagName === "main" ||
      tagName === "section" ||
      (tagName === "div" && area > 50000) || // Large divs
      (hasBackground === true && area > 30000) // Large components with backgrounds
    );
  }

  function isPrimaryComponent(component: Component, tagName: string): boolean {
    // Buttons, important CTAs, main content areas, headers
    return (
      tagName === "button" ||
      tagName === "a" ||
      tagName === "h1" ||
      tagName === "h2" ||
      tagName === "h3" ||
      tagName === "nav" ||
      tagName === "header" ||
      tagName === "footer" ||
      component
        .getClasses()
        .some(
          (cls: string) =>
            cls.includes("btn") ||
            cls.includes("button") ||
            cls.includes("cta") ||
            cls.includes("primary")
        )
    );
  }

  function isAccentComponent(component: Component, tagName: string): boolean {
    // Highlights, secondary buttons, decorative elements, small interactive elements
    return (
      tagName === "span" ||
      tagName === "small" ||
      tagName === "mark" ||
      tagName === "code" ||
      tagName === "kbd" ||
      component
        .getClasses()
        .some(
          (cls: string) =>
            cls.includes("accent") ||
            cls.includes("highlight") ||
            cls.includes("secondary") ||
            cls.includes("badge")
        )
    );
  }

  function isTextComponent(tagName: string): boolean {
    return [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "div",
      "a",
      "label",
      "button",
    ].includes(tagName);
  }

  function getParentTheme(component: Component): Theme | null {
    let parent = component.parent();
    while (parent) {
      const parentId = parent.getId();
      const parentTheme = componentToThemeMap.get(parentId);
      if (parentTheme?.colorId) {
        return get().themes.get(parentTheme.colorId) || null;
      }
      parent = parent.parent();
    }
    return null;
  }

  return {
    // Initial state
    editor: null,
    selectedComponents: [],
    currentDevice: "Desktop" as DeviceName,
    styleValues: {},
    activeTab: "blocks",
    defaultBaseStyles: undefined,
    defaultTailwindStyles: undefined,
    yoinkId: null,
    yoinkName: null,
    yoinkCreatorId: null,
    themes: new Map<string, Theme>(),
    defaultBgColor: undefined,
    // Editor initialization
    initializeEditor: async () => {
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

        // Component selection events
        editor.on("component:selected", onComponentSelect);

        editor.on("component:deselected", () => onComponentDeselect);

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
              console.error(
                "Unexpected error uploading project:",
                errorMessage
              );
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
        set({ editor });
      } catch (error) {
        console.error("Error initializing editor:", error);
      }
    },

    resetStore: () => {
      const { editor } = get();
      if (editor) {
        editor.destroy();
      }
      set({
        editor: null,
        yoinkId: null,
        yoinkName: null,
        yoinkCreatorId: null,
        themes: new Map<string, Theme>(),
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

    // Device management
    setCurrentDevice: (deviceName: DeviceName) => {
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
          updateStyleState();
        }
      }
    },

    // Style management
    updateComponentStyleProperty: (property: string, value: string) => {
      const { selectedComponents } = get();
      if (!selectedComponents || selectedComponents.length === 0) return;
      selectedComponents.forEach((component) => {
        component.setStyle({ [property]: value });
      });
      updateStyleState();

      // If background color is changed, recalculate themes to update the theme structure
      if (property === "background-color") {
        // Use setTimeout to ensure the style change is applied before recalculating
        setTimeout(() => {
          get().calculateThemes();
        }, 100);
      }
    },

    calculateThemes: () => {
      const editor = get().editor;
      if (!editor) return;

      const themeMap = new Map<string, Theme>();
      componentToThemeMap = new Map<string, { colorId: string }>();
      const backgroundToThemeId = new Map<string, string>(); // to avoid duplicating themes

      const wrapper = editor.getWrapper();
      if (!wrapper) return;

      function generateId() {
        return "theme-" + Math.random().toString(36).substring(2, 10);
      }

      function recurse(component: Component) {
        const el = component.getEl();
        if (!el || el.nodeType === Node.TEXT_NODE) return;

        const styles = el.computedStyleMap();

        // Extract background color and convert to hex
        let background = colorToHex(
          styles.get("background-color")?.toString() || ""
        );
        let color = colorToHex(styles.get("color")?.toString() || "");

        // Check if this component has a background
        if (background && background != "00000000") {
          background = background.slice(0, 6); // Remove alpha
          color = color.slice(0, 6); // Remove alpha

          // Calculate volume
          const width = el.offsetWidth;
          const height = el.offsetHeight;
          const volume = width * height;
          if (volume === 0) return;

          // Get or generate themeId for this background
          let themeId = backgroundToThemeId.get(background);
          if (!themeId) {
            themeId = generateId();
            backgroundToThemeId.set(background, themeId);
          }

          // Update or create Theme
          if (!themeMap.has(themeId)) {
            themeMap.set(themeId, {
              background,
              priority: volume,
              color,
            });
          } else {
            const theme = themeMap.get(themeId)!;
            theme.priority += volume;
            // Update color if this component has a more prominent text color
            if (color && color !== "000000") {
              theme.color = color;
            }
          }

          // Link component to theme
          const componentId = component.getId();
          componentToThemeMap.set(componentId, { colorId: themeId });
        } else {
          // For components without background, check if they have text color
          // and try to find a parent theme to associate with
          if (color && color !== "000000") {
            let parent = component.parent();
            let parentThemeId: string | null = null;

            // Walk up the component tree to find a parent with a theme
            while (parent) {
              const parentId = parent.getId();
              const parentTheme = componentToThemeMap.get(parentId);
              if (parentTheme?.colorId) {
                parentThemeId = parentTheme.colorId;
                break;
              }
              parent = parent.parent();
            }

            // If we found a parent theme, update its color if this text component
            // has a more prominent color
            if (parentThemeId) {
              const theme = themeMap.get(parentThemeId);
              if (theme) {
                const textColor = color.slice(0, 6); // Remove alpha
                // Update theme color if this text has a more prominent color
                if (textColor !== "000000" && textColor !== theme.color) {
                  theme.color = textColor;
                }
              }
            }
          }
        }

        // Recurse
        component.components().forEach((child: Component) => recurse(child));
      }

      recurse(wrapper);

      console.log(componentToThemeMap);
      console.log(themeMap);
      // Save results to state
      set({
        themes: themeMap,
      });
    },
    setTheme: (newTheme: Map<string, Theme>) => {
      updateThemeMapWithValues(newTheme);
      applyThemesToCanvasFromThemeMap();
    },

    refreshThemeColors: () => {
      applyThemesToCanvasFromThemeMap();
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
  };
});
