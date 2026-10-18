import React, {
  useState,
} from "react";

import {
  FaTrashAlt,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";

function DeleteAccount({
  darkMode,
}) {
  const [
    confirmDelete,
    setConfirmDelete,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleDelete =
    () => {
      if (!confirmDelete) {
        alert(
          "Please confirm account deletion first."
        );

        return;
      }

      const confirmAction =
        window.confirm(
          "Are you sure you want to permanently delete your account?"
        );

      if (!confirmAction)
        return;

      setLoading(true);

      setTimeout(() => {
        localStorage.removeItem(
          "user"
        );

        alert(
          "Account deleted successfully."
        );

        window.location.href =
          "/login";
      }, 2000);
    };

  return (
    <div style={card(darkMode)}>
      {/* GLOW EFFECT */}

      <div style={glowOne} />

      <div style={glowTwo} />

      {/* HEADER */}

      <div style={header}>
        <div style={dangerIcon}>
          <FaTrashAlt />
        </div>

        <div>
          <h2
            style={title(
              darkMode
            )}
          >
            Delete Account
          </h2>

          <p style={subtitle}>
            This action cannot be
            undone
          </p>
        </div>
      </div>

      {/* WARNING BOX */}

      <div
        style={warningBox(
          darkMode
        )}
      >
        <FaExclamationTriangle
          style={warningIcon}
        />

        <div>
          <div
            style={warningTitle}
          >
            Warning
          </div>

          <div
            style={warningText}
          >
            Deleting your account
            will permanently remove
            your profile, settings,
            donations and all saved
            data.
          </div>
        </div>
      </div>

      {/* SECURITY INFO */}

      <div
        style={securityCard(
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
            Before you continue
          </div>

          <div
            style={
              securityText
            }
          >
            Make sure you have saved
            any important information
            linked to your account.
          </div>
        </div>
      </div>

      {/* CHECKBOX */}

      <label
        style={checkboxRow(
          darkMode
        )}
      >
        <input
          type="checkbox"
          checked={
            confirmDelete
          }
          onChange={() =>
            setConfirmDelete(
              !confirmDelete
            )
          }
          style={checkbox}
        />

        <span>
          I understand that this
          action is permanent and
          cannot be reversed.
        </span>
      </label>

      {/* BUTTON */}

      <button
        style={
          loading
            ? loadingButton
            : deleteButton
        }
        onClick={handleDelete}
      >
        <FaTrashAlt />

        {loading
          ? "Deleting Account..."
          : "Delete Account"}
      </button>
    </div>
  );
}

export default DeleteAccount;

/* ================= STYLES ================= */

const card = (darkMode) => ({
  position: "relative",

  overflow: "hidden",

  background: darkMode
    ? "rgba(30,10,10,0.95)"
    : "rgba(255,245,245,0.95)",

  borderRadius: "32px",

  padding: "30px",

  display: "flex",

  flexDirection: "column",

  gap: "22px",

  border: darkMode
    ? "1px solid rgba(239,68,68,0.15)"
    : "1px solid rgba(239,68,68,0.10)",

  boxShadow:
    "0 20px 50px rgba(239,68,68,0.15)",
});

const glowOne = {
  position: "absolute",

  top: "-70px",

  right: "-70px",

  width: "200px",

  height: "200px",

  borderRadius: "50%",

  background:
    "rgba(239,68,68,0.12)",

  filter: "blur(20px)",
};

const glowTwo = {
  position: "absolute",

  bottom: "-60px",

  left: "-60px",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(220,38,38,0.08)",

  filter: "blur(20px)",
};

const header = {
  display: "flex",

  alignItems: "center",

  gap: "18px",

  position: "relative",

  zIndex: 2,
};

const dangerIcon = {
  width: "72px",

  height: "72px",

  borderRadius: "24px",

  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "28px",

  boxShadow:
    "0 18px 35px rgba(239,68,68,0.35)",
};

const title = (darkMode) => ({
  margin: 0,

  fontSize: "30px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#7f1d1d",
});

const subtitle = {
  marginTop: "6px",

  fontSize: "14px",

  color: "#fca5a5",

  fontWeight: "600",
};

const warningBox = (
  darkMode
) => ({
  display: "flex",

  alignItems: "flex-start",

  gap: "14px",

  padding: "20px",

  borderRadius: "22px",

  background: darkMode
    ? "rgba(239,68,68,0.10)"
    : "#fee2e2",

  border:
    "1px solid rgba(239,68,68,0.15)",
});

const warningIcon = {
  fontSize: "22px",

  color: "#ef4444",

  marginTop: "2px",
};

const warningTitle = {
  fontSize: "16px",

  fontWeight: "800",

  color: "#ef4444",
};

const warningText = {
  marginTop: "6px",

  color: "#f87171",

  fontSize: "13px",

  lineHeight: "22px",

  fontWeight: "600",
};

const securityCard = (
  darkMode
) => ({
  display: "flex",

  alignItems: "center",

  gap: "14px",

  padding: "18px",

  borderRadius: "22px",

  background: darkMode
    ? "rgba(255,255,255,0.03)"
    : "#ffffff",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid #f3f4f6",
});

const securityIcon = {
  width: "56px",

  height: "56px",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#fca5a5,#ef4444)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#ffffff",

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

  color: "#94a3b8",

  fontSize: "12px",

  lineHeight: "20px",

  fontWeight: "600",
};

const checkboxRow = (
  darkMode
) => ({
  display: "flex",

  alignItems: "flex-start",

  gap: "12px",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  fontSize: "14px",

  fontWeight: "600",

  lineHeight: "22px",

  cursor: "pointer",
});

const checkbox = {
  width: "18px",

  height: "18px",

  accentColor: "#ef4444",

  marginTop: "2px",

  cursor: "pointer",
};

const deleteButton = {
  marginTop: "10px",

  border: "none",

  borderRadius: "22px",

  padding: "18px",

  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",

  color: "#ffffff",

  fontWeight: "800",

  fontSize: "16px",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "12px",

  boxShadow:
    "0 18px 35px rgba(239,68,68,0.35)",
};

const loadingButton = {
  ...deleteButton,

  opacity: 0.8,

  cursor: "wait",
};