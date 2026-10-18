import React from "react";

import {
  useHistory,
  useLocation,
} from "react-router-dom";

import {
  FaHome,
  FaSearch,
  FaGift,
  FaChartBar,
  FaHeart,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

function Sidebar() {
  const history =
    useHistory();

  const location =
    useLocation();

  const { t, i18n } =
    useTranslation();

  const isRTL =
    i18n.language === "ar";

  const handleClick = (
    path
  ) => {
    if (path === "logout") {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      history.push("/auth");

      return;
    }

    history.push(path);
  };

  const handleDonate =
    () => {
      history.push("/browse");
    };

  const menu = [
    {
      icon: <FaHome />,
      text: t("dashboard"),
      path: "/donor-dashboard",
    },

    {
      icon: <FaSearch />,
      text: t(
        "browseRequests"
      ),
      path: "/browse",
    },

    {
      icon: <FaGift />,
      text: t(
        "myDonations"
      ),
      path: "/my-donations",
    },

    {
      icon: <FaChartBar />,
      text: t("myImpact"),
      path: "/impact",
    },

    {
      icon: <FaHeart />,
      text: t(
        "myFavorites"
      ),
      path: "/favorites",
    },

    {
      icon: (
        <FaCommentDots />
      ),
      text: t("messages"),
      path: "/messages",
    },

    {
      icon: <FaCog />,
      text: t("settings"),
      path: "/settings",
    },

    {
      icon: (
        <FaSignOutAlt />
      ),
      text: t("logout"),
      path: "logout",
    },
  ];

  return (
    <div
      style={sidebar(isRTL)}
    >
      {/* TOP */}
      <div>
        <div style={logoBox}>
          <img
            src="/logo.png"
            alt="logo"
            style={logo}
          />
        </div>

        <div
          style={menuBox}
        >
          {menu.map(
            (m, i) => {
              const active =
                location.pathname ===
                m.path;

              return (
                <div
                  key={i}
                  onClick={() =>
                    handleClick(
                      m.path
                    )
                  }
                  style={{
                    ...item(
                      isRTL
                    ),

                    background:
                      active
                        ? "linear-gradient(90deg,#2563eb,#22c55e)"
                        : "transparent",

                    color:
                      active
                        ? "#ffffff"
                        : "#cbd5e1",

                    transform:
                      active
                        ? "scale(1.03)"
                        : "scale(1)",

                    boxShadow:
                      active
                        ? "0 10px 25px rgba(0,0,0,0.25)"
                        : "none",
                  }}
                  onMouseEnter={(
                    e
                  ) => {
                    if (
                      !active
                    ) {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";

                      e.currentTarget.style.transform =
                        isRTL
                          ? "translateX(-4px)"
                          : "translateX(4px)";
                    }
                  }}
                  onMouseLeave={(
                    e
                  ) => {
                    if (
                      !active
                    ) {
                      e.currentTarget.style.background =
                        "transparent";

                      e.currentTarget.style.transform =
                        "translateX(0)";
                    }
                  }}
                >
                  <span
                    style={{
                      ...icon,

                      color:
                        active
                          ? "#ffffff"
                          : "#94a3b8",
                    }}
                  >
                    {m.icon}
                  </span>

                  <span>
                    {m.text}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div style={bottom}>
        <img
          src="/images/jar.png"
          alt="jar"
          style={jar}
        />

        <div style={quote}>
          {t(
            "sidebarQuote"
          )}
        </div>

        <button
          style={btn}
          onClick={
            handleDonate
          }
          onMouseEnter={(
            e
          ) => {
            e.currentTarget.style.transform =
              "scale(1.03)";
          }}
          onMouseLeave={(
            e
          ) => {
            e.currentTarget.style.transform =
              "scale(1)";
          }}
        >
          <FaHeart
            style={{
              fontSize:
                "14px",
            }}
          />

          {t("donateNow")}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

/* ================= STYLES ================= */

const sidebar = (
  isRTL
) => ({
  width: "230px",

  minHeight: "100vh",

  display: "flex",

  flexDirection:
    "column",

  justifyContent:
    "space-between",

  background:
    "linear-gradient(180deg,#020617,#052e2b,#065f46)",

  borderRight:
    !isRTL
      ? "1px solid rgba(255,255,255,0.06)"
      : "none",

  borderLeft: isRTL
    ? "1px solid rgba(255,255,255,0.06)"
    : "none",

  padding: "12px 0",

  boxSizing:
    "border-box",

  flexShrink: 0,

  /* IMPORTANT */
  overflow: "visible",

  position: "relative",
});

const logoBox = {
  paddingTop: "20px",

  paddingBottom: "12px",

  display: "flex",

  justifyContent:
    "center",

  alignItems: "center",
};

const logo = {
  width: "130px",

  objectFit: "contain",

  transform:
    "scale(2.2) translateX(-3px)",

  transformOrigin:
    "center",
};

const menuBox = {
  display: "flex",

  flexDirection:
    "column",

  gap: "10px",

  padding: "0 14px",

  marginTop: "10px",
};

const item = (
  isRTL
) => ({
  padding: "14px 16px",

  borderRadius: "14px",

  display: "flex",

  alignItems: "center",

  gap: "12px",

  cursor: "pointer",

  fontSize: "15px",

  fontWeight: "600",

  transition:
    "all 0.25s ease",

  userSelect: "none",

  flexDirection: isRTL
    ? "row-reverse"
    : "row",

  textAlign: isRTL
    ? "right"
    : "left",
});

const icon = {
  fontSize: "16px",

  transition: "0.25s",

  minWidth: "18px",
};

const bottom = {
  padding: "18px",

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  gap: "18px",
};

const jar = {
  width: "110%",

  marginLeft: "-10%",

  display: "block",

  marginTop: "40px",
};

const quote = {
  fontSize: "14px",

  color: "#e2e8f0",

  textAlign: "center",

  lineHeight: "1.8",

  padding: "16px",

  borderRadius: "18px",

  background:
    "rgba(255,255,255,0.05)",

  border:
    "1px solid rgba(255,255,255,0.10)",

  backdropFilter:
    "blur(10px)",
};

const btn = {
  width: "100%",

  padding: "14px",

  borderRadius: "999px",

  border: "none",

  display: "flex",

  justifyContent:
    "center",

  alignItems: "center",

  gap: "8px",

  fontSize: "14px",

  fontWeight: "700",

  color: "#ffffff",

  background:
    "linear-gradient(90deg,#22c55e,#2563eb)",

  cursor: "pointer",

  transition:
    "all 0.25s ease",

  boxShadow:
    "0 10px 25px rgba(0,0,0,0.25)",
};