// src/AuthPage.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  FaHeart,
  FaHandHoldingHeart,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";

function AuthPage() {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isRTL = i18n.language === "ar";

  useEffect(() => {
    const mode = localStorage.getItem("authMode");
    if (mode === "donor" || mode === "needy") {
      setIsLogin(false);
      setRole(mode);
    }
    localStorage.removeItem("authMode");
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert(t("fillAllFields"));
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || t("loginFailed"));
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`${t("welcome")} ${data.user.name} 💚`);
      history.push(data.user.role === "donor" ? "/donor-dashboard" : "/needy-dashboard");
    } catch (err) {
      console.error(err);
      alert(t("backendNotConnected"));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!role) {
      alert(t("selectRole"));
      return;
    }
    if (!name || !email || !password) {
      alert(t("fillAllFields"));
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || t("registerFailed"));
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(t("accountCreated"));
      history.push(data.user.role === "donor" ? "/donor-dashboard" : "/needy-dashboard");
    } catch (err) {
      console.error(err);
      alert(t("backendNotConnected"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ ...container, direction: isRTL ? "rtl" : "ltr" }}>
      <video autoPlay muted loop playsInline style={videoBg}>
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div style={overlay} />
      <div style={glow1} />
      <div style={glow2} />

      <div style={card}>
        <div style={badge}>
          <FaShieldAlt /> {t("secureDonation")}
        </div>

        <img src="/logo.png" alt="logo" style={logo} />

        <h1 style={title}>{isLogin ? t("welcomeBack") : t("joinTraceDonate")}</h1>
        <p style={subtitle}>{isLogin ? t("loginSubtitle") : t("registerSubtitle")}</p>

        {!isLogin && (
          <div style={roleContainer}>
            <div style={{ ...roleCard, ...(role === "donor" ? donorActive : {}) }} onClick={() => setRole("donor")}>
              <FaHeart size={28} /> <span>{t("donor")}</span>
            </div>
            <div style={{ ...roleCard, ...(role === "needy" ? needyActive : {}) }} onClick={() => setRole("needy")}>
              <FaHandHoldingHeart size={28} /> <span>{t("needy")}</span>
            </div>
          </div>
        )}

        {!isLogin && (
          <div style={inputWrapper}>
            <FaUser style={icon} />
            <input type="text" placeholder={t("fullName")} style={input} value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}

        <div style={inputWrapper}>
          <FaEnvelope style={icon} />
          <input type="email" placeholder={t("emailAddress")} style={input} value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div style={passwordWrapper}>
          <FaLock style={icon} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            style={input}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span style={eye} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button style={mainBtn} onClick={isLogin ? handleLogin : handleRegister} disabled={loading}>
          {loading ? t("pleaseWait") : (
            <>
              {isLogin ? t("login") : t("createAccount")}
              <FaArrowRight />
            </>
          )}
        </button>

        <p style={switchText}>
          {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}
          <span style={link} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ` ${t("register")}` : ` ${t("login")}`}
          </span>
        </p>
      </div>
    </div>
  );
}

// ======================= STYLES ========================
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden", // prevents scrolling
  fontFamily: "'Inter', sans-serif",
};
const videoBg = { position: "absolute", width: "100%", height: "100%", objectFit: "cover" };
const overlay = { position: "absolute", inset: 0, background: "linear-gradient(to bottom right, rgba(2,6,23,0.82), rgba(15,23,42,0.65))" };
const glow1 = { position: "absolute", width: "550px", height: "550px", background: "rgba(37,99,235,0.35)", borderRadius: "50%", filter: "blur(140px)", top: "-200px", left: "-150px" };
const glow2 = { position: "absolute", width: "550px", height: "550px", background: "rgba(34,197,94,0.3)", borderRadius: "50%", filter: "blur(140px)", bottom: "-200px", right: "-150px" };
const card = { width: "480px", padding: "50px", borderRadius: "38px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(25px)", boxShadow: "0 30px 80px rgba(0,0,0,0.45)", position: "relative", zIndex: 5, color: "#fff" };
const badge = { display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "13px", borderRadius: "999px", background: "rgba(255,255,255,0.08)", marginBottom: "28px", fontWeight: "700", fontSize: "14px" };
const logo = { width: "200px", display: "block", margin: "0 auto 20px" };
const title = { fontSize: "40px", fontWeight: "900", textAlign: "center", marginBottom: "12px" };
const subtitle = { textAlign: "center", color: "rgba(255,255,255,0.75)", marginBottom: "32px", lineHeight: 1.6 };
const roleContainer = { display: "flex", gap: "15px", marginBottom: "24px" };
const roleCard = { flex: 1, padding: "20px", borderRadius: "24px", background: "rgba(255,255,255,0.08)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", fontWeight: "700", transition: "0.3s", border: "1px solid rgba(255,255,255,0.1)" };
const donorActive = { background: "linear-gradient(135deg,#22c55e,#16a34a)", transform: "scale(1.03)" };
const needyActive = { background: "linear-gradient(135deg,#2563eb,#1d4ed8)", transform: "scale(1.03)" };
const inputWrapper = { position: "relative", marginBottom: "18px" };
const icon = { position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.7)" };
const input = { width: "100%", padding: "18px 18px 18px 52px", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", fontSize: "15px", boxSizing: "border-box" };
const passwordWrapper = { position: "relative", marginBottom: "20px" };
const eye = { position: "absolute", right: "18px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "18px" };
const mainBtn = { width: "100%", padding: "18px", borderRadius: "18px", border: "none", background: "linear-gradient(135deg,#2563eb,#22c55e)", color: "#fff", fontWeight: "800", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", boxShadow: "0 18px 45px rgba(37,99,235,0.4)" };
const switchText = { textAlign: "center", marginTop: "28px", color: "rgba(255,255,255,0.8)" };
const link = { color: "#8bffb7", fontWeight: "800", cursor: "pointer" };

export default AuthPage;