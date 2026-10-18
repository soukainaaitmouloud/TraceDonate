import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

function ImpactCertificate({
  userName = "Your Name",
  darkMode = false,
}) {
  const { t } = useTranslation();

  const certificateRef = useRef(null);

  /* ================= DOWNLOAD ================= */

  const handleDownload = async () => {
    try {
      const html2canvas = (
        await import("html2canvas")
      ).default;

      const canvas =
        await html2canvas(
          certificateRef.current,
          {
            scale: 2,
          }
        );

      const image =
        canvas.toDataURL(
          "image/png"
        );

      const link =
        document.createElement("a");

      link.href = image;

      link.download = `${userName
        .replace(/\s+/g, "_")
        .toLowerCase()}_impact_certificate.png`;

      link.click();
    } catch (error) {
      console.error(error);

      alert(
        t(
          "failedDownloadCertificate"
        ) ||
          "Failed to download certificate."
      );
    }
  };

  return (
    <div
      style={card(darkMode)}
    >
      <h4
        style={title(darkMode)}
      >
        {t(
          "appreciationCertificate"
        )}
      </h4>

      <p
        style={description(
          darkMode
        )}
      >
        {t(
          "certificateDescription"
        )}
      </p>

      {/* CERTIFICATE */}

      <div
        ref={certificateRef}
        style={
          certificateWrapper
        }
      >
        <img
          src="/images/ImpactCertificate.png"
          alt="Certificate"
          style={
            certificateImage
          }
          onError={(e) => {
            e.target.src =
              "/images/water.jpg";
          }}
        />

        {/* DYNAMIC NAME */}

        <div
          style={nameOverlay}
        >
          {userName}
        </div>
      </div>

      {/* DOWNLOAD */}

      <button
        style={btn}
        onClick={
          handleDownload
        }
      >
        {t(
          "downloadCertificate"
        )}
      </button>
    </div>
  );
}

export default ImpactCertificate;

/* ================= STYLES ================= */

const card = (
  darkMode
) => ({
  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  padding: "20px",

  borderRadius: "20px",

  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",

  boxShadow: darkMode
    ? "none"
    : "0 10px 30px rgba(0,0,0,0.08)",
});

const title = (
  darkMode
) => ({
  fontSize: "18px",

  fontWeight: "700",

  marginBottom: "10px",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",
});

const description = (
  darkMode
) => ({
  fontSize: "13px",

  lineHeight: 1.6,

  marginBottom: "18px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const certificateWrapper = {
  position: "relative",

  marginTop: "10px",

  overflow: "hidden",

  borderRadius: "16px",
};

const certificateImage = {
  width: "100%",

  display: "block",

  borderRadius: "16px",

  objectFit: "cover",
};

/* ================= NAME OVERLAY ================= */

const nameOverlay = {
  position: "absolute",

  top: "49%",
  left: "50%",

  transform:
    "translate(-50%, -50%)",

  width: "72%",

  textAlign: "center",

  fontSize: "26px",

  fontWeight: "700",

  color: "#0f172a",

  fontFamily:
    "Georgia, serif",

  letterSpacing: "1px",

  textTransform:
    "capitalize",

  textShadow:
    "0 2px 6px rgba(255,255,255,0.6)",
};

/* ================= BUTTON ================= */

const btn = {
  marginTop: "18px",

  width: "100%",

  padding: "14px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#fff",

  fontWeight: "700",

  fontSize: "15px",

  cursor: "pointer",

  transition: "0.3s",

  boxShadow:
    "0 10px 20px rgba(34,197,94,0.25)",
};