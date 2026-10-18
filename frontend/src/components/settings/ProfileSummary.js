import React from "react";

import {
  FaHandHoldingHeart,
  FaComments,
  FaUserCheck,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaEdit,
} from "react-icons/fa";

function ProfileSummary({
  darkMode,
}) {
  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const userName =
    user.fullName ||
    user.name ||
    "John Doe";

  const userEmail =
    user.email ||
    "john@email.com";

  const userPhone =
    user.phone ||
    "+1 555 123 4567";

  const userLocation =
    user.location ||
    "New York, USA";

  const userAvatar =
    user.avatar ||
    "/images/oldman.jpg";

  return (
    <div style={card(darkMode)}>
      {/* GLOW */}

      <div style={glowOne} />

      <div style={glowTwo} />

      {/* PROFILE */}

      <div style={topSection}>
        <div style={avatarWrapper}>
          <img
            src={userAvatar}
            alt="Profile"
            style={avatar}
          />

          <button
            style={cameraBtn}
          >
            <FaCamera size={14} />
          </button>
        </div>

        <h2 style={name(darkMode)}>
          {userName}
        </h2>

        <p style={email}>
          {userEmail}
        </p>

        <button
          style={editBtn}
        >
          <FaEdit />

          Edit Profile
        </button>
      </div>

      {/* USER INFO */}

      <div style={infoWrapper}>
        <div
          style={infoCard(
            darkMode
          )}
        >
          <div style={infoIcon}>
            <FaEnvelope />
          </div>

          <div>
            <div
              style={infoLabel}
            >
              Email
            </div>

            <div
              style={infoValue(
                darkMode
              )}
            >
              {userEmail}
            </div>
          </div>
        </div>

        <div
          style={infoCard(
            darkMode
          )}
        >
          <div style={infoIcon}>
            <FaPhone />
          </div>

          <div>
            <div
              style={infoLabel}
            >
              Phone
            </div>

            <div
              style={infoValue(
                darkMode
              )}
            >
              {userPhone}
            </div>
          </div>
        </div>

        <div
          style={infoCard(
            darkMode
          )}
        >
          <div style={infoIcon}>
            <FaMapMarkerAlt />
          </div>

          <div>
            <div
              style={infoLabel}
            >
              Location
            </div>

            <div
              style={infoValue(
                darkMode
              )}
            >
              {userLocation}
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div style={statsRow}>
        <div style={statBox}>
          <div
            style={
              statIconWrapper
            }
          >
            <FaHandHoldingHeart
              style={icon}
            />
          </div>

          <h3 style={statNumber}>
            24
          </h3>

          <p style={statLabel}>
            Donations
          </p>
        </div>

        <div style={statBox}>
          <div
            style={
              statIconWrapper
            }
          >
            <FaComments
              style={icon}
            />
          </div>

          <h3 style={statNumber}>
            18
          </h3>

          <p style={statLabel}>
            Messages
          </p>
        </div>

        <div style={statBox}>
          <div
            style={
              statIconWrapper
            }
          >
            <FaUserCheck
              style={icon}
            />
          </div>

          <h3 style={statNumber}>
            12
          </h3>

          <p style={statLabel}>
            Impacted
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSummary;

/* ================= STYLES ================= */

const card = (darkMode) => ({
  position: "relative",

  overflow: "hidden",

  background: darkMode
    ? "rgba(15,23,42,0.92)"
    : "rgba(255,255,255,0.9)",

  backdropFilter: "blur(18px)",

  borderRadius: "32px",

  padding: "32px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(255,255,255,0.8)",

  boxShadow: darkMode
    ? "0 25px 50px rgba(0,0,0,0.35)"
    : "0 20px 45px rgba(15,23,42,0.08)",
});

const glowOne = {
  position: "absolute",

  top: "-60px",

  right: "-60px",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.15)",

  filter: "blur(20px)",
};

const glowTwo = {
  position: "absolute",

  bottom: "-50px",

  left: "-50px",

  width: "150px",

  height: "150px",

  borderRadius: "50%",

  background:
    "rgba(59,130,246,0.12)",

  filter: "blur(18px)",
};

const topSection = {
  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  textAlign: "center",

  position: "relative",

  zIndex: 2,
};

const avatarWrapper = {
  position: "relative",
};

const avatar = {
  width: "120px",

  height: "120px",

  borderRadius: "50%",

  objectFit: "cover",

  border: "5px solid #22c55e",

  boxShadow:
    "0 18px 35px rgba(34,197,94,0.35)",
};

const cameraBtn = {
  position: "absolute",

  right: "4px",

  bottom: "4px",

  width: "40px",

  height: "40px",

  borderRadius: "50%",

  border: "none",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  boxShadow:
    "0 10px 20px rgba(34,197,94,0.35)",
};

const name = (darkMode) => ({
  marginTop: "20px",

  marginBottom: "6px",

  fontSize: "28px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const email = {
  margin: 0,

  color: "#94a3b8",

  fontSize: "14px",

  fontWeight: "600",
};

const editBtn = {
  marginTop: "18px",

  border: "none",

  padding: "14px 22px",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  fontWeight: "800",

  fontSize: "14px",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "10px",

  boxShadow:
    "0 14px 30px rgba(34,197,94,0.35)",
};

const infoWrapper = {
  marginTop: "28px",

  display: "flex",

  flexDirection: "column",

  gap: "14px",
};

const infoCard = (
  darkMode
) => ({
  display: "flex",

  alignItems: "center",

  gap: "14px",

  padding: "16px 18px",

  borderRadius: "20px",

  background: darkMode
    ? "#111827"
    : "#f8fafc",
});

const infoIcon = {
  width: "46px",

  height: "46px",

  borderRadius: "14px",

  background:
    "linear-gradient(135deg,#dcfce7,#bbf7d0)",

  color: "#16a34a",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  flexShrink: 0,
};

const infoLabel = {
  fontSize: "12px",

  color: "#94a3b8",

  fontWeight: "700",

  marginBottom: "4px",
};

const infoValue = (
  darkMode
) => ({
  fontSize: "14px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const statsRow = {
  display: "grid",

  gridTemplateColumns:
    "repeat(3,1fr)",

  gap: "16px",

  marginTop: "30px",
};

const statBox = {
  background:
    "linear-gradient(135deg,#f8fafc,#ffffff)",

  borderRadius: "24px",

  padding: "22px 18px",

  textAlign: "center",

  boxShadow:
    "0 12px 25px rgba(15,23,42,0.06)",
};

const statIconWrapper = {
  width: "58px",

  height: "58px",

  margin: "0 auto 14px",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#dcfce7,#bbf7d0)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",
};

const icon = {
  fontSize: "24px",

  color: "#16a34a",
};

const statNumber = {
  margin: 0,

  fontSize: "28px",

  fontWeight: "900",

  color: "#111827",
};

const statLabel = {
  marginTop: "8px",

  fontSize: "13px",

  color: "#64748b",

  fontWeight: "700",
};