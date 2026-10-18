
// src/pages/TransparencyCenter.js

import React, {
  useEffect,
  useState,
} from "react";

import {
  FaDownload,
  FaShieldAlt,
  FaTimes,
  FaRobot,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import {
  useHistory,
} from "react-router-dom";

import toast, {
  Toaster,
} from "react-hot-toast";

import NeedyLayout from "../layouts/NeedyLayout";

import Topbar from "../components/Topbar";

import TransparencyStats from "../components/needy/TransparencyStats";

import FundsUtilization from "../components/needy/FundsUtilization";

import ImpactTimeline from "../components/needy/ImpactTimeline";

import TransparencyRightPanel from "../components/needy/TransparencyRightPanel";

import "../NeedyDashboard.css";

function TransparencyCenter() {

  const { t } =
    useTranslation();

  const history =
    useHistory();

  // ================= DARK MODE =================

  const [
    darkMode,
    setDarkMode,
  ] = useState(() => {

    return (
      localStorage.getItem(
        "darkMode"
      ) === "true"
    );

  });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );

  }, [darkMode]);

  // ================= STATES =================

  const [
    showRightPanel,
    setShowRightPanel,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ================= LOADING =================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 1000);

    return () =>
      clearTimeout(timer);

  }, []);

  // ================= DOWNLOAD =================

  const handleDownload =
    () => {

      const link =
        document.createElement(
          "a"
        );

      link.href =
        "/reports/transparency-report.pdf";

      link.download =
        "TransparencyReport.pdf";

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      toast.success(
        "Report Downloaded Successfully"
      );

    };

  // ================= LOADING =================

  if (loading) {

    return (

      <div
        style={{
          height: "100vh",

          display: "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          background:
            darkMode
              ? "#020617"
              : "#f8fafc",

          color:
            darkMode
              ? "#ffffff"
              : "#0f172a",

          fontSize: "20px",

          fontWeight: "700",
        }}
      >

        Loading Transparency Center...

      </div>

    );

  }

  return (

    <NeedyLayout
      darkMode={darkMode}
    >

      <Toaster position="top-right" />

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

          minHeight:
            "100vh",

          transition:
            "all 0.3s ease",
        }}
      >

        {/* ================= TOPBAR ================= */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onTogglePanel={() =>
            setShowRightPanel(
              !showRightPanel
            )
          }
        />

        {/* ================= PAGE ================= */}

        <div
          style={{
            padding:
              window.innerWidth <
              768
                ? "18px"
                : "28px",
          }}
        >

          {/* ================= HEADER ================= */}

          <div
            style={{
              marginBottom:
                "24px",
            }}
          >

            <div
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "flex-start",

                gap: "20px",

                flexWrap:
                  "wrap",
              }}
            >

              {/* ================= LEFT ================= */}

              <div>

                <h1
                  style={{
                    margin: 0,

                    display: "flex",

                    alignItems:
                      "center",

                    gap: "14px",

                    fontSize:
                      window.innerWidth <
                      768
                        ? "32px"
                        : "52px",

                    fontWeight:
                      "900",

                    letterSpacing:
                      "-2px",

                    color:
                      darkMode
                        ? "#ffffff"
                        : "#0f172a",

                    lineHeight:
                      "1.1",
                  }}
                >

                  {t(
                    "transparencyCenter"
                  )}

                  <span
                    style={{
                      width: "44px",

                      height: "44px",

                      borderRadius:
                        "14px",

                      background:
                        darkMode
                          ? "linear-gradient(135deg,#1e40af,#2563eb)"
                          : "linear-gradient(135deg,#dbeafe,#bfdbfe)",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      color:
                        darkMode
                          ? "#ffffff"
                          : "#2563eb",
                    }}
                  >

                    <FaShieldAlt />

                  </span>

                </h1>

                <p
                  style={{
                    marginTop:
                      "14px",

                    fontSize:
                      "16px",

                    color:
                      darkMode
                        ? "#cbd5e1"
                        : "#64748b",

                    lineHeight:
                      "1.8",

                    maxWidth:
                      "820px",
                  }}
                >

                  {t(
                    "transparencySubtitle"
                  )}

                </p>

              </div>

              {/* ================= BUTTONS ================= */}

              <div
                style={{
                  display: "flex",

                  gap: "14px",

                  flexWrap:
                    "wrap",
                }}
              >

                {/* DOWNLOAD */}

                <button
                  onClick={
                    handleDownload
                  }
                  style={{
                    height:
                      "54px",

                    padding:
                      "0 24px",

                    borderRadius:
                      "18px",

                    border:
                      "none",

                    background:
                      "linear-gradient(135deg,#2563eb,#1d4ed8)",

                    color:
                      "#ffffff",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: "10px",

                    fontWeight:
                      "800",

                    cursor:
                      "pointer",

                    boxShadow:
                      "0 12px 24px rgba(37,99,235,0.3)",
                  }}
                >

                  <FaDownload />

                  {t(
                    "downloadFullReport"
                  )}

                </button>

                {/* AI BUTTON */}

                <button
                  onClick={() =>
                    history.push(
                      "/ai-assistant"
                    )
                  }
                  style={{
                    height:
                      "54px",

                    padding:
                      "0 24px",

                    borderRadius:
                      "18px",

                    border:
                      darkMode
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid #e2e8f0",

                    background:
                      darkMode
                        ? "#1e293b"
                        : "#ffffff",

                    color:
                      darkMode
                        ? "#ffffff"
                        : "#0f172a",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: "10px",

                    fontWeight:
                      "800",

                    cursor:
                      "pointer",
                  }}
                >

                  <FaRobot />

                  AI Assistant

                </button>

              </div>

            </div>

          </div>

          {/* ================= COMPONENTS ================= */}

          <TransparencyStats
            darkMode={darkMode}
          />

          <FundsUtilization
            darkMode={darkMode}
          />

          <ImpactTimeline
            darkMode={darkMode}
          />

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div
          style={{
            position:
              "fixed",

            top: 0,

            right:
              showRightPanel
                ? "0"
                : "-420px",

            width:
              window.innerWidth <
              768
                ? "100%"
                : "400px",

            height:
              "100vh",

            background:
              darkMode
                ? "linear-gradient(180deg,#020617,#1e293b)"
                : "linear-gradient(180deg,#ffffff,#f8fafc)",

            zIndex:
              99999,

            transition:
              "all 0.35s cubic-bezier(0.22,1,0.36,1)",

            overflowY:
              "auto",

            padding:
              "78px 18px 18px",

            boxShadow:
              darkMode
                ? "-12px 0 40px rgba(0,0,0,0.45)"
                : "-12px 0 40px rgba(15,23,42,0.12)",
          }}
        >

          <button
            onClick={() =>
              setShowRightPanel(
                false
              )
            }
            style={{
              position:
                "absolute",

              top: "16px",

              right:
                "16px",

              width:
                "42px",

              height:
                "42px",

              borderRadius:
                "14px",

              border:
                "none",

              background:
                darkMode
                  ? "#1e293b"
                  : "#ffffff",

              color:
                darkMode
                  ? "#ffffff"
                  : "#0f172a",

              cursor:
                "pointer",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <FaTimes />

          </button>

          <TransparencyRightPanel
            darkMode={darkMode}
          />

        </div>

        {/* ================= OVERLAY ================= */}

        {showRightPanel && (

          <div
            onClick={() =>
              setShowRightPanel(
                false
              )
            }
            style={{
              position:
                "fixed",

              inset: 0,

              background:
                darkMode
                  ? "rgba(0,0,0,0.55)"
                  : "rgba(15,23,42,0.35)",

              backdropFilter:
                "blur(5px)",

              zIndex:
                9999,
            }}
          />

        )}

      </div>

    </NeedyLayout>

  );

}

export default TransparencyCenter;
