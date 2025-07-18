import { useEffect } from "react";
import { Editor } from "grapesjs";
import { ComponentStyles, DeviceName, StyleValues } from "../types";
import { generateUID, getDefaultStyleValues } from "../utils/helpers";
import { changeStyleStateHandler } from "../utils/changeStyleStateHandler";

interface UseComponentManagementProps {
  editor: Editor | null;
  setSelectedComponent: (component: any) => void;
  setStyleValues: (values: StyleValues) => void;
  setComponentStyles: React.Dispatch<React.SetStateAction<ComponentStyles>>;
  componentStyles: ComponentStyles;
  deviceName: DeviceName;
  setActiveTab: (tab: string) => void;
  defaultStyles: Record<string, string> | undefined;
}

export const useComponentManagement = ({
  editor,
  setSelectedComponent,
  setStyleValues,
  setComponentStyles,
  componentStyles,
  deviceName,
  setActiveTab,
  defaultStyles,
}: UseComponentManagementProps) => {
  useEffect(() => {
    if (!editor) return;

    // Listen for component creation
    const handleComponentAdd = (component: any) => {
      const current = component.getAttributes();

      // Check if component already has a UID to prevent duplicate entries
      if (current["data-yoink-uid"]) {
        return; // Component already processed, skip
      }

      // Check if this is a text node - only text nodes should get UIDs
      if (component.get("type") == "textnode") {
        return; // Skip non-text nodes
      }

      const uid = generateUID();

      // Set the UID attribute
      component.setAttributes({
        ...current,
        "data-yoink-uid": uid,
      });

      // Initialize the component styles in our object
      setComponentStyles((prev) => ({
        ...prev,
        [uid]: {
          base: {},
          sm: {},
          md: {},
          lg: {},
        },
      }));

      // Apply any existing styles from data-yoink-sm if present
      if (current["data-yoink-base"]) {
        try {
          const styles = JSON.parse(current["data-yoink-base"]);
          component.setStyle(styles);

          // Update our styles object
          setComponentStyles((prev) => ({
            ...prev,
            [uid]: {
              ...prev[uid],
              base: styles,
            },
          }));
        } catch (e) {
          console.error("Error parsing existing styles:", e);
        }
      }

      // Automatically select the component after it's added
      // I used setTimeout(() => { editor.select(component); }, 0) to ensure the selection happens after the current execution cycle is complete. This prevents any potential timing issues where the component might not be fully initialized when we try to select it.
      setTimeout(() => {
        editor.select(component);
      }, 0);
    };

    // Listen for component selection
    const handleComponentSelected = (component: any) => {
      setSelectedComponent(component);
      setActiveTab("styles");
      const uid = component.getAttributes()["data-yoink-uid"];
      if (uid) {
        changeStyleStateHandler(
          component,
          componentStyles,
          deviceName,
          setStyleValues,
          defaultStyles
        );
      }
    };

    // Listen for component deselection
    const handleComponentDeselected = () => {
      setSelectedComponent(null);
      setStyleValues(getDefaultStyleValues());
      setActiveTab("blocks");
    };

    // Listen for component removal
    const handleComponentRemove = (component: any) => {
      const current = component.getAttributes();
      const uid = current["data-yoink-uid"];
      if (uid) {
        setComponentStyles((prev) => {
          const newStyles = { ...prev };
          delete newStyles[uid];
          return newStyles;
        });
      }
    };

    // Attach event listeners
    editor.on("component:add", handleComponentAdd);
    editor.on("component:selected", handleComponentSelected);
    editor.on("component:deselected", handleComponentDeselected);
    editor.on("component:remove", handleComponentRemove);

    // Cleanup event listeners
    return () => {
      editor.off("component:add", handleComponentAdd);
      editor.off("component:selected", handleComponentSelected);
      editor.off("component:deselected", handleComponentDeselected);
      editor.off("component:remove", handleComponentRemove);
    };
  }, [
    editor,
    setSelectedComponent,
    setStyleValues,
    setComponentStyles,
    componentStyles,
    deviceName,
    setActiveTab,
  ]);
};
