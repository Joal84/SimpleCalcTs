import React from "react";
import "./SwitchButton.css";

type PassedProps = {
  toggleTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
  theme: string;
};

export default function SwitchButton({ toggleTheme, theme }: PassedProps) {
  return (
    <>
      <span className="theme-title">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
      <input type="checkbox" id="switch" onChange={toggleTheme} />
      <label htmlFor="switch"></label>
    </>
  );
}
