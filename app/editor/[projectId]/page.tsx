"use client";

import { useEffect, useState, useRef } from "react";
import { useEditorStore } from "../(project)/store";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { objectToUniversalCss } from "./utils/objectToUniversalCss";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { initBaseDefaultStyles } from "./utils/defaultStyles/base";
import { initTailwindDefaultStyles } from "./utils/defaultStyles/tailwind.ts";

export default function EditorPage() {
  const { projectId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const [yoinkName, setYoinkName] = useState<string | null>(null);
  const [yoinkContent, setYoinkContent] = useState<string | null>(null);

  // Zustand store
  const {
    editor,
    isEditorReady,
    defaultBaseStyles,
    initializeEditor,
    destroyEditor,
  } = useEditorStore();

  const baseStyleInjected = useRef(false);

  // Main initialization effect - handles user auth, content fetching, and editor setup
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        return data.user;
      }
      return null;
    };

    const fetchYoinkContent = async (currentUser: User, projectId: string) => {
      try {
        // 1. Get the yoink row for this user + project
        const { data: yoinks, error: yoinkError } = await supabase
          .from("yoinks")
          .select("content_url, name")
          .eq("user_id", currentUser.id)
          .eq("id", projectId)
          .single();

        if (yoinkError || !yoinks) {
          console.error("Error fetching yoink:", yoinkError?.message);
          return;
        }

        const contentUrl = yoinks.content_url;
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
        setYoinkName(yoinks.name);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    // Initialize user and fetch content
    getUser().then((fetchedUser) => {
      if (fetchedUser) {
        fetchYoinkContent(fetchedUser, projectId as string);
      }
    });

    // Load base default styles
    initBaseDefaultStyles();

    // Load tailwind default styles
    initTailwindDefaultStyles();

    // Cleanup on unmount
    return () => {
      destroyEditor();
    };
  }, [projectId, supabase, destroyEditor]);

  // Editor and styles management effect
  useEffect(() => {
    // Initialize editor when content is available
    if (yoinkContent && !isEditorReady) {
      initializeEditor(yoinkContent);
    }

    // Inject base styles into editor
    if (editor && !baseStyleInjected.current) {
      if (defaultBaseStyles) {
        const cssString = objectToUniversalCss(defaultBaseStyles["div"]);
        editor.addStyle(cssString);
        baseStyleInjected.current = true;
      }
    }
  }, [
    yoinkContent,
    isEditorReady,
    initializeEditor,
    defaultBaseStyles,
    editor,
  ]);

  return (
    <>
      <Navbar yoinkName={yoinkName} yoinkId={projectId as string} user={user} />
      <div className="flex h-full min-h-0">
        <div className="flex h-full flex-1 gap-4 min-h-0">
          {editor && <Sidebar />}
          <div className="flex-1 h-full rounded-md overflow-hidden relative">
            <div id="gjs-container" className="h-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
