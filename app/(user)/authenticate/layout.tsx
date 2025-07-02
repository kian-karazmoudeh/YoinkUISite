import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authenticate | YoinkUI",
  description: "Log in or Sign up to continue to YoinkUI",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full !h-[100vh]">
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default AuthLayout;
