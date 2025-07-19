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
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";

export default function EditorPage() {
  const { projectId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const [yoinkContent, setYoinkContent] = useState<string | null>(null);

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

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        return data.user; // return the user
      }
      return null;
    };

    getUser().then((fetchedUser) => {
      if (fetchedUser) {
        fetchYoinkContent(fetchedUser, projectId as string);
      }
    });

    const fetchYoinkContent = async (currentUser: User, projectId: string) => {
      try {
        // 1. Get the yoink row for this user + project
        const { data: yoinks, error: yoinkError } = await supabase
          .from("yoinks")
          .select("content_url")
          .eq("user_id", currentUser.id)
          .eq("id", projectId) // make sure you filter by project
          .single(); // assuming one yoink per project

        if (yoinkError || !yoinks) {
          console.error("Error fetching yoink:", yoinkError?.message);
          return;
        }

        const contentUrl = yoinks.content_url; // e.g. "some-folder/file.txt"
        if (!contentUrl) {
          console.error("No content_url found for this yoink");
          return;
        }

        // 2. Download the file from yoink-content bucket
        const { data: fileData, error: downloadError } = await supabase.storage
          .from("yoink-content")
          .download(contentUrl);

        if (downloadError || !fileData) {
          console.error("Error downloading file:", downloadError?.message);
          return;
        }

        // 3. Read the file as text
        const textContent = await fileData.text();

        // 4. Save into state
        setYoinkContent(textContent);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    // Optional: listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setYoinkContent(null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Custom hooks - must be called before any conditional returns
  const { editor } = useEditor({ content: yoinkContent || "" });

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
