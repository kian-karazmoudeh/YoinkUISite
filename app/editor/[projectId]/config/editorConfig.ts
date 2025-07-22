import { blocks } from "../components/blocks";

export const getEditorConfig = () => ({
  container: "#gjs-container",
  height: "100%",
  width: "auto",
  storageManager: false,
  panels: {
    defaults: [],
  },
  blockManager: {
    blocks: blocks,
    appendTo: undefined,
  },
  layerManager: {
    appendTo: ".layers-container",
  },
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
