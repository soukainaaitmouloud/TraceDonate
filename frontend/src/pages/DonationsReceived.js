// src/pages/DonationsReceived.js

import React, {
  useState,
} from "react";

import {
  FaTimes,
  FaFilePdf,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import {
  useHistory,
} from "react-router-dom";

import NeedyLayout from "../layouts/NeedyLayout";

import Topbar from "../components/Topbar";

import DonationStats from "../components/needy/DonationStats";

import ReceivedDonationsTable from "../components/needy/ReceivedDonationsTable";

import DonationsRightPanel from "../components/needy/DonationsRightPanel";

import DonationsOverview from "../components/needy/DonationsOverview";

import "../NeedyDashboard.css";

function DonationsReceived({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  const history =
  useHistory();

  const [
    showPanel,
    setShowPanel,
  ] = useState(false);

  // ================= CONTACT SUPPORT =================

  const handleContactSupport =
    () => {

     history.push("/messages");

    };

  // ================= DOWNLOAD REPORT =================

  const handleDownloadReport =
    () => {

      const reportContent = `

${t("donationsReceived")}

-----------------------------------

Total Raised: $3,200
Supporters: 128
Campaign Progress: 64%

Generated:
${new Date().toLocaleDateString()}

`;

      const blob =
        new Blob(
          [reportContent],
          {
            type: "text/plain",
          }
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "donation-report.txt";

      link.click();

    };

  return (

    <NeedyLayout>

      <div
        className={`needy-dashboard ${
          darkMode
            ? "dark"
            : ""
        }`}
        style={{
          background:
            darkMode
              ? "#020617"
              : "#f1f5f9",

          minHeight: "100vh",

          transition:
            "0.35s ease",
        }}
      >

        {/* ================= TOPBAR ================= */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onTogglePanel={() =>
            setShowPanel(
              !showPanel
            )
          }
        />

        {/* ================= PAGE ================= */}

        <div
          style={{
            padding: "28px",
            position: "relative",
          }}
        >

          {/* ================= HEADER ================= */}

          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "flex-start",

              gap: "20px",

              marginBottom:
                "24px",

              flexWrap: "wrap",
            }}
          >

            {/* LEFT */}

            <div>

              <h1
                style={{
                  margin: 0,

                  display: "flex",

                  alignItems:
                    "center",

                  gap: "12px",

                  fontSize: "58px",

                  fontWeight: "900",

                  letterSpacing:
                    "-2px",

                  color:
                    darkMode
                      ? "#ffffff"
                      : "#0f172a",

                  lineHeight:
                    "1.05",

                  transition:
                    "0.3s ease",
                }}
              >

                {t(
                  "donationsReceived"
                )}

                <span
                  style={{
                    fontSize:
                      "36px",
                  }}
                >
                  🤍
                </span>

              </h1>

              <p
                style={{
                  marginTop:
                    "16px",

                  fontSize:
                    "16px",

                  color:
                    darkMode
                      ? "#94a3b8"
                      : "#64748b",

                  lineHeight:
                    "1.8",

                  maxWidth:
                    "720px",

                  transition:
                    "0.3s ease",
                }}
              >

                {t(
                  "donationsSubtitle"
                )}

              </p>

            </div>

            {/* RIGHT */}

            <button
              onClick={
                handleDownloadReport
              }
              style={{
                height: "56px",

                padding:
                  "0 24px",

                borderRadius:
                  "18px",

                border:
                  darkMode
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(226,232,240,0.9)",

                background:
                  darkMode
                    ? "linear-gradient(135deg,#0f172a,#1e293b)"
                    : "linear-gradient(135deg,#ffffff,#f8fafc)",

                display: "flex",

                alignItems:
                  "center",

                gap: "12px",

                fontSize:
                  "15px",

                fontWeight:
                  "800",

                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",

                cursor:
                  "pointer",

                transition:
                  "0.25s ease",

                boxShadow:
                  darkMode
                    ? "0 12px 30px rgba(0,0,0,0.45)"
                    : "0 10px 24px rgba(15,23,42,0.08)",
              }}
            >

              <FaFilePdf
                style={{
                  color:
                    "#ef4444",

                  fontSize:
                    "16px",
                }}
              />

              {t(
                "downloadReport"
              )}

            </button>

          </div>

          {/* ================= STATS ================= */}

          <DonationStats
            darkMode={
              darkMode
            }
          />

          {/* ================= OVERVIEW ================= */}

          <div
            style={{
              marginTop:
                "20px",

              marginBottom:
                "24px",
            }}
          >

            <DonationsOverview
              darkMode={
                darkMode
              }
            />

          </div>

          {/* ================= TABLE ================= */}

          <ReceivedDonationsTable
            darkMode={
              darkMode
            }
          />

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div
          style={{
            position: "fixed",

            top: 0,

            right:
              showPanel
                ? "0"
                : "-420px",

            width: "390px",

            maxWidth: "100%",

            height: "100vh",

            background:
              darkMode
                ? "linear-gradient(180deg,#020617,#0f172a)"
                : "linear-gradient(180deg,#ffffff,#f8fafc)",

            zIndex: 99999,

            transition:
              "0.4s cubic-bezier(0.22,1,0.36,1)",

            boxShadow:
              darkMode
                ? "-20px 0 50px rgba(0,0,0,0.6)"
                : "-20px 0 50px rgba(15,23,42,0.12)",

            overflowY:
              "auto",

            padding:
              "78px 18px 18px",

            borderLeft:
              darkMode
                ? "1px solid rgba(255,255,255,0.05)"
                : "1px solid rgba(226,232,240,0.7)",
          }}
        >

          {/* CLOSE BUTTON */}

          <button
            onClick={() =>
              setShowPanel(false)
            }
            style={{
              position:
                "absolute",

              top: "18px",

              right: "18px",

              width: "46px",

              height: "46px",

              borderRadius:
                "16px",

              border:
                darkMode
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid #e2e8f0",

              background:
                darkMode
                  ? "rgba(15,23,42,0.9)"
                  : "rgba(255,255,255,0.9)",

              backdropFilter:
                "blur(12px)",

              cursor:
                "pointer",

              fontSize:
                "15px",

              color:
                darkMode
                  ? "#ffffff"
                  : "#0f172a",

              fontWeight:
                "800",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              boxShadow:
                darkMode
                  ? "0 10px 24px rgba(0,0,0,0.4)"
                  : "0 10px 24px rgba(15,23,42,0.08)",
            }}
          >

            <FaTimes />

          </button>

          <DonationsRightPanel
            darkMode={
              darkMode
            }
            onContactSupport={
              handleContactSupport
            }
          />

        </div>

        {/* ================= OVERLAY ================= */}

        {showPanel && (

          <div
            onClick={() =>
              setShowPanel(false)
            }
            style={{
              position:
                "fixed",

              inset: 0,

              background:
                darkMode
                  ? "rgba(2,6,23,0.72)"
                  : "rgba(15,23,42,0.32)",

              backdropFilter:
                "blur(6px)",

              zIndex: 9999,
            }}
          />

        )}

      </div>

    </NeedyLayout>

  );

}

export default DonationsReceived;