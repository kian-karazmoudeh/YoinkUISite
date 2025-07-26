const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral-950 size-screen">
      <main className="max-w-6xl mx-auto h-full min-h-0">{children}</main>
    </div>
  );
};

export default Layout;
