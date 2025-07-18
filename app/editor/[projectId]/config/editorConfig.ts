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
    appendTo: false,
  },
  layerManager: {
    appendTo: ".layers-container",
  },
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
