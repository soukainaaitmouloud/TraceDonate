import React from "react";

import {
  useTranslation,
} from "react-i18next";

import "./VerificationProgress.css";

function VerificationProgress({
  darkMode,
}) {

  const { t } =
    useTranslation();

  return (

    <div
      className={`verification-progress-card ${
        darkMode
          ? "dark"
          : ""
      }`}
      style={{
        background:
          darkMode
            ? "#1e293b"
            : "#ffffff",

        transition:
          "all 0.3s ease",
      }}
    >

      {/* ================= TITLE ================= */}

      <h3
        style={{
          color:
            darkMode
              ? "#ffffff"
              : "#0f172a",
        }}
      >

        {t(
          "verificationProgress"
        )}

      </h3>

      {/* ================= CONTENT ================= */}

      <div className="verification-progress-content">

        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="verification-left">

          {/* ================= CIRCLE ================= */}

          <div className="progress-ring">

            <div className="progress-ring-inner">

              {/* GLOW */}

              <div className="progress-glow" />

              <svg
                width="170"
                height="170"
                viewBox="0 0 170 170"
              >

                {/* BG */}

                <circle
                  cx="85"
                  cy="85"
                  r="65"
                  stroke={
                    darkMode
                      ? "#334155"
                      : "#edf2f7"
                  }
                  strokeWidth="14"
                  fill="none"
                />

                {/* PROGRESS */}

                <circle
                  cx="85"
                  cy="85"
                  r="65"
                  stroke="url(#gradient)"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="408"
                  strokeDashoffset="82"
                  transform="rotate(-90 85 85)"
                />

                {/* GRADIENT */}

                <defs>

                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >

                    <stop
                      offset="0%"
                      stopColor="#16a34a"
                    />

                    <stop
                      offset="100%"
                      stopColor="#22c55e"
                    />

                  </linearGradient>

                </defs>

              </svg>

              {/* SHIELD */}

              <div className="shield-icon">
                🛡️
              </div>

            </div>

          </div>

          {/* ================= INFO ================= */}

          <div className="verification-info">

            <h2
              style={{
                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",
              }}
            >

              {t(
                "profileVerification"
              )}

            </h2>

            {/* COMPLETE */}

            <div className="complete-text">

              <span>
                80%
              </span>

              <span
                style={{
                  color:
                    darkMode
                      ? "#cbd5e1"
                      : "#475569",
                }}
              >

                {t(
                  "complete"
                )}

              </span>

            </div>

            {/* MINI BAR */}

            <div className="mini-progress">

              <div className="mini-progress-fill" />

            </div>

            {/* DESCRIPTION */}

            <p
              style={{
                color:
                  darkMode
                    ? "#cbd5e1"
                    : "#64748b",
              }}
            >

              {t(
                "verificationDescription"
              )}

            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div
          className="verification-right"
          style={{
            borderColor:
              darkMode
                ? "#334155"
                : "#edf2f7",
          }}
        >

          {/* ================= ROW 1 ================= */}

          <div
            className="verify-row"
            style={{
              borderColor:
                darkMode
                  ? "#334155"
                  : "#f1f5f9",
            }}
          >

            <span
              style={{
                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",
              }}
            >

              {t(
                "identityVerification"
              )}

            </span>

            <div className="verify-status success">

              {t(
                "completed"
              )} ✓

            </div>

          </div>

          {/* ================= ROW 2 ================= */}

          <div
            className="verify-row"
            style={{
              borderColor:
                darkMode
                  ? "#334155"
                  : "#f1f5f9",
            }}
          >

            <span
              style={{
                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",
              }}
            >

              {t(
                "medicalVerification"
              )}

            </span>

            <div className="verify-status success">

              {t(
                "completed"
              )} ✓

            </div>

          </div>

          {/* ================= ROW 3 ================= */}

          <div
            className="verify-row"
            style={{
              borderColor:
                darkMode
                  ? "#334155"
                  : "#f1f5f9",
            }}
          >

            <span
              style={{
                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",
              }}
            >

              {t(
                "addressVerification"
              )}

            </span>

            <div className="verify-status pending">

              {t(
                "pending"
              )} ⏳

            </div>

          </div>

          {/* ================= ROW 4 ================= */}

          <div
            className="verify-row"
            style={{
              borderBottom:
                "none",
            }}
          >

            <span
              style={{
                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",
              }}
            >

              {t(
                "bankVerification"
              )}

            </span>

            <div className="verify-status inactive">

              {t(
                "notStarted"
              )} ○

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default VerificationProgress;