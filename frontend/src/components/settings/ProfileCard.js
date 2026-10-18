import React, {
  useState,
  useEffect,
} from "react";

import {
  FaCamera,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

function ProfileCard({
  darkMode,
}) {
  /* ================= USER DATA ================= */

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const [name, setName] =
    useState(
      storedUser.fullName ||
        storedUser.name ||
        "John Doe"
    );

  const [email, setEmail] =
    useState(
      storedUser.email ||
        "john@email.com"
    );

  const [phone, setPhone] =
    useState(
      storedUser.phone ||
        "+1 234 567 890"
    );

  const [location, setLocation] =
    useState(
      storedUser.location ||
        "New York, USA"
    );

  const [avatar, setAvatar] =
    useState(
      storedUser.avatar ||
        "/images/oldman.jpg"
    );

  const [saved, setSaved] =
    useState(false);

  /* ================= SAVE PROFILE ================= */

  const handleSave = () => {
    const updatedUser = {
      ...storedUser,

      fullName: name,

      email,

      phone,

      location,

      avatar,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /* ================= CHANGE IMAGE ================= */

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (file) {
      const reader =
        new FileReader();

      reader.onloadend = () => {
        setAvatar(
          reader.result
        );
      };

      reader.readAsDataURL(
        file
      );
    }
  };

  useEffect(() => {
    const updatedUser = {
      ...storedUser,

      avatar,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  }, [avatar]);

  return (
    <div style={card(darkMode)}>
      {/* GLOW */}

      <div style={glowOne} />

      <div style={glowTwo} />

      {/* HEADER */}

      <div style={topSection}>
        <div style={avatarWrapper}>
          <img
            src={avatar}
            alt="Profile"
            style={profileImage}
          />

          <label
            htmlFor="profileUpload"
            style={cameraBtn}
          >
            <FaCamera size={14} />
          </label>

          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            onChange={
              handleImageChange
            }
            style={{
              display: "none",
            }}
          />
        </div>

        <div>
          <h2
            style={title(
              darkMode
            )}
          >
            Profile Information
          </h2>

          <p style={subtitle}>
            Manage your account
            details and personal
            information
          </p>
        </div>
      </div>

      {/* INPUTS */}

      <div style={inputGroup}>
        <label
          style={label(
            darkMode
          )}
        >
          <FaUser />

          Full Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          style={input(
            darkMode
          )}
          placeholder="Your name"
        />
      </div>

      <div style={inputGroup}>
        <label
          style={label(
            darkMode
          )}
        >
          <FaEnvelope />

          Email Address
        </label>

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={input(
            darkMode
          )}
          placeholder="Your email"
        />
      </div>

      <div style={inputGroup}>
        <label
          style={label(
            darkMode
          )}
        >
          <FaPhone />

          Phone Number
        </label>

        <input
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          style={input(
            darkMode
          )}
          placeholder="Your phone"
        />
      </div>

      <div style={inputGroup}>
        <label
          style={label(
            darkMode
          )}
        >
          <FaMapMarkerAlt />

          Location
        </label>

        <input
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
          style={input(
            darkMode
          )}
          placeholder="Your location"
        />
      </div>

      {/* BUTTON */}

      <button
        style={
          saved
            ? successBtn
            : saveBtn
        }
        onClick={handleSave}
      >
        <FaCheckCircle />

        {saved
          ? "Profile Saved!"
          : "Save Changes"}
      </button>
    </div>
  );
}

export default ProfileCard;

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

  border: darkMode
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid rgba(255,255,255,0.9)",

  boxShadow: darkMode
    ? "0 20px 45px rgba(0,0,0,0.35)"
    : "0 20px 45px rgba(15,23,42,0.08)",

  display: "flex",

  flexDirection: "column",

  gap: "22px",
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

  filter: "blur(18px)",
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

  filter: "blur(18px)",
};

const topSection = {
  display: "flex",

  alignItems: "center",

  gap: "18px",

  marginBottom: "10px",

  position: "relative",

  zIndex: 2,
};

const avatarWrapper = {
  position: "relative",
};

const profileImage = {
  width: "92px",

  height: "92px",

  borderRadius: "50%",

  objectFit: "cover",

  border: "4px solid #22c55e",

  boxShadow:
    "0 14px 30px rgba(34,197,94,0.35)",
};

const cameraBtn = {
  position: "absolute",

  right: "0",

  bottom: "0",

  width: "36px",

  height: "36px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  cursor: "pointer",

  boxShadow:
    "0 10px 20px rgba(34,197,94,0.35)",
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

  lineHeight: "22px",

  fontWeight: "600",
};

const inputGroup = {
  display: "flex",

  flexDirection: "column",

  gap: "10px",

  position: "relative",

  zIndex: 2,
};

const label = (darkMode) => ({
  display: "flex",

  alignItems: "center",

  gap: "10px",

  fontSize: "14px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const input = (darkMode) => ({
  padding: "16px 18px",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #e2e8f0",

  background: darkMode
    ? "#020617"
    : "#f8fafc",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  outline: "none",

  fontSize: "14px",

  fontWeight: "600",

  transition: "0.25s",
});

const saveBtn = {
  marginTop: "10px",

  border: "none",

  borderRadius: "20px",

  padding: "18px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  fontWeight: "800",

  fontSize: "16px",

  cursor: "pointer",

  transition: "0.25s",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "10px",

  boxShadow:
    "0 16px 30px rgba(34,197,94,0.35)",
};

const successBtn = {
  ...saveBtn,

  background:
    "linear-gradient(135deg,#15803d,#166534)",
};