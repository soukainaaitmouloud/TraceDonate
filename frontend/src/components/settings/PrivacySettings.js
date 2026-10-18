import React, {
  useState,
  useEffect,
} from "react";

import {
  FaShieldAlt,
  FaGlobe,
  FaSearch,
  FaDatabase,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

function PrivacySettings({
  darkMode,
}) {
  /* ================= LOAD SETTINGS ================= */

  const savedPrivacy =
    JSON.parse(
      localStorage.getItem(
        "privacySettings"
      )
    ) || {};

  const [
    profileVisible,
    setProfileVisible,
  ] = useState(
    savedPrivacy.profileVisible ??
      true
  );

  const [
    searchEngineIndexing,
    setSearchEngineIndexing,
  ] = useState(
    savedPrivacy.searchEngineIndexing ??
      false
  );

  const [
    dataSharing,
    setDataSharing,
  ] = useState(
    savedPrivacy.dataSharing ??
      false
  );

  const [saved, setSaved] =
    useState(false);

  /* ================= SAVE TO LOCAL STORAGE ================= */

  useEffect(() => {
    localStorage.setItem(
      "privacySettings",
      JSON.stringify({
        profileVisible,
        searchEngineIndexing,
        dataSharing,
      })
    );
  }, [
    profileVisible,
    searchEngineIndexing,
    dataSharing,
  ]);

  /* ================= SAVE BUTTON ================= */

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  return (
    <div style={card(darkMode)}>
      {/* BACKGROUND GLOW */}

      <div style={glowOne} />

      <div style={glowTwo} />

      {/* HEADER */}

      <div style={header}>
        <div style={shieldIcon}>
          <FaShieldAlt />
        </div>

        <div>
          <h2
            style={title(
              darkMode
            )}
          >
            Privacy Settings
          </h2>

          <p style={subtitle}>
            Control your privacy
            and account visibility
          </p>
        </div>
      </div>

      {/* SETTINGS */}

      <div
        style={settingCard(
          darkMode
        )}
      >
        <div style={settingLeft}>
          <div style={iconBox}>
            <FaGlobe />
          </div>

          <div>
            <div
              style={settingTitle(
                darkMode
              )}
            >
              Public Profile
            </div>

            <div
              style={
                settingDesc
              }
            >
              Allow others to
              view your profile
            </div>
          </div>
        </div>

        <ToggleSwitch
          enabled={
            profileVisible
          }
          onChange={() =>
            setProfileVisible(
              !profileVisible
            )
          }
        />
      </div>

      <div
        style={settingCard(
          darkMode
        )}
      >
        <div style={settingLeft}>
          <div style={iconBox}>
            <FaSearch />
          </div>

          <div>
            <div
              style={settingTitle(
                darkMode
              )}
            >
              Search Engine
              Indexing
            </div>

            <div
              style={
                settingDesc
              }
            >
              Allow search engines
              to index your profile
            </div>
          </div>
        </div>

        <ToggleSwitch
          enabled={
            searchEngineIndexing
          }
          onChange={() =>
            setSearchEngineIndexing(
              !searchEngineIndexing
            )
          }
        />
      </div>

      <div
        style={settingCard(
          darkMode
        )}
      >
        <div style={settingLeft}>
          <div style={iconBox}>
            <FaDatabase />
          </div>

          <div>
            <div
              style={settingTitle(
                darkMode
              )}
            >
              Data Sharing
            </div>

            <div
              style={
                settingDesc
              }
            >
              Share anonymous
              analytics data
            </div>
          </div>
        </div>

        <ToggleSwitch
          enabled={
            dataSharing
          }
          onChange={() =>
            setDataSharing(
              !dataSharing
            )
          }
        />
      </div>

      {/* SECURITY STATUS */}

      <div
        style={securityBox(
          darkMode
        )}
      >
        <div style={securityIcon}>
          <FaLock />
        </div>

        <div>
          <div
            style={securityTitle(
              darkMode
            )}
          >
            Security Status
          </div>

          <div
            style={securityText}
          >
            Your account is
            protected with modern
            privacy standards.
          </div>
        </div>
      </div>

      {/* SAVE BUTTON */}

      <button
        style={
          saved
            ? savedBtn
            : saveBtn
        }
        onClick={handleSave}
      >
        <FaCheckCircle />

        {saved
          ? "Settings Saved!"
          : "Save Privacy Settings"}
      </button>
    </div>
  );
}

export default PrivacySettings;

/* ================= TOGGLE ================= */

function ToggleSwitch({
  enabled,
  onChange,
}) {
  return (
    <div
      onClick={onChange}
      style={{
        ...toggleContainer,
        background: enabled
          ? "linear-gradient(135deg,#22c55e,#16a34a)"
          : "#cbd5e1",
      }}
    >
      <div
        style={{
          ...toggleCircle,
          transform: enabled
            ? "translateX(24px)"
            : "translateX(0px)",
        }}
      />
    </div>
  );
}

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

  gap: "18px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid rgba(255,255,255,0.8)",

  boxShadow: darkMode
    ? "0 20px 45px rgba(0,0,0,0.35)"
    : "0 20px 45px rgba(15,23,42,0.08)",
});

const glowOne = {
  position: "absolute",

  top: "-50px",

  right: "-50px",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.12)",

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
    "rgba(59,130,246,0.10)",

  filter: "blur(20px)",
};

const header = {
  display: "flex",

  alignItems: "center",

  gap: "16px",

  marginBottom: "10px",

  position: "relative",

  zIndex: 2,
};

const shieldIcon = {
  width: "62px",

  height: "62px",

  borderRadius: "20px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "24px",

  boxShadow:
    "0 14px 30px rgba(34,197,94,0.35)",
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
  marginTop: "8px",

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
    ? "#111827"
    : "#f8fafc",

  position: "relative",

  zIndex: 2,
});

const settingLeft = {
  display: "flex",

  alignItems: "center",

  gap: "14px",
};

const iconBox = {
  width: "50px",

  height: "50px",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#dcfce7,#bbf7d0)",

  color: "#16a34a",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "18px",

  flexShrink: 0,
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

const settingDesc = {
  marginTop: "4px",

  fontSize: "12px",

  color: "#94a3b8",

  fontWeight: "600",
};

const toggleContainer = {
  width: "54px",

  height: "30px",

  borderRadius: "999px",

  display: "flex",

  alignItems: "center",

  padding: "4px",

  cursor: "pointer",

  transition: "0.25s",
};

const toggleCircle = {
  width: "22px",

  height: "22px",

  borderRadius: "50%",

  background: "#ffffff",

  transition: "0.25s",
};

const securityBox = (
  darkMode
) => ({
  display: "flex",

  alignItems: "center",

  gap: "14px",

  marginTop: "10px",

  padding: "18px",

  borderRadius: "22px",

  background: darkMode
    ? "rgba(34,197,94,0.12)"
    : "#ecfdf5",

  border:
    "1px solid rgba(34,197,94,0.18)",
});

const securityIcon = {
  width: "54px",

  height: "54px",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "20px",
};

const securityTitle = (
  darkMode
) => ({
  fontSize: "15px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const securityText = {
  marginTop: "4px",

  fontSize: "12px",

  color: "#94a3b8",

  fontWeight: "600",

  lineHeight: "20px",
};

const saveBtn = {
  marginTop: "12px",

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
    "0 16px 30px rgba(34,197,94,0.35)",
};

const savedBtn = {
  ...saveBtn,

  background:
    "linear-gradient(135deg,#15803d,#166534)",
};