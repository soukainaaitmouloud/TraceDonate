// src/pages/DonorDashboard.js

import React, {
  useState,
  useEffect,
} from "react";

import { useTranslation } from "react-i18next";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import StatsCards from "../components/StatsCards";
import RequestCard from "../components/RequestCard";
import RightPanel from "../components/RightPanel";
import DonationChart from "../components/DonationChart";

function DonorDashboard({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  const [showPanel, setShowPanel] =
    useState(false);

  const [requests, setRequests] =
    useState([]);

  const [
    recentDonations,
    setRecentDonations,
  ] = useState([]);

  /* ================================================= */
  /* ================= DRAWER ANIMATION ============== */
  /* ================================================= */

  useEffect(() => {

    if (
      !document.getElementById(
        "drawer-animation"
      )
    ) {

      const style =
        document.createElement(
          "style"
        );

      style.id =
        "drawer-animation";

      style.innerHTML = `

        @keyframes slideIn {

          0% {

            transform: translateX(100%);

            opacity: 0;

          }

          100% {

            transform: translateX(0);

            opacity: 1;

          }

        }

      `;

      document.head.appendChild(
        style
      );

    }

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
  /* ================= FETCH REQUESTS ================ */
  /* ================================================= */

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    const fetchData =
      async () => {

        try {

          const res =
            await fetch(
              "http://localhost:5000/all-requests",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (
            Array.isArray(data) &&
            data.length > 0
          ) {

            setRequests(data);

          }

          else {

            setRequests(cards);

          }

        }

        catch (err) {

          console.log(
            "API error → using fallback cards"
          );

          setRequests(cards);

        }

      };

    fetchData();

  }, []);

  /* ================================================= */
  /* ================= HANDLE DONATION =============== */
  /* ================================================= */

  const handleDonate = (
    donation
  ) => {

    setRecentDonations(
      (prev) => [

        donation,

        ...prev.slice(0, 5),

      ]
    );

  };

  return (

    <div style={container}>

      {/* ================================================= */}
      {/* ================= SIDEBAR ======================= */}
      {/* ================================================= */}

      <Sidebar
        darkMode={darkMode}
      />

      {/* ================================================= */}
      {/* ================= MAIN ========================== */}
      {/* ================================================= */}

      <div
        style={main(
          darkMode
        )}
      >

        <div style={wrapper}>

          {/* TOPBAR */}

          <Topbar

            onTogglePanel={() =>
              setShowPanel(true)
            }

            darkMode={darkMode}

            setDarkMode={
              setDarkMode
            }

          />

          {/* HERO */}

          <Hero />

          {/* STATS */}

          <StatsCards
            darkMode={darkMode}
          />

          {/* TITLE */}

          <h2 style={title}>

            {t(
              "featuredUrgentRequests"
            )}

          </h2>

          {/* REQUEST GRID */}

          <div
  id="requests-section"
  style={grid}
>

            {requests.length >
            0 ? (

              requests.map(
                (
                  c,
                  index
                ) => (

                  <RequestCard

                    key={
                      c._id ||
                      index
                    }

                    id={
                      c._id ||
                      index
                    }

                    title={
                      c.title
                    }

                    image={
                      c.image ||
                      c.img
                    }

                    raised={
                      c.raised
                    }

                    goal={
                      c.goal
                    }

                    desc={
                      c.desc
                    }

                    category={
                      c.category
                    }

                    author={
                      c.author
                    }

                    urgent={
                      c.urgent
                    }

                    darkMode={
                      darkMode
                    }

                    onDonate={
                      handleDonate
                    }

                  />

                )
              )

            ) : (

              <div
                style={emptyBox}
              >

                <div
                  style={
                    emptyIcon
                  }
                >

                  📭

                </div>

                <p>

                  {t(
                    "noRequestsFound"
                  )}

                </p>

              </div>

            )}

          </div>

          {/* CHART */}

          <DonationChart
            darkMode={darkMode}
          />

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= RIGHT DRAWER ================== */}
      {/* ================================================= */}

      {showPanel && (

        <div

          style={overlay}

          onClick={() =>
            setShowPanel(false)
          }

        >

          <div

            style={drawer(
              darkMode
            )}

            onClick={(e) =>
              e.stopPropagation()
            }

          >

            <RightPanel

              darkMode={
                darkMode
              }

              donations={
                recentDonations
              }

            />

          </div>

        </div>

      )}

    </div>

  );

}

export default DonorDashboard;

/* ================================================= */
/* ================= FALLBACK DATA ================= */
/* ================================================= */

const cards = [

  {

    _id: 1,

    title:
      "heartSurgery",

    image:
      "food.jpg",

    raised: 3200,

    goal: 5000,

    desc:
      "medicalAidDesc",

    category:
      "medical",

    author:
      "healthFoundation",

    urgent: true,

  },

  {

    _id: 2,

    title:
      "floodRelief",

    image:
      "flood.jpg",

    raised: 7850,

    goal: 10000,

    desc:
      "floodReliefDesc",

    category:
      "disasterRelief",

    author:
      "helpingHandsOrg",

    urgent: true,

  },

  {

    _id: 3,

    title:
      "educationSupport",

    image:
      "school.jpg",

    raised: 1150,

    goal: 3000,

    desc:
      "supportEducationDesc",

    category:
      "education",

    author:
      "educationOrg",

    urgent: false,

  },

  {

    _id: 4,

    title:
      "medicalAid",

    image:
      "medical.jpg",

    raised: 4100,

    goal: 8000,

    desc:
      "medicalAidDesc",

    category:
      "medical",

    author:
      "healthFoundation",

    urgent: true,

  },

  {

    _id: 5,

    title:
      "foodHelp",

    image:
      "oldman.jpg",

    raised: 1900,

    goal: 4000,

    desc:
      "foodSupportDesc",

    category:
      "communityHelp",

    author:
      "helpingHandsOrg",

    urgent: false,

  },

  {

    _id: 6,

    title:
      "cleanWater",

    image:
      "water.jpg",

    raised: 5200,

    goal: 9000,

    desc:
      "cleanWaterDesc",

    category:
      "water",

    author:
      "waterReliefOrg",

    urgent: false,

  },

];

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = {

  display: "grid",

  gridTemplateColumns:
    "230px 1fr",

  minHeight: "100vh",

  overflow: "hidden",

};

const main = (
  darkMode
) => ({

  padding: "30px",

  background: darkMode
    ? "#020617"
    : "#f1f5f9",

  color: darkMode
    ? "#e2e8f0"
    : "#000",

  transition:
    "all 0.3s ease",

  width: "100%",

  minWidth: 0,

  overflowX: "hidden",

});

const wrapper = {

  display: "flex",

  flexDirection:
    "column",

  gap: "24px",

};

const title = {

  fontSize: "24px",

  fontWeight: "800",

  letterSpacing: "-0.5px",

};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",

  gap: "22px",

};

const emptyBox = {

  padding: "50px",

  textAlign: "center",

  opacity: 0.7,

};

const emptyIcon = {

  fontSize: "32px",

  marginBottom: "12px",

};

const overlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(0,0,0,0.45)",

  backdropFilter:
    "blur(8px)",

  WebkitBackdropFilter:
    "blur(8px)",

  zIndex: 1000,

};

const drawer = (
  darkMode
) => ({

  position: "fixed",

  top: 0,

  right: 0,

  width: "470px",

  minWidth: "470px",

  maxWidth: "470px",

  height: "100vh",

  zIndex: 2000,

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(2,6,23,0.96),
        rgba(15,23,42,0.92)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.94),
        rgba(248,250,252,0.90)
      )
    `,

  backdropFilter:
    "blur(24px)",

  WebkitBackdropFilter:
    "blur(24px)",

  color: darkMode
    ? "#e2e8f0"
    : "#0f172a",

  boxShadow:
    "-30px 0 80px rgba(0,0,0,0.35)",

  borderLeft: darkMode

    ? "1px solid rgba(255,255,255,0.06)"

    : "1px solid rgba(255,255,255,0.9)",

  padding: "26px 18px",

  overflowY: "auto",

  overflowX: "hidden",

  animation:
    "slideIn 0.35s cubic-bezier(.4,2,.6,1)",

});