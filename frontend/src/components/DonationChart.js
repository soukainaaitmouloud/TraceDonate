import React, {
  useState,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import DonationChartMyDonations from "../components/DonationChartMyDonations";

function DonationChart({
  darkMode,
}) {

  const { t } =
    useTranslation();

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  return (

    <div
      style={container}
    >

      {/* ================= LEFT CHART ================= */}

      <div
        style={chartBox(
          darkMode
        )}
      >

        <DonationChartMyDonations
          darkMode={darkMode}
        />

      </div>

      {/* ================= RIGHT CARD ================= */}

      <div
        style={card(
          darkMode
        )}
      >

        {/* GLOW */}

        <div
          style={glow}
        />

        {/* ICON */}

        <div
          style={iconWrapper(
            darkMode
          )}
        >
          🛡️
        </div>

        {/* TITLE */}

        <h3
          style={cardTitle(
            darkMode
          )}
        >

          {t(
            "transparentTitle"
          )}

        </h3>

        {/* DESCRIPTION */}

        <p
          style={text(
            darkMode
          )}
        >

          {t(
            "transparentDesc"
          )}

        </p>

        {/* BUTTON */}

        <button
          style={btn}
          onClick={() =>
            setShowModal(true)
          }
        >

          {t(
            "learnMore"
          )}

        </button>

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (

        <div
          style={
            modalOverlay
          }
          onClick={() =>
            setShowModal(
              false
            )
          }
        >

          <div
            style={modal(
              darkMode
            )}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div
              style={
                modalIcon
              }
            >
              💚
            </div>

            <h2
              style={
                modalTitle(
                  darkMode
                )
              }
            >

              {t(
                "transparencyTitle"
              )}

            </h2>

            <p
              style={modalText(
                darkMode
              )}
            >

              {t(
                "transparencyDesc"
              )}

            </p>

            <button
              style={
                closeBtn
              }
              onClick={() =>
                setShowModal(
                  false
                )
              }
            >

              {t(
                "close"
              )}

            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default DonationChart;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = {

  display: "grid",

  gridTemplateColumns:
    "3fr 1fr",

  gap: "20px",

  width: "100%",
};

const chartBox = (
  darkMode
) => ({

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  borderRadius:
    "24px",

  overflow: "hidden",

  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
});

const card = (
  darkMode
) => ({

  position: "relative",

  overflow: "hidden",

  background: darkMode

    ? "linear-gradient(180deg,#052e16,#022c22)"

    : "linear-gradient(180deg,#ecfdf5,#d1fae5)",

  borderRadius:
    "24px",

  padding: "30px 24px",

  display: "flex",

  flexDirection: "column",

  justifyContent:
    "center",

  alignItems: "center",

  textAlign: "center",

  border: darkMode
    ? "1px solid #14532d"
    : "1px solid #bbf7d0",

  minHeight: "320px",

  boxShadow:
    "0 10px 30px rgba(34,197,94,0.15)",
});

const glow = {

  position: "absolute",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

  top: "-60px",

  right: "-60px",

  filter: "blur(30px)",
};

const iconWrapper = (
  darkMode
) => ({

  width: "82px",

  height: "82px",

  borderRadius: "50%",

  display: "flex",

  justifyContent:
    "center",

  alignItems: "center",

  fontSize: "42px",

  marginBottom: "22px",

  background: darkMode
    ? "rgba(255,255,255,0.08)"
    : "#ffffff",

  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
});

const cardTitle = (
  darkMode
) => ({

  fontSize: "32px",

  fontWeight: "800",

  marginBottom: "14px",

  color: darkMode
    ? "#ffffff"
    : "#052e16",

  lineHeight: "1.2",
});

const text = (
  darkMode
) => ({

  fontSize: "15px",

  lineHeight: "1.8",

  color: darkMode
    ? "#d1fae5"
    : "#166534",

  maxWidth: "260px",
});

const btn = {

  marginTop: "24px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "#ffffff",

  border: "none",

  padding: "14px 24px",

  borderRadius: "999px",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "14px",

  transition: "0.3s",

  boxShadow:
    "0 10px 20px rgba(34,197,94,0.25)",
};

const modalOverlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(0,0,0,0.65)",

  display: "flex",

  justifyContent:
    "center",

  alignItems: "center",

  zIndex: 9999,

  backdropFilter:
    "blur(4px)",
};

const modal = (
  darkMode
) => ({

  width: "420px",

  background: darkMode
    ? "#020617"
    : "#ffffff",

  borderRadius:
    "24px",

  padding: "35px",

  textAlign: "center",

  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.25)",
});

const modalIcon = {

  fontSize: "52px",

  marginBottom: "18px",
};

const modalTitle = (
  darkMode
) => ({

  fontSize: "30px",

  fontWeight: "800",

  marginBottom: "14px",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const modalText = (
  darkMode
) => ({

  fontSize: "15px",

  lineHeight: "1.8",

  color: darkMode
    ? "#cbd5e1"
    : "#475569",
});

const closeBtn = {

  marginTop: "24px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "#ffffff",

  border: "none",

  padding: "14px 28px",

  borderRadius: "999px",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "14px",
};