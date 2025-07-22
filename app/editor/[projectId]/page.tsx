"use client";

import { useEffect, useState, useRef } from "react";
import { useEditorStore } from "./store";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { objectToUniversalCss } from "./utils/objectToUniversalCss";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import LoadingScreen from "./components/LoadingScreen";

export default function EditorPage() {
  const { projectId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const [yoinkName, setYoinkName] = useState<string | null>(null);
  const [yoinkContent, setYoinkContent] = useState<string | null>(null);

  // Zustand store
  const { editor, isEditorReady, initializeEditor } = useEditorStore();

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
      return data.user;
    }
    return null;
  };

  useEffect(() => {
    getUser();
    initializeEditor();

    window.addEventListener("message", (event) => {
      if (
        event.origin == `${window.location.origin}` &&
        event.data.type == "NEW_YOINK"
      ) {
        console.log("Message from parent:", event.data);
        // alert("New Yoink");
        setYoinkName(event.data.name);
        setYoinkContent(event.data.content);

        // Send response back to the source
        (event.source as Window)?.postMessage(
          { type: "NEW_YOINK_RESPONSE", message: "Yoink received!" },
          event.origin
        );
      }
    });
  }, []);

  // Main initialization effect - handles user auth, content fetching, and editor setup
  useEffect(() => {
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
        editor?.setComponents(textContent);
        setYoinkName(yoinks.name);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    const createNewYoink = async (currentUser: User) => {
      if (yoinkContent) {
        editor?.setComponents(yoinkContent);
        const { data, error } = await supabase
          .from("yoinks")
          .insert({ user_id: currentUser.id, name: yoinkName });

        if (error) {
          console.error("Error creating new yoink:", error.message);
        } else if (data) {
          console.log("New yoink created:", data);
        }
      }
    };

    if (projectId != "new" && user && !isEditorReady) {
      fetchYoinkContent(user, projectId as string);
    } else if (projectId == "new" && user && editor) {
      createNewYoink(user).then(() => {
        editor.once("component:mount", () => {
          setIsLoading(false);
        });
      });
    }
  }, [projectId, user, isEditorReady, yoinkContent, editor]);

  return (
    <>
      {isLoading && <LoadingScreen />}
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
