"use client";

import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../../store";
import { Theme } from "../../../types";
import ThemeCard from "./ThemeCard";

const themes: Theme[] = [
  {
    pallet: [
      {
        background: ["#e4d7b4", "#f2e6c9", "#d8c49a"],
        text: [["#7b3109", "#552200"], ["#ff9fa0"]],
      },
      {
        background: ["#ff9fa0", "#ffc1c2", "#ffb3ad"],
        text: [["#811518"], ["#e4d7b4"], ["#732b2c"], ["#4d0f10"]],
      },
      {
        background: ["#cf8700", "#f2a900", "#d9a441", "#ffcc66"],
        text: [["#7a3002"], ["#4d1e00"], ["#b34b0e"], ["#331000"]],
      },
    ],
  },
  {
    pallet: [
      {
        background: ["#d6e8d4", "#e1f0e0", "#c4d8c2", "#b1c8b0"], // soft sage variations
        text: [["#1e3b2f"], ["#27493b"], ["#153126"], ["#0d1f18"]], // deep green variations
      },
      {
        background: ["#a4cbb4", "#b7d8c6", "#92bfa1", "#7aab8c"], // muted green-teal variations
        text: [["#174038"], ["#1f5148"], ["#103028"], ["#0b201c"]], // deep teal variations
      },
      {
        background: ["#f2e9dc", "#f9f3e8", "#e9dfcf", "#e0d6c4"], // warm off-white variations
        text: [["#6f4e37"], ["#5b3e2d"], ["#4a3224"], ["#3a271c"]], // coffee brown variations
      },
    ],
  },
  {
    pallet: [
      {
        background: ["#fbe6e4", "#fdeeed", "#f8dada", "#f3cfcf"], // blush variations
        text: [["#422419"], ["#5a3023"], ["#331a13"], ["#1e0f0a"]], // reddish brown variations
      },
      {
        background: ["#fab57a", "#fbc08e", "#f9aa6e", "#f79b58"], // sandy orange variations
        text: [["#6b2c10"], ["#843619"], ["#4d1e0c"], ["#331407"]], // burnt sienna variations
      },
      {
        background: ["#ffd3b6", "#ffe0cc", "#ffccaa", "#ffbf99"], // peach variations
        text: [["#3c1f0f"], ["#542b1a"], ["#29150b"], ["#1a0d07"]], // deep warm brown variations
      },
    ],
  },
  {
    pallet: [
      {
        background: ["#f5f7fa", "#f0f3f7", "#e5e9f0", "#dde3ec"], // gray-blue variations
        text: [["#2e3a59"], ["#3a4770"], ["#24324b"], ["#1b2639"]], // slate blue variations
      },
      {
        background: ["#dbeafe", "#e6f0ff", "#c7dfff", "#b3d3ff"], // sky blue variations
        text: [["#1e3a8a"], ["#2649a8"], ["#162e6b"], ["#0e1f47"]], // royal blue variations
      },
      {
        background: ["#cbd5e1", "#d7dee8", "#b8c4d0", "#a3b0bd"], // steel variations
        text: [["#334155"], ["#3f4f67"], ["#273341"], ["#1a222d"]], // deep slate gray variations
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
