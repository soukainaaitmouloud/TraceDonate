import React, {
  useEffect,
  useState,
} from "react";

import {
  FaBell,
  FaEnvelope,
  FaCommentDots,
  FaHandHoldingHeart,
  FaCheckCircle,
} from "react-icons/fa";

function NotificationSettings({
  darkMode,
}) {
  const [
    emailNotif,
    setEmailNotif,
  ] = useState(true);

  const [
    messageNotif,
    setMessageNotif,
  ] = useState(true);

  const [
    donationNotif,
    setDonationNotif,
  ] = useState(false);

  const [saved, setSaved] =
    useState(false);

  /* LOAD SAVED SETTINGS */

  useEffect(() => {
    const savedSettings =
      JSON.parse(
        localStorage.getItem(
          "notificationSettings"
        )
      );

    if (savedSettings) {
      setEmailNotif(
        savedSettings.emailNotif
      );

      setMessageNotif(
        savedSettings.messageNotif
      );

      setDonationNotif(
        savedSettings.donationNotif
      );
    }
  }, []);

  /* SAVE SETTINGS */

  const handleSave = () => {
    localStorage.setItem(
      "notificationSettings",

      JSON.stringify({
        emailNotif,
        messageNotif,
        donationNotif,
      })
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div style={card(darkMode)}>
      {/* BACKGROUND GLOW */}

      <div style={glowOne} />

      <div style={glowTwo} />

      {/* HEADER */}

      <div style={header}>
        <div style={headerIcon}>
          <FaBell />
        </div>

        <div>
          <h2
            style={title(
              darkMode
            )}
          >
            Notification Settings
          </h2>

          <p style={subtitle}>
            Control how you receive
            updates and alerts
          </p>
        </div>
      </div>

      {/* EMAIL */}

      <div
        style={settingCard(
          darkMode
        )}
      >
        <div style={left}>
          <div style={iconBox}>
            <FaEnvelope />
          </div>

          <div>
            <div
              style={settingTitle(
                darkMode
              )}
            >
              Email Notifications
            </div>

            <div
              style={
                settingDescription
              }
            >
              Receive updates by
              email
            </div>
          </div>
        </div>

        <div
          style={toggle(
            emailNotif
          )}
          onClick={() =>
            setEmailNotif(
              !emailNotif
            )
          }
        >
          <div
            style={toggleCircle(
              emailNotif
            )}
          />
        </div>
      </div>

      {/* MESSAGE */}

      <div
        style={settingCard(
          darkMode
        )}
      >
        <div style={left}>
          <div style={iconBox}>
            <FaCommentDots />
          </div>

          <div>
            <div
              style={settingTitle(
                darkMode
              )}
            >
              Message Notifications
            </div>

            <div
              style={
                settingDescription
              }
            >
              Receive direct message
              alerts
            </div>
          </div>
        </div>

        <div
          style={toggle(
            messageNotif
          )}
          onClick={() =>
            setMessageNotif(
              !messageNotif
            )
          }
        >
          <div
            style={toggleCircle(
              messageNotif
            )}
          />
        </div>
      </div>

      {/* DONATION */}

      <div
        style={settingCard(
          darkMode
        )}
      >
        <div style={left}>
          <div style={iconBox}>
            <FaHandHoldingHeart />
          </div>

          <div>
            <div
              style={settingTitle(
                darkMode
              )}
            >
              Donation Updates
            </div>

            <div
              style={
                settingDescription
              }
            >
              Get donation activity
              notifications
            </div>
          </div>
        </div>

        <div
          style={toggle(
            donationNotif
          )}
          onClick={() =>
            setDonationNotif(
              !donationNotif
            )
          }
        >
          <div
            style={toggleCircle(
              donationNotif
            )}
          />
        </div>
      </div>

      {/* SAVE BUTTON */}

      <button
        style={
          saved
            ? savedButton
            : saveButton
        }
        onClick={handleSave}
      >
        <FaCheckCircle />

        {saved
          ? "Settings Saved!"
          : "Save Preferences"}
      </button>
    </div>
  );
}

export default NotificationSettings;

/* ================= STYLES ================= */

const card = (darkMode) => ({
  position: "relative",

  overflow: "hidden",

  background: darkMode
    ? "rgba(15,23,42,0.92)"
    : "rgba(255,255,255,0.92)",

  backdropFilter: "blur(18px)",

  borderRadius: "30px",

  padding: "28px",

  display: "flex",

  flexDirection: "column",

  gap: "20px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid rgba(255,255,255,0.9)",

  boxShadow: darkMode
    ? "0 20px 45px rgba(0,0,0,0.35)"
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
    "rgba(34,197,94,0.10)",

  filter: "blur(20px)",
};

const glowTwo = {
  position: "absolute",

  bottom: "-50px",

  left: "-50px",

  width: "160px",

  height: "160px",

  borderRadius: "50%",

  background:
    "rgba(59,130,246,0.08)",

  filter: "blur(20px)",
};

const header = {
  display: "flex",

  alignItems: "center",

  gap: "16px",

  marginBottom: "8px",

  position: "relative",

  zIndex: 2,
};

const headerIcon = {
  width: "65px",

  height: "65px",

  borderRadius: "22px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#ffffff",

  fontSize: "24px",

  boxShadow:
    "0 16px 30px rgba(34,197,94,0.35)",
};

const title = (darkMode) => ({
  margin: 0,

  fontSize: "28px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const subtitle = {
  marginTop: "6px",

  color: "#94a3b8",

  fontSize: "14px",

  fontWeight: "600",
};

const settingCard = (
  darkMode
) => ({
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "18px",

  borderRadius: "22px",

  background: darkMode
    ? "rgba(255,255,255,0.03)"
    : "#f8fafc",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid #eef2f7",
});

const left = {
  display: "flex",

  alignItems: "center",

  gap: "14px",
};

const iconBox = {
  width: "54px",

  height: "54px",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#dcfce7,#bbf7d0)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#16a34a",

  fontSize: "20px",
};

const settingTitle = (
  darkMode
) => ({
  fontSize: "15px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const settingDescription = {
  marginTop: "5px",

  color: "#94a3b8",

  fontSize: "12px",

  fontWeight: "600",
};

const toggle = (active) => ({
  width: "58px",

  height: "32px",

  borderRadius: "999px",

  background: active
    ? "linear-gradient(135deg,#22c55e,#16a34a)"
    : "#cbd5e1",

  display: "flex",

  alignItems: "center",

  padding: "4px",

  cursor: "pointer",

  transition: "0.25s",

  justifyContent: active
    ? "flex-end"
    : "flex-start",

  boxShadow: active
    ? "0 8px 18px rgba(34,197,94,0.35)"
    : "none",
});

const toggleCircle = () => ({
  width: "24px",

  height: "24px",

  borderRadius: "50%",

  background: "#ffffff",

  boxShadow:
    "0 2px 6px rgba(0,0,0,0.15)",
});

const saveButton = {
  marginTop: "10px",

  border: "none",

  borderRadius: "20px",

  padding: "18px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  fontWeight: "800",

  fontSize: "15px",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "10px",

  boxShadow:
    "0 18px 35px rgba(34,197,94,0.35)",
};

const savedButton = {
  ...saveButton,

  background:
    "linear-gradient(135deg,#15803d,#166534)",
};