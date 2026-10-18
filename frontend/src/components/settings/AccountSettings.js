import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaCamera,
} from "react-icons/fa";

function AccountSettings({
  darkMode,
}) {
  const [
    fullName,
    setFullName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [avatar, setAvatar] =
    useState(
      "/images/oldman.jpg"
    );

  const [saved, setSaved] =
    useState(false);

  /* LOAD USER DATA */

  useEffect(() => {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      ) || {};

    setFullName(
      user.fullName ||
        "John Doe"
    );

    setEmail(
      user.email ||
        "john@email.com"
    );

    setPhone(
      user.phone ||
        "+1 234 567 890"
    );

    setAvatar(
      user.avatar ||
        "/images/oldman.jpg"
    );
  }, []);

  /* SAVE USER DATA */

  const handleSave = () => {
    const updatedUser = {
      fullName,
      email,
      phone,
      avatar,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(
        updatedUser
      )
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /* CHANGE PROFILE IMAGE */

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (file) {
      const reader =
        new FileReader();

      reader.onload = () => {
        setAvatar(
          reader.result
        );
      };

      reader.readAsDataURL(
        file
      );
    }
  };

  return (
    <div style={card(darkMode)}>
      {/* GLOW EFFECT */}

      <div style={glowOne} />

      <div style={glowTwo} />

      {/* HEADER */}

      <div style={header}>
        <div
          style={
            avatarWrapper
          }
        >
          <img
            src={avatar}
            alt=""
            style={avatarImage}
          />

          <label
            htmlFor="avatarUpload"
            style={
              cameraButton
            }
          >
            <FaCamera />
          </label>

          <input
            id="avatarUpload"
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
            Account Settings
          </h2>

          <p style={subtitle}>
            Update your profile
            information
          </p>
        </div>
      </div>

      {/* FULL NAME */}

      <div style={inputGroup}>
        <label
          style={label(
            darkMode
          )}
        >
          Full Name
        </label>

        <div
          style={inputWrapper(
            darkMode
          )}
        >
          <FaUser
            style={inputIcon}
          />

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            style={input(
              darkMode
            )}
            placeholder="Enter your name"
          />
        </div>
      </div>

      {/* EMAIL */}

      <div style={inputGroup}>
        <label
          style={label(
            darkMode
          )}
        >
          Email Address
        </label>

        <div
          style={inputWrapper(
            darkMode
          )}
        >
          <FaEnvelope
            style={inputIcon}
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={input(
              darkMode
            )}
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* PHONE */}

      <div style={inputGroup}>
        <label
          style={label(
            darkMode
          )}
        >
          Phone Number
        </label>

        <div
          style={inputWrapper(
            darkMode
          )}
        >
          <FaPhoneAlt
            style={inputIcon}
          />

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            style={input(
              darkMode
            )}
            placeholder="Enter your phone number"
          />
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
          ? "Saved Successfully!"
          : "Save Changes"}
      </button>
    </div>
  );
}

export default AccountSettings;

/* ================= STYLES ================= */

const card = (darkMode) => ({
  position: "relative",

  overflow: "hidden",

  background: darkMode
    ? "rgba(15,23,42,0.92)"
    : "rgba(255,255,255,0.92)",

  backdropFilter: "blur(18px)",

  borderRadius: "32px",

  padding: "28px",

  boxShadow: darkMode
    ? "0 20px 45px rgba(0,0,0,0.35)"
    : "0 20px 45px rgba(15,23,42,0.08)",

  display: "flex",

  flexDirection: "column",

  gap: "22px",

  border: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid rgba(255,255,255,0.9)",
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

  gap: "18px",

  marginBottom: "8px",

  position: "relative",

  zIndex: 2,
};

const avatarWrapper = {
  position: "relative",
};

const avatarImage = {
  width: "90px",

  height: "90px",

  borderRadius: "50%",

  objectFit: "cover",

  border: "4px solid #22c55e",

  boxShadow:
    "0 16px 30px rgba(34,197,94,0.35)",
};

const cameraButton = {
  position: "absolute",

  right: "0",

  bottom: "0",

  width: "34px",

  height: "34px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  cursor: "pointer",

  boxShadow:
    "0 8px 20px rgba(34,197,94,0.35)",
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

const inputGroup = {
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

  gap: "12px",

  padding: "0 16px",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",

  background: darkMode
    ? "#020617"
    : "#f8fafc",
});

const inputIcon = {
  color: "#22c55e",

  fontSize: "15px",
};

const input = (darkMode) => ({
  flex: 1,

  padding: "16px 0",

  border: "none",

  background: "transparent",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  outline: "none",

  fontSize: "14px",

  fontWeight: "600",
});

const saveBtn = {
  marginTop: "10px",

  border: "none",

  borderRadius: "22px",

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

const savedBtn = {
  ...saveBtn,

  background:
    "linear-gradient(135deg,#15803d,#166534)",
};