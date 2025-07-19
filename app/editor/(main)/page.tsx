"use client";

import Footer from "./components/Footer";
import YoinkFile, { YoinkFileSkeleton } from "./components/YoinkFile";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "./components/Navbar";

const DashboardHomePage = () => {
  const [yoinkFiles, setYoinkFiles] = useState<YoinkFile[]>([]);
  const [yoinkFilesLoading, setYoinkFilesLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

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
        fetchYoinkFiles(fetchedUser);
      }
    });

    // Make fetchYoinkFiles accept a user
    const fetchYoinkFiles = async (currentUser: User) => {
      console.log(currentUser);
      const { data, error } = await supabase
        .from("yoinks")
        .select("*")
        .eq("user_id", currentUser.id)
        .neq("content_url", null);
      if (error) console.error(error.message);
      if (data) setYoinkFiles(data);
      setYoinkFilesLoading(false);
    };
  }, []);

  return (
    <>
      <Navbar user={user} />

      <div
        className='text-white leading-[1.5] h-full min-w-74 font-[GeistSans,_"GeistSans_Fallback",_ui-sans-serif,_system-ui,_sans-serif,_"Apple_Color_Emoji",_"Segoe_UI_Emoji",_"Segoe_UI_Symbol",_"Noto_Color_Emoji"] bg-neutral-950  shadow-[_#0000000a_0px_2px_2px_0px,_#0000000a_0px_8px_8px_-8px] grow bg-clip-padding relative overflow-hidden border-zinc-800 border-[0.8px] rounded-lg'
        id="block-panel-left"
      >
        <div className="h-full flex relative flex-col">
          <div className="h-full flex flex-col justify-center items-center gap-8">
            <div className="w-full z-0 grow flex overflow-auto flex-col px-6 gap-24">
              <Header />
              <div className="w-full max-w-316 grow flex flex-col mx-auto gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col px-2 gap-1">
                    <div className="flex justify-between items-center">
                      <div className="text-left font-medium">Recent Yoinks</div>
                    </div>
                    <div className="text-zinc-400 leading-[1.42857] text-sm">
                      Edit your projects and share them with your friends.
                    </div>
                  </div>
                  <div className="flex flex-col px-2 gap-6 size-full">
                    <div className="grow">
                      <div className="grid-cols-3 grid justify-center gap-6">
                        {yoinkFilesLoading ? (
                          <>
                            <YoinkFileSkeleton />
                            <YoinkFileSkeleton />
                            <YoinkFileSkeleton />
                          </>
                        ) : (
                          yoinkFiles.map((yoinkFile) => (
                            <YoinkFile key={yoinkFile.id} {...yoinkFile} />
                          ))
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center py-7">
                      <button className="leading-[1.42857] h-8 text-sm bg-neutral-900 shrink-0 flex relative text-center text-nowrap font-medium whitespace-nowrap justify-center items-center cursor-pointer px-3 gap-[6px] border-white/12 border-[0.8px] rounded-lg">
                        <div className="flex justify-center items-center cursor-pointer gap-2">
                          Load More
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHomePage;
