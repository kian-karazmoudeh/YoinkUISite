"use client";

import { Editor } from "grapesjs";

interface DeviceManagerProps {
  editor: Editor | null;
  setCurrentDevice: (device: string) => void;
  currentDevice: string;
}

export default function LeftSidebar({
  editor,
  setCurrentDevice,
  currentDevice,
}: DeviceManagerProps) {
  const selectDevice = (deviceName: string) => {
    if (!editor) return;
    setCurrentDevice(deviceName);
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto flex flex-col">
      {/* Device Manager */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Device Preview
        </h3>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => selectDevice("Desktop")}
            title="Desktop (Ctrl+1)"
            className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              currentDevice === "Desktop"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                clipRule="evenodd"
              />
            </svg>
            Desktop
          </button>
          <button
            onClick={() => selectDevice("Tablet")}
            title="Tablet (Ctrl+2)"
            className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              currentDevice === "Tablet"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Tablet
          </button>
          <button
            onClick={() => selectDevice("Mobile")}
            title="Mobile (Ctrl+3)"
            className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              currentDevice === "Mobile"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM7 4h6v12H7V4z" />
            </svg>
            Mobile
          </button>
        </div>
      </div>

      {/* Blocks Manager */}
      <div className="flex-1 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Components</h3>
        <div id="blocks" className="space-y-3"></div>
      </div>
    </div>
  );
}
