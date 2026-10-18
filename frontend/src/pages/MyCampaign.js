// src/pages/MyCampaign.js

import React, {
  useState,
} from "react";

import NeedyLayout
from "../layouts/NeedyLayout";

import Topbar
from "../components/Topbar";

import MyCampaignHero
from "../components/needy/MyCampaignHero";

import CampaignTabs
from "../components/needy/CampaignTabs";

import RecentDonations
from "../components/needy/RecentDonations";

import MyCampaignRightPanel
from "../components/needy/MyCampaignRightPanel";

import {
  useTranslation,
} from "react-i18next";

import "../NeedyDashboard.css";

function MyCampaign({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  const [
    showRightPanel,
    setShowRightPanel,
  ] = useState(false);

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
              (prev) => !prev
            )
          }
        />

        {/* ================================================= */}
        {/* ================= PAGE CONTENT ================== */}
        {/* ================================================= */}

        <div className="main-layout">

          <div className="main-left">

            {/* HERO */}

            <MyCampaignHero />

            {/* CAMPAIGN TABS */}

            <CampaignTabs />

            {/* RECENT DONATIONS */}

            <RecentDonations />

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
              ? "mycampaign-slide-panel active"
              : "mycampaign-slide-panel"
          }
        >

          {/* CLOSE BUTTON */}

          <button
            className="close-panel-btn"
            onClick={() =>
              setShowRightPanel(false)
            }
            aria-label={
              t("closePanel")
            }
          >
            ✕

          </button>

          {/* PANEL CONTENT */}

          <div className="right-panel-content">

            <MyCampaignRightPanel />

          </div>

        </div>

      </div>

    </NeedyLayout>

  );

}

export default MyCampaign;