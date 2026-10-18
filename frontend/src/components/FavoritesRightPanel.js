import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaHeart,
  FaSearch,
  FaGift,
  FaLifeRing,
  FaTimes,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

import { useHistory } from "react-router-dom";

function FavoritesRightPanel({
  open,
  onClose,
  darkMode = false,
}) {

  const { t } =
    useTranslation();

  const history =
    useHistory();

  const [favorites, setFavorites] =
    useState([]);

  /* ================================================= */
  /* ================= LOAD FAVORITES ================ */
  /* ================================================= */

  useEffect(() => {

    try {

      const stored =
        JSON.parse(
          localStorage.getItem(
            "favorites"
          ) || "[]"
        );

      setFavorites(
        Array.isArray(stored)
          ? stored
          : []
      );

    } catch {

      setFavorites([]);

    }

  }, []);

  /* ================================================= */
  /* ================= REAL STATS ==================== */
  /* ================================================= */

  const stats = useMemo(() => {

    const savedRequests =
      favorites.length;

    const savedCauses =
      [
        ...new Set(
          favorites.map(
            (f) =>
              f.category ||
              "general"
          )
        ),
      ].length;

    const totalSaved =
      favorites.reduce(
        (sum, item) =>
          sum +
          Number(
            item.goal || 0
          ),
        0
      );

    const totalRaised =
      favorites.reduce(
        (sum, item) =>
          sum +
          Number(
            item.raised || 0
          ),
        0
      );

    return {

      savedRequests,

      savedCauses,

      totalSaved,

      totalRaised,

    };

  }, [favorites]);

  if (!open)
    return null;

  return (

    <>

      {/* OVERLAY */}

      <div
        style={overlay}
        onClick={onClose}
      />

      {/* PANEL */}

      <div
        style={panel(
          darkMode
        )}
      >

        {/* HEADER */}

        <div style={header}>

          <div>

            <h2
              style={headerTitle(
                darkMode
              )}
            >

              {t(
                "favoritesOverview"
              )}

            </h2>

            <p
              style={headerSub(
                darkMode
              )}
            >

              {t(
                "savedImpactSummary"
              )}

            </p>

          </div>

          {/* CLOSE */}

          <button

            onClick={onClose}

            style={closeBtn(
              darkMode
            )}

            onMouseEnter={(e) => {

              e.currentTarget.style.transform =
                "translateY(-3px) scale(1.06)";

              e.currentTarget.style.background =
                "linear-gradient(135deg,#ef4444,#dc2626)";

            }}

            onMouseLeave={(e) => {

              e.currentTarget.style.transform =
                "translateY(0) scale(1)";

              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";

            }}

          >

            <FaTimes />

          </button>

        </div>

        {/* OVERVIEW */}

        <div
          style={card(
            darkMode
          )}
        >

          <div style={glow}></div>

          <h3
            style={cardTitle(
              darkMode
            )}
          >

            {t(
              "favoritesStatistics"
            )}

          </h3>

          <div style={row}>

            <span
              style={label(
                darkMode
              )}
            >

              📌{" "}

              {t(
                "savedRequests"
              )}

            </span>

            <b
              style={value(
                darkMode
              )}
            >

              {
                stats.savedRequests
              }

            </b>

          </div>

          <div style={row}>

            <span
              style={label(
                darkMode
              )}
            >

              💚{" "}

              {t(
                "savedCauses"
              )}

            </span>

            <b
              style={value(
                darkMode
              )}
            >

              {
                stats.savedCauses
              }

            </b>

          </div>

          <div style={row}>

            <span
              style={label(
                darkMode
              )}
            >

              💰{" "}

              {t(
                "totalSaved"
              )}

            </span>

            <b style={greenValue}>

              $

              {stats.totalSaved.toLocaleString()}

            </b>

          </div>

          <div style={row}>

            <span
              style={label(
                darkMode
              )}
            >

              📊{" "}

              {t(
                "totalRaised"
              )}

            </span>

            <b
              style={blueValue}
            >

              $

              {stats.totalRaised.toLocaleString()}

            </b>

          </div>

        </div>

        {/* MOTIVATION */}

        <div
          style={highlight(
            darkMode
          )}
        >

          <div style={highlightGlow}></div>

          <FaHeart
            size={42}
            color="#22c55e"
          />

          <h3
            style={highlightTitle(
              darkMode
            )}
          >

            {t(
              "favoritesCanChangeLives"
            )}

          </h3>

          <p
            style={highlightText(
              darkMode
            )}
          >

            {t(
              "favoritesMotivation"
            )}

          </p>

          <button

            style={btn}

            onClick={() => {

              onClose();

              history.push(
                "/browse-requests"
              );

            }}

          >

            {t(
              "exploreMore"
            )}

          </button>

        </div>

        {/* QUICK ACTIONS */}

        <div
          style={card(
            darkMode
          )}
        >

          <h3
            style={cardTitle(
              darkMode
            )}
          >

            {t(
              "quickActions"
            )}

          </h3>

          {/* BROWSE */}

          <div

            style={action(
              darkMode
            )}

            onClick={() => {

              onClose();

              history.push(
                "/browse-requests"
              );

            }}

          >

            <FaSearch />

            <span>

              {t(
                "browseRequests"
              )} →

            </span>

          </div>

          {/* CAUSES */}

          <div

            style={action(
              darkMode
            )}

            onClick={() => {

              onClose();

              history.push(
                "/impact"
              );

            }}

          >

            <FaGift />

            <span>

              {t(
                "exploreCauses"
              )} →

            </span>

          </div>

        </div>

        {/* SUPPORT */}

        <div
          style={card(
            darkMode
          )}
        >

          <h3
            style={cardTitle(
              darkMode
            )}
          >

            {t(
              "needHelp"
            )}

          </h3>

          <p
            style={supportText(
              darkMode
            )}
          >

            {t(
              "supportAnytime"
            )}

          </p>

          <button

            style={supportBtn(
              darkMode
            )}

            onClick={() => {

              onClose();

              history.push(
                "/messages"
              );

            }}

          >

            <FaLifeRing />

            {t(
              "contactSupport"
            )}

          </button>

        </div>

      </div>

    </>

  );

}

export default FavoritesRightPanel;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const overlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(2,6,23,0.55)",

  backdropFilter:
    "blur(10px)",

  WebkitBackdropFilter:
    "blur(10px)",

  zIndex: 999,

};

const panel = (
  darkMode
) => ({

  position: "fixed",

  top: 0,
  right: 0,

  width: "380px",

  maxWidth: "100%",

  height: "100vh",

  overflowY: "auto",

  padding: "24px",

  zIndex: 1000,

  backdropFilter:
    "blur(24px)",

  WebkitBackdropFilter:
    "blur(24px)",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(7,18,38,0.97),
        rgba(15,23,42,0.94)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.96),
        rgba(248,250,252,0.92)
      )
    `,

  boxShadow: darkMode

    ? `
      -20px 0 80px rgba(0,0,0,0.55)
    `

    : `
      -20px 0 80px rgba(15,23,42,0.12)
    `,

  borderLeft: darkMode

    ? "1px solid rgba(255,255,255,0.05)"

    : "1px solid rgba(255,255,255,0.9)",

});

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "24px",

};

const headerTitle = (
  darkMode
) => ({

  margin: 0,

  fontSize: "30px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

});

const headerSub = (
  darkMode
) => ({

  marginTop: "6px",

  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const closeBtn = (
  darkMode
) => ({

  width: "44px",

  height: "44px",

  borderRadius: "16px",

  border: "none",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "16px",

  color: "#ffffff",

  transition:
    "all 0.3s ease",

  background:
    "rgba(255,255,255,0.08)",

});

const card = (
  darkMode
) => ({

  position: "relative",

  overflow: "hidden",

  borderRadius: "26px",

  padding: "22px",

  marginBottom: "20px",

  backdropFilter:
    "blur(24px)",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(7,18,38,0.95),
        rgba(15,23,42,0.90)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.92),
        rgba(248,250,252,0.84)
      )
    `,

});

const glow = {

  position: "absolute",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.12)",

  filter: "blur(90px)",

  top: "-50px",

  right: "-50px",

};

const cardTitle = (
  darkMode
) => ({

  marginTop: 0,

  marginBottom: "16px",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  fontSize: "16px",

  fontWeight: "700",

});

const row = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "10px 0",

  borderBottom:
    "1px solid rgba(148,163,184,0.08)",

};

const label = (
  darkMode
) => ({

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

});

const value = (
  darkMode
) => ({

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

});

const greenValue = {

  color: "#22c55e",

  fontWeight: "800",

};

const blueValue = {

  color: "#3b82f6",

  fontWeight: "800",

};

const highlight = (
  darkMode
) => ({

  position: "relative",

  overflow: "hidden",

  padding: "24px",

  borderRadius: "28px",

  textAlign: "center",

  marginBottom: "20px",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(6,95,70,0.30),
        rgba(4,120,87,0.22)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(236,253,245,1),
        rgba(209,250,229,0.85)
      )
    `,

});

const highlightGlow = {

  position: "absolute",

  width: "200px",

  height: "200px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

  filter: "blur(100px)",

  top: "-60px",

  right: "-60px",

};

const highlightTitle = (
  darkMode
) => ({

  marginTop: "14px",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

});

const highlightText = (
  darkMode
) => ({

  fontSize: "13px",

  lineHeight: 1.7,

  color: darkMode
    ? "#cbd5e1"
    : "#475569",

});

const btn = {

  marginTop: "16px",

  width: "100%",

  padding: "14px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  fontWeight: "700",

  cursor: "pointer",

};

const action = (
  darkMode
) => ({

  display: "flex",

  alignItems: "center",

  gap: "12px",

  padding: "14px 0",

  borderBottom:
    "1px solid rgba(148,163,184,0.08)",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  cursor: "pointer",

  fontWeight: "600",

});

const supportText = (
  darkMode
) => ({

  fontSize: "13px",

  lineHeight: 1.6,

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

});

const supportBtn = (
  darkMode
) => ({

  marginTop: "14px",

  width: "100%",

  padding: "14px",

  borderRadius: "16px",

  border: "none",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "10px",

  fontWeight: "700",

  background: darkMode
    ? "#1e293b"
    : "#f1f5f9",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

});