import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../App.css";

function MainLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div className="content">
        <Topbar />
        {children}
      </div>
    </>
  );
}

export default MainLayout;