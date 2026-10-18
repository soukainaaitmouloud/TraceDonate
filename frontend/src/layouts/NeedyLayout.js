
// src/layouts/NeedyLayout.js

import React from "react";

import NeedySidebar from "../components/NeedySidebar";

function NeedyLayout({
  children,
  darkMode,
}) {

  return (

    <div
      style={
        layout(darkMode)
      }
    >

      {/* ================= SIDEBAR ================= */}

      <NeedySidebar
        darkMode={darkMode}
      />

      {/* ================= MAIN CONTENT ================= */}

      <main
        style={mainContent(
          darkMode
        )}
      >

        {children}

      </main>

    </div>

  );

}

export default NeedyLayout;

/* ================= LAYOUT ================= */

const layout = (
  darkMode
) => ({
  display: "flex",

  minHeight: "100vh",

  width: "100%",

  background:
    darkMode
      ? "linear-gradient(180deg,#020617,#0f172a)"
      : "linear-gradient(180deg,#f8fafc,#eef2ff)",

  overflow: "hidden",

  transition:
    "all 0.3s ease",
});

/* ================= MAIN CONTENT ================= */

const mainContent = (
  darkMode
) => ({
  flex: 1,

  minWidth: 0,

  padding: "24px",

  overflowY: "auto",

  overflowX: "hidden",

  boxSizing: "border-box",

  background:
    darkMode
      ? "#020617"
      : "transparent",

  transition:
    "all 0.3s ease",
});

