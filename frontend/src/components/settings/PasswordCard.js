import React, {
  useState,
} from "react";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

function PasswordCard({
  darkMode,
}) {
  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [
    showConfirm,
    setShowConfirm,
  ] = useState(false);

  const [saved, setSaved] =
    useState(false);

  const handleSave = () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    if (
      newPassword.length < 6
    ) {
      alert(
        "Password must be at least 6 characters"
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "New passwords do not match!"
      );

      return;
    }

    localStorage.setItem(
      "userPassword",
      newPassword
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const getStrength = () => {
    if (
      newPassword.length >= 10
    )
      return {
        text: "Strong",
        width: "100%",
        color: "#22c55e",
      };

    if (
      newPassword.length >= 6
    )
      return {
        text: "Medium",
        width: "65%",
        color: "#f59e0b",
      };

    if (
      newPassword.length > 0
    )
      return {
        text: "Weak",
        width: "35%",
        color: "#ef4444",
      };

    return {
      text: "",
      width: "0%",
      color: "#e5e7eb",
    };
  };

  const strength =
    getStrength();

  return (
    <div style={card(darkMode)}>
      {/* GLOW EFFECT */}

      <div style={glowOne} />

      <div style={glowTwo} />

      {/* HEADER */}

      <div style={header}>
        <div style={lockIcon}>
          <FaLock />
        </div>

        <div>
          <h2
            style={title(
              darkMode
            )}
          >
            Change Password
          </h2>

          <p style={subtitle}>
            Keep your account
            safe and secure
          </p>
        </div>
      </div>

      {/* CURRENT PASSWORD */}

      <div style={row}>
        <label
          style={label(
            darkMode
          )}
        >
          Current Password
        </label>

        <div
          style={inputWrapper(
            darkMode
          )}
        >
          <input
            type={
              showCurrent
                ? "text"
                : "password"
            }
            value={
              currentPassword
            }
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            style={input(
              darkMode
            )}
            placeholder="Enter current password"
          />

          <button
            style={
              eyeButton
            }
            onClick={() =>
              setShowCurrent(
                !showCurrent
              )
            }
          >
            {showCurrent ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>
      </div>

      {/* NEW PASSWORD */}

      <div style={row}>
        <label
          style={label(
            darkMode
          )}
        >
          New Password
        </label>

        <div
          style={inputWrapper(
            darkMode
          )}
        >
          <input
            type={
              showNew
                ? "text"
                : "password"
            }
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            style={input(
              darkMode
            )}
            placeholder="Enter new password"
          />

          <button
            style={
              eyeButton
            }
            onClick={() =>
              setShowNew(
                !showNew
              )
            }
          >
            {showNew ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {/* PASSWORD STRENGTH */}

        <div
          style={
            strengthContainer
          }
        >
          <div
            style={
              strengthBarBg
            }
          >
            <div
              style={{
                ...strengthBar,
                width:
                  strength.width,
                background:
                  strength.color,
              }}
            />
          </div>

          <span
            style={{
              ...strengthText,
              color:
                strength.color,
            }}
          >
            {strength.text}
          </span>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}

      <div style={row}>
        <label
          style={label(
            darkMode
          )}
        >
          Confirm New Password
        </label>

        <div
          style={inputWrapper(
            darkMode
          )}
        >
          <input
            type={
              showConfirm
                ? "text"
                : "password"
            }
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            style={input(
              darkMode
            )}
            placeholder="Confirm new password"
          />

          <button
            style={
              eyeButton
            }
            onClick={() =>
              setShowConfirm(
                !showConfirm
              )
            }
          >
            {showConfirm ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>
      </div>

      {/* SECURITY BOX */}

      <div
        style={securityBox(
          darkMode
        )}
      >
        <div
          style={
            securityIcon
          }
        >
          <FaShieldAlt />
        </div>

        <div>
          <div
            style={securityTitle(
              darkMode
            )}
          >
            Security Tips
          </div>

          <div
            style={
              securityText
            }
          >
            Use a strong password
            with numbers, symbols
            and uppercase letters.
          </div>
        </div>
      </div>

      {/* BUTTON */}

      <button
        style={
          saved
            ? savedButton
            : button
        }
        onClick={handleSave}
      >
        <FaCheckCircle />

        {saved
          ? "Password Updated!"
          : "Save Changes"}
      </button>
    </div>
  );
}

export default PasswordCard;

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
    : "1px solid rgba(255,255,255,0.8)",

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

  marginBottom: "10px",

  position: "relative",

  zIndex: 2,
};

const lockIcon = {
  width: "64px",

  height: "64px",

  borderRadius: "22px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "24px",

  boxShadow:
    "0 15px 35px rgba(34,197,94,0.35)",
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

  fontSize: "14px",

  color: "#94a3b8",

  fontWeight: "600",
};

const row = {
  display: "flex",

  flexDirection: "column",

  gap: "8px",

  position: "relative",

  zIndex: 2,
};

const label = (darkMode) => ({
  fontSize: "14px",

  fontWeight: "700",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const inputWrapper = (
  darkMode
) => ({
  display: "flex",

  alignItems: "center",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",

  background: darkMode
    ? "#020617"
    : "#f8fafc",

  overflow: "hidden",
});

const input = (darkMode) => ({
  flex: 1,

  padding: "16px 18px",

  border: "none",

  background: "transparent",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  outline: "none",

  fontSize: "14px",

  fontWeight: "600",
});

const eyeButton = {
  border: "none",

  background: "transparent",

  width: "55px",

  cursor: "pointer",

  color: "#94a3b8",

  fontSize: "16px",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",
};

const strengthContainer = {
  marginTop: "8px",
};

const strengthBarBg = {
  width: "100%",

  height: "8px",

  borderRadius: "999px",

  background: "#e5e7eb",

  overflow: "hidden",
};

const strengthBar = {
  height: "100%",

  borderRadius: "999px",

  transition: "0.3s",
};

const strengthText = {
  display: "block",

  marginTop: "8px",

  fontSize: "13px",

  fontWeight: "700",
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

const button = {
  marginTop: "12px",

  padding: "18px",

  borderRadius: "20px",

  border: "none",

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

const savedButton = {
  ...button,

  background:
    "linear-gradient(135deg,#15803d,#166534)",
};