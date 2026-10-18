import React, {
  useState,
  useRef,
} from "react";

import { useTranslation } from "react-i18next";

import {
  FaCamera,
  FaLock,
  FaGlobe,
  FaMoon,
  FaDollarSign,
  FaUserShield,
  FaTrash,
  FaArrowRight,
  FaCheckCircle,
  FaHeart,
  FaUserFriends,
  FaEye,
  FaEyeSlash,
  FaCrown,
  FaShieldAlt,
  FaMagic,
  FaUserEdit,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Settings({
  darkMode,
  setDarkMode,
}) {
  const { t, i18n } =
    useTranslation();

  const fileInputRef =
    useRef(null);

  const [selectedLanguage, setSelectedLanguage] =
    useState(
      localStorage.getItem(
        "language"
      ) || "en"
    );

  const [showPassword, setShowPassword] =
    useState(false);

  const savedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    ) || {};

  const [profileData, setProfileData] =
  useState({
    fullName:
      savedUser.fullName || "",

    email:
      savedUser.email || "",

    phone:
      savedUser.phone || "",

    location:
      savedUser.location || "",

    avatar:
      savedUser.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        savedUser.fullName ||
          savedUser.email ||
          "User"
      )}&background=22c55e&color=ffffff&size=256`,
  });

  const [passwords, setPasswords] =
    useState({
      current: "",
      new: "",
      confirm: "",
    });

  const donations =
    JSON.parse(
      localStorage.getItem(
        "donations"
      ) || "[]"
    );

  const totalDonations =
    donations.reduce(
      (sum, item) =>
        sum +
        Number(
          item.amount || 0
        ),
      0
    );

  const passwordFields = [
    t("currentPassword"),
    t("newPassword"),
    t("confirmNewPassword"),
  ];

  const summary = [
    {
      label:
        t(
          "totalDonations"
        ),

      value: `$${totalDonations}`,

      icon: FaHeart,
    },

    {
      label:
        t(
          "livesImpacted"
        ),

      value:
        donations.length * 3,

      icon: FaUserFriends,
    },
  ];

  const accountSettings = [
  {
    label: t("currency"),

    value: "USD",

    icon: FaDollarSign,
  },

  {
    label: t("theme"),

    value: darkMode
      ? t("dark")
      : t("light"),

    icon: FaMoon,
  },
];

  const privacy = [
    {
      title:
        t(
          "dataPrivacy"
        ),

      desc: t(
        "manageYourData"
      ),

      icon: FaLock,
    },

    {
      title:
        t(
          "twoFactorAuth"
        ),

      desc: t(
        "extraProtection"
      ),

      icon: FaUserShield,
    },
  ];

  const handleInputChange = (
    field,
    value
  ) => {
    setProfileData(
      (prev) => ({
        ...prev,
        [field]: value,
      })
    );
  };

  const saveProfile = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(
        profileData
      )
    );

    alert(
      t(
        "profileUpdated"
      )
    );
  };

  const updatePassword = () => {
    if (
      !passwords.current ||
      !passwords.new ||
      !passwords.confirm
    ) {
      alert(
        t(
          "fillPasswordFields"
        )
      );

      return;
    }

    if (
      passwords.new !==
      passwords.confirm
    ) {
      alert(
        t(
          "passwordsNotMatch"
        )
      );

      return;
    }

    alert(
      t(
        "passwordUpdated"
      )
    );
  };

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

    setSelectedLanguage(
      lang
    );
  };

  const handleAvatarChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(
        file
      );

    setProfileData(
      (prev) => ({
        ...prev,
        avatar: imageUrl,
      })
    );
  };

  const deleteAccount = () => {
    const confirmDelete =
      window.confirm(
        t(
          "deleteWarning"
        )
      );

    if (confirmDelete) {
      localStorage.removeItem(
        "user"
      );

      window.location.reload();
    }
  };

  return (
    <div style={container}>
      <Sidebar
        darkMode={darkMode}
      />

      <div style={main(darkMode)}>
        <Topbar
          darkMode={darkMode}
          setDarkMode={
            setDarkMode
          }
        />

        {/* HERO */}

        <div style={hero(darkMode)}>
          <div style={heroContent}>
            <div style={heroBadge}>
              <FaCrown />
{t("premiumSettings")}
            </div>

            <h1 style={heroTitle}>
              {t(
                "settingsDashboard"
              )}
            </h1>

            <p style={heroText}>
              {t(
                "manageSettings"
              )}
            </p>

            <div style={heroStats}>
              <div style={heroStatCard}>
                <FaShieldAlt />
{t("secureAccount")}
              </div>

              <div style={heroStatCard}>
                <FaMagic />
{t("smartCustomization")}
              </div>
            </div>
          </div>

          <div style={heroGlowOne} />
          <div style={heroGlowTwo} />
        </div>

        {/* PROFILE */}

        <div style={card(darkMode)}>
          <div style={sectionHeader}>
            <div>
              <h3
                style={cardTitle(
                  darkMode
                )}
              >
                {t(
                  "profileInformation"
                )}
              </h3>

             <p style={sectionText}>
  {t("manageProfileInfo")}
</p>
            </div>

            <div style={floatingIcon}>
              <FaUserEdit />
            </div>
          </div>

          <div
            style={
              profileSection
            }
          >
            <div
              style={
                avatarSide
              }
            >
              <div
                style={
                  avatarWrapper
                }
              >
                <img
                  src={
                    profileData.avatar
                  }
                  alt="profile"
                  style={
                    profileImage
                  }
                />

                <div style={avatarRing} />

                <button
                  style={
                    cameraBtn
                  }
                  onClick={() =>
                    fileInputRef.current.click()
                  }
                >
                  <FaCamera />
                </button>

                <input
                  type="file"
                  ref={
                    fileInputRef
                  }
                  style={{
                    display:
                      "none",
                  }}
                  onChange={
                    handleAvatarChange
                  }
                />
              </div>

              <div style={profileMiniCard(darkMode)}>
                <h4 style={{ margin: 0 }}>
  {t("profileStatus")}
</h4>

                <span style={onlineBadge}>
                    {t("verified")}

                </span>
              </div>
            </div>

            <div
              style={
                profileFields
              }
            >
              <div style={gridFields}>
                <div>
                  <label
                    style={label(
                      darkMode
                    )}
                  >
                    {t(
                      "fullName"
                    )}
                  </label>

                  <input
                    style={input(
                      darkMode
                    )}
                    value={
                      profileData.fullName
                    }
                    onChange={(
                      e
                    ) =>
                      handleInputChange(
                        "fullName",
                        e.target
                          .value
                      )
                    }
                  />
                </div>

                <div>
                  <label
                    style={label(
                      darkMode
                    )}
                  >
                    {t(
                      "emailAddress"
                    )}
                  </label>

                  <input
                    style={input(
                      darkMode
                    )}
                    value={
                      profileData.email
                    }
                    onChange={(
                      e
                    ) =>
                      handleInputChange(
                        "email",
                        e.target
                          .value
                      )
                    }
                  />
                </div>

                <div>
                  <label
                    style={label(
                      darkMode
                    )}
                  >
                    {t(
                      "phoneNumber"
                    )}
                  </label>

                  <input
                    style={input(
                      darkMode
                    )}
                    value={
                      profileData.phone
                    }
                    onChange={(
                      e
                    ) =>
                      handleInputChange(
                        "phone",
                        e.target
                          .value
                      )
                    }
                  />
                </div>

                <div>
                  <label
                    style={label(
                      darkMode
                    )}
                  >
                    {t(
                      "location"
                    )}
                  </label>

                  <input
                    style={input(
                      darkMode
                    )}
                    value={
                      profileData.location
                    }
                    onChange={(
                      e
                    ) =>
                      handleInputChange(
                        "location",
                        e.target
                          .value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            style={greenBtn}
            onClick={
              saveProfile
            }
          >
            <FaCheckCircle />

            {t(
              "saveChanges"
            )}
          </button>
        </div>

        {/* ACCOUNT SETTINGS */}

        <div style={card(darkMode)}>
          <div style={sectionHeader}>
            <div>
              <h3
                style={cardTitle(
                  darkMode
                )}
              >
                {t(
                  "accountSettings"
                )}
              </h3>

              <p style={sectionText}>
                  {t("customizeExperience")}

              </p>
            </div>
          </div>

          <div
            style={
              settingRow(
                darkMode
              )
            }
          >
            <div
              style={leftRow(
                darkMode
              )}
            >
              <div
                style={
                  iconCircle
                }
              >
                <FaGlobe color="#22c55e" />
              </div>

              <span>
                {t(
                  "language"
                )}
              </span>
            </div>

            <select
              value={
                selectedLanguage
              }
              onChange={(
                e
              ) =>
                changeLanguage(
                  e.target
                    .value
                )
              }
              style={
                selectStyle(
                  darkMode
                )
              }
            >
              <option value="en">
                English
              </option>

              <option value="fr">
                French
              </option>

              <option value="ar">
                Arabic
              </option>

              <option value="zh">
                Chinese
              </option>
            </select>
          </div>

          {accountSettings.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                style={settingRow(
                  darkMode
                )}
              >
                <div
                  style={leftRow(
                    darkMode
                  )}
                >
                  <div
                    style={
                      iconCircle
                    }
                  >
                    <item.icon color="#22c55e" />
                  </div>

                  <span>
                    {
                      item.label
                    }
                  </span>
                </div>

                <div
                  style={
                    rightText(
                      darkMode
                    )
                  }
                >
                  {
                    item.value
                  }
                </div>
              </div>
            )
          )}
        </div>

        {/* PASSWORD */}

        <div style={card(darkMode)}>
          <div style={sectionHeader}>
            <div>
              <h3
                style={cardTitle(
                  darkMode
                )}
              >
                {t(
                  "changePassword"
                )}
              </h3>

              <p style={sectionText}>
                {t("keepAccountSafe")}
              </p>
            </div>
          </div>

          {passwordFields.map(
            (
              field,
              index
            ) => {
              const keys =
                [
                  "current",
                  "new",
                  "confirm",
                ];

              return (
                <div
                  key={index}
                >
                  <label
                    style={label(
                      darkMode
                    )}
                  >
                    {field}
                  </label>

                  <div
                    style={passwordWrapper(
                      darkMode
                    )}
                  >
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      style={passwordInput(
                        darkMode
                      )}
                      value={
                        passwords[
                          keys[
                            index
                          ]
                        ]
                      }
                      onChange={(
                        e
                      ) =>
                        setPasswords(
                          (
                            prev
                          ) => ({
                            ...prev,
                            [
                              keys[
                                index
                              ]
                            ]:
                              e
                                .target
                                .value,
                          })
                        )
                      }
                    />

                    <div
                      style={
                        eyeButton
                      }
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}

          <button
            style={
              lightGreenBtn
            }
            onClick={
              updatePassword
            }
          >
            <FaLock />

            {t(
              "updatePassword"
            )}
          </button>
        </div>

        {/* PRIVACY */}

        <div style={card(darkMode)}>
          <div style={sectionHeader}>
            <div>
              <h3
                style={cardTitle(
                  darkMode
                )}
              >
                {t(
                  "privacySecurity"
                )}
              </h3>

              <p style={sectionText}>
                 {t("advancedSecurity")}

              </p>
            </div>
          </div>

          {privacy.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                style={settingRow(
                  darkMode
                )}
              >
                <div
                  style={leftRow(
                    darkMode
                  )}
                >
                  <div
                    style={
                      iconCircle
                    }
                  >
                    <item.icon color="#22c55e" />
                  </div>

                  <div>
                    <div>
                      {
                        item.title
                      }
                    </div>

                    <small
                      style={{
                        color:
                          "#94a3b8",
                      }}
                    >
                      {
                        item.desc
                      }
                    </small>
                  </div>
                </div>

                <FaArrowRight color="#94a3b8" />
              </div>
            )
          )}
        </div>

        {/* SUMMARY */}

        <div style={summaryGrid}>
          {summary.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                style={summaryCard(
                  darkMode
                )}
              >
                <div
                  style={
                    summaryIcon
                  }
                >
                  <item.icon />
                </div>

                <h2
                  style={
                    summaryValue(
                      darkMode
                    )
                  }
                >
                  {
                    item.value
                  }
                </h2>

                <p
                  style={
                    summaryLabel
                  }
                >
                  {
                    item.label
                  }
                </p>
              </div>
            )
          )}
        </div>

        {/* DELETE */}

        <div
          style={deleteCard(
            darkMode
          )}
        >
          <h3
            style={
              deleteTitle
            }
          >
            {t(
              "deleteAccount"
            )}
          </h3>

          <p
            style={
              deleteText
            }
          >
            {t(
              "deleteWarning"
            )}
          </p>

          <button
            style={
              deleteBtn
            }
            onClick={
              deleteAccount
            }
          >
            <FaTrash />

            {t(
              "deleteAccount"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;

/* STYLES */

const container = {
  display: "grid",

  gridTemplateColumns:
    "230px 1fr",

  minHeight: "100vh",

  width: "100%",
};

const main = (darkMode) => ({
  background: darkMode
    ? "linear-gradient(135deg,#020617,#0f172a,#111827)"
    : "linear-gradient(135deg,#eef4ff,#ffffff,#f1f5f9)",

  padding: "28px",

  overflowY: "auto",

  fontFamily:
    "'Inter', sans-serif",

  minHeight: "100vh",
});

const hero = (darkMode) => ({
  position: "relative",

  overflow: "hidden",

  borderRadius: "34px",

  padding: "45px",

  marginBottom: "30px",

  background: darkMode
    ? "linear-gradient(135deg,#16a34a,#0f172a,#111827)"
    : "linear-gradient(135deg,#22c55e,#15803d,#166534)",

  color: "#ffffff",

  boxShadow:
    "0 30px 70px rgba(34,197,94,0.35)",
});

const heroContent = {
  position: "relative",
  zIndex: 2,
};

const heroBadge = {
  display: "inline-flex",

  alignItems: "center",

  gap: "10px",

  padding: "12px 18px",

  borderRadius: "999px",

  background:
    "rgba(255,255,255,0.15)",

  backdropFilter: "blur(10px)",

  fontWeight: "700",

  marginBottom: "20px",
};

const heroTitle = {
  margin: 0,

  fontSize: "48px",

  fontWeight: "900",

  lineHeight: "1.1",
};

const heroText = {
  marginTop: "14px",

  fontSize: "17px",

  opacity: 0.92,

  maxWidth: "600px",
};

const heroStats = {
  display: "flex",

  gap: "16px",

  marginTop: "28px",

  flexWrap: "wrap",
};

const heroStatCard = {
  padding: "16px 22px",

  borderRadius: "20px",

  background:
    "rgba(255,255,255,0.12)",

  backdropFilter: "blur(12px)",

  display: "flex",

  alignItems: "center",

  gap: "10px",

  fontWeight: "700",
};

const heroGlowOne = {
  position: "absolute",

  width: "300px",

  height: "300px",

  borderRadius: "50%",

  background:
    "rgba(255,255,255,0.12)",

  top: "-120px",

  right: "-80px",
};

const heroGlowTwo = {
  position: "absolute",

  width: "200px",

  height: "200px",

  borderRadius: "50%",

  background:
    "rgba(255,255,255,0.08)",

  bottom: "-60px",

  left: "40%",
};

const card = (darkMode) => ({
  background: darkMode
    ? "rgba(15,23,42,0.75)"
    : "rgba(255,255,255,0.85)",

  backdropFilter: "blur(20px)",

  borderRadius: "32px",

  padding: "32px",

  marginBottom: "28px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(255,255,255,0.9)",

  boxShadow: darkMode
    ? "0 25px 50px rgba(0,0,0,0.45)"
    : "0 25px 50px rgba(15,23,42,0.08)",
});

const sectionHeader = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "28px",
};

const floatingIcon = {
  width: "60px",

  height: "60px",

  borderRadius: "20px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#ffffff",

  fontSize: "22px",

  boxShadow:
    "0 15px 30px rgba(34,197,94,0.35)",
};

const sectionText = {
  margin: 0,

  marginTop: "8px",

  color: "#94a3b8",

  fontSize: "14px",
};

const cardTitle = (darkMode) => ({
  margin: 0,

  fontSize: "30px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",
});

const profileSection = {
  display: "flex",

  gap: "30px",

  marginBottom: "24px",

  alignItems: "flex-start",

  flexWrap: "wrap",
};

const avatarSide = {
  display: "flex",

  flexDirection: "column",

  gap: "20px",

  alignItems: "center",
};

const avatarWrapper = {
  position: "relative",
};

const avatarRing = {
  position: "absolute",

  inset: "-10px",

  borderRadius: "50%",

  border:
    "2px dashed rgba(34,197,94,0.5)",
};

const profileImage = {
  width: "140px",

  height: "140px",

  borderRadius: "50%",

  objectFit: "cover",

  border: "5px solid #22c55e",

  boxShadow:
    "0 20px 40px rgba(34,197,94,0.35)",
};

const cameraBtn = {
  position: "absolute",

  right: "5px",

  bottom: "5px",

  width: "45px",

  height: "45px",

  borderRadius: "50%",

  border: "4px solid white",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "15px",
};

const profileMiniCard = (
  darkMode
) => ({
  width: "100%",

  padding: "18px",

  borderRadius: "20px",

  background: darkMode
    ? "#111827"
    : "#f8fafc",

  textAlign: "center",
});

const onlineBadge = {
  display: "inline-block",

  marginTop: "10px",

  padding: "8px 16px",

  borderRadius: "999px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  fontWeight: "700",

  fontSize: "13px",
};

const profileFields = {
  flex: 1,
};

const gridFields = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(260px,1fr))",

  gap: "20px",
};

const label = (darkMode) => ({
  display: "block",

  marginBottom: "10px",

  fontSize: "13px",

  fontWeight: "800",

  color: darkMode
    ? "#dbeafe"
    : "#334155",
});

const input = (darkMode) => ({
  width: "100%",

  height: "58px",

  padding: "0 20px",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #e2e8f0",

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  outline: "none",

  fontSize: "15px",

  fontWeight: "600",

  transition: "0.3s",
});

const greenBtn = {
  marginTop: "30px",

  width: "100%",

  height: "64px",

  border: "none",

  borderRadius: "22px",

  background:
    "linear-gradient(135deg,#22c55e,#15803d)",

  color: "#ffffff",

  fontWeight: "900",

  fontSize: "17px",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "12px",

  boxShadow:
    "0 20px 35px rgba(34,197,94,0.35)",
};

const passwordWrapper = (
  darkMode
) => ({
  height: "58px",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #e2e8f0",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",

  padding: "0 18px",

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  marginBottom: "20px",
});

const passwordInput = (
  darkMode
) => ({
  border: "none",

  background: "transparent",

  outline: "none",

  width: "100%",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  fontSize: "15px",
});

const eyeButton = {
  cursor: "pointer",

  color: "#94a3b8",

  fontSize: "18px",
};

const lightGreenBtn = {
  marginTop: "20px",

  width: "100%",

  height: "64px",

  border: "none",

  borderRadius: "22px",

  background:
    "linear-gradient(135deg,#dcfce7,#bbf7d0)",

  color: "#16a34a",

  fontWeight: "900",

  fontSize: "17px",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "12px",
};

const settingRow = (
  darkMode
) => ({
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "20px 0",

  borderBottom: darkMode
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid #e2e8f0",
});

const leftRow = (darkMode) => ({
  display: "flex",

  alignItems: "center",

  gap: "16px",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  fontWeight: "700",
});

const iconCircle = {
  width: "52px",

  height: "52px",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#dcfce7,#bbf7d0)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  boxShadow:
    "0 10px 20px rgba(34,197,94,0.15)",
};

const rightText = (darkMode) => ({
  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

  fontWeight: "800",
});

const selectStyle = (
  darkMode
) => ({
  padding: "14px 18px",

  borderRadius: "16px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #cbd5e1",

  outline: "none",

  fontWeight: "700",

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const summaryGrid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "24px",

  marginBottom: "28px",
};

const summaryCard = (
  darkMode
) => ({
  background: darkMode
    ? "rgba(15,23,42,0.75)"
    : "rgba(255,255,255,0.88)",

  borderRadius: "30px",

  padding: "34px",

  textAlign: "center",

  backdropFilter: "blur(16px)",

  boxShadow: darkMode
    ? "0 20px 40px rgba(0,0,0,0.4)"
    : "0 20px 40px rgba(15,23,42,0.08)",
});

const summaryIcon = {
  width: "80px",

  height: "80px",

  borderRadius: "24px",

  margin: "0 auto 20px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#ffffff",

  fontSize: "28px",

  boxShadow:
    "0 20px 40px rgba(34,197,94,0.3)",
};

const summaryValue = (
  darkMode
) => ({
  margin: 0,

  fontSize: "36px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",
});

const summaryLabel = {
  marginTop: "10px",

  color: "#94a3b8",

  fontWeight: "700",
};

const deleteCard = (
  darkMode
) => ({
  marginTop: "10px",

  background: darkMode
    ? "linear-gradient(135deg,#1e293b,#111827)"
    : "linear-gradient(135deg,#ffffff,#fff1f2)",

  borderRadius: "32px",

  padding: "34px",

  border:
    "1px solid rgba(239,68,68,0.15)",
});

const deleteTitle = {
  margin: 0,

  fontSize: "30px",

  fontWeight: "900",

  color: "#ef4444",
};

const deleteText = {
  marginTop: "12px",

  marginBottom: "24px",

  color: "#94a3b8",

  fontSize: "15px",

  maxWidth: "600px",
};

const deleteBtn = {
  border: "none",

  borderRadius: "20px",

  padding: "18px 26px",

  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",

  color: "#ffffff",

  fontWeight: "900",

  fontSize: "15px",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "12px",

  boxShadow:
    "0 20px 35px rgba(239,68,68,0.35)",
};