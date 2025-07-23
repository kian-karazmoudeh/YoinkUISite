import { EditorConfig } from "grapesjs";
import { blocks } from "../components/blocks";

export const getEditorConfig: () => EditorConfig = () => ({
  container: "#gjs-container",
  height: "100%",
  width: "auto",
  panels: {
    defaults: [],
  },
  blockManager: {
    blocks: blocks,
    appendTo: undefined,
  },
  storageManager: {
    type: "remote", // You can name it anything (remote, custom, etc.)
    autosave: false, // Disable autosave so you control when to save
    autoload: false, // Disable autoload
    stepsBeforeSave: 1,
  },
  assetManager: {
    upload: false,
  },
  // layerManager: {
  //   appendTo: "layers-container",
  // },
  // Don't initialize with content - we'll load it after editor is ready
  components: "",
  deviceManager: {
    devices: [
      {
        name: "Desktop",
        width: "100%", // Full width
        widthMedia: "",
      },
      {
        name: "Tablet",
        width: "765px",
        widthMedia: "768px",
      },
      {
        name: "Mobile",
        width: "370px",
        widthMedia: "375px",
      },
    ],
  },
});
