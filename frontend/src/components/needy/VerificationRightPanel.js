// src/components/needy/VerificationRightPanel.js

import React from "react";

import {
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaWallet,
  FaUsers,
  FaDownload,
  FaLightbulb,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

import "./VerificationRightPanel.css";

function VerificationRightPanel({
  showRightPanel,
  setShowRightPanel,
  darkMode,
}) {

  const { t } = useTranslation();

  /* ================= DOWNLOAD BADGE ================= */

  const handleDownloadBadge = () => {

    const badgeContent = `
====================================
        VERIFIED USER BADGE
====================================

${t("userName")}
${t("verificationStatus")}

✔ ${t("verified")}

${t("lastVerified")} 10 May 2026

TraceDonate © 2026
`;

    const blob = new Blob(
      [badgeContent],
      {
        type: "text/plain",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "TraceDonate-Verification-Badge.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  return (

    <>

      {/* ================= BACKDROP ================= */}

      {showRightPanel && (

        <div
          className="verify-backdrop"
          onClick={() =>
            setShowRightPanel(false)
          }
        />

      )}

      {/* ================= PANEL ================= */}

      <div
        className={`verify-panel ${
          showRightPanel
            ? "active"
            : ""
        } ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        {/* ================= CLOSE ================= */}

        <button
          className="verify-close-btn"
          onClick={() =>
            setShowRightPanel(false)
          }
        >
          ✕
        </button>

        {/* ================= STATUS CARD ================= */}

        <div className="verify-card wow-card">

          <div className="verify-card-top">

            <h3>

              {t(
                "verificationStatus"
              )}

            </h3>

            <div className="verified-badge">

              <FaCheckCircle />

              {t("verified")}

            </div>

          </div>

          {/* ================= VERIFIED BOX ================= */}

          <div className="verified-box">

            {/* SHIELD */}

            <div className="shield-circle">

              <FaShieldAlt />

            </div>

            {/* TITLE */}

            <h2>

              {t(
                "youAreVerified"
              )}

            </h2>

            {/* TEXT */}

            <p>

              {t(
                "verificationSuccess"
              )}

            </p>

            {/* DATE */}

            <span>

              {t(
                "lastVerified"
              )}{" "}
              10 May 2026

            </span>

          </div>

          {/* ================= DOWNLOAD ================= */}

          <button
            className="download-btn"
            onClick={
              handleDownloadBadge
            }
          >

            <FaDownload />

            {t(
              "downloadVerificationBadge"
            )}

          </button>

        </div>

        {/* ================= WHY CARD ================= */}

        <div className="verify-card wow-card">

          <h3 className="why-title">

            {t(
              "whyVerificationMatters"
            )}

          </h3>

          {/* ================= ITEM ================= */}

          <div className="why-item">

            <div className="why-icon green">

              <FaShieldAlt />

            </div>

            <div>

              <strong>

                {t(
                  "buildTrust"
                )}

              </strong>

              <p>

                {t(
                  "buildTrustDesc"
                )}

              </p>

            </div>

          </div>

          {/* ================= ITEM ================= */}

          <div className="why-item">

            <div className="why-icon blue">

              <FaLock />

            </div>

            <div>

              <strong>

                {t(
                  "secureSafe"
                )}

              </strong>

              <p>

                {t(
                  "secureSafeDesc"
                )}

              </p>

            </div>

          </div>

          {/* ================= ITEM ================= */}

          <div className="why-item">

            <div className="why-icon yellow">

              <FaWallet />

            </div>

            <div>

              <strong>

                {t(
                  "fasterWithdrawals"
                )}

              </strong>

              <p>

                {t(
                  "fasterWithdrawalsDesc"
                )}

              </p>

            </div>

          </div>

          {/* ================= ITEM ================= */}

          <div className="why-item">

            <div className="why-icon pink">

              <FaUsers />

            </div>

            <div>

              <strong>

                {t(
                  "transparency"
                )}

              </strong>

              <p>

                {t(
                  "transparencyDesc"
                )}

              </p>

            </div>

          </div>

          {/* ================= TIP ================= */}

          <div className="verify-tip">

            <FaLightbulb />

            <span>

              {t(
                "verificationTip"
              )}

            </span>

          </div>

        </div>

      </div>

    </>

  );

}

export default VerificationRightPanel;