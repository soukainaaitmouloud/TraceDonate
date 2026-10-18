import React from "react";
import { FaDollarSign, FaUsers, FaGift, FaCalendar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function StatsCards({ darkMode }) {
  const { t } = useTranslation();

  return (
    <div style={container}>
      
      {/* 💰 TOTAL DONATED */}
      <div style={card(darkMode)}>
        <div style={iconWrap("#16a34a")}>
          <FaDollarSign />
        </div>
        <div>
          <p style={label}>{t("totalDonated")}</p>
          <h2 style={value}>$12,600</h2>
          <span style={growth}>
            ↑ 18.6% {t("vsLastMonth")}
          </span>
        </div>
      </div>

      {/* 👥 PEOPLE HELPED */}
      <div style={card(darkMode)}>
        <div style={iconWrap("#2563eb")}>
          <FaUsers />
        </div>
        <div>
          <p style={label}>{t("peopleHelped")}</p>
          <h2 style={value}>320+</h2>
          <span style={growth}>
            ↑ 15.2% {t("vsLastMonth")}
          </span>
        </div>
      </div>

      {/* 🎁 REQUESTS SUPPORTED */}
      <div style={card(darkMode)}>
        <div style={iconWrap("#7c3aed")}>
          <FaGift />
        </div>
        <div>
          <p style={label}>{t("requestsSupported")}</p>
          <h2 style={value}>18</h2>
          <span style={growth}>
            ↑ 20.0% {t("vsLastMonth")}
          </span>
        </div>
      </div>

      {/* 📅 MEMBER SINCE */}
      <div style={card(darkMode)}>
        <div style={iconWrap("#f97316")}>
          <FaCalendar />
        </div>
        <div>
          <p style={label}>{t("memberSince")}</p>
          <h2 style={value}>May 2026</h2>
          <span style={subText}>{t("proudDonor")}</span>
        </div>
      </div>

    </div>
  );
}

export default StatsCards;

/* ================= STYLES ================= */

const container = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const card = (darkMode) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "20px",
  borderRadius: "16px",
  background: darkMode
    ? "linear-gradient(145deg, #0f172a, #020617)"
    : "#ffffff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  transition: "all 0.25s ease",
  cursor: "pointer",
});

const iconWrap = (color) => ({
  width: "45px",
  height: "45px",
  borderRadius: "12px",
  background: color,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  boxShadow: `0 5px 15px ${color}55`,
});

const label = {
  fontSize: "13px",
  color: "#64748b",
};

const value = {
  fontSize: "20px",
  fontWeight: "700",
  margin: "2px 0",
};

const growth = {
  fontSize: "12px",
  color: "#16a34a",
};

const subText = {
  fontSize: "12px",
  color: "#64748b",
};