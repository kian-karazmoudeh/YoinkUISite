import { create } from "zustand";
import { Component, Device, Editor } from "grapesjs";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { getEditorConfig } from "../config/editorConfig";
import "../styles/editor.css";
import { DeviceName, Theme, ThemeRef } from "../types";
import { initBaseDefaultStyles } from "../utils/defaultStyles/base";
import { initTailwindDefaultStyles } from "../utils/defaultStyles/tailwind";
import { objectToUniversalCss } from "../utils/objectToUniversalCss";
import { createClient } from "@/utils/supabase/client";
import { getMergedComponentStyles } from "../utils/helpers";
import { ThemeCalculator } from "../utils/theme/ThemeCalculator";
import { BUCKET_NAME } from "@/utils/getStorageBucketName";

interface EditorState {
  // Editor instance
  editor: Editor | null;

  // Yoink metadata
  yoinkId: string | null;
  yoinkName: string | null;
  yoinkContentUrl: string | null;
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
  setYoinkContentUrl: (url: string) => void;
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
    yoinkContentUrl: null,
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
              const state = get();

              if (!state.yoinkCreatorId || !state.yoinkId) {
                console.error("Missing creator ID or yoink ID");
                return { error: "Missing creator ID or yoink ID" };
              }

              // Determine the file path
              let newFileName: string;

              if (state.yoinkContentUrl) {
                // delete the previous version
                supabase.storage
                  .from(BUCKET_NAME)
                  .remove([state.yoinkContentUrl]);

                // If we have an existing content URL, check if it's versioned
                if (state.yoinkContentUrl.includes("_V")) {
                  // Extract base name and increment version
                  const [baseName, version] = state.yoinkContentUrl.split("_V");
                  const currentVersion = parseInt(version.split(".")[0]);
                  newFileName = `${baseName}_V${currentVersion + 1}.json`;
                } else {
                  // Not versioned, so add _V1 before the extension
                  if (state.yoinkContentUrl.endsWith(".json")) {
                    newFileName = state.yoinkContentUrl.replace(
                      /\.json$/,
                      "_V1.json"
                    );
                  } else {
                    newFileName = state.yoinkContentUrl + "_V1";
                  }
                }
              } else {
                return { error: "No content URL found" };
              }
              // Convert data to string if needed
              const fileContent =
                typeof data === "string" ? data : JSON.stringify(data);

              // Upload the new version
              const { error } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(newFileName, fileContent, {
                  upsert: true,
                  contentType: "application/json",
                });

              if (error) {
                console.error("Error uploading project:", error.message);
                return { error: error.message };
              }

              // Update the database record with just the filename
              await supabase
                .from("yoinks")
                .update({
                  updated_at: new Date().toISOString(),
                  content_url: newFileName,
                })
                .eq("id", state.yoinkId);

              // Update the content URL in the store
              set({ yoinkContentUrl: newFileName });

              return { result: "success", filePath: newFileName };
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
              const state = get();

              // First try to find the latest version by listing files
              if (!state.yoinkCreatorId) {
                console.error("No creator ID found");
                return {};
              } else if (!state.yoinkContentUrl) {
                console.error("No content URL found");
                return {};
              }

              // Download the latest version
              const { data: fileData, error } = await supabase.storage
                .from(BUCKET_NAME)
                .download(state.yoinkContentUrl);

              if (error || !fileData) {
                console.error("Error downloading project:", error?.message);
                return {};
              }

              const textContent = JSON.parse(await fileData.text());
              return textContent;
              // return {
              //   type: "wrapper",
              //   components: [
              //     {
              //       attributes: {
              //         style:
              //           "margin-top: 80px; margin-right: auto; margin-bottom: 80px; margin-left: auto; padding-top: 32px; padding-right: 32px; padding-bottom: 32px; padding-left: 32px; color: rgb(0, 0, 0); width: 600px; border-top-right-radius: 8px; border-top-left-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); box-shadow: rgba(0, 0, 0, 0.02) 2px 3px 7px 2px; font-variant: normal; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;",
              //       },
              //       tagName: "div",
              //       components: [
              //         {
              //           type: "textnode",
              //           content: "\n    ",
              //         },
              //         {

              //           attributes: {
              //             style:
              //               'margin-top: 21.44px; margin-bottom: 21.44px; color: rgb(0, 0, 0); border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; font-weight: 700; font-size: 32px; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;',
              //           },
              //           tagName: "h1",
              //           components: [
              //             {
              //               type: "textnode",
              //               content: "Example Domain",
              //             },
              //           ],
              //         },
              //         {
              //           type: "textnode",
              //           content: "\n    ",
              //         },
              //         {
              //           attributes: {
              //             style:
              //               'margin-top: 16px; margin-bottom: 16px; color: rgb(0, 0, 0); border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;',
              //           },
              //           tagName: "p",
              //           components: [
              //             {
              //               type: "textnode",
              //               content:
              //                 "This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.",
              //             },
              //           ],
              //         },
              //         {
              //           type: "textnode",
              //           content: "\n    ",
              //         },
              //         {
              //           attributes: {
              //             style:
              //               'margin-top: 16px; margin-bottom: 16px; color: rgb(0, 0, 0); border-top-width: 0px; border-top-color: rgb(0, 0, 0); border-right-width: 0px; border-right-color: rgb(0, 0, 0); border-bottom-width: 0px; border-bottom-color: rgb(0, 0, 0); border-left-width: 0px; border-left-color: rgb(0, 0, 0); font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; text-decoration-color: rgb(0, 0, 0); word-spacing: 0px;',
              //           },
              //           tagName: "p",
              //           components: [
              //             {
              //               attributes: {
              //                 href: "https://www.iana.org/domains/example",
              //                 style:
              //                   'color: rgb(56, 72, 143); border-top-width: 0px; border-top-color: rgb(56, 72, 143); border-right-width: 0px; border-right-color: rgb(56, 72, 143); border-bottom-width: 0px; border-bottom-color: rgb(56, 72, 143); border-left-width: 0px; border-left-color: rgb(56, 72, 143); display: inline; font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui, sans-serif; font-variant: normal; cursor: pointer; outline-color: rgb(56, 72, 143); text-decoration-color: rgb(56, 72, 143); word-spacing: 0px;',
              //               },
              //               tagName: "a",
              //               components: [
              //                 {
              //                   type: "textnode",
              //                   content: "More information...",
              //                 },
              //               ],
              //             },
              //           ],
              //         },
              //         {
              //           type: "textnode",
              //           content: "\n",
              //         },
              //       ],
              //     },
              //   ],
              // };
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
        yoinkContentUrl: null,
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
    setYoinkContentUrl: (url: string) => set({ yoinkContentUrl: url }),
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

      const themeCalculator = new ThemeCalculator();
      const { theme, componentMap } = themeCalculator.calculateThemes(editor);

      // Update the theme with the new pallet
      set({ theme });

      // Update the component map
      componentToThemeMap = componentMap;

      console.log("Theme updated:", theme);
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
        const wrapper = editor.getWrapper();
        if (!wrapper) return;
        let component =
          wrapper.getId() === componentId
            ? wrapper
            : wrapper.find(`#${CSS.escape(componentId)}`)[0];
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
