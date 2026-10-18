import React, {
  useMemo,
} from "react";

import {
  useHistory,
} from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

/* ================================================= */
/* ================= REQUEST MAP =================== */
/* ================================================= */

const requestMap = {

  heartSurgery: {
    title:
      "Heart Surgery For Children",
    image:
      "/images/medical.jpg",
    category:
      "medical",
  },

  medicalAid: {
    title:
      "Medical Aid Campaign",
    image:
      "/images/medical.jpg",
    category:
      "medical",
  },

  floodRelief: {
    title:
      "Flood Relief Emergency",
    image:
      "/images/flood.jpg",
    category:
      "disaster",
  },

  cleanWater: {
    title:
      "Clean Water Wells",
    image:
      "/images/water.jpg",
    category:
      "water",
  },

  foodHelp: {
    title:
      "Food Help Campaign",
    image:
      "/images/food.jpg",
    category:
      "food",
  },

  educationSupport: {
    title:
      "Education Support For Kids",
    image:
      "/images/school.jpg",
    category:
      "education",
  },

};

/* ================================================= */
/* ================= COMPONENT ===================== */
/* ================================================= */

function RightPanel({
  darkMode,
  donations = [],
  onClose,
}) {
 const history =
  useHistory();
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

      }

      catch {

        return [];

      }

    }, [donations]);

  /* ================================================= */
  /* ================= CLEAN DATA ==================== */
  /* ================================================= */

  const cleanedDonations =
    useMemo(() => {

      return realDonations.map(
        (d) => {

          const mapped =
            requestMap[
              d.title
            ] || {};

          return {

            ...d,

            cleanTitle:

              mapped.title ||

              d.title ||

              "Donation Campaign",

            cleanImage:

              d.image ||

              mapped.image ||

              "/images/help.jpg",

            cleanCategory:

              d.category ||

              mapped.category ||

              "others",

          };

        }
      );

    }, [realDonations]);

  /* ================================================= */
  /* ================= CATEGORY DATA ================= */
  /* ================================================= */

  const data =
    useMemo(() => {

      const categories = {

        medical: 0,

        education: 0,

        disaster: 0,

        others: 0,

      };

      cleanedDonations.forEach(
        (d) => {

          const cat =
            (
              d.cleanCategory ||
              ""
            ).toLowerCase();

          const amount =
            Number(
              d.amount || 0
            );

          if (
            cat.includes(
              "medical"
            )
          ) {

            categories.medical +=
              amount;

          }

          else if (
            cat.includes(
              "education"
            )
          ) {

            categories.education +=
              amount;

          }

          else if (
            cat.includes(
              "disaster"
            )
          ) {

            categories.disaster +=
              amount;

          }

          else {

            categories.others +=
              amount;

          }

        }
      );

      const total =
        Object.values(
          categories
        ).reduce(
          (a, b) => a + b,
          0
        ) || 1;

      return [

        {
          name:
            "Medical",
          value:
            Math.round(
              (categories.medical /
                total) *
                100
            ),
          color:
            "#22c55e",
        },

        {
          name:
            "Education",
          value:
            Math.round(
              (categories.education /
                total) *
                100
            ),
          color:
            "#2563eb",
        },

        {
          name:
            "Disaster",
          value:
            Math.round(
              (categories.disaster /
                total) *
                100
            ),
          color:
            "#a855f7",
        },

        {
          name:
            "Others",
          value:
            Math.round(
              (categories.others /
                total) *
                100
            ),
          color:
            "#f59e0b",
        },

      ];

    }, [cleanedDonations]);

  return (

    <div style={container}>

      {/* HEADER */}

      <div style={topHeader}>

        <div>

          <h1 style={mainTitle(
            darkMode
          )}>

            Insights

          </h1>

          <p style={mainSub(
            darkMode
          )}>

            Donation analytics

          </p>

        </div>

        <button

  style={closeBtn}

  onClick={onClose}

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
  <FaTimes />
</button>

      </div>

      {/* RECENT DONATIONS */}

      <div
        style={card(
          darkMode
        )}
      >

        <div style={glow}></div>

        <div style={header}>

          <h2 style={title(
            darkMode
          )}>

            Recent Donations

          </h2>

          <span style={viewAll}>

            See All

          </span>

        </div>

        {cleanedDonations.length ===
        0 ? (

          <div
            style={emptyState(
              darkMode
            )}
          >

            No donations yet

          </div>

        ) : (

          cleanedDonations
            .slice(0, 5)

            .map(
              (
                donation,
                i
              ) => (

                <DonationItem

                  key={i}

                  darkMode={
                    darkMode
                  }

                  img={
                    donation.cleanImage
                  }

                  title={
                    donation.cleanTitle
                  }

                  amount={`$${Number(
                    donation.amount || 0
                  ).toFixed(2)}`}

                  time={
                    donation.created_at

                      ? new Date(
                          donation.created_at
                        ).toLocaleString()

                      : "Unknown"
                  }

                />

              )
            )

        )}
<button

  style={btn}

  onClick={() => {

   history.push(
  "/my-donations"
);

  }}

  onMouseEnter={(e) => {

    e.currentTarget.style.transform =
      "translateY(-2px) scale(1.02)";

    e.currentTarget.style.boxShadow =
      "0 20px 40px rgba(34,197,94,0.35)";

  }}

  onMouseLeave={(e) => {

    e.currentTarget.style.transform =
      "translateY(0) scale(1)";

    e.currentTarget.style.boxShadow =
      "0 14px 30px rgba(34,197,94,0.30)";

  }}

>

  View All Donations

  <FaArrowRight />

</button>

      </div>

      {/* CATEGORY */}

      <div
        style={card(
          darkMode
        )}
      >

        <div style={glowPurple}></div>

        <h2 style={title(
          darkMode
        )}>

          Causes By Category

        </h2>

       <ResponsiveContainer
  width="100%"
  height={220}
>

  <PieChart>

    <Pie
      data={data}
      dataKey="value"
      innerRadius={52}
      outerRadius={80}
      paddingAngle={4}
    >

      {data.map(
        (
          entry,
          i
        ) => (

          <Cell
            key={i}
            fill={
              entry.color
            }
          />

        )
      )}

    </Pie>

  </PieChart>

</ResponsiveContainer>

<div style={legend}>

  {data.map(
    (
      item,
      i
    ) => (

      <div
        key={i}
        style={
          legendRow
        }
      >

        <span
          style={{
            ...dot,
            background:
              item.color,
          }}
        />

        <span
          style={{
            flex: 1,
            color:
              darkMode
                ? "#f8fafc"
                : "#0f172a",
            fontWeight: "600",
          }}
        >

          {item.name}

        </span>

        <span
          style={percentage(
            darkMode
          )}
        >

          {item.value}%

        </span>

      </div>

    )
  )}

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
        alt=""
        style={avatar}
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

          <span style={dotSep}>
            •
          </span>

          {time}

        </p>

      </div>

    </div>

  );

}

export default RightPanel;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = {

  width: "100%",

  display: "flex",

  flexDirection: "column",

  gap: "22px",

  padding: "8px 2px 28px",

  boxSizing: "border-box",

};

const topHeader = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

};

const mainTitle = (
  darkMode
) => ({

  fontSize: "30px",

  fontWeight: "900",

  color: darkMode
    ? "#f8fafc"
    : "#0f172a",

});

const mainSub = (
  darkMode
) => ({

  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const closeBtn = {

  width: "44px",

  height: "44px",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(14px)",

  WebkitBackdropFilter:
    "blur(14px)",

  color: "#ffffff",

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

const header = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const title = (
  darkMode
) => ({
  fontSize: "22px",
  fontWeight: "800",
  color: darkMode
    ? "#f8fafc"
    : "#0f172a",
});

const viewAll = {
  color: "#2563eb",
  fontWeight: "700",
  fontSize: "14px",
};

const emptyState = (
  darkMode
) => ({
  padding: "30px",
  textAlign: "center",
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const item = (
  darkMode
) => ({
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "14px",
  marginBottom: "12px",
  borderRadius: "20px",
  background: darkMode
    ? `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.06),
        rgba(255,255,255,0.02)
      )
    `
    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.96),
        rgba(248,250,252,0.88)
      )
    `,
});

const avatar = {
  width: "56px",
  height: "56px",
  borderRadius: "16px",
  objectFit: "cover",
};

const itemTitle = (
  darkMode
) => ({
  fontSize: "15px",
  fontWeight: "700",
  color: darkMode
    ? "#f8fafc"
    : "#0f172a",
});

const itemSub = (
  darkMode
) => ({
  fontSize: "12px",
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const amountStyle = {
  color: "#22c55e",
  fontWeight: "800",
};

const dotSep = {
  margin: "0 6px",
};

const btn = {
  width: "100%",
  marginTop: "18px",
  padding: "16px",
  borderRadius: "18px",
  border: "none",
  background:
    "linear-gradient(135deg,#22c55e,#2563eb)",
  color: "#fff",
  fontWeight: "800",
  fontSize: "15px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};
const legend = {

  marginTop: "18px",

};

const legendRow = {

  display: "flex",

  alignItems: "center",

  gap: "10px",

  padding: "12px 0",

  borderBottom:
    "1px solid rgba(148,163,184,0.08)",

};

const dot = {

  width: "12px",

  height: "12px",

  borderRadius: "50%",

};

const percentage = (
  darkMode
) => ({

  fontWeight: "800",

  color: darkMode
    ? "#f8fafc"
    : "#0f172a",

});