"use client";

import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import { useEditorStore } from "../../../store";
import Typography from "./Typography";
import Layout from "./Layout";
import Size from "./Size";
import Color from "./Color";
import Flex from "./Flex";
import Grid from "./Grid";
import Border from "./Border";
import Appearance from "./Appearance";
import Position from "./Position";

// // Helper: categorize properties and define input types
// const propertyConfig: PropertyConfigType = {
//   display: {
//     label: "Display",
//     type: "select",
//     options: [
//       "block",
//       "inline",
//       "flex",
//       "grid",
//       "inline-block",
//       "inline-flex",
//       "inline-grid",
//       "contents",
//       "none",
//     ],
//     category: "Layout",
//   },
//   gap: {
//     label: "Gap",
//     type: "text",
//     category: "Layout",
//     placeholder: "e.g., 10px, 1rem",
//     visibleWhen: {
//       property: "display",
//       values: ["grid", "inline-grid", "flex", "inline-flex"],
//     },
//     longhands: {
//       "row-gap": {
//         label: "Row Gap",
//         type: "text",
//         category: "Layout",
//         containerClassName: LEFT_CELL_CLASSES,
//       },
//       "column-gap": {
//         label: "Column Gap",
//         type: "text",
//         category: "Layout",
//         containerClassName: RIGHT_CELL_CLASSES,
//       },
//     },
//   },
//   width: {
//     label: "Width",
//     type: "text",
//     category: "Layout",
//     placeholder: "e.g., 100%, 200px",
//     // inputClassName: "w-1/2",
//     containerClassName: LEFT_CELL_CLASSES,
//   },
//   height: {
//     label: "Height",
//     type: "text",
//     category: "Layout",
//     placeholder: "e.g., 100%, 200px",
//     // inputClassName: "w-1/2",
//     containerClassName: RIGHT_CELL_CLASSES,
//   },
//   "min-width": {
//     label: "Min Width",
//     type: "text",
//     category: "Layout",
//     isExtra: true,
//     containerClassName: LEFT_CELL_CLASSES,
//   },
//   "min-height": {
//     label: "Min Height",
//     type: "text",
//     category: "Layout",
//     isExtra: true,
//     containerClassName: RIGHT_CELL_CLASSES,
//   },
//   "max-width": {
//     label: "Max Width",
//     type: "text",
//     category: "Layout",
//     isExtra: true,
//     containerClassName: LEFT_CELL_CLASSES,
//   },
//   "max-height": {
//     label: "Max Height",
//     type: "text",
//     category: "Layout",
//     isExtra: true,
//     containerClassName: RIGHT_CELL_CLASSES,
//   },
//   position: {
//     label: "Position",
//     type: "select",
//     options: ["static", "relative", "absolute", "fixed", "sticky"],
//     category: "Layout",
//   },
//   top: {
//     label: "Top",
//     type: "text",
//     category: "Layout",
//     visibleWhen: {
//       property: "position",
//       values: ["absolute", "sticky", "fixed"],
//     },
//     containerClassName: LEFT_CELL_CLASSES,
//   },
//   right: {
//     label: "Right",
//     type: "text",
//     category: "Layout",
//     visibleWhen: {
//       property: "position",
//       values: ["absolute", "sticky", "fixed"],
//     },
//     containerClassName: RIGHT_CELL_CLASSES,
//   },
//   bottom: {
//     label: "Bottom",
//     type: "text",
//     category: "Layout",
//     visibleWhen: {
//       property: "position",
//       values: ["absolute", "sticky", "fixed"],
//     },
//     containerClassName: LEFT_CELL_CLASSES,
//   },
//   left: {
//     label: "Left",
//     type: "text",
//     category: "Layout",
//     visibleWhen: {
//       property: "position",
//       values: ["absolute", "sticky", "fixed"],
//     },
//     containerClassName: RIGHT_CELL_CLASSES,
//   },
//   "grid-template-columns": {
//     label: "Grid Columns",
//     type: "text",
//     visibleWhen: {
//       property: "display",
//       values: ["grid", "inline-grid"],
//     },
//     category: "Grid",
//     containerClassName: RIGHT_CELL_CLASSES,
//   },
//   "grid-template-rows": {
//     label: "Grid Rows",
//     type: "text",
//     visibleWhen: {
//       property: "display",
//       values: ["grid", "inline-grid"],
//     },
//     category: "Grid",
//     containerClassName: LEFT_CELL_CLASSES,
//   },
//   "grid-auto-flow": {
//     label: "Grid Flow Direction",
//     type: "select",
//     options: ["row", "column", "dense", "row-dense", "col-dense"],
//     visibleWhen: {
//       property: "display",
//       values: ["grid", "inline-grid"],
//     },
//     category: "Grid",
//   },
//   "flex-direction": {
//     label: "Flex Direction",
//     type: "select",
//     options: ["row", "row-reverse", "column", "column-reverse"],
//     containerClassName: LEFT_CELL_CLASSES,
//     visibleWhen: {
//       property: "display",
//       values: ["flex", "inline-flex"],
//     },
//     category: "Flex",
//   },
//   "flex-wrap": {
//     label: "Flex Wrap",
//     type: "select",
//     options: ["nowrap", "wrap", "wrap-reverse"],
//     containerClassName: RIGHT_CELL_CLASSES,
//     visibleWhen: {
//       property: "display",
//       values: ["flex", "inline-flex"],
//     },
//     category: "Flex",
//   },
//   "justify-content": {
//     label: "Justify Content",
//     type: "select",
//     options: [
//       "normal",
//       "flex-start",
//       "flex-end",
//       "center",
//       "space-between",
//       "space-around",
//       "space-evenly",
//       "stretch",
//       "safe center",
//       "safe end",
//     ],
//     containerClassName: LEFT_CELL_CLASSES,
//     visibleWhen: {
//       property: "display",
//       values: ["flex", "inline-flex"],
//     },
//     category: "Flex",
//   },
//   "align-items": {
//     label: "Align Items",
//     type: "select",
//     options: [
//       "flex-start",
//       "flex-end",
//       "center",
//       "stretch",
//       "baseline",
//       "safe center",
//       "safe flex-end",
//       "last baseline",
//     ],
//     containerClassName: RIGHT_CELL_CLASSES,
//     visibleWhen: {
//       property: "display",
//       values: ["flex", "inline-flex"],
//     },
//     category: "Flex",
//   },
//   "align-content": {
//     label: "Align Content",
//     type: "select",
//     options: [
//       "normal",
//       "space-evenly",
//       "baseline",
//       "stretch",
//       "flex-start",
//       "center",
//       "flex-end",
//       "space-between",
//       "space-around",
//     ],
//     containerClassName: RIGHT_CELL_CLASSES,
//     visibleWhen: {
//       property: "display",
//       values: ["flex", "inline-flex"],
//     },
//     category: "Flex",
//   },
//   "z-index": {
//     label: "Z-Index",
//     type: "text",
//     category: "Layout",
//     isExtra: true,
//   },
//   margin: {
//     label: "Margin",
//     type: "text",
//     category: "Spacing",
//     placeholder: "e.g., 10px, 1rem",
//     longhands: {
//       "margin-top": {
//         label: "Margin Top",
//         type: "text",
//         category: "Spacing",
//         containerClassName: LEFT_CELL_CLASSES,
//       },
//       "margin-right": {
//         label: "Margin Right",
//         type: "text",
//         category: "Spacing",
//         containerClassName: RIGHT_CELL_CLASSES,
//       },
//       "margin-bottom": {
//         label: "Margin Bottom",
//         type: "text",
//         category: "Spacing",
//         containerClassName: LEFT_CELL_CLASSES,
//       },
//       "margin-left": {
//         label: "Margin Left",
//         type: "text",
//         category: "Spacing",
//         containerClassName: RIGHT_CELL_CLASSES,
//       },
//     },
//   },
//   padding: {
//     label: "Padding",
//     type: "text",
//     category: "Spacing",
//     placeholder: "e.g., 10px, 1rem",
//     longhands: {
//       "padding-top": {
//         label: "Padding Top",
//         type: "text",
//         category: "Spacing",
//         containerClassName: LEFT_CELL_CLASSES,
//       },
//       "padding-right": {
//         label: "Padding Right",
//         type: "text",
//         category: "Spacing",
//         containerClassName: RIGHT_CELL_CLASSES,
//       },
//       "padding-bottom": {
//         label: "Padding Bottom",
//         type: "text",
//         category: "Spacing",
//         containerClassName: LEFT_CELL_CLASSES,
//       },
//       "padding-left": {
//         label: "Padding Left",
//         type: "text",
//         category: "Spacing",
//         containerClassName: RIGHT_CELL_CLASSES,
//       },
//     },
//   },
//   "background-color": {
//     label: "Background Color",
//     type: "color",
//     category: "Colors",
//   },
//   color: { label: "Text Color", type: "color", category: "Colors" },
//   "border-color": { label: "Border Color", type: "color", category: "Border" },
//   "border-width": {
//     label: "Border Width",
//     type: "range",
//     min: 0,
//     max: 20,
//     category: "Border",
//     longhands: {
//       "border-top-width": {
//         label: "Border Top Width",
//         type: "range",
//         min: 0,
//         max: 20,
//         category: "Border",
//       },
//       "border-right-width": {
//         label: "Border Right Width",
//         type: "range",
//         min: 0,
//         max: 20,
//         category: "Border",
//       },
//       "border-bottom-width": {
//         label: "Border Bottom Width",
//         type: "range",
//         min: 0,
//         max: 20,
//         category: "Border",
//       },
//       "border-left-width": {
//         label: "Border Left Width",
//         type: "range",
//         min: 0,
//         max: 20,
//         category: "Border",
//       },
//     },
//   },
//   "border-style": {
//     label: "Border Style",
//     type: "select",
//     options: ["none", "solid", "dashed", "dotted", "double"],
//     category: "Border",
//     longhands: {
//       "border-top-style": {
//         label: "Border Style",
//         type: "select",
//         options: ["none", "solid", "dashed", "dotted", "double"],
//         category: "Border",
//       },
//       "border-right-style": {
//         label: "Border Right Style",
//         type: "select",
//         options: ["none", "solid", "dashed", "dotted", "double"],
//         category: "Border",
//       },
//       "border-bottom-style": {
//         label: "Border Bottom Style",
//         type: "select",
//         options: ["none", "solid", "dashed", "dotted", "double"],
//         category: "Border",
//       },
//       "border-left-style": {
//         label: "Border Left Style",
//         type: "select",
//         options: ["none", "solid", "dashed", "dotted", "double"],
//         category: "Border",
//       },
//     },
//   },
//   "border-radius": {
//     label: "Border Radius",
//     type: "range",
//     min: 0,
//     max: 50,
//     category: "Border",
//     displayProperty: "border-radius",
//     longhands: {
//       "border-top-right-radius": {
//         label: "Border Top Right Radius",
//         type: "range",
//         min: 0,
//         max: 50,
//         category: "Border",
//         displayProperty: "border-radius",
//       },
//       "border-top-left-radius": {
//         label: "Border Top left Radius",
//         type: "range",
//         min: 0,
//         max: 50,
//         category: "Border",
//         displayProperty: "border-radius",
//       },
//       "border-bottom-right-radius": {
//         label: "Border bottom Right Radius",
//         type: "range",
//         min: 0,
//         max: 50,
//         category: "Border",
//         displayProperty: "border-radius",
//       },
//       "border-bottom-left-radius": {
//         label: "Border Bottom Left Radius",
//         type: "range",
//         min: 0,
//         max: 50,
//         category: "Border",
//         displayProperty: "border-radius",
//       },
//     },
//   },
//   "box-shadow": {
//     label: "Box Shadow",
//     type: "text",
//     category: "Effects",
//     placeholder: "e.g., 0 2px 4px rgba(0,0,0,0.1)",
//   },
//   opacity: {
//     label: "Opacity",
//     type: "range",
//     min: 0,
//     max: 100,
//     category: "Effects",
//     displayProperty: "opacity",
//   },
//   "font-size": {
//     label: "Font Size",
//     type: "range",
//     min: 8,
//     max: 72,
//     category: "Typography",
//     displayProperty: "font-size",
//   },
//   "font-weight": {
//     label: "Font Weight",
//     type: "select",
//     options: [
//       "normal",
//       "bold",
//       "100",
//       "200",
//       "300",
//       "400",
//       "500",
//       "600",
//       "700",
//       "800",
//       "900",
//     ],
//     category: "Typography",
//   },
//   "text-align": {
//     label: "Text Align",
//     type: "select",
//     options: ["left", "center", "right", "justify"],
//     category: "Typography",
//     displayProperty: "text-align",
//   },
//   "line-height": { label: "Line Height", type: "text", category: "Typography" },
//   "text-shadow": { label: "Text Shadow", type: "text", category: "Typography" },
//   // ...add more as needed
// };

export default function StylesBar() {
  const { selectedComponents, styleValues } = useEditorStore(
    useShallow((state) => ({
      selectedComponents: state.selectedComponents,
      styleValues: state.styleValues,
    }))
  );

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-full min-h-0">
      <motion.div
        className="overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#26272B #18191A",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="space-y-2">
          {selectedComponents.length > 0 &&
            selectedComponents[selectedComponents.length - 1].getType() ===
              "text" && <Typography />}
          {selectedComponents.length > 0 ? (
            <>
              <Layout />
              <Size />
              {["flex", "inline-flex"].includes(styleValues["display"]) && (
                <Flex />
              )}
              {["grid", "inline-grid"].includes(styleValues["display"]) && (
                <Grid />
              )}
              <Color />
              <Border />
              <Appearance />
              <Position />
            </>
          ) : (
            <div className="text-center text-gray-500 italic py-8">
              Select a component to edit its styles
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
