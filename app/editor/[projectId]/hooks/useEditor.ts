import { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { getEditorConfig } from "../config/editorConfig";
import "../styles/editor.css";

export const useEditor = ({ content }: { content: string }) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const contentLoadedRef = useRef(false);

  useEffect(() => {
    // Check if the container element exists
    const container = document.getElementById("gjs-container");
    if (!container) {
      // Container doesn't exist yet, wait for it
      return;
    }

    if (!editorRef.current) {
      try {
        // Initialize GrapeJS editor
        const editor = grapesjs.init(getEditorConfig({ content }));

        // Add device switching commands
        editor.Commands.add("set-device-desktop", {
          run: () => {
            const deviceManager = editor.DeviceManager;
            const desktopDevice = deviceManager
              .getAll()
              .find((device: any) => device.get("name") === "Desktop");
            if (desktopDevice) {
              deviceManager.select(desktopDevice);
            }
          },
        });

        editor.Commands.add("set-device-tablet", {
          run: () => {
            const deviceManager = editor.DeviceManager;
            const tabletDevice = deviceManager
              .getAll()
              .find((device: any) => device.get("name") === "Tablet");
            if (tabletDevice) {
              deviceManager.select(tabletDevice);
            }
          },
        });

        editor.Commands.add("set-device-mobile", {
          run: () => {
            const deviceManager = editor.DeviceManager;
            const mobileDevice = deviceManager
              .getAll()
              .find((device: any) => device.get("name") === "Mobile");
            if (mobileDevice) {
              deviceManager.select(mobileDevice);
            }
          },
        });

        editorRef.current = editor;
        setEditor(editor);
        setIsEditorReady(true);
      } catch (error) {
        console.error("Error initializing editor:", error);
      }

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
          setIsEditorReady(false);
          contentLoadedRef.current = false;
        }
      };
    }
  }, []); // Only run once when component mounts

  // Handle content updates
  useEffect(() => {
    if (editor && content && isEditorReady && !contentLoadedRef.current) {
      // Clear existing content and load new content
      editor.setComponents(content);
      contentLoadedRef.current = true;
    }
  }, [content, editor, isEditorReady]);

  return { editor, editorRef, isEditorReady };
};
