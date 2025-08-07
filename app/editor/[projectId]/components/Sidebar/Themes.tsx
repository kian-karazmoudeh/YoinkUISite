"use client";

import { useShallow } from "zustand/react/shallow";
import { useEditorStore } from "../../store";
import { Theme } from "../../types";

const themes: Theme[] = [
  {
    background: "#000000",
    priority: 10000,
  },
  {
    background: "#FFFFFF",
    priority: 5000,
  },
  {
    background: "#FF0000",
    priority: 2000,
  },
];

const Themes = () => {
  const { setTheme } = useEditorStore(
    useShallow((state) => ({ setTheme: state.setTheme }))
  );
  const handleAppyTheme = () => {
    console.log(themes);
    setTheme(themes);
  };
  return (
    <div className="flex flex-wrap cursor-pointer" onClick={handleAppyTheme}>
      {themes.map((theme) => (
        <div
          className="size-10 m-3 rounded-md"
          style={{ backgroundColor: theme.background }}
        ></div>
      ))}
    </div>
  );
};

export default Themes;
