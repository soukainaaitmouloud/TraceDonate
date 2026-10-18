import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DonationChartImpact from "../components/DonationChartImpact";
import ImpactMap from "../components/ImpactMap";
import ImpactRightPanel from "../components/ImpactRightPanel";

import {
  FaHeart,
  FaUsers,
  FaTint,
  FaGraduationCap,
  FaBars,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

function Impact({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  const [donations, setDonations] =
    useState([]);

  const [filter, setFilter] =
    useState("allTime");

  const [showPanel, setShowPanel] =
    useState(false);

  /* ================= LOAD DONATIONS ================= */

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

  /* ================= REAL STATS ================= */

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

    return {

      totalAmount,

      totalDonations:
        donations.length,

      foodDonations:
        donations.filter(
          (d) =>
            d.title?.includes(
              "Food"
            )
        ).length,

      waterDonations:
        donations.filter(
          (d) =>
            d.title?.includes(
              "Water"
            )
        ).length,

      educationDonations:
        donations.filter(
          (d) =>
            d.title?.includes(
              "Education"
            )
        ).length,

    };

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
  setDarkMode={
    setDarkMode
  }
  onTogglePanel={() =>
    setShowPanel(true)
  }
/>

        <div style={content}>

          {/* HERO */}

          <div style={hero}>

           <video
  autoPlay
  muted
  loop
  playsInline
  style={heroVideo}
>

  <source
    src="/videos/donor.mp4"
    type="video/mp4"
  />

</video>

            <div style={overlay}></div>

            <div style={heroContent}>

              <p style={heroMini}>
                💚 {t("yourRealImpact")}
              </p>

              <h1 style={heroTitle}>
                {t(
                  "yourDonations"
                )}
                <br />
                <span>
                  {t(
                    "createRealChange"
                  )}
                </span>
              </h1>

              <p style={heroDesc}>
                {t(
                  "impactHeroDesc"
                )}
              </p>

            </div>

            {/* FLOAT CARD */}

            <div style={floatingCard}>

              <p style={floatingLabel}>
                {t(
                  "totalDonated"
                )}
              </p>

              <h2 style={floatingAmount}>
                $
                {stats.totalAmount.toFixed(
                  0
                )}
              </h2>

              <span style={floatingSub}>
                {t(
                  "verifiedDonations"
                )}
              </span>

            </div>

          </div>

          {/* STATS */}

          <div style={statsGrid}>

            <StatCard
          
  darkMode={darkMode}
  icon={<FaUsers />}
  title={t("totalDonations")}
  value={stats.totalDonations}
  color="#22c55e"
/>

            <StatCard
  darkMode={darkMode}
  icon={<FaHeart />}
  title={t("foodDonations")}
  value={stats.foodDonations}
  color="#3b82f6"
/>

         <StatCard
  darkMode={darkMode}
  icon={<FaTint />}
  title={t("waterDonations")}
  value={stats.waterDonations}
  color="#9333ea"
/>
            <StatCard
  darkMode={darkMode}
  icon={<FaGraduationCap />}
  title={t("educationDonations")}
  value={stats.educationDonations}
  color="#f59e0b"
/>

          </div>

          {/* GRID */}

          <div style={grid}>

            {/* LEFT */}

            <div
              style={left}
            >

              <div
                style={chartCard(
                  darkMode
                )}
              >

                <div
                  style={
                    chartHeader
                  }
                >

                  <div>

                    <h3
                      style={chartTitle(
                        darkMode
                      )}
                    >
                      {t(
                        "donationGrowth"
                      )}
                    </h3>

                    <p
                      style={chartSub(
                        darkMode
                      )}
                    >
                      {t(
                        "realDonationActivity"
                      )}
                    </p>

                  </div>

                  <select
                    value={
                      filter
                    }
                    onChange={(
                      e
                    ) =>
                      setFilter(
                        e.target
                          .value
                      )
                    }
                    style={selectStyle(
                      darkMode
                    )}
                  >

                    <option value="today">
                      {t(
                        "today"
                      )}
                    </option>

                    <option value="thisWeek">
                      {t(
                        "thisWeek"
                      )}
                    </option>

                    <option value="thisMonth">
                      {t(
                        "thisMonth"
                      )}
                    </option>

                    <option value="allTime">
                      {t(
                        "allTime"
                      )}
                    </option>

                  </select>

                </div>

                <DonationChartImpact
                  darkMode={
                    darkMode
                  }
                  donations={
                    donations
                  }
                  filter={
                    filter
                  }
                />

              </div>

              <ImpactMap
                darkMode={
                  darkMode
                }
              />

            </div>

            {/* RIGHT */}

            <div
              style={right}
            >

              <div
                style={activityCard(
                  darkMode
                )}
              >

                <h3 style={activityTitle(darkMode)}>

  🏆 {t("yourDonationActivity")}

</h3>

                <p
                  style={activityText(
                    darkMode
                  )}
                >

                  {t(
                    "youHaveMade"
                  )}{" "}

                  {
                    stats.totalDonations
                  }{" "}

                  {t(
                    "verifiedDonationPlatform"
                  )}

                </p>

                <div
                  style={
                    progressBg
                  }
                >

                  <div
                    style={{
                      ...progressFill,

                      width:
                        `${Math.min(
                          100,
                          stats.totalDonations *
                            10
                        )}%`,
                    }}
                  />

                </div>

                <button
                  style={
                    impactBtn
                  }
                  onClick={() =>
                    setShowPanel(
                      true
                    )
                  }
                >

                  {t(
                    "viewFullImpact"
                  )}{" "}
                  →

                </button>

              </div>

              {/* SUPPORTED */}

              <div
                style={supportedCard(
                  darkMode
                )}
              >

                <h3
                  style={supportedTitle(
                    darkMode
                  )}
                >

                  {t(
                    "supportedCauses"
                  )}

                </h3>

                <div
                  style={
                    supportedGrid
                  }
                >

                  <CauseCard
                    image="/images/medical.jpg"
                   title={t("medicalHelp")}
                  />

                  <CauseCard
                    image="/images/water.jpg"
                   title={t("cleanWater")}
                  />

                  <CauseCard
                    image="/images/school.jpg"
                    title={t("education")}
                  />

                </div>

              </div>

              {/* QUOTE */}

             <img
  src="/images/quote-banner.png"
  alt="quote"
  style={quoteImage}
/>

            </div>

          </div>

        </div>

      </div>

      <ImpactRightPanel
        show={showPanel}
        onClose={() =>
          setShowPanel(false)
        }
        darkMode={darkMode}
      />

    </div>

  );

}

export default Impact;

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  title,
  value,
  color,
  darkMode,
}) {

  return (

   <div style={statCard(darkMode)}>

      <div
        style={{
          ...statIcon,
          background:
            color,
        }}
      >
        {icon}
      </div>

      <div>

     <p style={statLabel(darkMode)}>
          {title}
        </p>

        <h3 style={statValue(darkMode)}>
          {value}
        </h3>

      </div>

    </div>

  );

}

/* ================= CAUSE CARD ================= */

function CauseCard({
  image,
  title,
}) {

  const { t } =
    useTranslation();

  return (

    <div style={causeCard}>

      <img
        src={image}
        alt={title}
        style={causeImage}
      />

      <div
        style={causeOverlay}
      >

        <span
          style={causeTitle}
        >

          {t(title)}

        </span>

      </div>

    </div>

  );

}

/* ================= STYLES ================= */

const container = {
  display: "grid",
  gridTemplateColumns:
    "230px 1fr",
  minHeight: "100vh",
};

const main = (darkMode) => ({
  background: darkMode
    ? "#020617"
    : "#f1f5f9",
  minHeight: "100vh",
  padding: "30px",
});

const content = {
  display: "flex",
  flexDirection: "column",
  gap: "28px",
};

const hero = {
  position: "relative",
  height: "350px",
  borderRadius: "34px",
  overflow: "hidden",
};

const heroImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
const heroVideo = {

  width: "100%",

  height: "100%",

  objectFit: "cover",

};
const overlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(90deg,rgba(0,0,0,0.75),rgba(0,0,0,0.2))",
};

const heroContent = {
  position: "absolute",
  top: "50%",
  left: "40px",
  transform:
    "translateY(-50%)",
  color: "#fff",
  zIndex: 2,
};

const heroMini = {
  color: "#22c55e",
  fontWeight: "700",
};

const heroTitle = {
  fontSize: "64px",
  fontWeight: "900",
  lineHeight: 1,
  margin: "14px 0",
  color: "#fff",
};

const heroDesc = {
  maxWidth: "500px",
  color: "#e2e8f0",
};

const floatingCard = {
  position: "absolute",
  right: "40px",
  top: "50%",
  transform:
    "translateY(-50%)",
  padding: "26px",
  borderRadius: "24px",
  backdropFilter:
    "blur(20px)",
  background:
    "rgba(255,255,255,0.12)",
  color: "#fff",
  zIndex: 2,
};

const floatingLabel = {
  margin: 0,
};

const floatingAmount = {
  margin: "10px 0",
  fontSize: "52px",
  fontWeight: "900",
};

const floatingSub = {
  color: "#86efac",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4,1fr)",
  gap: "18px",
};

const statCard = (
  darkMode
) => ({

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(15,23,42,0.96),
        rgba(30,41,59,0.92)
      )
    `

    : "#ffffff",

  borderRadius: "24px",

  padding: "24px",

  display: "flex",

  alignItems: "center",

  gap: "16px",

  border: darkMode

    ? "1px solid rgba(255,255,255,0.06)"

    : "1px solid #e2e8f0",

  boxShadow: darkMode

    ? "0 10px 40px rgba(0,0,0,0.35)"

    : "0 10px 30px rgba(0,0,0,0.08)",

});

const statIcon = {
  width: "56px",
  height: "56px",
  borderRadius: "18px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};

const statLabel = (
  darkMode
) => ({

  margin: 0,

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});
const statValue = (
  darkMode
) => ({

  marginTop: "6px",

  fontSize: "34px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",

});

const grid = {
  display: "grid",
  gridTemplateColumns:
    "2fr 1fr",
  gap: "24px",
};

const left = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const right = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const chartCard = (darkMode) => ({
  background: darkMode
    ? "#0f172a"
    : "#fff",
  borderRadius: "28px",
  padding: "24px",
});

const chartHeader = {
  display: "flex",
  justifyContent:
    "space-between",
  marginBottom: "18px",
};

const chartTitle = (darkMode) => ({
  margin: 0,
  color: darkMode
    ? "#fff"
    : "#0f172a",
});

const chartSub = (darkMode) => ({
  marginTop: "4px",
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
  fontSize: "13px",
});

const selectStyle = (darkMode) => ({
  padding: "12px 16px",
  borderRadius: "14px",
  border: "none",
  background: darkMode
    ? "#020617"
    : "#f8fafc",
  color: darkMode
    ? "#fff"
    : "#0f172a",
});

const activityCard = (darkMode) => ({
  background: darkMode
    ? "#0f172a"
    : "#fff",
  borderRadius: "28px",
  padding: "24px",
});

const activityTitle = (darkMode) => ({
  color: darkMode
    ? "#fff"
    : "#0f172a",
});

const activityText = (darkMode) => ({
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const progressBg = {
  height: "10px",
  background: "#e2e8f0",
  borderRadius: "999px",
  overflow: "hidden",
  margin: "18px 0",
};

const progressFill = {
  height: "100%",
  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",
};

const impactBtn = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "18px",
  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "#fff",
  fontWeight: "800",
  cursor: "pointer",
};

const supportedCard = (darkMode) => ({
  background: darkMode
    ? "#0f172a"
    : "#fff",
  borderRadius: "28px",
  padding: "24px",
});

const supportedTitle = (darkMode) => ({
  color: darkMode
    ? "#fff"
    : "#0f172a",
});

const supportedGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(3,1fr)",
  gap: "12px",
};

const causeCard = {
  position: "relative",
  borderRadius: "20px",
  overflow: "hidden",
  height: "190px",
};

const causeImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const causeOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top,rgba(0,0,0,0.7),transparent)",
  display: "flex",
  alignItems: "flex-end",
  padding: "16px",
};

const causeTitle = {
  color: "#fff",
  fontWeight: "800",
};

const quoteImage = {
  width: "100%",
  borderRadius: "26px",
};