 // src/components/Topbar.js

import React, {
  useEffect,
  useState,
} from "react";

import {
  FaSearch,
  FaBars,
  FaBell,
  FaGlobe,
  FaChevronDown,
} from "react-icons/fa";

import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

function Topbar({
  onTogglePanel,
  darkMode,
  setDarkMode,
}) {

  const history = useHistory();

  const { t, i18n } =
    useTranslation();

  const [user, setUser] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [
    showLanguages,
    setShowLanguages,
  ] = useState(false);

  const languages = [
    {
      code: "en",
      label: "English",
      flag: "🇺🇸",
    },

    {
      code: "fr",
      label: "Français",
      flag: "🇫🇷",
    },

    {
      code: "ar",
      label: "العربية",
      flag: "🇸🇦",
    },

    {
      code: "zh",
      label: "中文",
      flag: "🇨🇳",
    },
  ];

  /* ================= LOAD USER ================= */

  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (storedUser) {

        setUser(
          JSON.parse(
            storedUser
          )
        );

      }

    } catch (error) {

      console.error(
        "User parse error:",
        error
      );

    }

  }, []);

  /* ================= SEARCH ================= */

  const handleSearch = (
    e
  ) => {

    e.preventDefault();

    if (!search.trim())
      return;

    history.push(
      `/browse?search=${encodeURIComponent(
        search
      )}`
    );

  };

  /* ================= AVATAR ================= */

  const handleAvatarClick =
    () => {

      history.push(
        "/settings"
      );

    };

  /* ================= LANGUAGE ================= */

  const changeLanguage = (
    lang
  ) => {

    i18n.changeLanguage(
      lang
    );

    localStorage.setItem(
      "language",
      lang
    );

    setShowLanguages(
      false
    );

  };

  return (

    <div style={topbar(darkMode)}>

      {/* ================= LEFT ================= */}

      <div style={leftSection}>

        <h2
          style={greeting(
            darkMode
          )}
        >
          {t("hello")},{" "}

          <span style={name}>
            {user?.name ||
              t("guest")}
          </span>{" "}
          👋
        </h2>

        <p
          style={subText(
            darkMode
          )}
        >
          {t(
            "welcomeBack"
          )}
        </p>

      </div>

      {/* ================= SEARCH ================= */}

      <form
        onSubmit={
          handleSearch
        }
        style={searchWrapper(
          darkMode
        )}
      >

        <FaSearch
          style={searchIcon}
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder={t(
            "searchPlaceholder"
          )}
          style={searchInput(
            darkMode
          )}
        />

        {search && (

          <button
            type="submit"
            style={
              searchBtn
            }
          >
            {t("search")}
          </button>

        )}

      </form>

      {/* ================= RIGHT ================= */}

      <div style={rightSection}>

        {/* ================= LANGUAGE ================= */}

        <div
          style={
            languageWrapper
          }
        >

          <button
            type="button"
            style={languageBtn(
              darkMode
            )}
            onClick={() =>
              setShowLanguages(
                !showLanguages
              )
            }
          >

            <FaGlobe />

            <span>
              {
                languages.find(
                  (
                    l
                  ) =>
                    l.code ===
                    i18n.language
                )?.flag
              }
            </span>

            <FaChevronDown
              size={10}
            />

          </button>

          {showLanguages && (

            <div
              style={languageDropdown(
                darkMode
              )}
            >

              {languages.map(
                (
                  lang
                ) => (

                  <div
                    key={
                      lang.code
                    }
                    style={languageItem(
                      darkMode,
                      i18n.language ===
                        lang.code
                    )}
                    onClick={() =>
                      changeLanguage(
                        lang.code
                      )
                    }
                  >

                    <span
                      style={{
                        minWidth:
                          "24px",

                        textAlign:
                          "center",
                      }}
                    >
                      {
                        lang.flag
                      }
                    </span>

                    <span>
                      {
                        lang.label
                      }
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* ================= THEME ================= */}

        <button
          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }
          style={themeBtn(
            darkMode
          )}
          title={t("theme")}
        >
          {darkMode
            ? "🌙"
            : "☀️"}
        </button>

        {/* ================= NOTIFICATIONS ================= */}

        <button
          style={notifyBtn(
            darkMode
          )}
          onClick={() =>
            history.push(
              "/messages"
            )
          }
          title={t(
            "messages"
          )}
        >

          <FaBell />

          <span style={notifyDot} />

        </button>

        {/* ================= MENU BUTTON ================= */}

        <button
          type="button"
          onClick={() => {

            if (
              onTogglePanel
            ) {

              onTogglePanel();

            }

          }}
          style={menuBtn(
            darkMode
          )}
          title="Open Panel"
        >

          <FaBars />

        </button>

        {/* ================= AVATAR ================= */}

        <div
          style={avatar}
          onClick={
            handleAvatarClick
          }
          title={t(
            "settings"
          )}
        >

          {user?.name
            ?.charAt(0)
            ?.toUpperCase() ||
            "G"}

        </div>

      </div>

    </div>

  );

}

export default Topbar;

/* ================= STYLES ================= */

const topbar = (darkMode) => ({
  position: "relative",

  zIndex: 20,

  width: "100%",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",

  gap: "18px",

  padding: "18px 22px",

  borderRadius: "26px",

  background: darkMode
    ? "rgba(15,23,42,0.82)"
    : "rgba(255,255,255,0.82)",

  backdropFilter:
    "blur(18px)",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid rgba(255,255,255,0.9)",

  boxShadow: darkMode
    ? "0 14px 34px rgba(0,0,0,0.32)"
    : "0 14px 34px rgba(15,23,42,0.06)",

  boxSizing:
    "border-box",

  marginBottom: "24px",

  overflow: "visible",

  flexWrap: "nowrap",
});

const leftSection = {
  display: "flex",

  flexDirection:
    "column",

  minWidth: "180px",

  flexShrink: 0,
};

const greeting = (
  darkMode
) => ({
  margin: 0,

  fontSize: "25px",

  fontWeight: "900",

  letterSpacing: "-0.8px",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  whiteSpace: "nowrap",
});

const name = {
  color: "#22c55e",
};

const subText = (
  darkMode
) => ({
  marginTop: "4px",

  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const searchWrapper = (
  darkMode
) => ({
  flex: 1,

  minWidth: 0,

  maxWidth: "520px",

  display: "flex",

  alignItems: "center",

  gap: "10px",

  padding: "11px 18px",

  borderRadius: "999px",

  background: darkMode
    ? "#020617"
    : "#f8fafc",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid #e2e8f0",

  boxShadow:
    "inset 0 1px 2px rgba(15,23,42,0.03)",
});

const searchIcon = {
  color: "#94a3b8",

  fontSize: "14px",

  flexShrink: 0,
};

const searchInput = (
  darkMode
) => ({
  flex: 1,

  border: "none",

  outline: "none",

  background:
    "transparent",

  fontSize: "14px",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const searchBtn = {
  border: "none",

  padding: "8px 14px",

  borderRadius:
    "999px",

  background:
    "linear-gradient(90deg,#22c55e,#2563eb)",

  color: "#ffffff",

  fontSize: "12px",

  fontWeight: "700",

  cursor: "pointer",
};

const rightSection = {
  display: "flex",

  alignItems: "center",

  gap: "12px",

  flexShrink: 0,
};

const buttonBase = {
  border: "none",

  width: "44px",

  height: "44px",

  borderRadius: "15px",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "center",

  cursor: "pointer",

  fontSize: "15px",

  transition: "0.25s ease",

  flexShrink: 0,
};

const languageWrapper = {
  position: "relative",

  flexShrink: 0,
};

const languageBtn = (
  darkMode
) => ({
  ...buttonBase,

  width: "auto",

  padding: "0 14px",

  gap: "8px",

  background: darkMode
    ? "#1e293b"
    : "#ffffff",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  boxShadow:
    "0 6px 16px rgba(15,23,42,0.06)",
});

const languageDropdown = (
  darkMode
) => ({
  position: "absolute",

  top: "58px",

  right: 0,

  width: "220px",

  zIndex: 99999,

  borderRadius: "20px",

  overflow: "hidden",

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  boxShadow:
    "0 20px 50px rgba(0,0,0,0.18)",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid #e2e8f0",
});

const languageItem = (
  darkMode,
  active
) => ({
  padding: "14px 18px",

  display: "flex",

  alignItems: "center",

  gap: "12px",

  cursor: "pointer",

  fontWeight: "700",

  background: active
    ? "rgba(34,197,94,0.12)"
    : "transparent",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  borderBottom:
    "1px solid rgba(148,163,184,0.08)",
});

const themeBtn = (
  darkMode
) => ({
  ...buttonBase,

  background: darkMode
    ? "#1e293b"
    : "#ffffff",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  boxShadow:
    "0 6px 16px rgba(15,23,42,0.06)",
});

const notifyBtn = (
  darkMode
) => ({
  ...buttonBase,

  position: "relative",

  background: darkMode
    ? "#1e293b"
    : "#ffffff",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  boxShadow:
    "0 6px 16px rgba(15,23,42,0.06)",
});

const notifyDot = {
  position: "absolute",

  top: "10px",

  right: "10px",

  width: "8px",

  height: "8px",

  borderRadius: "50%",

  background: "#ef4444",
};

const menuBtn = (
  darkMode
) => ({
  ...buttonBase,

  background:
    "linear-gradient(135deg,#2563eb,#22c55e)",

  color: "#ffffff",

  boxShadow:
    "0 10px 24px rgba(37,99,235,0.28)",
});

const avatar = {
  width: "46px",

  height: "46px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#2563eb)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "center",

  fontWeight: "900",

  fontSize: "15px",

  cursor: "pointer",

  boxShadow:
    "0 10px 22px rgba(15,23,42,0.12)",

  flexShrink: 0,
};