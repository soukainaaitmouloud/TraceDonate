// src/pages/NeedySettings.js

import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  FaUser,
  FaBell,
  FaMoon,
  FaGlobe,
  FaCamera,
  FaSave,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import NeedyLayout from "../layouts/NeedyLayout";

import Topbar from "../components/Topbar";

import "./NeedySettings.css";

function NeedySettings({
  darkMode,
  setDarkMode,
}) {

  const { t, i18n } =
    useTranslation();

  /* ========================================= */
  /* STATES */
  /* ========================================= */

  const [notifications, setNotifications] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) ?? true
    );

  const [language, setLanguage] =
    useState(
      localStorage.getItem(
        "language"
      ) || "en"
    );

  const [name, setName] =
    useState(
      localStorage.getItem(
        "profileName"
      ) || "Aarav Mehta"
    );

  const [email, setEmail] =
    useState(
      localStorage.getItem(
        "profileEmail"
      ) || "aarav@gmail.com"
    );

  const [bio, setBio] =
    useState(
      localStorage.getItem(
        "profileBio"
      ) ||
      t("bioText")
    );

  const [avatar, setAvatar] =
    useState(
      localStorage.getItem(
        "profileAvatar"
      ) || ""
    );

  const [saved, setSaved] =
    useState(false);

  const fileInputRef =
    useRef(null);

  /* ========================================= */
  /* RTL */
  /* ========================================= */

  const isRTL =
    i18n.language === "ar";

  /* ========================================= */
  /* SAVE SETTINGS */
  /* ========================================= */

  const handleSave =
    () => {

      localStorage.setItem(
        "profileName",
        name
      );

      localStorage.setItem(
        "profileEmail",
        email
      );

      localStorage.setItem(
        "profileBio",
        bio
      );

      localStorage.setItem(
        "notifications",
        JSON.stringify(
          notifications
        )
      );

      setSaved(true);

      setTimeout(() => {

        setSaved(false);

      }, 2500);

    };

  /* ========================================= */
  /* LANGUAGE */
  /* ========================================= */

  const changeLanguage =
    (lang) => {

      i18n.changeLanguage(
        lang
      );

      localStorage.setItem(
        "language",
        lang
      );

      setLanguage(lang);

      window.location.reload();

    };

  /* ========================================= */
  /* AVATAR */
  /* ========================================= */

  const handleAvatar =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload =
        () => {

          setAvatar(
            reader.result
          );

          localStorage.setItem(
            "profileAvatar",
            reader.result
          );

        };

      reader.readAsDataURL(
        file
      );

    };

  /* ========================================= */
  /* PASSWORD */
  /* ========================================= */

  const handlePassword =
    () => {

      alert(
        t(
          "passwordUpdated"
        )
      );

    };

  /* ========================================= */
  /* 2FA */
  /* ========================================= */

  const handle2FA =
    () => {

      alert(
        t(
          "twoFactorEnabled"
        )
      );

    };

  return (

    <NeedyLayout>

      <div
        className={`needy-settings-page ${
          darkMode
            ? "dark"
            : ""
        }`}
        dir={
          isRTL
            ? "rtl"
            : "ltr"
        }
      >

        {/* ========================================= */}
        {/* TOPBAR */}
        {/* ========================================= */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="settings-header">

          <div>

            <h1>
              {t(
                "recoverySettings"
              )}
            </h1>

            <p>
              {t(
                "settingsSubtitle"
              )}
            </p>

          </div>

          <button
            className="save-btn"
            onClick={
              handleSave
            }
          >

            {saved ? (

              <>

                <FaCheckCircle />

                {t("saved")}

              </>

            ) : (

              <>

                <FaSave />

                {t(
                  "saveChanges"
                )}

              </>

            )}

          </button>

        </div>

        {/* ========================================= */}
        {/* GRID */}
        {/* ========================================= */}

        <div className="settings-grid">

          {/* ========================================= */}
          {/* LEFT */}
          {/* ========================================= */}

          <div className="settings-left">

            {/* PROFILE */}

            <div className="settings-card profile-card">

              <div className="avatar-wrapper">

                <div className="profile-avatar">

                  {avatar ? (

                    <img
                      src={avatar}
                      alt="avatar"
                    />

                  ) : (

                    name.charAt(0)

                  )}

                </div>

                <button
                  className="camera-btn"
                  onClick={() =>
                    fileInputRef.current.click()
                  }
                >

                  <FaCamera />

                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{
                    display:
                      "none",
                  }}
                  onChange={
                    handleAvatar
                  }
                />

              </div>

              <h2>
                {name}
              </h2>

              <p>
                {t(
                  "verifiedRecoveryCampaign"
                )}
              </p>

            </div>

            {/* SECURITY */}

            <div className="settings-card">

              <div className="card-title">

                <FaShieldAlt />

                <span>
                  {t(
                    "security"
                  )}
                </span>

              </div>

              {/* PASSWORD */}

              <div className="setting-row">

                <div>

                  <h4>
                    {t(
                      "changePassword"
                    )}
                  </h4>

                  <p>
                    {t(
                      "changePasswordDesc"
                    )}
                  </p>

                </div>

                <button
                  onClick={
                    handlePassword
                  }
                >

                  {t(
                    "update"
                  )}

                </button>

              </div>

              {/* 2FA */}

              <div className="setting-row">

                <div>

                  <h4>
                    {t(
                      "twoFactorAuth"
                    )}
                  </h4>

                  <p>
                    {t(
                      "twoFactorAuthDesc"
                    )}
                  </p>

                </div>

                <button
                  onClick={
                    handle2FA
                  }
                >

                  {t(
                    "enable"
                  )}

                </button>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* RIGHT */}
          {/* ========================================= */}

          <div className="settings-right">

            {/* PROFILE */}

            <div className="settings-card">

              <div className="card-title">

                <FaUser />

                <span>
                  {t(
                    "profileInformation"
                  )}
                </span>

              </div>

              <div className="form-grid">

                {/* NAME */}

                <div className="input-group">

                  <label>
                    {t(
                      "fullName"
                    )}
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* EMAIL */}

                <div className="input-group">

                  <label>
                    {t(
                      "emailAddress"
                    )}
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* BIO */}

                <div className="input-group full-width">

                  <label>
                    {t("bio")}
                  </label>

                  <textarea
                    rows="4"
                    value={bio}
                    onChange={(e) =>
                      setBio(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </div>

            {/* PREFERENCES */}

            <div className="settings-card">

              <div className="card-title">

                <FaBell />

                <span>
                  {t(
                    "preferences"
                  )}
                </span>

              </div>

              {/* NOTIFICATIONS */}

              <div className="preference-row">

                <div className="preference-info">

                  <FaBell />

                  <div>

                    <h4>
                      {t(
                        "notifications"
                      )}
                    </h4>

                    <p>
                      {t(
                        "notificationsDesc"
                      )}
                    </p>

                  </div>

                </div>

                <label className="switch">

                  <input
                    type="checkbox"
                    checked={
                      notifications
                    }
                    onChange={() =>
                      setNotifications(
                        !notifications
                      )
                    }
                  />

                  <span className="slider" />

                </label>

              </div>

              {/* DARK MODE */}

              <div className="preference-row">

                <div className="preference-info">

                  <FaMoon />

                  <div>

                    <h4>
                      {t(
                        "darkMode"
                      )}
                    </h4>

                    <p>
                      {t(
                        "darkModeDesc"
                      )}
                    </p>

                  </div>

                </div>

                <label className="switch">

                  <input
                    type="checkbox"
                    checked={
                      darkMode
                    }
                    onChange={() =>
                      setDarkMode(
                        !darkMode
                      )
                    }
                  />

                  <span className="slider" />

                </label>

              </div>

              {/* LANGUAGE */}

              <div className="preference-row">

                <div className="preference-info">

                  <FaGlobe />

                  <div>

                    <h4>
                      {t(
                        "language"
                      )}
                    </h4>

                    <p>
                      {t(
                        "languageDesc"
                      )}
                    </p>

                  </div>

                </div>

                <select
                  value={
                    language
                  }
                  onChange={(e) =>
                    changeLanguage(
                      e.target.value
                    )
                  }
                >

                  <option value="en">
                    English
                  </option>

                  <option value="ar">
                    العربية
                  </option>

                  <option value="fr">
                    Français
                  </option>

                  <option value="zh">
                    中文
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

      </div>

    </NeedyLayout>

  );

}

export default NeedySettings;