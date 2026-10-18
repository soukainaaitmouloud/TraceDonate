import React from "react";

import {
  BookOpen,
  Shield,
  Heart,
  Activity,
} from "lucide-react";

import {
  useTranslation,
} from "react-i18next";

function TopCauses({
  donations = [],
  darkMode,
}) {

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= CATEGORY MAP ================== */
  /* ================================================= */

  const categories = {

    education: {

      color: "#22c55e",

      icon: <BookOpen />,

    },

    disasterRelief: {

      color: "#8b5cf6",

      icon: <Shield />,

    },

    medical: {

      color: "#ec4899",

      icon: <Heart />,

    },

    others: {

      color: "#f97316",

      icon: <Activity />,

    },

  };

  /* ================================================= */
  /* ================= CATEGORY DETECT =============== */
  /* ================================================= */

  const getCategory = (
    title
  ) => {

    if (
      !title ||
      typeof title !==
        "string"
    ) {

      return "others";

    }

    const text =
      title.toLowerCase();

    if (
      text.includes(
        "school"
      ) ||

      text.includes(
        "education"
      )
    ) {

      return "education";

    }

    if (
      text.includes(
        "hospital"
      ) ||

      text.includes(
        "medical"
      ) ||

      text.includes(
        "surgery"
      )
    ) {

      return "medical";

    }

    if (
      text.includes(
        "disaster"
      ) ||

      text.includes(
        "relief"
      ) ||

      text.includes(
        "flood"
      )
    ) {

      return "disasterRelief";

    }

    return "others";

  };

  /* ================================================= */
  /* ================= GROUP DONATIONS =============== */
  /* ================================================= */

  const grouped = {};

  donations.forEach(
    (donation) => {

      const category =

        donation.category ||

        getCategory(
          donation.title || ""
        );

      if (
        !grouped[
          category
        ]
      ) {

        grouped[
          category
        ] = 0;

      }

      grouped[
        category
      ] += Number(
        donation.amount || 0
      );

    }
  );

  const total =
    donations.reduce(
      (sum, donation) => {

        return (
          sum +
          Number(
            donation.amount || 0
          )
        );

      },
      0
    );

  /* ================================================= */
  /* ================= BUILD DATA ==================== */
  /* ================================================= */

  const data =
    Object.keys(
      categories
    ).map((cat) => {

      const amount =
        grouped[cat] || 0;

      const percent =
        total

          ? Math.round(
              (amount /
                total) *
                100
            )

          : 0;

      return {

        name: cat,

        amount:
          `$${amount.toLocaleString()}`,

        percent,

        color:
          categories[cat]
            .color,

        icon:
          categories[cat]
            .icon,

      };

    });

  return (

    <div
      style={card(
        darkMode
      )}
    >

      {/* HEADER */}

      <div style={header}>

        <h3
          style={title(
            darkMode
          )}
        >

          {t(
            "topCausesSupport"
          )}

        </h3>

        <span
          style={seeAll}
        >

          {t(
            "seeAll"
          )}

        </span>

      </div>

      {/* GRID */}

      <div style={grid}>

        {data.map(
          (cause, i) => (

            <div
              key={i}
              style={item(
                darkMode
              )}
            >

              {/* TOP */}

              <div
                style={top}
              >

                <div
                  style={{

                    ...iconBox,

                    background:
                      `${cause.color}15`,

                  }}
                >

                  {React.cloneElement(
                    cause.icon,

                    {

                      size: 18,

                      color:
                        cause.color,

                      strokeWidth: 2,

                    }
                  )}

                </div>

                <span
                  style={name(
                    darkMode
                  )}
                >

                  {t(
                    cause.name
                  )}

                </span>

              </div>

              {/* PROGRESS */}

              <div
                style={
                  progressBg(
                    darkMode
                  )
                }
              >

                <div
                  style={{

                    ...progressFill,

                    width:
                      `${cause.percent}%`,

                    background:
                      cause.color,

                  }}
                />

              </div>

              {/* BOTTOM */}

              <div
                style={bottom(
                  darkMode
                )}
              >

                <span>

                  {
                    cause.amount
                  }

                </span>

                <span>

                  {
                    cause.percent
                  }
                  %

                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default TopCauses;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const card = (
  darkMode
) => ({

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(15,23,42,0.95),
        rgba(30,41,59,0.92)
      )
    `

    : "#ffffff",

  padding: "20px",

  borderRadius: "24px",

  border: darkMode

    ? "1px solid rgba(255,255,255,0.06)"

    : "1px solid rgba(255,255,255,0.9)",

  boxShadow: darkMode

    ? "0 20px 60px rgba(0,0,0,0.30)"

    : "0 16px 40px rgba(0,0,0,0.08)",

});

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "18px",

};

const title = (
  darkMode
) => ({

  margin: 0,

  fontSize: "18px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",

});

const seeAll = {

  color: "#3b82f6",

  fontSize: "13px",

  fontWeight: "700",

  cursor: "pointer",

};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(4, 1fr)",

  gap: "14px",

};

const item = (
  darkMode
) => ({

  padding: "14px",

  borderRadius: "18px",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.04),
        rgba(255,255,255,0.02)
      )
    `

    : "#f8fafc",

  border: darkMode

    ? "1px solid rgba(255,255,255,0.05)"

    : "1px solid rgba(255,255,255,0.8)",

});

const top = {

  display: "flex",

  alignItems: "center",

  gap: "10px",

  marginBottom: "10px",

};

const iconBox = {

  width: "38px",

  height: "38px",

  borderRadius: "14px",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

};

const name = (
  darkMode
) => ({

  fontSize: "14px",

  fontWeight: "700",

  color: darkMode
    ? "#ffffff"
    : "#111827",

});

const progressBg = (
  darkMode
) => ({

  height: "7px",

  background: darkMode
    ? "#1e293b"
    : "#e5e7eb",

  borderRadius: "999px",

  overflow: "hidden",

  margin: "10px 0",

});

const progressFill = {

  height: "100%",

  borderRadius: "999px",

};

const bottom = (
  darkMode
) => ({

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  fontSize: "12px",

  fontWeight: "600",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});