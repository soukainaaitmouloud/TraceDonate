import React from "react";

import NeedyLayout from "../layouts/NeedyLayout";
import Topbar from "../components/Topbar";
import UpdateStoryForm from "../components/needy/UpdateStoryForm";

import "../NeedyDashboard.css";

function UpdateStory({
  darkMode,
  setDarkMode,
}) {

  return (

    <NeedyLayout>

      <div
        className="needy-dashboard"
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#f8fafc",
          overflowX: "hidden",
        }}
      >

        {/* ================= TOPBAR ================= */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ================= PAGE CONTENT ================= */}

        <div
          style={{
            padding: "8px 10px 30px",
          }}
        >

         <UpdateStoryForm
  darkMode={darkMode}
/>

        </div>

      </div>

    </NeedyLayout>

  );

}

export default UpdateStory;