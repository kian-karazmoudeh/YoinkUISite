"use client";

import { useEffect, useState, useRef } from "react";
import { useEditor } from "./hooks/useEditor";
import { useComponentManagement } from "./hooks/useComponentManagement";
import { useDeviceManagement } from "./hooks/useDeviceManagement";
import { useStyleManagement } from "./hooks/useStyleManagement";
import { ComponentStyles, StyleValues, DeviceName } from "./types";
import { getDefaultStyleValues } from "./utils/helpers";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { getBaseDefaultStyles } from "@/utils/defaultStyles/base/localstore";
import { objectToUniversalCss } from "./utils/objectToUniversalCss";
export default function EditorPage() {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [currentDevice, setCurrentDevice] = useState<DeviceName>("Desktop");
  const [componentStyles, setComponentStyles] = useState<ComponentStyles>({});
  const [styleValues, setStyleValues] = useState<StyleValues>(
    getDefaultStyleValues()
  );
  const [activeTab, setActiveTab] = useState<string>("blocks");
  const [baseDefaultStyles, setBaseDefaultStyles] = useState<
    Record<string, Record<string, string>> | undefined
  >(undefined);
  // Custom hooks
  const { editor } = useEditor();

  const { handleDeviceChange } = useDeviceManagement({
    editor,
    currentDevice,
    setCurrentDevice,
    selectedComponent,
    setStyleValues,
    componentStyles,
    defaultStyles: baseDefaultStyles ? baseDefaultStyles["div"] : undefined,
  });

  const { updateComponentStyle, handleSliderChange } = useStyleManagement({
    selectedComponent,
    currentDevice,
    componentStyles,
    setComponentStyles,
    setStyleValues,
  });

  // Component management hook
  useComponentManagement({
    editor,
    setSelectedComponent,
    setStyleValues,
    setComponentStyles,
    componentStyles,
    deviceName: currentDevice,
    setActiveTab, // Pass the setActiveTab function
    defaultStyles: baseDefaultStyles ? baseDefaultStyles["div"] : undefined,
  });

  const baseStyleInjected = useRef(false);

  useEffect(() => {
    if (!baseDefaultStyles) {
      getBaseDefaultStyles({ setBaseDefaultStyles });
    } else if (editor && !baseStyleInjected.current) {
      const cssString = objectToUniversalCss(baseDefaultStyles["div"]);
      editor.addStyle(cssString);
      baseStyleInjected.current = true; // Mark as injected
    }
  }, [editor, baseDefaultStyles]);

  return (
    <>
      <Navbar
        currentDevice={currentDevice}
        setCurrentDevice={handleDeviceChange}
      />
      <div className="flex h-full min-h-0">
        <div className="flex h-full flex-1 gap-4 min-h-0">
          {editor && (
            <Sidebar
              selectedComponent={selectedComponent}
              styleValues={styleValues}
              updateComponentStyle={updateComponentStyle}
              handleSliderChange={handleSliderChange}
              editor={editor}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
          <div className="flex-1 h-full rounded-md overflow-hidden relative">
            {/* <button
              className="absolute top-10 right-10 z-[999999] bg-red-500 text-white p-2 rounded-md"
              onClick={() => console.log(baseDefaultStyles)}
            >
              Default Styles
            </button> */}
            <div id="gjs-container" className="h-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
