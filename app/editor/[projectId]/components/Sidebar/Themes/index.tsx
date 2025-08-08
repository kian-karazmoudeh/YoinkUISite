"use client";

import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../../store";
import { Theme } from "../../../types";
import ThemeCard from "./ThemeCard";

const themes: Map<string, Theme>[] = [
  new Map([
    [
      "main",
      {
        background: "#e4d7b4",
        color: "#7b3109",
        priority: 10000,
      },
    ],
    [
      "primary",
      {
        background: "#ff9fa0",
        color: "#811518",
        priority: 5000,
      },
    ],
    [
      "accent",
      {
        background: "#cf8700",
        color: "#7a3002",
        priority: 2000,
      },
    ],
  ]),
  new Map([
    [
      "main",
      {
        background: "#d6e8d4", // soft sage green
        color: "#1e3b2f", // dark forest green
        priority: 10000,
      },
    ],
    [
      "primary",
      {
        background: "#a4cbb4", // muted green-teal
        color: "#174038", // deep teal
        priority: 5000,
      },
    ],
    [
      "accent",
      {
        background: "#f2e9dc", // warm off-white
        color: "#6f4e37", // coffee brown
        priority: 2000,
      },
    ],
  ]),
  new Map([
    [
      "main",
      {
        background: "#fbe6e4", // soft blush pink
        color: "#422419", // dark reddish brown
        priority: 10000,
      },
    ],
    [
      "primary",
      {
        background: "#fab57a", // sandy orange
        color: "#6b2c10", // burnt sienna
        priority: 5000,
      },
    ],
    [
      "accent",
      {
        background: "#ffd3b6", // peach
        color: "#3c1f0f", // deep warm brown
        priority: 2000,
      },
    ],
  ]),
  new Map([
    [
      "main",
      {
        background: "#f5f7fa", // light gray-blue
        color: "#2e3a59", // slate blue
        priority: 10000,
      },
    ],
    [
      "primary",
      {
        background: "#dbeafe", // light sky blue
        color: "#1e3a8a", // royal/navy blue
        priority: 5000,
      },
    ],
    [
      "accent",
      {
        background: "#cbd5e1", // muted steel
        color: "#334155", // deep slate gray
        priority: 2000,
      },
    ],
  ]),
];

const Themes = () => {
  // const { setTheme } = useEditorStore(
  //   useShallow((state) => ({ setTheme: state.setTheme }))
  // );

  const handleApplyTheme = (theme: Map<string, Theme>) => {
    console.log(theme);
    // setTheme(theme);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {themes.map((theme) => (
        <ThemeCard
          main={theme.get("main")!.background}
          primary={theme.get("primary")!.background}
          secondary={"#FFFFFF"}
          accent={theme.get("accent")!.background}
        />
      ))}
    </div>
  );
};

export default Themes;
