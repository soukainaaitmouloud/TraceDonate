// src/pages/DocumentsVerification.js

import React, {
  useState,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import NeedyLayout from "../layouts/NeedyLayout";

import Topbar from "../components/Topbar";

import VerificationProgress from "../components/needy/VerificationProgress";

import UploadedDocuments from "../components/needy/UploadedDocuments";

import VerificationRightPanel from "../components/needy/VerificationRightPanel";

import "../NeedyDashboard.css";

function DocumentsVerification({
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
        className={`needy-dashboard ${
          darkMode
            ? "dark"
            : ""
        }`}
        style={{
          background:
            darkMode
              ? "#0f172a"
              : "#f1f5f9",
          minHeight: "100vh",
          transition:
            "all 0.3s ease",
        }}
      >

        {/* TOPBAR */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onTogglePanel={() =>
            setShowRightPanel(
              !showRightPanel
            )
          }
        />

        {/* PAGE */}

        <div
          style={{
            padding: "28px",
          }}
        >

          {/* TITLE */}

          <div
            style={{
              marginBottom: "32px",
            }}
          >

            <h1
              style={{
                fontSize: "54px",
                fontWeight: "900",
                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",
                margin: 0,
                letterSpacing: "-2px",
                lineHeight: "1.1",
                transition:
                  "0.3s ease",
              }}
            >

              {t(
                "documentsVerification"
              )}{" "}

              🛡️

            </h1>

            <p
              style={{
                color:
                  darkMode
                    ? "#cbd5e1"
                    : "#64748b",
                fontSize: "17px",
                marginTop: "14px",
                lineHeight: "1.7",
                transition:
                  "0.3s ease",
              }}
            >

              {t(
                "documentsSubtitle"
              )}

            </p>

          </div>

          {/* VERIFICATION */}

          <div
            style={{
              background:
                darkMode
                  ? "#1e293b"
                  : "#ffffff",
              borderRadius:
                "28px",
              padding: "24px",
              marginBottom:
                "28px",
              boxShadow:
                darkMode
                  ? "0 0 0 1px rgba(255,255,255,0.05)"
                  : "0 10px 30px rgba(0,0,0,0.05)",
              transition:
                "0.3s ease",
            }}
          >

            <VerificationProgress
              darkMode={
                darkMode
              }
            />

          </div>

          {/* DOCUMENTS */}

          <div
            style={{
              background:
                darkMode
                  ? "#1e293b"
                  : "#ffffff",
              borderRadius:
                "28px",
              padding: "24px",
              boxShadow:
                darkMode
                  ? "0 0 0 1px rgba(255,255,255,0.05)"
                  : "0 10px 30px rgba(0,0,0,0.05)",
              transition:
                "0.3s ease",
            }}
          >

            <UploadedDocuments
              darkMode={
                darkMode
              }
            />

          </div>

        </div>

        {/* RIGHT PANEL */}

 <VerificationRightPanel
  showRightPanel={
    showRightPanel
  }
  setShowRightPanel={
    setShowRightPanel
  }
  darkMode={darkMode}
/>

      </div>

    </NeedyLayout>

  );

}

export default DocumentsVerification;