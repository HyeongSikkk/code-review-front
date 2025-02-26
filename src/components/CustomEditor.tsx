import React, { useState } from "react";
import "../styles/homepage_Intro.css"; // ✅ CSS 파일 추가

interface Theme {
    name: string;
    bg: string;
    text: string;
    navbar: string;
  }
  
  const themes: Record<string, Theme> = {
    purple: { name: "Shades of Purple", bg: "#2d2b55", text: "#fff2d3", navbar: "#1e1e3f" },
    dracula: { name: "Dracula", bg: "#282a36", text: "#f8f8f2", navbar: "#21222c" },
  };

const CodeWindow: React.FC = () => {
  const [theme, setTheme] = useState("purple");

  return (
    <div className="code-window" style={{ backgroundColor: themes[theme].bg, color: themes[theme].text }}>
      <div className="window-bar" style={{ backgroundColor: themes[theme].navbar }}>
        <span className="window-title">index.tsx - VS Code</span>
        <div className="icons">
          <div className="circle red"></div>
          <div className="circle yellow"></div>
          <div className="circle green"></div>
        </div>
      </div>
      <div className="content">
        <h1>Welcome to Algo_Reivew</h1>
        <p>코드 리뷰, AI와 함께 더 쉽고 똑똑하게</p>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          {Object.keys(themes).map((key) => (
            <option key={key} value={key}>{themes[key].name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CodeWindow;
