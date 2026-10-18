import React, {
  useMemo,
} from "react";

import {
  FaDownload,
  FaEye,
  FaHandHoldingHeart,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

/* ================================================= */
/* ================= COMPONENT ===================== */
/* ================================================= */

function MyDonationsRightPanel({
  darkMode,
  donations = [],
}) {

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= REAL DONATIONS ================= */
  /* ================================================= */

  const realDonations =
    useMemo(() => {

      if (
        Array.isArray(
          donations
        ) &&
        donations.length > 0
      ) {

        return donations;

      }

      try {

        const local =
          JSON.parse(
            localStorage.getItem(
              "donations"
            ) || "[]"
          );

        return Array.isArray(local)
          ? local
          : [];

      } catch {

        return [];

      }

    }, [donations]);

  /* ================================================= */
  /* ================= CALCULATIONS ================== */
  /* ================================================= */

  const totalDonated =
    realDonations.reduce(
      (sum, d) => {
return (
          sum +
          Number(
            d.amount || 0
          )
        );

      },
      0
    );

  const totalDonations =
    realDonations.length;

  const latestDonation =
    totalDonations > 0
      ? realDonations[0]
      : null;

  /* ================================================= */
  /* ================= ACTIONS ======================= */
  /* ================================================= */

  const handleViewAll =
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };

  /* ================================================= */
  /* ================= DOWNLOAD ====================== */
  /* ================================================= */

  const handleDownloadCertificate =
    () => {

      const certificate =
        `
=====================================

${t("thankYouCertificate")}

=====================================

${t("certificatePresented")}

${t("totalDonations")}:
${totalDonations}

${t("totalDonated")}:
$${totalDonated.toFixed(
          2
        )}

${t("latestDonation")}:
$${Number(
          latestDonation?.amount || 0
        ).toFixed(2)}

${t(
          "yourKindnessChangesLives"
        )}

Generated:
${new Date().toLocaleString()}

=====================================
`;

      const blob =
        new Blob(
          [certificate],
          {
            type: "text/plain",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "donation-certificate.txt";

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      URL.revokeObjectURL(
        url
      );

    };

  return (

    <div style={container}>

     

      {/* SUMMARY */}

      <div
        style={summaryCard(
          darkMode
        )}
      >

        <div style={summaryTop}>

          <div
            style={summaryIcon}
          >

            <FaHandHoldingHeart />

          </div>

          <div>

            <p
              style={summaryLabel(
                darkMode
              )}
            >

              {t(
                "totalDonated"
              )}

            </p>

            <h2
              style={summaryAmount(
                darkMode
              )}
            >

              $
              {totalDonated.toFixed(
                2
              )}

            </h2>

          </div>

        </div>

        <div style={summaryStats}>

          <div>

            <p style={miniLabel}>

              {t(
                "donations"
              )}

            </p>

            <strong>

              {
                totalDonations
              }

            </strong>

          </div>

          <div>

            <p style={miniLabel}>

              {t("latest")}

            </p>

            <strong>

              $
              {Number(
                latestDonation?.amount ||
                  0
              ).toFixed(2)}

            </strong>

          </div>

        </div>

      </div>

      {/* RECENT DONATIONS */}

      <div
        style={card(
          darkMode
        )}
      >

        <div style={header}>

          <h3
            style={title(
              darkMode
            )}
          >

            {t(
              "recentDonations"
            )}

          </h3>

          <button
            style={
              viewAllBtn
            }
            onClick={
              handleViewAll
            }
          >

            <FaEye size={12} />

            {t(
              "viewAll"
            )}

          </button>

        </div>

        {realDonations.length ===
        0 ? (

          <div
            style={emptyState(
              darkMode
            )}
          >

            <FaHandHoldingHeart
              size={28}
              color="#16a34a"
            />

            <p>

              {t(
                "noDonations"
              )}

            </p>

            <span>

              {t(
                "futureDonations"
              )}

            </span>

          </div>

        ) : (

          realDonations
            .slice(0, 5)

            .map(
              (
                d,
                i
              ) => (

                <DonationItem
                  key={
                    d.id ||
                    i
                  }
                  darkMode={
                    darkMode
                  }
                  img={
                    d.image ||
                    "/images/help.jpg"
                  }
                  title={
                    d.title
                      ? t(d.title)
                      : t(
                          "anonymousDonation"
                        )
                  }
                  amount={`$${Number(
                    d.amount ||
                      0
                  ).toFixed(2)}`}
                  time={
                    d.created_at ||
                    d.date

                      ? new Date(
                          d.created_at ||
                            d.date
                        ).toLocaleString()

                      : t(
                          "unknown"
                        )
                  }
                />

              )
            )

        )}

        {realDonations.length >
          0 && (

          <button
            style={btn(
              darkMode
            )}
            onClick={
              handleViewAll
            }
          >

            {t(
              "viewDonationHistory"
            )}{" "}
            →

          </button>

        )}

      </div>

      {/* CERTIFICATE */}

      <div
        style={starCard(
          darkMode
        )}
      >

        <div style={starBanner}>

          <img
            src="/images/star-banner.png"
            alt={t(
              "certificate"
            )}
            style={starImage}
          />

          <div
            style={
              starOverlay
            }
          >

            <h2
              style={
                starTitle
              }
            >

              {
                "You are a Star Donor! ⭐"
              }

            </h2>

            <p
              style={
                starSubtitle
              }
            >

              {
                "Your kindness is transforming lives"
              }

            </p>

          </div>

        </div>

        <div
          style={
            certificateContent
          }
        >

          <h3
            style={certificateTitle(
              darkMode
            )}
          >

            {t(
              "appreciationCertificate"
            )}

          </h3>

          <p
            style={certificateText(
              darkMode
            )}
          >

            {t(
              "certificateDescription"
            )}

          </p>

          <button
            style={
              downloadBtn
            }
            onClick={
              handleDownloadCertificate
            }
          >

            <FaDownload />

            {t(
              "downloadCertificate"
            )}

          </button>

        </div>

      </div>

    </div>

  );

}

/* ================================================= */
/* ================= DONATION ITEM ================= */
/* ================================================= */

function DonationItem({
  img,
  title,
  amount,
  time,
  darkMode,
}) {

  return (

    <div
      style={item(
        darkMode
      )}
    >

      <img
        src={img}
        style={avatar}
        alt={title}
      />

      <div style={{ flex: 1 }}>

        <p
          style={itemTitle(
            darkMode
          )}
        >

          {title}

        </p>

        <p
          style={itemSub(
            darkMode
          )}
        >

          <span
            style={
              amountStyle
            }
          >

            {amount}

          </span>

          <span style={dot}>
            •
          </span>

          {time}

        </p>

      </div>

    </div>

  );

}

export default MyDonationsRightPanel;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = {

  position: "relative",

  display: "flex",

  flexDirection: "column",

  gap: "18px",

};



const summaryCard = (
  darkMode
) => ({
  background: darkMode
    ? "#0f172a"
    : "#ffffff",
  padding: "22px",
  borderRadius: "22px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.06)",
});

const summaryTop = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const summaryIcon = {
  width: "60px",
  height: "60px",
  borderRadius: "18px",
  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const summaryLabel = (
  darkMode
) => ({
  margin: 0,
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const summaryAmount = (
  darkMode
) => ({
  margin: "4px 0 0",
  color: darkMode
    ? "#fff"
    : "#111827",
  fontSize: "32px",
  fontWeight: "800",
});

const summaryStats = {
  marginTop: "18px",
  display: "flex",
  justifyContent:
    "space-between",
};

const miniLabel = {
  margin: 0,
  marginBottom: "4px",
  fontSize: "12px",
  color: "#94a3b8",
};

const card = (
  darkMode
) => ({
  background: darkMode
    ? "#0f172a"
    : "#ffffff",
  padding: "18px",
  borderRadius: "22px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.06)",
});

const header = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

const title = (
  darkMode
) => ({
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: darkMode
    ? "#fff"
    : "#111827",
});

const viewAllBtn = {
  border: "none",
  background: "#eff6ff",
  color: "#2563eb",
  padding: "8px 12px",
  borderRadius: "10px",
  cursor: "pointer",
};

const emptyState = (
  darkMode
) => ({
  padding: "40px 20px",
  textAlign: "center",
  color: darkMode
    ? "#cbd5e1"
    : "#64748b",
});

const item = (
  darkMode
) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "14px",
});

const avatar = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  objectFit: "cover",
};

const itemTitle = (
  darkMode
) => ({
  margin: 0,
  fontWeight: "700",
  color: darkMode
    ? "#fff"
    : "#111827",
});

const itemSub = (
  darkMode
) => ({
  marginTop: "4px",
  fontSize: "12px",
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const amountStyle = {
  color: "#16a34a",
  fontWeight: "700",
};

const dot = {
  margin: "0 6px",
};

const btn = (
  darkMode
) => ({
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: darkMode
    ? "#1e293b"
    : "#f0fdf4",
  color: "#16a34a",
  fontWeight: "700",
  cursor: "pointer",
});

const starCard = (
  darkMode
) => ({
  overflow: "hidden",
  borderRadius: "22px",
  background: darkMode
    ? "#0f172a"
    : "#ffffff",
});

const starBanner = {
  position: "relative",
  width: "100%",
  height: "190px",
  overflow: "hidden",
  borderRadius: "22px",
};

const starImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const starOverlay = {
  position: "absolute",
  top: "50%",
  left: "20px",
  transform:
    "translateY(-50%)",
  zIndex: 2,
  color: "#ffffff",
};

const starTitle = {
  margin: 0,
  fontSize: "22px",
  fontWeight: "900",
  lineHeight: 1.2,
  maxWidth: "240px",
  color: "#ffffff",
  textShadow:
    "0 4px 12px rgba(0,0,0,0.35)",
};

const starSubtitle = {
  marginTop: "12px",
  fontSize: "14px",
  maxWidth: "220px",
  lineHeight: 1.5,
  color:
    "rgba(255,255,255,0.92)",
};

const certificateContent = {
  padding: "18px",
};

const certificateTitle = (
  darkMode
) => ({
  margin: 0,
  marginBottom: "8px",
  color: darkMode
    ? "#fff"
    : "#111827",
});

const certificateText = (
  darkMode
) => ({
  marginBottom: "16px",
  color: darkMode
    ? "#cbd5e1"
    : "#64748b",
});

const downloadBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};