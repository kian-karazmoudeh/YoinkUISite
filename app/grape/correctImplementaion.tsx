// "use client";

// import { useEffect, useRef, useState } from "react";
// import grapesjs, { Editor } from "grapesjs";
// import "grapesjs/dist/css/grapes.min.css";
// import LeftSidebar from "./components/LeftSidebar";
// import RightSidebar from "./components/RightSidebar";
// import { blocks } from "./components/blocks";

// export default function EditorPage() {
//   const [editor, setEditor] = useState<Editor | null>(null);
//   const editorRef = useRef<Editor>(null);
//   const [selectedComponent, setSelectedComponent] = useState<any>(null);
//   const [currentDevice, setCurrentDevice] = useState("Desktop");
//   const [styleValues, setStyleValues] = useState({
//     width: "",
//     height: "",
//     display: "block",
//     fontSize: "16",
//     fontWeight: "normal",
//     textAlign: "left",
//     backgroundColor: "#ffffff",
//     color: "#000000",
//     padding: "",
//     margin: "",
//     borderWidth: "0",
//     borderColor: "#000000",
//     borderStyle: "solid",
//     borderRadius: "0",
//     opacity: "100",
//     boxShadow: "",
//   });

//   useEffect(() => {
//     if (!editorRef.current) {
//       // Initialize GrapeJS editor
//       const editor = grapesjs.init({
//         container: "#gjs-container",
//         height: "100vh",
//         width: "auto",
//         storageManager: false,
//         panels: {
//           defaults: [
//             {
//               buttons: [],
//             },
//           ],
//         },
//         blockManager: {
//           appendTo: "#blocks",
//           blocks: blocks,
//         },
//         layerManager: {
//           appendTo: ".layers-container",
//         },
//         deviceManager: {
//           devices: [
//             {
//               name: "Desktop",
//               width: "",
//               widthMedia: "",
//             },
//             {
//               name: "Tablet",
//               width: "768px",
//               widthMedia: "992px",
//             },
//             {
//               name: "Mobile",
//               width: "375px",
//               widthMedia: "480px",
//             },
//           ],
//         },
//         // plugins: ["gjs-preset-webpage"],
//         // pluginsOpts: {
//         //   "gjs-preset-webpage": {},
//         // },
//       });

//       // Add custom device manager functionality
//       const deviceManager = editor.DeviceManager;

//       // Override the device selection method
//       const originalSelect = deviceManager.select;
//       deviceManager.select = function (device: any) {
//         const result = originalSelect.call(this, device);

//         // Add device class to canvas wrapper
//         const canvasWrapper = document.querySelector(".gjs-cv-canvas-wrapper");
//         if (canvasWrapper) {
//           const deviceName = device.get("name").toLowerCase();
//           canvasWrapper.className = `gjs-cv-canvas-wrapper device-${deviceName}`;
//         }

//         return result;
//       };

//       // Listen for component selection
//       editor.on("component:selected", (component: any) => {
//         setSelectedComponent(component);
//         const styles = component.getStyle();
//         setStyleValues({
//           width: styles.width || "",
//           height: styles.height || "",
//           display: styles.display || "block",
//           fontSize: styles["font-size"] || "16",
//           fontWeight: styles["font-weight"] || "normal",
//           textAlign: styles["text-align"] || "left",
//           backgroundColor: styles["background-color"] || "#ffffff",
//           color: styles.color || "#000000",
//           padding: styles.padding || "",
//           margin: styles.margin || "",
//           borderWidth: styles["border-width"] || "0",
//           borderColor: styles["border-color"] || "#000000",
//           borderStyle: styles["border-style"] || "solid",
//           borderRadius: styles["border-radius"] || "0",
//           opacity: styles.opacity
//             ? Math.round(parseFloat(styles.opacity) * 100).toString()
//             : "100",
//           boxShadow: styles["box-shadow"] || "",
//         });
//       });

//       // Listen for component deselection
//       editor.on("component:deselected", () => {
//         setSelectedComponent(null);
//         setStyleValues({
//           width: "",
//           height: "",
//           display: "block",
//           fontSize: "16",
//           fontWeight: "normal",
//           textAlign: "left",
//           backgroundColor: "#ffffff",
//           color: "#000000",
//           padding: "",
//           margin: "",
//           borderWidth: "0",
//           borderColor: "#000000",
//           borderStyle: "solid",
//           borderRadius: "0",
//           opacity: "100",
//           boxShadow: "",
//         });
//       });

//       // Listen for device changes
//       editor.on("device:select", (device: any) => {
//         const deviceName = device.get("name");
//         console.log("Device changed to:", deviceName);
//         setCurrentDevice(deviceName);
//       });

//       // Add minimal custom CSS for GrapeJS editor layout
//       const style = document.createElement("style");
//       style.textContent = `
//       .gjs-cv-canvas {
//         top: 0;
//         width: 100%;
//         height: 100%;
//       }
//       .panel__basic-actions {
//         position: fixed;
//         top: 0;
//         right: 0;
//         z-index: 100;
//         background: #374151;
//         padding: 10px;
//         border-radius: 0 0 0 8px;
//       }
//       .panel__basic-actions button:hover {
//         background: #f3f4f6;
//       }
//       .gjs-block {
//         width: 100%;
//         height: auto;
//         min-height: auto;
//         margin: 0;
//         padding: 10px;
//         border: 1px solid #d1d5db;
//         border-radius: 6px;
//         background: white;
//         cursor: pointer;
//         transition: all 0.2s;
//       }
//       .gjs-block:hover {
//         background: #f9fafb;
//         transform: translateY(-2px);
//         box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//       }
//       .gjs-block-label {
//         font-size: 12px;
//         text-align: center;
//         margin-top: 5px;
//         color: #374151;
//       }
//       .gjs-block-category {
//         font-weight: bold;
//         margin-bottom: 10px;
//         padding: 5px;
//         background: #e5e7eb;
//         border-radius: 4px;
//         font-size: 14px;
//         color: #374151;
//       }
//       .block-preview {
//         pointer-events: none;
//       }

//       /* Device Manager Styles */
//       .gjs-cv-canvas {
//         transition: all 0.3s ease;
//       }

//       /* Device preview indicators */
//       .device-desktop .gjs-cv-canvas {
//         max-width: 100%;
//         margin: 0 auto;
//       }

//       .device-tablet .gjs-cv-canvas {
//         max-width: 768px;
//         margin: 0 auto;
//         border: 2px solid #e5e7eb;
//         border-radius: 8px;
//         box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//       }

//       .device-mobile .gjs-cv-canvas {
//         max-width: 375px;
//         margin: 0 auto;
//         border: 2px solid #e5e7eb;
//         border-radius: 12px;
//         box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//       }

//       /* Responsive canvas wrapper */
//       .gjs-cv-canvas-wrapper {
//         display: flex;
//         justify-content: center;
//         align-items: flex-start;
//         min-height: 100%;
//         padding: 20px;
//         background: #f9fafb;
//       }
//     `;
//       document.head.appendChild(style);

//       editorRef.current = editor;
//       setEditor(editor);

//       return () => {
//         if (editorRef.current) {
//           editorRef.current.destroy();
//           editorRef.current = null;
//         }
//         document.head.removeChild(style);
//       };
//     }
//   }, []);

//   // Function to update component styles
//   const updateComponentStyle = (property: string, value: string) => {
//     if (!selectedComponent) return;

//     selectedComponent.setStyle({ [property]: value });
//     setStyleValues((prev) => ({ ...prev, [property]: value }));
//   };

//   // Function to handle slider changes
//   const handleSliderChange = (
//     property: string,
//     value: string,
//     displayProperty?: string
//   ) => {
//     if (!selectedComponent) return;

//     const finalValue =
//       displayProperty === "opacity" ? `${parseInt(value) / 100}` : `${value}px`;
//     const styleProperty = displayProperty || property;

//     selectedComponent.setStyle({ [styleProperty]: finalValue });
//     setStyleValues((prev) => ({ ...prev, [property]: value }));
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="panel__top bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <span className="text-sm font-medium">Device:</span>
//             <span className="text-sm bg-blue-500 px-2 py-1 rounded">
//               {currentDevice}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm font-medium">Width:</span>
//             <span className="text-sm bg-gray-600 px-2 py-1 rounded">
//               {currentDevice === "Desktop"
//                 ? "100%"
//                 : currentDevice === "Tablet"
//                 ? "768px"
//                 : "375px"}
//             </span>
//           </div>
//         </div>
//         <div className="panel__basic-actions"></div>
//       </div>
//       <div className="flex flex-1 h-full">
//         <LeftSidebar editor={editor} />
//         <div className="flex-1 h-full">
//           <div id="gjs-container" className="h-full"></div>
//         </div>
//         <RightSidebar
//           selectedComponent={selectedComponent}
//           styleValues={styleValues}
//           updateComponentStyle={updateComponentStyle}
//           handleSliderChange={handleSliderChange}
//         />
//       </div>
//     </div>
//   );
// }
