import React, {
  useEffect,
  useMemo,
} from "react";

import {
  useTranslation,
} from "react-i18next";

/* ================================================= */
/* ================= COMPONENT ===================== */
/* ================================================= */

function BrowseRightPanel({

  darkMode,

  requests = [],

  categoryFilter,

  setCategoryFilter,

}) {

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= ANIMATION ===================== */
  /* ================================================= */

  useEffect(() => {

    if (
      !document.getElementById(
        "panel-anim"
      )
    ) {

      const style =
        document.createElement(
          "style"
        );

      style.id =
        "panel-anim";

      style.innerHTML = `

        @keyframes fadeUp {

          0% {

            opacity: 0;

            transform:
              translateY(20px);

          }

          100% {

            opacity: 1;

            transform:
              translateY(0);

          }

        }

      `;

      document.head.appendChild(
        style
      );

    }

  }, []);

  /* ================================================= */
  /* ================= CATEGORIES ==================== */
  /* ================================================= */

  const categories =
    useMemo(() => {

      const counts = {

        medical: 0,

        education: 0,

        disasterRelief: 0,

        hunger: 0,

      };

      requests.forEach(
        (r) => {

          if (
            counts[
              r.category
            ] !== undefined
          ) {

            counts[
              r.category
            ] += 1;

          }

        }
      );

      return [

        {
          key: "All",
          value:
            requests.length,
        },

        {
          key: "medical",
          value:
            counts.medical,
        },

        {
          key:
            "education",
          value:
            counts.education,
        },

        {
          key:
            "disasterRelief",
          value:
            counts.disasterRelief,
        },

        {
          key: "hunger",
          value:
            counts.hunger,
        },

      ];

    }, [requests]);

  /* ================================================= */
  /* ================= TRENDING ====================== */
  /* ================================================= */

  const trending =
    useMemo(() => {

      return [...requests]

        .sort(
          (a, b) =>

            (b.raised || 0) -
            (a.raised || 0)
        )

        .slice(0, 3);

    }, [requests]);

  /* ================================================= */
  /* ================= REAL STATS ==================== */
  /* ================================================= */

  const totalRaised =
    requests.reduce(
      (
        sum,
        r
      ) =>

        sum +
        (r.raised || 0),

      0
    );

  const getPercent = (
    category
  ) => {

    const amount =
      requests

        .filter(
          (r) =>
            r.category ===
            category
        )

        .reduce(
          (
            sum,
            r
          ) =>

            sum +
            (r.raised || 0),

          0
        );

    return totalRaised
      ? Math.round(
          (amount /
            totalRaised) *
            100
        )
      : 0;

  };

  const medicalPercent =
    getPercent(
      "medical"
    );

  const educationPercent =
    getPercent(
      "education"
    );

  const disasterPercent =
    getPercent(
      "disasterRelief"
    );

  const hungerPercent =
    Math.max(
      0,
      100 -
        medicalPercent -
        educationPercent -
        disasterPercent
    );

  return (

    <div style={panel}>

      {/* ================================================= */}
      {/* ================= FILTERS ======================= */}
      {/* ================================================= */}

      <div
        style={card(
          darkMode,
          0
        )}
      >

        <div style={greenGlow}></div>

        <h3 style={title(
          darkMode
        )}>

          {t("filters")}

        </h3>

        <p style={section(
          darkMode
        )}>

          {t("categories")}

        </p>

        {categories.map(
          (c, i) => (

            <label
              key={i}
              style={
                radioRow(
                  darkMode
                )
              }
            >

              <input

                type="radio"

                name="cat"

                checked={
                  categoryFilter ===
                  c.key
                }

                onChange={() =>
                  setCategoryFilter(
                    c.key
                  )
                }

                style={
                  radioInput
                }

              />

              <span
                style={
                  labelText(
                    darkMode
                  )
                }
              >

                {c.key ===
                "All"

                  ? t("all")

                  : t(c.key)}

                {" "}

                (
                {c.value}
                )

              </span>

            </label>

          )
        )}

        <button style={btn}>

          {t(
            "applyFilters"
          )}

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= TRENDING ====================== */}
      {/* ================================================= */}

      <div
        style={card(
          darkMode,
          0.1
        )}
      >

        <div style={purpleGlow}></div>

        <h3 style={title(
          darkMode
        )}>

          {t(
            "trendingRequests"
          )}

        </h3>

        {trending.map(
          (
            item,
            i
          ) => (

            <div
              key={i}
              style={{

                ...trendItem(
                  darkMode
                ),

                animation:
                  "fadeUp 0.5s ease forwards",

                animationDelay:
                  `${i * 0.1}s`,

                opacity: 0,

              }}
            >

              <img
                src={
                  item.image
                }
                style={
                  trendImg
                }
                alt=""
              />

              <div
                style={{
                  flex: 1,
                }}
              >

                <p
                  style={
                    trendTitle(
                      darkMode
                    )
                  }
                >

                  {t(
                    item.title
                  )}

                </p>

                <span
                  style={
                    trendMoney
                  }
                >

                  $
                  {(
                    item.raised || 0
                  ).toLocaleString()}

                  {" "}

                  {t(
                    "raised"
                  )}

                </span>

              </div>

            </div>

          )
        )}

      </div>

      {/* ================================================= */}
      {/* ================= DONUT ========================= */}
      {/* ================================================= */}

      <div
        style={card(
          darkMode,
          0.2
        )}
      >

        <div style={blueGlow}></div>

        <h3 style={title(
          darkMode
        )}>

          {t(
            "categoriesOverview"
          )}

        </h3>

        <div
          style={chartWrap}
        >

          <div
            style={{

              ...donut,

              background: `

              conic-gradient(

              #22c55e 0% ${medicalPercent}%,

              #2563eb ${medicalPercent}% ${medicalPercent + educationPercent}%,

              #a855f7 ${medicalPercent + educationPercent}% ${medicalPercent + educationPercent + disasterPercent}%,

              #f59e0b ${medicalPercent + educationPercent + disasterPercent}% 100%

              )

            `,

            }}
          >

            <div
              style={donutHole(
                darkMode
              )}
            />

          </div>

        </div>

        <div style={legend}>

          <LegendItem
            darkMode={darkMode}
            color="#22c55e"
            label={t(
              "medical"
            )}
            value={`${medicalPercent}%`}
          />

          <LegendItem
            darkMode={darkMode}
            color="#2563eb"
            label={t(
              "education"
            )}
            value={`${educationPercent}%`}
          />

          <LegendItem
            darkMode={darkMode}
            color="#a855f7"
            label={t(
              "disasterRelief"
            )}
            value={`${disasterPercent}%`}
          />

          <LegendItem
            darkMode={darkMode}
            color="#f59e0b"
            label={t(
              "hunger"
            )}
            value={`${hungerPercent}%`}
          />

        </div>

      </div>

    </div>

  );

}

export default BrowseRightPanel;

/* ================================================= */
/* ================= LEGEND ======================== */
/* ================================================= */

function LegendItem({

  darkMode,

  color,

  label,

  value,

}) {

  return (

    <div style={legendRow}>

      <span
        style={{
          ...legendDot,
          background:
            color,
        }}
      />

      <span
        style={{
          flex: 1,

          color: darkMode
            ? "#f8fafc"
            : "#0f172a",

          fontWeight: "600",

        }}
      >

        {label}

      </span>

      <span
        style={legendValue(
          darkMode
        )}
      >

        {value}

      </span>

    </div>

  );

}

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const panel = {

  width: "100%",

  display: "flex",

  flexDirection: "column",

  gap: "22px",

  padding: "8px 2px 28px",

  boxSizing: "border-box",

};

const card = (
  darkMode,
  delay
) => ({

  position: "relative",

  overflow: "hidden",

  borderRadius: "28px",

  padding: "24px",

  backdropFilter:
    "blur(24px)",

  WebkitBackdropFilter:
    "blur(24px)",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(7,18,38,0.96),
        rgba(15,23,42,0.92)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.88),
        rgba(248,250,252,0.80)
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

  animation:
    "fadeUp 0.5s ease forwards",

  animationDelay:
    `${delay}s`,

  opacity: 0,

});

const greenGlow = {

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

const purpleGlow = {

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

const blueGlow = {

  position: "absolute",

  width: "180px",

  height: "180px",

  borderRadius: "50%",

  background:
    "rgba(37,99,235,0.14)",

  filter: "blur(90px)",

  top: "-50px",

  right: "-50px",

};

const title = (
  darkMode
) => ({

  fontSize: "24px",

  fontWeight: "800",

  marginBottom: "18px",

  color: darkMode
    ? "#f8fafc"
    : "#0f172a",

});

const section = (
  darkMode
) => ({

  marginBottom: "16px",

  fontSize: "14px",

  fontWeight: "700",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const radioRow = (
  darkMode
) => ({

  display: "flex",

  alignItems: "center",

  gap: "14px",

  padding: "14px 16px",

  marginBottom: "12px",

  borderRadius: "18px",

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

  border:
    "1px solid rgba(255,255,255,0.04)",

  cursor: "pointer",

});

const radioInput = {

  width: "18px",

  height: "18px",

};

const labelText = (
  darkMode
) => ({

  fontSize: "15px",

  fontWeight: "600",

  color: darkMode
    ? "#f8fafc"
    : "#0f172a",

});

const btn = {

  width: "100%",

  marginTop: "18px",

  padding: "16px",

  borderRadius: "20px",

  border: "none",

  background:
    "linear-gradient(135deg,#22c55e,#2563eb)",

  color: "#fff",

  fontWeight: "800",

  fontSize: "15px",

  cursor: "pointer",

  boxShadow:
    "0 18px 36px rgba(34,197,94,0.28)",

};

const trendItem = (
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

  border:
    "1px solid rgba(255,255,255,0.04)",

});

const trendImg = {

  width: "58px",

  height: "58px",

  borderRadius: "18px",

  objectFit: "cover",

  boxShadow:
    "0 10px 20px rgba(0,0,0,0.25)",

};

const trendTitle = (
  darkMode
) => ({

  margin: 0,

  fontSize: "15px",

  fontWeight: "700",

  color: darkMode
    ? "#f8fafc"
    : "#0f172a",

});

const trendMoney = {

  fontSize: "13px",

  fontWeight: "700",

  color: "#22c55e",

};

const chartWrap = {

  display: "flex",

  justifyContent:
    "center",

  margin: "18px 0",

};

const donut = {

  width: "160px",

  height: "160px",

  borderRadius: "50%",

  position: "relative",

  boxShadow:
    "0 20px 50px rgba(0,0,0,0.28)",

};

const donutHole = (
  darkMode
) => ({

  position: "absolute",

  top: "50%",

  left: "50%",

  transform:
    "translate(-50%, -50%)",

  width: "82px",

  height: "82px",

  borderRadius: "50%",

  background: darkMode
    ? "#020617"
    : "#ffffff",

  boxShadow:
    "inset 0 4px 14px rgba(0,0,0,0.2)",

});

const legend = {

  marginTop: "12px",

};

const legendRow = {

  display: "flex",

  alignItems: "center",

  gap: "12px",

  padding: "14px 0",

  borderBottom:
    "1px solid rgba(148,163,184,0.08)",

};

const legendDot = {

  width: "14px",

  height: "14px",

  borderRadius: "50%",

};

const legendValue = (
  darkMode
) => ({

  fontWeight: "800",

  color: darkMode
    ? "#f8fafc"
    : "#0f172a",

});