import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MyDonationsRightPanel from "../components/MyDonationsRightPanel";
import DonationChartMyDonations from "../components/DonationChartMyDonations";
import TopCauses from "../components/TopCauses";

import {
  FaDollarSign,
  FaUsers,
  FaHeart,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import { HiOutlineTrendingUp } from "react-icons/hi";

/* ================================================= */
/* ================= IMAGE FALLBACK ================= */
/* ================================================= */

const getFallbackImage = (
  title = ""
) => {

  const t =
    title.toLowerCase();

  if (t.includes("food"))
    return "/images/food.jpg";

  if (
    t.includes("medical") ||
    t.includes("surgery")
  )
    return "/images/medical.jpg";

  if (
    t.includes("school") ||
    t.includes("education")
  )
    return "/images/school.jpg";

  if (t.includes("water"))
    return "/images/water.jpg";

  if (
    t.includes("flood") ||
    t.includes("disaster")
  )
    return "/images/flood.jpg";

  return "/images/oldman.jpg";

};

/* ================================================= */
/* ================= COMPONENT ===================== */
/* ================================================= */

function MyDonations({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  const [donations, setDonations] =
    useState([]);

  const [showPanel, setShowPanel] =
    useState(false);

  /* ================================================= */
  /* ================= LOAD DONATIONS ================= */
  /* ================================================= */

  const loadDonations = () => {

    try {

      const localDonations =
        JSON.parse(
          localStorage.getItem(
            "donations"
          ) || "[]"
        );

      const fixedDonations =
        localDonations.map(
          (donation) => {

            let translatedTitle =
              donation.title;

            if (
              donation.title ===
              "Clean Water"
            ) {

              translatedTitle =
                "cleanWater";

            }

            else if (
              donation.title ===
              "Medical Aid"
            ) {

              translatedTitle =
                "medicalAid";

            }

            else if (
              donation.title ===
              "Donation Campaign"
            ) {

              translatedTitle =
                "donationCampaign";

            }

            else if (
              donation.title ===
              "Flood Relief"
            ) {

              translatedTitle =
                "floodRelief";

            }

            else if (
              donation.title ===
              "Food Help"
            ) {

              translatedTitle =
                "foodHelp";

            }

            else if (
              donation.title ===
              "Education Support"
            ) {

              translatedTitle =
                "educationSupport";

            }

            return {

              ...donation,

              title:
                translatedTitle,

              image:
                donation.image ||

                getFallbackImage(
                  donation.title
                ),

              amount: Number(
                donation.amount || 0
              ),

              created_at:
                donation.created_at ||

                donation.date ||

                new Date().toISOString(),

            };

          }
        );

      fixedDonations.sort(
        (a, b) =>

          new Date(
            b.created_at
          ) -

          new Date(
            a.created_at
          )
      );

      setDonations(
        fixedDonations
      );

    }

    catch (error) {

      console.error(
        "Failed loading donations:",
        error
      );

      setDonations([]);

    }

  };

  useEffect(() => {

    loadDonations();

    const syncDonations = () => {

      loadDonations();

    };

    window.addEventListener(
      "storage",
      syncDonations
    );

    window.addEventListener(
      "focus",
      syncDonations
    );

    return () => {

      window.removeEventListener(
        "storage",
        syncDonations
      );

      window.removeEventListener(
        "focus",
        syncDonations
      );

    };

  }, []);

  /* ================================================= */
  /* ================= LOCK SCROLL =================== */
  /* ================================================= */

  useEffect(() => {

    document.body.style.overflow =
      showPanel
        ? "hidden"
        : "auto";

    return () => {

      document.body.style.overflow =
        "auto";

    };

  }, [showPanel]);

  /* ================================================= */
  /* ================= DELETE ======================== */
  /* ================================================= */

  const removeDonation = (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        t(
          "removeDonationConfirm",
          "Delete this donation?"
        )
      );

    if (!confirmDelete)
      return;

    const updated =
      donations.filter(
        (donation) =>
          donation.id !== id
      );

    setDonations(updated);

    localStorage.setItem(
      "donations",
      JSON.stringify(updated)
    );

  };

  /* ================================================= */
  /* ================= TOTALS ======================== */
  /* ================================================= */

  const totalAmount =
    useMemo(() => {

      return donations.reduce(
        (
          sum,
          donation
        ) =>

          sum +
          Number(
            donation.amount || 0
          ),

        0
      );

    }, [donations]);

  const peopleHelped =
    donations.length * 3;

  const supportedCauses =
    useMemo(() => {

      return new Set(
        donations.map(
          (d) => d.title
        )
      ).size;

    }, [donations]);

  return (

    <div style={container}>

      <Sidebar
        darkMode={darkMode}
      />

      <div style={main(
        darkMode
      )}>

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onTogglePanel={() =>
            setShowPanel(
              (prev) => !prev
            )
          }
        />

        <div style={wrapper}>

          {/* HEADER */}

          <div>

            <h2 style={title(
              darkMode
            )}>

              {t(
                "myDonations",
                "My Donations"
              )} 💚

            </h2>

            <p style={subtitle(
              darkMode
            )}>

              {t(
                "trackDonations",
                "Track your donations and impact in real time."
              )}

            </p>

          </div>

          {/* HERO */}

          <div style={topGrid}>

            <div style={hero}>

              <div style={heroOverlay} />

              <div style={heroGlow}></div>

              <div style={heroContent}>

                <p style={heroSmall}>

                  {t(
                    "totalDonated",
                    "Total Donated"
                  )}

                </p>

                <h1 style={heroAmount}>

                  $
                  {totalAmount.toLocaleString()}

                </h1>

                <span style={heroText}>

                  {t(
                    "acrossCampaigns",
                    "Across all campaigns and requests"
                  )}

                </span>

              </div>

            </div>

            {/* STATS */}

            <div style={stats}>

              <Stat
                title={t(
                  "totalDonations",
                  "Total Donations"
                )}
                value={donations.length}
                icon={<FaDollarSign />}
                color="#22c55e"
              />

              <Stat
                title={t(
                  "peopleHelped",
                  "People Helped"
                )}
                value={`${peopleHelped}+`}
                icon={<FaUsers />}
                color="#8b5cf6"
              />

              <Stat
                title={t(
                  "causesSupported",
                  "Causes Supported"
                )}
                value={supportedCauses}
                icon={<FaHeart />}
                color="#f97316"
              />

              <Stat
                title={t(
                  "thisMonth",
                  "This Month"
                )}
                value={`$${totalAmount.toLocaleString()}`}
                icon={<HiOutlineTrendingUp />}
                color="#3b82f6"
              />

            </div>

          </div>

          {/* ANALYTICS */}

          <div style={impactCard(
            darkMode
          )}>

            <div style={impactGlow}></div>

            <h3 style={impactTitle(
              darkMode
            )}>

              {t(
                "donationAnalytics",
                "Donation Analytics"
              )}

            </h3>

            <DonationChartMyDonations
              darkMode={darkMode}
              donations={donations}
            />

           <TopCauses
  donations={donations}
  darkMode={darkMode}
/>
          </div>

          {/* RECENT DONATIONS */}

          <div style={donationSection}>

            <h3 style={donationTitle(
              darkMode
            )}>

              {t(
                "recentDonations",
                "Recent Donations"
              )}

            </h3>

            {donations.length === 0 ? (

              <div style={emptyState(
                darkMode
              )}>

                <FaHeart
                  size={40}
                  color="#22c55e"
                />

                <h3>

                  {t(
                    "noDonationsYet",
                    "No donations yet"
                  )}

                </h3>

                <p>

                  {t(
                    "donationHistory",
                    "Your donation history will appear here."
                  )}

                </p>

              </div>

            ) : (

              <div style={donationGrid}>

                {donations.map(
                  (donation) => (

                    <div
                      key={donation.id}
                      style={donationCard(
                        darkMode
                      )}
                    >

                      <img
                        src={donation.image}
                        alt={donation.title}
                        style={donationImage}
                      />

                      <div style={donationInfo}>

                        <h4 style={donationName(
                          darkMode
                        )}>

                          {t(
                            donation.title
                          )}

                        </h4>

                        <p style={donationDate(
                          darkMode
                        )}>

                          {new Date(
                            donation.created_at
                          ).toLocaleString()}

                        </p>

                        <div style={donationBottom}>

                          <span style={donationAmount}>

                            $
                            {Number(
                              donation.amount
                            ).toLocaleString()}

                          </span>

                          <button
                            style={deleteBtn}
                            onClick={() =>
                              removeDonation(
                                donation.id
                              )
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* THANK YOU */}

          <div style={thankCard}>

            <FaHeart
              color="#22c55e"
              size={20}
            />

            <div style={thankText}>

              <p style={thankTitle}>

                {t(
                  "thankYouDifference",
                  "Thank you for making a difference"
                )} 💚

              </p>

              <span style={thankSub}>

                {t(
                  "everyDonationChangesLives",
                  "Every donation changes lives."
                )}

              </span>

            </div>

            <FaHeart
              color="#22c55e"
              size={20}
            />

          </div>

        </div>

        {/* OVERLAY */}

        {showPanel && (

          <div
            style={overlay}
            onClick={() =>
              setShowPanel(false)
            }
          />

        )}

        {/* RIGHT PANEL */}

        <div
          style={{

            ...panel(
              darkMode
            ),

            transform:
              showPanel

                ? "translateX(0)"

                : "translateX(100%)",

          }}
        >

          <div style={panelTop}>

            <button
              onClick={() =>
                setShowPanel(false)
              }

              style={closeBtn(
                darkMode
              )}

              onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                  "translateY(-2px) scale(1.06)";

                e.currentTarget.style.background =
                  "linear-gradient(135deg,#ef4444,#dc2626)";

                e.currentTarget.style.boxShadow =
                  "0 16px 40px rgba(239,68,68,0.35)";

              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                  "translateY(0) scale(1)";

                e.currentTarget.style.background =
                  "rgba(255,255,255,0.08)";

                e.currentTarget.style.boxShadow =
                  "0 10px 26px rgba(0,0,0,0.18)";

              }}
            >

              <FaTimes />

            </button>

          </div>

          <MyDonationsRightPanel
            darkMode={darkMode}
            donations={donations}
          />

        </div>

      </div>

    </div>

  );

}

export default MyDonations;

/* ================================================= */
/* ================= STAT ========================== */
/* ================================================= */

function Stat({
  title,
  value,
  icon,
  color,
}) {

  return (

    <div
      style={{

        ...statCard,

        background:
          `${color}15`,

      }}
    >

      <div
        style={{

          ...iconBox,

          color,

        }}
      >

        {icon}

      </div>

      <div>

        <p style={statTitle}>

          {title}

        </p>

        <h3 style={statValue}>

          {value}

        </h3>

      </div>

    </div>

  );

}

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = {

  display: "grid",

  gridTemplateColumns:
    "230px 1fr",

  minHeight: "100vh",

};

const main = (
  darkMode
) => ({

  padding: "30px",

  background: darkMode
    ? "#020617"
    : "#f1f5f9",

  minHeight: "100vh",

  overflowX: "hidden",

  position: "relative",

});

const wrapper = {

  display: "flex",

  flexDirection: "column",

  gap: "26px",

};

const title = (
  darkMode
) => ({

  fontSize: "34px",

  fontWeight: "900",

  color: darkMode
    ? "#fff"
    : "#111827",

});

const subtitle = (
  darkMode
) => ({

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

});

const topGrid = {

  display: "grid",

  gridTemplateColumns:
    "2fr 1fr",

  gap: "22px",

};

const hero = {

  height: "320px",

  borderRadius: "34px",

  backgroundImage:
    "url('/images/hero-donation.jpg')",

  backgroundSize: "cover",

  backgroundPosition:
    "center",

  position: "relative",

  overflow: "hidden",

  boxShadow:
    "0 30px 80px rgba(0,0,0,0.25)",

};

const heroOverlay = {

  position: "absolute",

  inset: 0,

  background:
    "linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.28))",

};

const heroGlow = {

  position: "absolute",

  width: "260px",

  height: "260px",

  borderRadius: "50%",

  background:
    "rgba(34,197,94,0.20)",

  filter: "blur(120px)",

  top: "-50px",

  right: "-50px",

};

const heroContent = {

  position: "relative",

  zIndex: 2,

  padding: "44px",

  color: "#fff",

};

const heroSmall = {

  fontSize: "16px",

  color: "#cbd5e1",

};

const heroAmount = {

  fontSize: "68px",

  fontWeight: "900",

  margin: "10px 0",

};

const heroText = {

  color: "#e2e8f0",

};

const stats = {

  display: "flex",

  flexDirection: "column",

  gap: "14px",

};

const statCard = {

  display: "flex",

  gap: "16px",

  padding: "22px",

  borderRadius: "22px",

  backdropFilter:
    "blur(20px)",

  boxShadow:
    "0 16px 40px rgba(0,0,0,0.08)",

};

const iconBox = {

  width: "48px",

  height: "48px",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "center",

  fontSize: "20px",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.4)",

};

const statTitle = {

  fontSize: "13px",

  color: "#64748b",

};

const statValue = {

  fontSize: "22px",

  fontWeight: "800",

};

const impactCard = (
  darkMode
) => ({

  position: "relative",

  overflow: "hidden",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(15,23,42,0.95),
        rgba(30,41,59,0.90)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.95),
        rgba(248,250,252,0.88)
      )
    `,

  borderRadius: "30px",

  padding: "28px",

  border:
    darkMode

      ? "1px solid rgba(255,255,255,0.05)"

      : "1px solid rgba(255,255,255,0.9)",

  boxShadow:
    "0 24px 60px rgba(0,0,0,0.12)",

});

const impactGlow = {

  position: "absolute",

  width: "220px",

  height: "220px",

  borderRadius: "50%",

  background:
    "rgba(37,99,235,0.15)",

  filter: "blur(100px)",

  top: "-60px",

  right: "-60px",

};

const impactTitle = (
  darkMode
) => ({

  marginBottom: "22px",

  fontSize: "24px",

  fontWeight: "800",

  color: darkMode
    ? "#fff"
    : "#111827",

});

const donationSection = {

  display: "flex",

  flexDirection: "column",

  gap: "22px",

};

const donationTitle = (
  darkMode
) => ({

  color: darkMode
    ? "#fff"
    : "#111827",

  fontSize: "24px",

  fontWeight: "800",

});

const donationGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",

  gap: "24px",

};

const donationCard = (
  darkMode
) => ({

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  borderRadius: "28px",

  overflow: "hidden",

  boxShadow:
    "0 24px 60px rgba(0,0,0,0.12)",

});

const donationImage = {

  width: "100%",

  height: "220px",

  objectFit: "cover",

};

const donationInfo = {

  padding: "22px",

};

const donationName = (
  darkMode
) => ({

  fontSize: "20px",

  fontWeight: "800",

  marginBottom: "10px",

  color: darkMode
    ? "#fff"
    : "#111827",

});

const donationDate = (
  darkMode
) => ({

  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

  marginBottom: "18px",

});

const donationBottom = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

};

const donationAmount = {

  color: "#22c55e",

  fontWeight: "900",

  fontSize: "24px",

};

const deleteBtn = {

  width: "46px",

  height: "46px",

  borderRadius: "16px",

  border: "none",

  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",

  color: "#fff",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

};

const emptyState = (
  darkMode
) => ({

  background: darkMode
    ? "#0f172a"
    : "#fff",

  padding: "70px 30px",

  borderRadius: "30px",

  textAlign: "center",

  color: darkMode
    ? "#fff"
    : "#111827",

});

const thankCard = {

  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",

  gap: "16px",

  padding: "24px",

  borderRadius: "28px",

  background:
    "linear-gradient(135deg,#ecfdf5,#d1fae5)",

};

const thankText = {

  flex: 1,

  textAlign: "center",

};

const thankTitle = {

  margin: 0,

  fontWeight: "800",

  color: "#166534",

};

const thankSub = {

  fontSize: "13px",

  color: "#15803d",

};

const overlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(2,6,23,0.58)",

  backdropFilter:
    "blur(8px)",

  zIndex: 9999,

};

const panel = (
  darkMode
) => ({

  position: "fixed",

  top: 0,

  right: 0,

  width: "420px",

  height: "100vh",

  overflowY: "auto",

  padding: "24px",

  boxSizing: "border-box",

  background: darkMode
    ? "#020617"
    : "#f8fafc",

  boxShadow:
    "-30px 0 80px rgba(0,0,0,0.28)",

  transition:
    "transform 0.45s cubic-bezier(.4,2,.6,1)",

  zIndex: 10000,

});

const panelTop = {

  display: "flex",

  justifyContent: "flex-end",

  marginBottom: "18px",

};

const closeBtn = (
  darkMode
) => ({

  width: "44px",

  height: "44px",

  borderRadius: "16px",

  border: "none",

  background:
    "rgba(255,255,255,0.08)",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "18px",

  transition:
    "all 0.3s ease",

  boxShadow:
    "0 10px 26px rgba(0,0,0,0.18)",

});