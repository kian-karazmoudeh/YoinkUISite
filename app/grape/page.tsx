"use client";

import grapesjs, { Editor } from "grapesjs";
import GjsEditor, { Canvas } from "@grapesjs/react";
import Topbar from "./components/Topbar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

export default function DefaultEditor() {
  const onEditor = (editor: Editor) => {
    console.log("Editor loaded", { editor });
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options
      options={{
        height: "100vh",
        storageManager: false,
      }}
      plugins={[
        {
          id: "gjs-blocks-basic",
          src: "https://unpkg.com/grapesjs-blocks-basic",
        },
      ]}
      onEditor={onEditor}
    >
      <div className="grid gird-cols-2">
        <LeftSidebar />
        <div className="row-start-1 h-full flex flex-col">
          <Topbar />
          <div className="p-10 grow bg-green-500 flex flex-col">
            <Canvas className="grow" />
          </div>
        </div>
        <RightSidebar />
      </div>
    </GjsEditor>
  );
}
