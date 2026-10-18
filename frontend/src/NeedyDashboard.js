// src/NeedyDashboard.js

import React, {
  useEffect,
  useState,
} from "react";

import NeedyLayout from "./layouts/NeedyLayout";

import Topbar from "./components/Topbar";

import NeedyHero from "./components/needy/NeedyHero";
import CampaignOverview from "./components/needy/CampaignOverview";
import RecentUpdates from "./components/needy/RecentUpdates";

import SupportersFeed from "./components/needy/SupportersFeed";
import DocumentsVerification from "./components/needy/DocumentsVerification";

import RecoveryPanel from "./components/needy/RecoveryPanel";

import "./NeedyDashboard.css";

function NeedyDashboard({
  darkMode,
  setDarkMode,
}) {

  const [
    showRightPanel,
    setShowRightPanel,
  ] = useState(false);

  /* ================================================= */
  /* ================= CLOSE WITH ESC ================ */
  /* ================================================= */

  useEffect(() => {

    const handleEscape = (e) => {

      if (e.key === "Escape") {

        setShowRightPanel(false);

      }

    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, []);

  /* ================================================= */
  /* ================= LOCK BODY SCROLL ============== */
  /* ================================================= */

  useEffect(() => {

    if (showRightPanel) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";

    }

    return () => {

      document.body.style.overflow =
        "auto";

    };

  }, [showRightPanel]);

  /* ================================================= */
  /* ================= BODY DARK MODE ================ */
  /* ================================================= */

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-mode-body"
      );

    } else {

      document.body.classList.remove(
        "dark-mode-body"
      );

    }

  }, [darkMode]);

  return (

    <NeedyLayout>

      <div
        className={
          darkMode
            ? "needy-dashboard dark-mode"
            : "needy-dashboard"
        }
      >

        {/* ================================================= */}
        {/* ================= TOPBAR ======================== */}
        {/* ================================================= */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onTogglePanel={() =>
            setShowRightPanel(
              !showRightPanel
            )
          }
        />

        {/* ================================================= */}
        {/* ================= HERO ========================== */}
        {/* ================================================= */}

        <NeedyHero />

        {/* ================================================= */}
        {/* ================= MAIN CONTENT ================== */}
        {/* ================================================= */}

        <div className="main-layout">

          <div className="main-left">

            {/* FIRST GRID */}

            <div className="dashboard-grid">

              <CampaignOverview />

              <RecentUpdates />

            </div>

            {/* SECOND GRID */}

            <div className="dashboard-grid second-grid">

              <SupportersFeed />

              <DocumentsVerification />

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= BACKDROP ====================== */}
        {/* ================================================= */}

        {showRightPanel && (

          <div
            className="panel-backdrop"
            onClick={() =>
              setShowRightPanel(false)
            }
          />

        )}

        {/* ================================================= */}
        {/* ================= RIGHT PANEL =================== */}
        {/* ================================================= */}

        <div
          className={
            showRightPanel
              ? "right-panel-overlay active"
              : "right-panel-overlay"
          }
        >

          {/* CLOSE BUTTON */}

          <button
            className="close-panel-btn"
            onClick={() =>
              setShowRightPanel(false)
            }
          >
            ✕
          </button>

          {/* PANEL CONTENT */}

          <div className="right-panel-content">

            <RecoveryPanel />

          </div>

        </div>

      </div>

    </NeedyLayout>

  );

}

export default NeedyDashboard;