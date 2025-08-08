"use client";

import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../../store";
import { Theme } from "../../../types";
import ThemeCard from "./ThemeCard";

const themes: Theme[] = [
  {
    pallet: [
      {
        background: ["#e4d7b4"],
        text: ["#7b3109"],
      },
      {
        background: ["#ff9fa0"],
        text: ["#811518"],
      },
      {
        background: ["#cf8700"],
        text: ["#7a3002"],
      },
    ],
  },
  {
    pallet: [
      {
        background: ["#d6e8d4"], // soft sage green
        text: ["#1e3b2f"], // dark forest green
      },
      {
        background: ["#a4cbb4"], // muted green-teal
        text: ["#174038"], // deep teal
      },
      {
        background: ["#f2e9dc"], // warm off-white
        text: ["#6f4e37"], // coffee brown
      },
    ],
  },
  {
    pallet: [
      {
        background: ["#fbe6e4"], // soft blush pink
        text: ["#422419"], // dark reddish brown
      },
      {
        background: ["#fab57a"], // sandy orange
        text: ["#6b2c10"], // burnt sienna
      },
      {
        background: ["#ffd3b6"], // peach
        text: ["#3c1f0f"], // deep warm brown
      },
    ],
  },
  {
    pallet: [
      {
        background: ["#f5f7fa"], // light gray-blue
        text: ["#2e3a59"], // slate blue
      },
      {
        background: ["#dbeafe"], // light sky blue
        text: ["#1e3a8a"], // royal/navy blue
      },
      {
        background: ["#cbd5e1"], // muted steel
        text: ["#334155"], // deep slate gray
      },
    ],
  },
];

const Themes = () => {
  const { setTheme } = useEditorStore(
    useShallow((state) => ({ setTheme: state.setTheme }))
  );

  const handleApplyTheme = (theme: Theme) => {
    console.log(theme);
    setTheme(theme);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {themes.map((theme, index) => (
        <ThemeCard
          key={index}
          main={theme.pallet[0]?.background[0] || "#FFFFFF"}
          primary={theme.pallet[1]?.background[0] || "#FFFFFF"}
          accent={theme.pallet[2]?.background[0] || "#FFFFFF"}
          secondary={"#FFFFFF"}
          onClick={() => handleApplyTheme(theme)}
        />
      ))}
    </div>
  );
};

export default Themes;
