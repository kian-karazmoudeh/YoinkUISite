import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authenticate | YoinkUI",
  description: "Log in or Sign up to continue to YoinkUI",
};

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default UserLayout;
