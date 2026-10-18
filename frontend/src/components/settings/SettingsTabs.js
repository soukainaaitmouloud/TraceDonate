import React from "react";

import {
  FaUser,
  FaBell,
  FaLock,
  FaShieldAlt,
  FaCreditCard,
  FaChevronRight,
} from "react-icons/fa";

function SettingsTabs({
  darkMode,
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      desc: "Manage profile info",
      icon: FaUser,
    },

    {
      id: "notifications",
      label: "Notifications",
      desc: "Alerts & updates",
      icon: FaBell,
    },

    {
      id: "password",
      label: "Password",
      desc: "Security settings",
      icon: FaLock,
    },

    {
      id: "privacy",
      label: "Privacy",
      desc: "Privacy controls",
      icon: FaShieldAlt,
    },

    {
      id: "payment",
      label: "Payment",
      desc: "Cards & billing",
      icon: FaCreditCard,
    },
  ];

  return (
    <div style={container(darkMode)}>
      <div style={topSection}>
        <h2
          style={title(darkMode)}
        >
          Settings
        </h2>

        <p style={subtitle}>
          Manage your account
        </p>
      </div>

      <div style={tabsWrapper}>
        {tabs.map((tab) => {
          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              style={tabButton(
                darkMode,
                active
              )}
            >
              {/* LEFT */}

              <div style={tabLeft}>
                <div
                  style={iconWrapper(
                    active
                  )}
                >
                  <tab.icon
                    size={16}
                  />
                </div>

                <div>
                  <div
                    style={tabLabel(
                      darkMode,
                      active
                    )}
                  >
                    {tab.label}
                  </div>

                  <div
                    style={tabDesc(
                      darkMode,
                      active
                    )}
                  >
                    {tab.desc}
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <FaChevronRight
                size={13}
                color={
                  active
                    ? "#ffffff"
                    : "#94a3b8"
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SettingsTabs;

/* ================= STYLES ================= */

const container = (
  darkMode
) => ({
  width: "100%",

  background: darkMode
    ? "rgba(15,23,42,0.95)"
    : "rgba(255,255,255,0.92)",

  backdropFilter: "blur(20px)",

  borderRadius: "30px",

  padding: "22px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid rgba(255,255,255,0.8)",

  boxShadow: darkMode
    ? "0 20px 50px rgba(0,0,0,0.35)"
    : "0 20px 45px rgba(15,23,42,0.08)",
});

const topSection = {
  marginBottom: "22px",
};

const title = (darkMode) => ({
  margin: 0,

  fontSize: "28px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",
});

const subtitle = {
  marginTop: "6px",

  color: "#94a3b8",

  fontSize: "13px",

  fontWeight: "600",
};

const tabsWrapper = {
  display: "flex",

  flexDirection: "column",

  gap: "14px",
};

const tabButton = (
  darkMode,
  active
) => ({
  border: "none",

  outline: "none",

  width: "100%",

  padding: "18px",

  borderRadius: "22px",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",

  cursor: "pointer",

  transition: "0.3s ease",

  background: active
    ? "linear-gradient(135deg,#22c55e,#16a34a)"
    : darkMode
    ? "#111827"
    : "#f8fafc",

  boxShadow: active
    ? "0 14px 28px rgba(34,197,94,0.35)"
    : "none",

  transform: active
    ? "scale(1.02)"
    : "scale(1)",
});

const tabLeft = {
  display: "flex",

  alignItems: "center",

  gap: "14px",
};

const iconWrapper = (
  active
) => ({
  width: "48px",

  height: "48px",

  borderRadius: "16px",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  background: active
    ? "rgba(255,255,255,0.2)"
    : "linear-gradient(135deg,#dcfce7,#bbf7d0)",

  color: active
    ? "#ffffff"
    : "#16a34a",

  flexShrink: 0,
});

const tabLabel = (
  darkMode,
  active
) => ({
  fontSize: "15px",

  fontWeight: "800",

  color: active
    ? "#ffffff"
    : darkMode
    ? "#ffffff"
    : "#111827",
});

const tabDesc = (
  darkMode,
  active
) => ({
  marginTop: "4px",

  fontSize: "12px",

  fontWeight: "600",

  color: active
    ? "rgba(255,255,255,0.8)"
    : "#94a3b8",
});