import { create } from "zustand";
import { Component, Device, Editor } from "grapesjs";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { getEditorConfig } from "../config/editorConfig";
import "../styles/editor.css";
import { DeviceName, Theme, ThemeRef, Pallet } from "../types";
import { GroupColors } from "../components/Sidebar/Themes/utils/GroupColors";
import { initBaseDefaultStyles } from "../utils/defaultStyles/base";
import { initTailwindDefaultStyles } from "../utils/defaultStyles/tailwind";
import { objectToUniversalCss } from "../utils/objectToUniversalCss";
import { createClient } from "@/utils/supabase/client";
import { getMergedComponentStyles } from "../utils/helpers";
import { colorToHex } from "../export/tailwind/utils/colors/colorToHex";

interface ComponentTheme {
  background: ThemeRef;
  color: ThemeRef;
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
  theme: Theme;

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

  // function updateThemeMapWithValues(updatedThemes: Map<string, Theme>) {
  //   const themeMap = get().themes;
  //   if (!themeMap) return;

  //   // Step 1: Convert themeMap to array and sort by priority descending
  //   const sortedThemes = Array.from(themeMap.entries()).sort(
  //     (a, b) => b[1].priority - a[1].priority
  //   );

  //   // Step 2: Sort updatedThemes by priority descending
  //   const sortedUpdatedThemes = Array.from(updatedThemes.entries()).sort(
  //     (a, b) => b[1].priority - a[1].priority
  //   );

  //   // Step 3: Update the highest priority themes first
  //   for (
  //     let i = 0;
  //     i < sortedThemes.length && i < sortedUpdatedThemes.length;
  //     i++
  //   ) {
  //     const [themeId, originalTheme] = sortedThemes[i];
  //     const [, updatedTheme] = sortedUpdatedThemes[i];

  //     themeMap.set(themeId, {
  //       ...originalTheme,
  //       background: updatedTheme.background,
  //       color: updatedTheme.color,
  //       priority: updatedTheme.priority,
  //     });
  //   }

  //   // Step 4: Commit update
  //   set({ themes: themeMap });
  // }

  // function applyThemesToCanvasFromThemeMap() {
  //   const editor = get().editor;
  //   const themeMap = get().themes;

  //   if (!editor || !componentToThemeMap || !themeMap) return;

  //   // Sort themes by priority to determine which is main, primary, accent
  //   const sortedThemes = Array.from(themeMap.entries()).sort(
  //     (a, b) => b[1].priority - a[1].priority
  //   );

  //   // Assign semantic roles based on priority
  //   const mainTheme = sortedThemes[0]?.[1]; // Highest priority = main background
  //   const primaryTheme = sortedThemes[1]?.[1]; // Second priority = primary elements
  //   const accentTheme = sortedThemes[2]?.[1]; // Third priority = accent elements

  //   // First, apply themes to components that have direct theme mappings
  //   componentToThemeMap.forEach(({ colorId }, componentId) => {
  //     const component = editor.getWrapper()?.find(`#${componentId}`)[0];
  //     if (component && colorId) {
  //       const theme = themeMap.get(colorId);
  //       if (component && theme) {
  //         component.setStyle({
  //           "background-color": theme.background,
  //         });
  //         component.setStyle({
  //           color: theme.color,
  //         });
  //       }
  //     }
  //   });

  //   // Then, intelligently apply semantic theme colors to components
  //   function applySemanticThemeColors(component: Component) {
  //     const el = component.getEl();
  //     if (!el || el.nodeType === Node.TEXT_NODE) return;

  //     const tagName = el.tagName?.toLowerCase();
  //     const componentId = component.getId();

  //     // Check if this component already has a direct theme mapping
  //     const hasDirectTheme = componentToThemeMap.has(componentId);

  //     if (!hasDirectTheme) {
  //       // Apply semantic colors based on component characteristics
  //       const styles = el.computedStyleMap();
  //       const backgroundColor = colorToHex(
  //         styles.get("background-color")?.toString() || ""
  //       );
  //       const hasBackground = Boolean(
  //         backgroundColor && backgroundColor !== "00000000"
  //       );

  //       // Determine component type and apply appropriate theme
  //       let themeToApply = null;

  //       // Main background components (large containers, body-like elements)
  //       if (isMainBackgroundComponent(component, tagName, hasBackground)) {
  //         themeToApply = mainTheme;
  //       }
  //       // Primary components (buttons, important CTAs, main content areas)
  //       else if (isPrimaryComponent(component, tagName)) {
  //         themeToApply = primaryTheme;
  //       }
  //       // Accent components (highlights, secondary buttons, decorative elements)
  //       else if (isAccentComponent(component, tagName)) {
  //         themeToApply = accentTheme;
  //       }
  //       // Text components inherit from their parent's theme
  //       else if (isTextComponent(tagName) && !hasBackground) {
  //         themeToApply = getParentTheme(component);
  //       }

  //       if (themeToApply) {
  //         // Apply background if component doesn't have one
  //         if (!hasBackground) {
  //           component.setStyle({
  //             "background-color": themeToApply.background,
  //           });
  //         }

  //         // Apply text color
  //         component.setStyle({
  //           color: themeToApply.color,
  //         });
  //       }
  //     }

  //     // Recurse to children
  //     component
  //       .components()
  //       .forEach((child: Component) => applySemanticThemeColors(child));
  //   }

  //   const wrapper = editor.getWrapper();
  //   if (wrapper) {
  //     applySemanticThemeColors(wrapper);
  //   }
  // }

  // Helper functions to determine component types
  // function isMainBackgroundComponent(
  //   component: Component,
  //   tagName: string,
  //   hasBackground: boolean
  // ): boolean {
  //   // Large containers, body-like elements, or components with significant area
  //   const el = component.getEl();
  //   if (!el) return false;

  //   const width = el.offsetWidth;
  //   const height = el.offsetHeight;
  //   const area = width * height;

  //   // Consider it main background if it's a large container or body-like element
  //   return (
  //     tagName === "body" ||
  //     tagName === "main" ||
  //     tagName === "section" ||
  //     (tagName === "div" && area > 50000) || // Large divs
  //     (hasBackground === true && area > 30000) // Large components with backgrounds
  //   );
  // }

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
    theme: { pallet: [] },
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
        theme: { pallet: [] },
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
    },

    calculateThemes: () => {
      const editor = get().editor;
      if (!editor) return;

      const wrapper = editor.getWrapper();
      if (!wrapper) return;

      const palletMap = new Map<string, string[]>(); // key: bgColor. Value: textColors[]

      function recurse(component: Component, background: string = "") {
        const element = component.getEl();
        const isTextNode = component.getType() === "textnode";

        // step 1) get the background of the element. If its different than the argument, then add it to the palletMap given that its not already set.
        let componentBgColor = background;
        let textColor = "";

        if (!isTextNode && element) {
          const componentStyles = element.computedStyleMap();
          const rawBgColor = String(
            componentStyles.get("background-color")?.toString() || background
          );

          // Filter out transparent backgrounds
          if (
            rawBgColor &&
            rawBgColor !== background &&
            rawBgColor !== "transparent" &&
            rawBgColor !== "rgba(0, 0, 0, 0)" &&
            !rawBgColor.includes("rgba(0, 0, 0, 0)") &&
            !rawBgColor.includes("transparent")
          ) {
            componentBgColor = colorToHex(rawBgColor);
            if (!palletMap.has(componentBgColor)) {
              palletMap.set(componentBgColor, []);
            }
          }
        }

        // step 2) check the element. if its a text node then add its text to the textColors given that the text color isnt already included;
        if (isTextNode) {
          // For text nodes, get color from parent element
          const parentElement = component.parent()?.getEl();
          if (parentElement) {
            const parentStyles = parentElement.computedStyleMap();
            const rawTextColor = String(
              parentStyles.get("color")?.toString() || ""
            );
            textColor = colorToHex(rawTextColor);
          }
        } else if (element) {
          // For regular elements, get color from their own styles
          const componentStyles = element.computedStyleMap();
          const rawTextColor = String(
            componentStyles.get("color")?.toString() || ""
          );
          textColor = colorToHex(rawTextColor);
        }

        if (textColor && textColor !== "") {
          const currentBgColor = componentBgColor || background;
          if (currentBgColor && palletMap.has(currentBgColor)) {
            const textColors = palletMap.get(currentBgColor)!;
            if (!textColors.includes(textColor)) {
              textColors.push(textColor);
            }
          }
        }

        // Recurse
        component
          .components()
          .forEach((child: Component) =>
            recurse(child, componentBgColor || background)
          );
      }

      recurse(wrapper);

      // Convert palletMap to Theme structure using GroupColors
      const backgroundColors = Array.from(palletMap.keys());
      const colorGroups = GroupColors(backgroundColors);

      const pallets: Pallet[] = colorGroups.map((bgColorGroup: string[]) => {
        // Merge all text colors from components with backgrounds in this group
        const mergedTextColors: string[] = [];
        bgColorGroup.forEach((bgColor: string) => {
          const textColors = palletMap.get(bgColor) || [];
          textColors.forEach((textColor: string) => {
            if (!mergedTextColors.includes(textColor)) {
              mergedTextColors.push(textColor);
            }
          });
        });

        return {
          background: bgColorGroup,
          text: mergedTextColors,
        };
      });

      const theme: Theme = { pallet: pallets };

      // Update the store with the calculated theme
      set({ theme });

      console.log("Calculated theme:", theme);
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
