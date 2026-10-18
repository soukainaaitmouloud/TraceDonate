import React, {
  useState,
  useEffect,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import "./NeedyMessages.css";

import NeedyLayout from "../../layouts/NeedyLayout";

import Topbar from "../Topbar";

import NeedyMessagesSidebar from "./NeedyMessagesSidebar";

import NeedyChatWindow from "./NeedyChatWindow";

import CallModal from "./CallModal";

function NeedyMessages({

  darkMode,

  setDarkMode,

}) {

  const { t, i18n } =
    useTranslation();

  /* ========================================= */
  /* PANEL */
  /* ========================================= */

  const [
    showPanel,
    setShowPanel,
  ] = useState(false);

  /* ========================================= */
  /* CALL */
  /* ========================================= */

  const [
    showCall,
    setShowCall,
  ] = useState(false);

  const [
    callType,
    setCallType,
  ] = useState("audio");

  /* ========================================= */
  /* RTL */
  /* ========================================= */

  const isRTL =
    i18n.language === "ar";

  /* ========================================= */
  /* LOCK BODY */
  /* ========================================= */

  useEffect(() => {

    document.body.style.overflow =

      showPanel || showCall
        ? "hidden"
        : "auto";

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [showPanel, showCall]);

  return (

    <NeedyLayout>

      <div
        className={`needy-messages-wrapper ${
          darkMode
            ? "dark"
            : ""
        }`}
        dir={
          isRTL
            ? "rtl"
            : "ltr"
        }
      >

        {/* ========================================= */}
        {/* GLOW */}
        {/* ========================================= */}

        <div className="messages-page-glow" />

        {/* ========================================= */}
        {/* TOPBAR */}
        {/* ========================================= */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onTogglePanel={() =>
            setShowPanel(
              (prev) => !prev
            )
          }
        />

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="messages-page-header">

          {/* LEFT */}

          <div className="messages-header-left">

            <div className="messages-page-icon">

              💬

            </div>

            <div>

              <h1>

                {t("messages")}

              </h1>

              <p>

                {t(
                  "messagesSubtitle"
                )}

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="messages-header-actions">

            {/* AUDIO */}

            <button
              className="audio-call-btn"
              onClick={() => {

                setCallType(
                  "audio"
                );

                setShowCall(
                  true
                );

              }}
            >

              <span>

                📞

              </span>

              <span>

                {t(
                  "audioCall"
                )}

              </span>

            </button>

            {/* VIDEO */}

            <button
              className="video-call-btn"
              onClick={() => {

                setCallType(
                  "video"
                );

                setShowCall(
                  true
                );

              }}
            >

              <span>

                📹

              </span>

              <span>

                {t(
                  "videoCall"
                )}

              </span>

            </button>

          </div>

        </div>

        {/* ========================================= */}
        {/* PAGE */}
        {/* ========================================= */}

        <div className="needy-messages-page">

          {/* LEFT */}

          <div className="messages-left-panel">

            <NeedyMessagesSidebar
              darkMode={
                darkMode
              }
            />

          </div>

          {/* RIGHT */}

          <div className="messages-right-panel">

            <NeedyChatWindow
              darkMode={
                darkMode
              }
            />

          </div>

        </div>

        {/* ========================================= */}
        {/* OVERLAY */}
        {/* ========================================= */}

        {showPanel && (

          <div
            className="messages-overlay"
            onClick={() =>
              setShowPanel(
                false
              )
            }
          />

        )}

        {/* ========================================= */}
        {/* SLIDE PANEL */}
        {/* ========================================= */}

        <div
          className={`messages-right-slide ${
            showPanel
              ? "active"
              : ""
          }`}
        >

          {/* HEADER */}

          <div className="slide-panel-header">

            <div className="slide-title">

              <span>

                👤

              </span>

              <h2>

                {t(
                  "donorDetails"
                )}

              </h2>

            </div>

            <button
              onClick={() =>
                setShowPanel(
                  false
                )
              }
            >

              ✕

            </button>

          </div>

          {/* CONTENT */}

          <div className="slide-panel-content">

            <div className="donor-card">

              <div className="donor-avatar">

                A

              </div>

              <h3>

                Aarav Mehta

              </h3>

              <p>

                {t(
                  "verifiedDonor"
                )}

              </p>

            </div>

            {/* STATS */}

            <div className="donor-stats">

              <div className="stat-box">

                <div className="stat-icon">

                  💰

                </div>

                <h4>

                  $4,250

                </h4>

                <span>

                  {t(
                    "totalSupport"
                  )}

                </span>

              </div>

              <div className="stat-box">

                <div className="stat-icon">

                  ❤️

                </div>

                <h4>

                  12

                </h4>

                <span>

                  {t(
                    "donations"
                  )}

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* CALL MODAL */}
        {/* ========================================= */}

        {showCall && (

          <CallModal
            type={callType}
            onClose={() =>
              setShowCall(
                false
              )
            }
          />

        )}

      </div>

    </NeedyLayout>

  );

}

export default NeedyMessages;