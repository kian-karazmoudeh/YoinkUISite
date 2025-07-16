"use client";

import { useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { useEditor } from "./hooks/useEditor";
import { useComponentManagement } from "./hooks/useComponentManagement";
import { useDeviceManagement } from "./hooks/useDeviceManagement";
import { useStyleManagement } from "./hooks/useStyleManagement";
import { ComponentStyles, StyleValues, DeviceName } from "./types";
import { getDefaultStyleValues } from "./utils/helpers";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BlocksModal from "./components/BlocksModal";
export default function EditorPage() {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [currentDevice, setCurrentDevice] = useState<DeviceName>("Desktop");
  const [componentStyles, setComponentStyles] = useState<ComponentStyles>({});
  const [styleValues, setStyleValues] = useState<StyleValues>(
    getDefaultStyleValues()
  );

  // Custom hooks
  const { editor } = useEditor();

  const { handleDeviceChange } = useDeviceManagement({
    editor,
    currentDevice,
    setCurrentDevice,
    selectedComponent,
    setStyleValues,
    componentStyles,
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
  });

  return (
    <>
      <Navbar
        currentDevice={currentDevice}
        setCurrentDevice={handleDeviceChange}
      />
      <div className="flex h-full min-h-0">
        <div className="flex h-full flex-1 gap-4 min-h-0">
          {/* <LeftSidebar
            editor={editor}
            setCurrentDevice={handleDeviceChange}
            currentDevice={currentDevice}
            componentStyles={componentStyles}
          /> */}
          {editor && (
            <Sidebar
              selectedComponent={selectedComponent}
              styleValues={styleValues}
              updateComponentStyle={updateComponentStyle}
              handleSliderChange={handleSliderChange}
              editor={editor}
            />
          )}
          <div className="flex-1 h-full rounded-md overflow-hidden relative">
            <div id="gjs-container" className="h-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
