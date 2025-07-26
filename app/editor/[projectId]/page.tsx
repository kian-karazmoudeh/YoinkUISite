"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "./store";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import LoadingScreen from "./components/LoadingScreen";
import { useRouter } from "next/navigation";

export default function EditorPage() {
  const router = useRouter();
  const { projectId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [membership, setMembership] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const [yoinkContent, setYoinkContent] = useState<string | null>(null);

  // Zustand store
  const {
    editor,
    isEditorReady,
    yoinkName,
    initializeEditor,
    setYoinkId,
    setYoinkName,
    setYoinkCreatorId,
    resetStore,
  } = useEditorStore();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        setYoinkCreatorId(data.user.id);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();
        setMembership(profileData?.membership);
        return data.user;
      }
      return null;
    };

    resetStore();

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

    return () => {
      resetStore();
    };
  }, []);

  // Main initialization effect - handles user auth, content fetching, and editor setup
  useEffect(() => {
    const createNewYoink = async (currentUser: User) => {
      if (yoinkContent) {
        editor?.once("component:mount", () => setIsLoading(false));
        editor?.setComponents(yoinkContent);

        const { data, error } = await supabase
          .from("yoinks")
          .insert({ user_id: currentUser.id, name: yoinkName })
          .select()
          .single();

        if (error) {
          console.error("Error creating new yoink:", error.message);
        } else if (data) {
          setYoinkId(data.id);
          setYoinkName(data.name);

          window.history.pushState(null, "", `/editor/${data.id}`);

          editor?.store().then(() => {
            supabase
              .from("yoinks")
              .update({ content_url: `${currentUser.id}/${data.id}.json` })
              .eq("id", data.id)
              .then((response) => {
                console.log("Yoink updated:", response);
              });
          });
        }
      }
    };

    if (projectId != "new" && user && isEditorReady) {
      setYoinkId(projectId as string);
      supabase
        .from("yoinks")
        .select("name")
        .eq("id", projectId as string)
        .single()
        .then(({ data }) => {
          if (!data) {
            router.push("/404");
          }
          setYoinkName(data?.name || "Untitled");
        });

      editor?.load().then(() => setIsLoading(false));
    } else if (projectId == "new" && user && editor && yoinkContent) {
      createNewYoink(user);
    }
  }, [projectId, user, isEditorReady, yoinkContent, editor]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Navbar user={user} membership={membership} />
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
