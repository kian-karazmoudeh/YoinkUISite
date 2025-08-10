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
  setTheme: (newTheme: Theme) => void;

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
  let componentToThemeMap = new Map<string, ThemeRef>();

  const isValidColor = (color: string) => {
    return (
      color &&
      color !== "transparent" &&
      color !== "rgba(0, 0, 0, 0)" &&
      !color.includes("rgba(0, 0, 0, 0)") &&
      !color.includes("transparent")
    );
  };

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

      // Collect colors and map components in a single pass
      const colorData = new Map<
        string,
        {
          textColors: Map<
            string,
            {
              area: number;
              components: Component[];
            }
          >;
          area: number;
          components: Component[];
        }
      >();

      function processComponents(component: Component, parentBg: string = "") {
        const element = component.getEl();
        const isTextNode = component.getType() === "textnode";

        // Get background color
        let bgColor = parentBg;

        if (isTextNode && element) {
          // For text nodes: get color from parent and get area
          const parentComponent = component.parent();
          if (parentComponent) {
            const parentElement = parentComponent.getEl();
            if (parentElement) {
              const parentStyles = parentElement.computedStyleMap();
              const textColor = colorToHex(
                String(parentStyles.get("color")?.toString() || "")
              );

              // Calculate text area: font-size * text length (approximate)
              const fontSize = parseFloat(
                String(parentStyles.get("font-size")?.toString() || "16")
              );
              const textContent = component.get("content") || "";
              const textArea = fontSize * textContent.length;

              // Add the parent component to color data to show that the parent uses which text
              if (textColor && isValidColor(textColor)) {
                if (!colorData.has(bgColor)) {
                  colorData.set(bgColor, {
                    textColors: new Map(),
                    area: 0,
                    components: [],
                  });
                }

                const existingArea =
                  colorData.get(bgColor)!.textColors.get(textColor)?.area || 0;
                colorData.get(bgColor)!.textColors.set(textColor, {
                  area: existingArea + textArea,
                  components: [parentComponent],
                });

                // Add parent component if not already added
                if (
                  !colorData.get(bgColor)!.components.includes(parentComponent)
                ) {
                  colorData.get(bgColor)!.components.push(parentComponent);
                }
              }
            }
          }
        } else if (!isTextNode && element) {
          // For non-text nodes: check background and if different, add to color data
          const styles = element.computedStyleMap();
          const rawBg = String(
            styles.get("background-color")?.toString() || parentBg
          );

          if (isValidColor(rawBg)) {
            const newBgColor = colorToHex(rawBg);

            // Only add if background is different from parent
            if (newBgColor !== parentBg) {
              bgColor = newBgColor;
              const area = element.offsetWidth * element.offsetHeight;

              if (!colorData.has(bgColor)) {
                colorData.set(bgColor, {
                  textColors: new Map(),
                  area,
                  components: [],
                });
              } else {
                colorData.get(bgColor)!.area += area;
              }

              // Keep a reference to the component
              colorData.get(bgColor)!.components.push(component);
            }
          }
        }

        // Recurse
        component
          .components()
          .forEach((child: Component) => processComponents(child, bgColor));
      }

      processComponents(wrapper);

      // Group and sort colors
      const bgColors = Array.from(colorData.keys());
      const colorGroups = GroupColors(bgColors);

      const pallets: Pallet[] = colorGroups.map((group, groupIndex) => {
        // Sort by area and merge text colors
        const sortedBackground = group
          .map((color) => ({ color, area: colorData.get(color)?.area || 0 }))
          .sort((a, b) => b.area - a.area);

        const palletIndex = groupIndex;
        group.forEach((color) => {
          const components = colorData.get(color)?.components || [];
          components.forEach((component) => {
            componentToThemeMap.set(component.getId(), {
              palletIndex,
              backgroundIndex: sortedBackground.findIndex(
                (item) => item.color === color
              ),
            });
          });
        });

        // Create a map to store text color sets for each background color
        const textColorSets = new Map<
          string,
          {
            area: number;
            components: Component[];
          }
        >();

        // Group text colors by their background colors
        group.forEach((bgColor) => {
          const colorInfo = colorData.get(bgColor);
          if (colorInfo?.textColors) {
            for (const [
              contentColor,
              textColorInfo,
            ] of colorInfo.textColors.entries()) {
              textColorSets.set(contentColor, textColorInfo);
            }
          }
        });

        // Convert text color sets to the required format
        const textColor = Array.from(textColorSets.keys());
        const textColorGroups = GroupColors(textColor);
        const textColorGroupsSorted = textColorGroups.map((group) => {
          return group
            .map((color) => {
              return { color, area: textColorSets.get(color)?.area || 0 };
            })
            .sort((a, b) => b.area - a.area);
        });

        console.log(`Palette ${groupIndex}:`, {
          background: sortedBackground.map((item) => item.color),
          text: textColorGroupsSorted.map((group) =>
            group.map((item) => item.color)
          ),
        });

        return {
          background: sortedBackground.map((item) => item.color),
          text: textColorGroupsSorted.map((group) =>
            group.map((item) => item.color)
          ),
        };
      });

      const theme: Theme = { pallet: pallets };
      set({ theme });

      // Map components to themes using stored component data
      componentToThemeMap.clear();

      colorGroups.forEach((group, paletteIndex) => {
        group.forEach((bgColor) => {
          const components = colorData.get(bgColor)?.components || [];
          const palette = pallets[paletteIndex];

          components.forEach((component) => {
            // Find the background index in the palette
            const backgroundIndex = palette.background.findIndex(
              (color) => color === bgColor
            );

            // Find the content color indices
            let contentColorSetIdx: number | undefined;
            let contentColorIdx: number | undefined;
            const palletTextColors = colorData.get(bgColor)?.textColors;

            if (palletTextColors && palletTextColors.size > 0) {
              // Find the text color that has this component in its components array
              for (const [textColor, _area] of palletTextColors.entries()) {
                const textColorData = colorData.get(bgColor);
                if (
                  textColorData &&
                  textColorData.components.includes(component)
                ) {
                  // Find which color set contains this text color
                  for (let setIdx = 0; setIdx < palette.text.length; setIdx++) {
                    const colorIdx = palette.text[setIdx].indexOf(textColor);
                    if (colorIdx !== -1) {
                      contentColorSetIdx = setIdx;
                      contentColorIdx = colorIdx;
                      break;
                    }
                  }
                  if (contentColorSetIdx !== undefined) break;
                }
              }
            }

            componentToThemeMap.set(component.getId(), {
              palletIndex: paletteIndex,
              backgroundIndex:
                backgroundIndex !== -1 ? backgroundIndex : undefined,
              contentColorSetIdx,
              contentColorIdx,
            });
          });
        });
      });

      console.log("Calculated theme:", theme);
      console.log("Component mappings:", componentToThemeMap);
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

    setTheme: (newTheme: Theme) => {
      const { editor, theme } = get();
      if (!editor) return;

      // Step 1: Update the theme palettes one by one
      const updatedTheme = { ...theme };
      newTheme.pallet.forEach((newPalette, index) => {
        if (updatedTheme.pallet[index]) {
          // Update existing palette
          updatedTheme.pallet[index] = {
            background: newPalette.background,
            text: newPalette.text,
          };
        } else {
          // Add new palette if it doesn't exist
          updatedTheme.pallet[index] = newPalette;
        }
      });

      // Update the store with the new theme
      set({ theme: updatedTheme });

      // Step 2: Apply the theme changes to all components using componentToThemeMap
      componentToThemeMap.forEach((componentTheme, componentId) => {
        const component = editor.getWrapper()?.find(`#${componentId}`)[0];
        if (!component) return;

        const {
          palletIndex,
          backgroundIndex,
          contentColorSetIdx,
          contentColorIdx,
        } = componentTheme;
        const palette = updatedTheme.pallet[palletIndex];

        if (palette) {
          // Apply background color (use backgroundIndex from palette)
          if (
            backgroundIndex !== undefined &&
            palette.background.length > backgroundIndex
          ) {
            component.setStyle({
              "background-color": palette.background[backgroundIndex],
            });
          }

          // Apply text color (use contentColorSetIdx and contentColorIdx from palette)
          if (
            contentColorSetIdx !== undefined &&
            contentColorIdx !== undefined &&
            palette.text.length > contentColorSetIdx &&
            palette.text[contentColorSetIdx].length > contentColorIdx
          ) {
            component.setStyle({
              color: palette.text[contentColorSetIdx][contentColorIdx],
            });
          }
        }
      });

      console.log("Theme updated and applied:", updatedTheme);
    },
  };
});
