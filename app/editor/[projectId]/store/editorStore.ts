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
import { getMergedComponentStyles, normalize } from "../utils/helpers";
import chroma from "chroma-js";

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
          textColors: Map<string, number>; // text color -> area
          area: number;
        }
      >();

      function processComponents(component: Component, parentBg: string = "") {
        const element = component.getEl();
        const isTextNode = component.getType() === "textnode";

        // Get background color
        let bgColor = parentBg;
        let tempColor = "";

        if (isTextNode && element) {
          // For text nodes: get color from parent and get area
          const parentComponent = component.parent();
          if (parentComponent) {
            const parentElement = parentComponent.getEl();
            if (parentElement) {
              const parentStyles = parentElement.computedStyleMap();
              let textColor;

              try {
                textColor = chroma(
                  parentStyles.get("color")?.toString() || ""
                ).hex();
                // Calculate text area: font-size * text length (approximate)
                const fontSize = parseFloat(
                  parentStyles.get("font-size")?.toString() || "16"
                );
                const textContent = component.get("content") || "";
                const textArea = normalize(fontSize * textContent.length);
                // Add the parent component to color data to show that the parent uses which text
                if (textColor && chroma(textColor).alpha() > 0 && bgColor) {
                  if (!colorData.has(bgColor)) {
                    colorData.set(bgColor, {
                      textColors: new Map(),
                      area: 0,
                    });
                  }

                  const existingArea =
                    colorData
                      .get(bgColor)!
                      .textColors.get(chroma(textColor).alpha(1).hex()) || 0;
                  colorData
                    .get(bgColor)!
                    .textColors.set(
                      chroma(textColor).alpha(1).hex(),
                      existingArea + textArea
                    );
                }
              } catch {
                console.log("Invalid Text Color:", textColor);
              }
            }
          }
        } else if (!isTextNode && element) {
          // For non-text nodes: check background and if different, add to color data
          const styles = element.computedStyleMap();

          let newBgColor;
          try {
            newBgColor = chroma(
              styles.get("background-color")?.toString() || parentBg
            ).hex();
            if (newBgColor && chroma(newBgColor).alpha() > 0) {
              // Only add if background is different from parent
              if (newBgColor !== parentBg) {
                bgColor = chroma(newBgColor).alpha(1).hex();
                const area = normalize(
                  element.offsetWidth * element.offsetHeight
                );

                if (!colorData.has(bgColor)) {
                  colorData.set(bgColor, {
                    textColors: new Map(),
                    area,
                  });
                } else {
                  colorData.get(bgColor)!.area += area;
                }
              }
            }
          } catch {
            console.log(
              "Invalid Background Color:",
              styles.get("background-color")?.toString() || parentBg
            );
          }

          let borderLeftColor;
          try {
            borderLeftColor = chroma(
              styles.get("border-left-color")?.toString() || ""
            ).hex();
            if (borderLeftColor && chroma(borderLeftColor).alpha() > 0) {
              // Only add if background is different from parent
              if (borderLeftColor !== parentBg) {
                tempColor = chroma(borderLeftColor).alpha(1).hex();

                if (!colorData.has(tempColor)) {
                  colorData.set(tempColor, {
                    textColors: new Map(),
                    area: 0,
                  });
                }
              }
            }
          } catch {
            console.log(
              "Invalid Border Left Color:",
              styles.get("border-left-color")?.toString()
            );
          }

          let borderRightColor;
          try {
            borderRightColor = chroma(
              styles.get("border-right-color")?.toString() || ""
            ).hex();
            if (borderRightColor && chroma(borderRightColor).alpha() > 0) {
              // Only add if background is different from parent
              if (borderRightColor !== parentBg) {
                tempColor = chroma(borderRightColor).alpha(1).hex();

                if (!colorData.has(tempColor)) {
                  colorData.set(tempColor, {
                    textColors: new Map(),
                    area: 0,
                  });
                }
              }
            }
          } catch {
            console.log(
              "Invalid Border Right Color:",
              styles.get("border-right-color")?.toString()
            );
          }

          let borderTopColor;
          try {
            borderTopColor = chroma(
              styles.get("border-top-color")?.toString() || ""
            ).hex();
            if (borderTopColor && chroma(borderTopColor).alpha() > 0) {
              // Only add if background is different from parent
              if (borderTopColor !== parentBg) {
                tempColor = chroma(borderTopColor).alpha(1).hex();

                if (!colorData.has(tempColor)) {
                  colorData.set(tempColor, {
                    textColors: new Map(),
                    area: 0,
                  });
                }
              }
            }
          } catch {
            console.log(
              "Invalid Border Top Color:",
              styles.get("border-top-color")?.toString()
            );
          }

          let borderBottomColor;
          try {
            borderBottomColor = chroma(
              styles.get("border-bottom-color")?.toString() || ""
            ).hex();
            if (borderBottomColor && chroma(borderBottomColor).alpha() > 0) {
              // Only add if background is different from parent
              if (borderBottomColor !== parentBg) {
                tempColor = chroma(borderBottomColor).alpha(1).hex();

                if (!colorData.has(tempColor)) {
                  colorData.set(tempColor, {
                    textColors: new Map(),
                    area: 0,
                  });
                }
              }
            }
          } catch {
            console.log(
              "Invalid Border Bottom Color:",
              styles.get("border-bottom-color")?.toString()
            );
          }
        }

        // Recurse
        component
          .components()
          .forEach((child: Component) => processComponents(child, bgColor));
      }

      processComponents(wrapper);

      // Convert colorData to pallet format
      const pallet: Pallet[] = [];

      // Step 1: Group background colors and sort by area
      const bgColorGroups = GroupColors(Array.from(colorData.keys()));

      // Calculate total area for each group and sort colors within groups
      const bgGroupsWithArea = bgColorGroups.map((group) => {
        const groupColors = group.map((color) => ({
          color,
          area: colorData.get(color)?.area || 0,
        }));

        // Sort colors within group by area (largest first)
        groupColors.sort((a, b) => b.area - a.area);

        return {
          colors: groupColors.map((c) => c.color),
          totalArea: groupColors.reduce((sum, c) => sum + c.area, 0),
        };
      });

      // Sort groups by total area (largest first)
      bgGroupsWithArea.sort((a, b) => b.totalArea - a.totalArea);

      // Step 2: Process each background color group
      bgGroupsWithArea.forEach((bgGroup) => {
        // Collect all text colors used with these backgrounds
        const allTextColors = new Set<string>();
        bgGroup.colors.forEach((bgColor) => {
          const textColors = colorData.get(bgColor)?.textColors || new Map();
          textColors.forEach((_, textColor) => allTextColors.add(textColor));
        });

        // Group text colors
        const textColorGroups = GroupColors(Array.from(allTextColors), 30);

        // Calculate area for each text color group
        const textGroupsWithArea = textColorGroups.map((group) => {
          const groupArea = group.reduce((totalArea, textColor) => {
            let colorArea = 0;
            bgGroup.colors.forEach((bgColor) => {
              colorArea +=
                colorData.get(bgColor)?.textColors.get(textColor) || 0;
            });
            return totalArea + colorArea;
          }, 0);

          return {
            colors: group,
            totalArea: groupArea,
          };
        });

        // Sort text groups by total area (largest first)
        textGroupsWithArea.sort((a, b) => b.totalArea - a.totalArea);

        // Create palette entry
        pallet.push({
          background: bgGroup.colors,
          text: textGroupsWithArea.map((g) => g.colors),
        });
      });

      console.log(pallet);

      // Update the theme with the new pallet
      set({ theme: { pallet } });

      // Clear existing component mappings
      componentToThemeMap.clear();

      // Second pass: Map components to palette indices
      function mapComponentsToPalette(
        component: Component,
        parentBg: string = ""
      ) {
        const element = component.getEl();
        const isTextNode = component.getType() === "textnode";

        if (isTextNode && element) {
          // For text nodes: map text colors to palette
          const parentComponent = component.parent();
          if (parentComponent) {
            const parentElement = parentComponent.getEl();
            if (parentElement) {
              const parentStyles = parentElement.computedStyleMap();
              let textColor: string;
              try {
                textColor = chroma(
                  parentStyles.get("color")?.toString() || ""
                ).hex();
                if (textColor && chroma(textColor).alpha() > 0) {
                  // Find palette and background index for parent background
                  const palletIndex = pallet.findIndex((p) =>
                    p.background.includes(parentBg)
                  );
                  if (palletIndex !== -1) {
                    // Find text color group and index
                    const contentColorSetIdx = pallet[
                      palletIndex
                    ].text.findIndex((group) => group.includes(textColor));
                    if (contentColorSetIdx !== -1) {
                      const contentColorIdx =
                        pallet[palletIndex].text[contentColorSetIdx].indexOf(
                          textColor
                        );
                      const existingContentColorSetIdx =
                        componentToThemeMap.get(parentComponent.getId()) || {};

                      // Store the mapping
                      componentToThemeMap.set(parentComponent.getId(), {
                        ...existingContentColorSetIdx,
                        palletIndex,
                        contentColorSetIdx,
                        contentColorIdx,
                      });
                    }
                  }
                }
              } catch {}
            }
          }
        } else if (!isTextNode && element) {
          // For non-text nodes: map background colors
          const styles = element.computedStyleMap();
          const rawBg = styles.get("background-color")?.toString() || parentBg;
          const rawBorderLeft =
            styles.get("border-left-color")?.toString() || "";
          const rawBorderRight =
            styles.get("border-right-color")?.toString() || "";
          const rawBorderTop = styles.get("border-top-color")?.toString() || "";
          const rawBorderBottom =
            styles.get("border-bottom-color")?.toString() || "";

          let bgColor: string;
          try {
            bgColor = chroma(rawBg).hex();
            if (
              bgColor &&
              bgColor !== parentBg &&
              chroma(bgColor).alpha() > 0
            ) {
              // Only process if background is different from parent
              bgColor = chroma(bgColor).alpha(1).hex();
              // Find palette and background index
              const palletIndex = pallet.findIndex((p) =>
                p.background.includes(bgColor)
              );
              if (palletIndex !== -1) {
                const backgroundIndex =
                  pallet[palletIndex].background.indexOf(bgColor);

                // Store the mapping
                const componentId = component.getId();
                componentToThemeMap.set(componentId, {
                  palletIndex,
                  backgroundIndex,
                });
              }
              parentBg = bgColor; // Update parent background for children
            }
          } catch {
            console.log("Invalid Background Color:", rawBg);
          }

          let borderLeftColor: string;
          try {
            borderLeftColor = chroma(rawBorderLeft).hex();

            if (borderLeftColor && chroma(borderLeftColor).alpha() > 0) {
              // Only process if background is different from parent
              borderLeftColor = chroma(borderLeftColor).alpha(1).hex();

              // Find palette and background index
              const borderLeftColorPalletIndex = pallet.findIndex((p) =>
                p.background.includes(borderLeftColor)
              );
              if (component.getId() === "i6ze6") {
                console.log("borderLeftColorPalletIndex");
                console.log(borderLeftColorPalletIndex);
              }
              if (borderLeftColorPalletIndex !== -1) {
                const borderLeftColorIndex =
                  pallet[borderLeftColorPalletIndex].background.indexOf(
                    borderLeftColor
                  );
                const existingBorderLeftColorIndex =
                  componentToThemeMap.get(component.getId()) || {};

                // Store the mapping
                if (borderLeftColorIndex > -1) {
                  if (component.getId() === "i6ze6") {
                    console.log({
                      ...existingBorderLeftColorIndex,
                      borderLeftColorPalletIndex,
                      borderLeftColorIndex,
                    });
                  }
                  const componentId = component.getId();
                  componentToThemeMap.set(componentId, {
                    ...existingBorderLeftColorIndex,
                    borderLeftColorPalletIndex,
                    borderLeftColorIndex,
                  });
                }
              }
            }
          } catch {
            console.log("Invalid Border Left Color:", rawBorderLeft);
          }

          let borderRightColor: string;
          try {
            borderRightColor = chroma(rawBorderRight).hex();

            if (borderRightColor && chroma(borderRightColor).alpha() > 0) {
              // Only process if background is different from parent
              borderRightColor = chroma(borderRightColor).alpha(1).hex();

              // Find palette and background index
              const borderRightColorPalletIndex = pallet.findIndex((p) =>
                p.background.includes(borderRightColor)
              );
              if (component.getId() === "i6ze6") {
                console.log("borderRightColorPalletIndex");
                console.log(borderRightColorPalletIndex);
              }
              if (borderRightColorPalletIndex !== -1) {
                const borderRightColorIndex =
                  pallet[borderRightColorPalletIndex].background.indexOf(
                    borderRightColor
                  );
                const existingBorderRightColorIndex =
                  componentToThemeMap.get(component.getId()) || {};

                // Store the mapping
                if (borderRightColorIndex > -1) {
                  if (component.getId() === "i6ze6") {
                    console.log({
                      ...existingBorderRightColorIndex,
                      borderRightColorPalletIndex,
                      borderRightColorIndex,
                    });
                  }
                  const componentId = component.getId();
                  componentToThemeMap.set(componentId, {
                    ...existingBorderRightColorIndex,
                    borderRightColorPalletIndex,
                    borderRightColorIndex,
                  });
                }
              }
            }
          } catch {
            console.log("Invalid Border Left Color:", rawBorderLeft);
          }
          let borderTopColor: string;
          try {
            borderTopColor = chroma(rawBorderTop).hex();

            if (borderTopColor && chroma(borderTopColor).alpha() > 0) {
              // Only process if background is different from parent
              borderTopColor = chroma(borderTopColor).alpha(1).hex();

              // Find palette and background index
              const borderTopColorPalletIndex = pallet.findIndex((p) =>
                p.background.includes(borderTopColor)
              );
              if (component.getId() === "i6ze6") {
                console.log("borderTopColorPalletIndex");
                console.log(borderTopColorPalletIndex);
              }
              if (borderTopColorPalletIndex !== -1) {
                const borderTopColorIndex =
                  pallet[borderTopColorPalletIndex].background.indexOf(
                    borderTopColor
                  );
                const existingBorderTopColorIndex =
                  componentToThemeMap.get(component.getId()) || {};

                // Store the mapping
                if (borderTopColorIndex > -1) {
                  if (component.getId() === "i6ze6") {
                    console.log({
                      ...existingBorderTopColorIndex,
                      borderTopColorPalletIndex,
                      borderTopColorIndex,
                    });
                  }
                  const componentId = component.getId();
                  componentToThemeMap.set(componentId, {
                    ...existingBorderTopColorIndex,
                    borderTopColorPalletIndex,
                    borderTopColorIndex,
                  });
                }
              }
            }
          } catch {
            console.log("Invalid Border Top Color:", rawBorderTop);
          }

          let borderBottomColor: string;
          try {
            borderBottomColor = chroma(rawBorderBottom).hex();

            if (borderBottomColor && chroma(borderBottomColor).alpha() > 0) {
              // Only process if background is different from parent
              borderBottomColor = chroma(borderBottomColor).alpha(1).hex();

              // Find palette and background index
              const borderBottomColorPalletIndex = pallet.findIndex((p) =>
                p.background.includes(borderBottomColor)
              );
              if (component.getId() === "i6ze6") {
                console.log("borderBottomColorPalletIndex");
                console.log(borderBottomColorPalletIndex);
              }
              if (borderBottomColorPalletIndex !== -1) {
                const borderBottomColorIndex =
                  pallet[borderBottomColorPalletIndex].background.indexOf(
                    borderBottomColor
                  );
                const existingBorderBottomColorIndex =
                  componentToThemeMap.get(component.getId()) || {};

                // Store the mapping
                if (borderBottomColorIndex > -1) {
                  if (component.getId() === "i6ze6") {
                    console.log({
                      ...existingBorderBottomColorIndex,
                      borderBottomColorPalletIndex,
                      borderBottomColorIndex,
                    });
                  }
                  const componentId = component.getId();
                  componentToThemeMap.set(componentId, {
                    ...existingBorderBottomColorIndex,
                    borderBottomColorPalletIndex,
                    borderBottomColorIndex,
                  });
                }
              }
            }
          } catch {
            console.log("Invalid Border Left Color:", rawBorderLeft);
          }
        }

        // Recurse through children
        component
          .components()
          .forEach((child: Component) =>
            mapComponentsToPalette(child, parentBg)
          );
      }

      // Start the mapping process from the wrapper
      mapComponentsToPalette(wrapper);

      console.log(componentToThemeMap);
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
        const wrapper = editor.getWrapper();
        if (!wrapper) return;
        let component =
          wrapper.getId() === componentId
            ? wrapper
            : wrapper.find(`#${componentId}`)[0];
        if (!component) return;

        const {
          palletIndex,
          backgroundIndex,
          contentColorSetIdx,
          contentColorIdx,
          borderLeftColorPalletIndex,
          borderLeftColorIndex,
          borderRightColorPalletIndex,
          borderRightColorIndex,
          borderTopColorPalletIndex,
          borderTopColorIndex,
          borderBottomColorPalletIndex,
          borderBottomColorIndex,
        } = componentTheme;
        let palette;
        if (palletIndex !== undefined) {
          palette = updatedTheme.pallet[palletIndex];
        }

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

          if (
            borderLeftColorPalletIndex !== undefined &&
            borderLeftColorIndex !== undefined
          ) {
            component.setStyle({
              "border-left-color":
                palette.background[borderLeftColorPalletIndex],
            });
          }

          if (
            borderRightColorPalletIndex !== undefined &&
            borderRightColorIndex !== undefined
          ) {
            component.setStyle({
              "border-right-color":
                palette.background[borderRightColorPalletIndex],
            });
          }

          if (
            borderTopColorPalletIndex !== undefined &&
            borderTopColorIndex !== undefined
          ) {
            component.setStyle({
              "border-top-color": palette.background[borderTopColorPalletIndex],
            });
          }

          if (
            borderBottomColorPalletIndex !== undefined &&
            borderBottomColorIndex !== undefined
          ) {
            component.setStyle({
              "border-bottom-color":
                palette.background[borderBottomColorPalletIndex],
            });
          }
        }
      });

      console.log("Theme updated and applied:", updatedTheme);
    },
  };
});
