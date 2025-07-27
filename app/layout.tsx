import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YoinkUI",
  description: "YoinkUI - Copy any component with 1 click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-X59NG9C389" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <body className="antialiased"> */}
        {children}
      </body>
    </html>
  );
}
