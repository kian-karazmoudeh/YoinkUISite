"use client";

import { Editor } from "grapesjs";
import { useEffect } from "react";

// Type for the component styles object
interface ComponentStyles {
  [uid: string]: {
    lg: { [key: string]: string };
    md: { [key: string]: string };
    sm: { [key: string]: string };
  };
}

interface DeviceManagerProps {
  editor: Editor | null;
  setCurrentDevice: (device: "Desktop" | "Tablet" | "Mobile") => void;
  currentDevice: string;
  componentStyles: ComponentStyles;
}

export default function LeftSidebar({
  editor,
  setCurrentDevice,
  currentDevice,
  componentStyles,
}: DeviceManagerProps) {
  const selectDevice = (deviceName: "Desktop" | "Tablet" | "Mobile") => {
    if (!editor) return;
    setCurrentDevice(deviceName);
  };

  // Function to apply responsive styles to cloned components
  const applyResponsiveStyles = () => {
    if (!editor) return [];

    // Get all components in the editor
    const components = editor.getComponents();

    // Clone and apply styles to components
    const clonedComponents = components.map((component: any) => {
      // Clone the component
      const clonedComponent = component.clone();
      const uid = clonedComponent.getAttributes()["data-yoink-uid"];

      if (uid && componentStyles[uid]) {
        const styles = componentStyles[uid];

        // Always apply SM styles as base
        if (styles.sm && Object.keys(styles.sm).length > 0) {
          clonedComponent.setAttributes({
            ...clonedComponent.getAttributes(),
            "data-yoink-sm": JSON.stringify(styles.sm),
          });
        }

        // For MD, start with SM base and merge in MD differences
        if (styles.md && Object.keys(styles.md).length > 0) {
          const smStyles = styles.sm || {};
          const mdStyles = { ...smStyles, ...styles.md };

          clonedComponent.setAttributes({
            ...clonedComponent.getAttributes(),
            "data-yoink-md": JSON.stringify(mdStyles),
          });
        }

        // For LG, start with SM base and merge in LG differences
        if (styles.lg && Object.keys(styles.lg).length > 0) {
          const smStyles = styles.sm || {};
          const lgStyles = { ...smStyles, ...styles.lg };

          clonedComponent.setAttributes({
            ...clonedComponent.getAttributes(),
            "data-yoink-lg": JSON.stringify(lgStyles),
          });
        }
      }

      return clonedComponent;
    });

    return clonedComponents;
  };

  // Export functions
  const exportHTML = () => {
    if (!editor) return;

    // Get cloned components with responsive styles
    const clonedComponents = applyResponsiveStyles();

    // Create a temporary editor or work with the cloned components
    // For now, we'll need to temporarily replace components and then restore them
    const originalComponents = editor.getComponents();

    // Temporarily replace components with cloned ones
    editor.setComponents(clonedComponents);

    const html = editor.getHtml();
    const css = editor.getCss();
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported from YoinkUI</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
</body>
</html>`;

    // Restore original components
    editor.setComponents(originalComponents);

    const blob = new Blob([fullHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yoinkui-export.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCSS = () => {
    if (!editor) return;

    // Get cloned components with responsive styles
    const clonedComponents = applyResponsiveStyles();

    // Temporarily replace components with cloned ones
    const originalComponents = editor.getComponents();
    editor.setComponents(clonedComponents);

    const css = editor.getCss() || "";

    // Restore original components
    editor.setComponents(originalComponents);

    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yoinkui-styles.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!editor) return;

    // Get cloned components with responsive styles
    const clonedComponents = applyResponsiveStyles();

    const json = clonedComponents.map((component: any) => component.toJSON());
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yoinkui-components.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Add keyboard shortcuts for device switching
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!editor) return;

      // Check if Ctrl/Cmd is pressed
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "1":
            event.preventDefault();
            selectDevice("Desktop");
            break;
          case "2":
            event.preventDefault();
            selectDevice("Tablet");
            break;
          case "3":
            event.preventDefault();
            selectDevice("Mobile");
            break;
          case "e":
            event.preventDefault();
            exportHTML();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

  return (
    <div className="w-80 h-full bg-[#18191A] border border-[#26272B] overflow-y-auto flex flex-col rounded-md min-h-0">
      {/* Blocks Manager */}

      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Components</h3>
        <div id="blocks" className="flex-1 overflow-y-auto"></div>
      </div>
    </div>
  );
}
