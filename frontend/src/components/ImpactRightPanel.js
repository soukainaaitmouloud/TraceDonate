import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import ImpactCertificate from "./ImpactCertificate";

function ImpactRightPanel({
  show,
  onClose,
  darkMode = false,
}) {

  const { t } =
    useTranslation();

  const [donations, setDonations] =
    useState([]);

  /* ================================================= */
  /* ================= LOAD DONATIONS ================= */
  /* ================================================= */

  useEffect(() => {

    try {

      const stored =
        JSON.parse(
          localStorage.getItem(
            "donations"
          ) || "[]"
        );

      setDonations(
        Array.isArray(stored)
          ? stored
          : []
      );

    } catch {

      setDonations([]);

    }

  }, []);

  /* ================================================= */
  /* ================= REAL STATS ==================== */
  /* ================================================= */

  const stats = useMemo(() => {

    const totalAmount =
      donations.reduce(
        (sum, d) =>
          sum +
          Number(
            d.amount || 0
          ),
        0
      );

    const totalDonations =
      donations.length;

    const livesHelped =
      Math.floor(
        totalAmount / 15
      );

    const nextGoal = 1000;

    const progress =
      Math.min(
        100,
        Math.round(
          (totalAmount /
            nextGoal) *
            100
        )
      );

    let badge =
      t("bronzeSupporter");

    if (
      totalAmount >= 1000
    ) {

      badge =
        t("goldSupporter");

    }

    else if (
      totalAmount >= 500
    ) {

      badge =
        t("silverSupporter");

    }

    return {

      totalAmount,

      totalDonations,

      livesHelped,

      nextGoal,

      progress,

      badge,

    };

  }, [donations, t]);

  return (

    <>

      {/* ================================================= */}
      {/* ================= OVERLAY ======================= */}
      {/* ================================================= */}

      {show && (

        <div
          style={overlay}
          onClick={onClose}
        />

      )}

      {/* ================================================= */}
      {/* ================= PANEL ========================= */}
      {/* ================================================= */}

      <div
        style={panel(
          show,
          darkMode
        )}
      >

        {/* HEADER */}

        <div style={header}>

          <div>

            <h2
              style={headerTitle(
                darkMode
              )}
            >

              {t(
                "yourRealImpact"
              )}

            </h2>

            <p
              style={headerSub(
                darkMode
              )}
            >

              {t(
                "realDonationSummary"
              )}

            </p>

          </div>

          {/* CLOSE */}

          <button

            onClick={onClose}

            style={closeBtn(
              darkMode
            )}

            onMouseEnter={(e) => {

              e.currentTarget.style.transform =
                "translateY(-3px) scale(1.06)";

              e.currentTarget.style.background =
                "linear-gradient(135deg,#ef4444,#dc2626)";

              e.currentTarget.style.boxShadow =
                "0 14px 36px rgba(239,68,68,0.35)";

            }}

            onMouseLeave={(e) => {

              e.currentTarget.style.transform =
                "translateY(0) scale(1)";

              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";

              e.currentTarget.style.boxShadow =
                "0 10px 26px rgba(0,0,0,0.22)";

            }}

          >

            ✕

          </button>

        </div>

        {/* ================================================= */}
        {/* ================= CONTENT ======================= */}
        {/* ================================================= */}

        <div style={content}>

          {/* ================================================= */}
          {/* ================= BADGE ========================= */}
          {/* ================================================= */}

          <div
            style={card(
              darkMode
            )}
          >

            <div style={glow}></div>

            <h4
              style={badgeTitle(
                darkMode
              )}
            >

              {t(
                "yourBadge"
              )}

            </h4>

            <div
              style={badgeInnerCard(
                darkMode
              )}
            >

              <img
                src="/images/impact-badge.png"
                alt={t(
                  "impactBadge"
                )}
                style={badgeImage}
              />

            </div>

            <div
              style={progressContainer(
                darkMode
              )}
            >

              <div
                style={{
                  ...progressBar,

                  width:
                    `${Math.min(
                      100,
                      stats.totalDonations *
                        10
                    )}%`,
                }}
              />

            </div>

            <p style={topText}>

              {stats.badge}

            </p>

          </div>

          {/* ================================================= */}
          {/* ================= CERTIFICATE =================== */}
          {/* ================================================= */}

          <ImpactCertificate
            userName={
              localStorage.getItem(
                "userName"
              ) ||
              t(
                "supporter"
              )
            }
            darkMode={
              darkMode
            }
          />

          {/* ================================================= */}
          {/* ================= GOAL ========================== */}
          {/* ================================================= */}

          <div
            style={card(
              darkMode
            )}
          >

            <div style={glowPurple}></div>

            <div style={goalTop}>

              <div>

                <h4
                  style={goalTitle(
                    darkMode
                  )}
                >

                  {t(
                    "nextGoal"
                  )}

                </h4>

                <p
                  style={goalSub(
                    darkMode
                  )}
                >

                  {t(
                    "reachTotalDonations"
                  )}

                </p>

              </div>

              <img
                src="/images/goal.png"
                alt={t(
                  "goal"
                )}
                style={goalImage}
              />

            </div>

            <div
              style={progressRow}
            >

              <div
                style={progressBg(
                  darkMode
                )}
              >

                <div
                  style={{
                    ...progressFill,

                    width:
                      `${stats.progress}%`,
                  }}
                />

              </div>

              <span
                style={progressText}
              >

                {stats.progress}%

              </span>

            </div>

            <div
              style={{
                marginTop:
                  "18px",
              }}
            >

              <p
                style={goalInfo(
                  darkMode
                )}
              >

                💚{" "}

                {t(
                  "totalDonated"
                )}

                :

                <strong>

                  {" "}
                  $

                  {stats.totalAmount.toFixed(
                    2
                  )}

                </strong>

              </p>

              <p
                style={goalInfo(
                  darkMode
                )}
              >

                👥{" "}

                {t(
                  "livesHelped"
                )}

                :

                <strong>

                  {" "}

                  {
                    stats.livesHelped
                  }

                </strong>

              </p>

            </div>

          </div>

          {/* ================================================= */}
          {/* ================= SUMMARY ======================= */}
          {/* ================================================= */}

          <div
            style={card(
              darkMode
            )}
          >

            <h4
              style={summaryTitle(
                darkMode
              )}
            >

              {t(
                "realDonationSummary"
              )}

            </h4>

            <div
              style={summaryRow}
            >

              <span
                style={label(
                  darkMode
                )}
              >

                {t(
                  "donations"
                )}

              </span>

              <strong
                style={value(
                  darkMode
                )}
              >

                {
                  stats.totalDonations
                }

              </strong>

            </div>

            <div
              style={summaryRow}
            >

              <span
                style={label(
                  darkMode
                )}
              >

                {t(
                  "totalGiven"
                )}

              </span>

              <strong
                style={greenValue}
              >

                $

                {stats.totalAmount.toFixed(
                  2
                )}

              </strong>

            </div>

            <div
              style={summaryRow}
            >

              <span
                style={label(
                  darkMode
                )}
              >

                {t(
                  "estimatedLivesHelped"
                )}

              </span>

              <strong
                style={value(
                  darkMode
                )}
              >

                {
                  stats.livesHelped
                }

              </strong>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default ImpactRightPanel;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const overlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(2,6,23,0.55)",

  backdropFilter:
    "blur(10px)",

  WebkitBackdropFilter:
    "blur(10px)",

  zIndex: 999,

};

const panel = (
  show,
  darkMode
) => ({

  position: "fixed",

  top: 0,
  right: 0,

  transform: show
    ? "translateX(0)"
    : "translateX(100%)",

  width: "380px",

  maxWidth: "100%",

  height: "100vh",

  overflowY: "auto",

  backdropFilter:
    "blur(24px)",

  WebkitBackdropFilter:
    "blur(24px)",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(7,18,38,0.97),
        rgba(15,23,42,0.94)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.96),
        rgba(248,250,252,0.92)
      )
    `,

  zIndex: 1000,

  padding: "24px",

  transition:
    "transform 0.38s cubic-bezier(.4,2,.6,1)",

  boxShadow: darkMode

    ? `
      -20px 0 80px rgba(0,0,0,0.55)
    `

    : `
      -20px 0 80px rgba(15,23,42,0.12)
    `,

  borderLeft: darkMode

    ? "1px solid rgba(255,255,255,0.05)"

    : "1px solid rgba(255,255,255,0.9)",

});

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "24px",

};

const headerTitle = (
  darkMode
) => ({

  margin: 0,

  fontSize: "30px",

  fontWeight: "900",

  color: darkMode
    ? "#f8fafc"
    : "#0f172a",

});

const headerSub = (
  darkMode
) => ({

  marginTop: "6px",

  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const closeBtn = (
  darkMode
) => ({

  width: "44px",

  height: "44px",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(14px)",

  WebkitBackdropFilter:
    "blur(14px)",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  fontSize: "18px",

  fontWeight: "800",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  transition:
    "all 0.32s cubic-bezier(.4,2,.6,1)",

  boxShadow:
    "0 10px 26px rgba(0,0,0,0.22)",

  border:
    "1px solid rgba(255,255,255,0.08)",

});

const content = {

  display: "flex",

  flexDirection: "column",

  gap: "22px",

  paddingBottom: "30px",

};

const card = (
  darkMode
) => ({

  position: "relative",

  overflow: "hidden",

  borderRadius: "28px",

  padding: "22px",

  backdropFilter:
    "blur(24px)",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(7,18,38,0.95),
        rgba(15,23,42,0.90)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.90),
        rgba(248,250,252,0.84)
      )
    `,

  border:
    darkMode

      ? "1px solid rgba(255,255,255,0.05)"

      : "1px solid rgba(255,255,255,0.9)",

  boxShadow: darkMode

    ? `
      0 24px 70px rgba(0,0,0,0.45)
    `

    : `
      0 18px 40px rgba(15,23,42,0.08)
    `,

});

const glow = {

  position: "absolute",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.14)",

  filter: "blur(90px)",

  top: "-50px",

  right: "-50px",

};

const glowPurple = {

  position: "absolute",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(168,85,247,0.14)",

  filter: "blur(90px)",

  top: "-50px",

  right: "-50px",

};

const badgeTitle = (
  darkMode
) => ({

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  marginBottom: "14px",

  fontSize: "15px",

  fontWeight: "700",

});

const badgeInnerCard = (
  darkMode
) => ({

  background: darkMode
    ? "#020617"
    : "#ffffff",

  padding: "14px",

  borderRadius: "18px",

});

const badgeImage = {

  width: "100%",

  borderRadius: "12px",

  display: "block",

};

const progressContainer = (
  darkMode
) => ({

  marginTop: "18px",

  height: "10px",

  background: darkMode
    ? "#1e293b"
    : "#e5e7eb",

  borderRadius: "999px",

  overflow: "hidden",

});

const progressBar = {

  height: "100%",

  borderRadius: "999px",

  background:
    "linear-gradient(90deg,#22c55e,#4ade80)",

  boxShadow:
    "0 0 18px rgba(34,197,94,0.45)",

};

const topText = {

  textAlign: "center",

  marginTop: "12px",

  color: "#22c55e",

  fontWeight: "800",

  fontSize: "14px",

};

const goalTop = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

};

const goalTitle = (
  darkMode
) => ({

  margin: 0,

  fontSize: "16px",

  fontWeight: "700",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

});

const goalSub = (
  darkMode
) => ({

  marginTop: "6px",

  fontSize: "12px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const goalImage = {

  width: "72px",

};

const progressRow = {

  display: "flex",

  alignItems: "center",

  gap: "12px",

  marginTop: "18px",

};

const progressBg = (
  darkMode
) => ({

  flex: 1,

  height: "10px",

  background: darkMode
    ? "#1e293b"
    : "#e5e7eb",

  borderRadius: "999px",

  overflow: "hidden",

});

const progressFill = {

  height: "100%",

  borderRadius: "999px",

  background:
    "linear-gradient(90deg,#22c55e,#4ade80)",

  boxShadow:
    "0 0 18px rgba(34,197,94,0.45)",

};

const progressText = {

  fontSize: "13px",

  fontWeight: "700",

  color: "#16a34a",

};

const goalInfo = (
  darkMode
) => ({

  margin: "6px 0",

  fontSize: "13px",

  color: darkMode
    ? "#cbd5e1"
    : "#475569",

});

const summaryTitle = (
  darkMode
) => ({

  marginTop: 0,

  marginBottom: "16px",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  fontSize: "15px",

  fontWeight: "700",

});

const summaryRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "10px 0",

  borderBottom:
    "1px solid rgba(148,163,184,0.08)",

};

const label = (
  darkMode
) => ({

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

  fontSize: "13px",

});

const value = (
  darkMode
) => ({

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

});

const greenValue = {

  color: "#22c55e",

  fontWeight: "800",

  fontSize: "15px",

};