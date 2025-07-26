const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='font-[GeistSans,_"GeistSans_Fallback",_Geist,_"Geist_Fallback",_Arial,_"Apple_Color_Emoji",_"Segoe_UI_Emoji",_"Segoe_UI_Symbol"] w-full bg-zinc-950 leading-[1.5] text-zinc-100'>
      <main className="flex h-full w-full">
        <div className="relative mx-auto w-[min(100%,_3680px)] max-w-384">
          <div className="w-full px-4">
            <div className="flex w-full h-screen flex-col gap-2 rounded-lg bg-zinc-950 py-4">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditorLayout;
