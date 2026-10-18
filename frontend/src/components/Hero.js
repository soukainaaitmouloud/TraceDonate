import React from "react";
import { FaUsers } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Hero() {
  const history = useHistory();

  const { t } = useTranslation();

  return (
    <div style={hero}>
      {/* VIDEO */}
      <video autoPlay loop muted style={video}>
        <source
          src="/videos/donor.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      <div style={overlay}></div>

      {/* CONTENT */}
      <div style={content}>
    <h1 style={title}>
  {t("yourKindness")}
  <br />

  <span style={highlight}>
    {t("createsMiracles")}
  </span>
</h1>
 <p style={subtitle}>
          {t("heroSubtitle")}
        </p>

        {/* BUTTONS */}
        <div style={btnRow}>
          <button
            style={primaryBtn}
            onClick={() => {
              const el =
                document.getElementById(
                  "requests-section"
                );

              if (el) {
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            {t("exploreRequests")} →
          </button>

          <button
            style={secondaryBtn}
            onClick={() =>
              history.push("/impact")
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "transparent";
            }}
          >
            {t("myImpact")}
          </button>
        </div>
      </div>

      {/* BADGE */}
      <div style={badge}>
        <FaUsers
          style={{
            fontSize: "18px",
          }}
        />

        <div>
          <div style={badgeNumber}>
            32+
          </div>

          <div style={badgeText}>
            {t("livesImpacted")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const hero = {
  position: "relative",
  height: "340px",
  borderRadius: "20px",
  overflow: "hidden",
};

const video = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.2))",
};

const content = {
  position: "absolute",
  top: "50%",
  left: "50px",
  transform: "translateY(-50%)",
  color: "#fff",
  zIndex: 2,
  maxWidth: "600px",
};

const title = {
  fontSize: "42px",
  fontWeight: "800",
  lineHeight: "1.2",
};

const highlight = {
  color: "#22c55e",
  fontWeight: "800",
};

const subtitle = {
  marginTop: "12px",
  color: "#e2e8f0",
  fontSize: "15px",
  lineHeight: "1.6",
};

const btnRow = {
  marginTop: "22px",
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const primaryBtn = {
  background:
    "linear-gradient(90deg, #22c55e, #2563eb)",
  color: "#fff",
  padding: "14px 24px",
  borderRadius: "999px",
  border: "none",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "0.3s",
};

const secondaryBtn = {
  background: "transparent",
  color: "#fff",
  border:
    "1px solid rgba(255,255,255,0.4)",
  padding: "14px 24px",
  borderRadius: "999px",
  fontWeight: "500",
  fontSize: "14px",
  cursor: "pointer",
  transition: "0.3s",
};

const badge = {
  position: "absolute",
  right: "25px",
  bottom: "25px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 16px",
  borderRadius: "14px",
  background: "rgba(0,0,0,0.4)",
  backdropFilter: "blur(6px)",
  border:
    "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
};

const badgeNumber = {
  fontWeight: "700",
  fontSize: "18px",
};

const badgeText = {
  fontSize: "12px",
  opacity: 0.8,
};

export default Hero;
