const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral-950 h-screen">
      <main className="max-w-6xl mx-auto h-full min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout;
