import React, {
  useMemo,
  useState,
} from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useTranslation } from "react-i18next";

function DonationChartMyDonations({
  darkMode,
  donations = [],
}) {

  const { t } =
    useTranslation();

  /* ================= FILTER ================= */

  const [filter, setFilter] =
    useState("month");

  /* ================= SAFE DONATIONS ================= */

  const realDonations =
    useMemo(() => {

      /* ================= PROPS ================= */

      if (
        Array.isArray(
          donations
        ) &&
        donations.length > 0
      ) {

        return donations;

      }

      /* ================= LOCAL STORAGE ================= */

      try {

        const local =
          JSON.parse(
            localStorage.getItem(
              "donations"
            ) || "[]"
          );

        if (
          Array.isArray(local)
        ) {

          return local;

        }

      } catch {}

      /* ================= EMPTY ================= */

      return [];

    }, [donations]);

  /* ================= TOTAL ================= */

  const totalAmount =
    useMemo(() => {

      return realDonations.reduce(
        (sum, d) =>
          sum +
          Number(
            d.amount || 0
          ),
        0
      );

    }, [realDonations]);

  /* ================= CHART DATA ================= */

  const chartData =
    useMemo(() => {

      const now =
        new Date();

      /* ================================================= */
      /* ================= TODAY ========================= */
      /* ================================================= */

      if (
        filter === "today"
      ) {

        return Array.from(
          { length: 24 },
          (_, hour) => {

            const total =
              realDonations
                .filter((d) => {

                  const date =
                    new Date(
                      d.created_at ||
                      d.date
                    );

                  return (

                    date.toDateString() ===
                      now.toDateString() &&

                    date.getHours() ===
                      hour

                  );

                })

                .reduce(
                  (sum, d) =>
                    sum +
                    Number(
                      d.amount || 0
                    ),
                  0
                );

            return {

              name: `${hour}:00`,

              value: total,

            };

          }
        );

      }

      /* ================================================= */
      /* ================= WEEK ========================== */
      /* ================================================= */

      if (
        filter === "week"
      ) {

        const days = [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ];

        return days.map(
          (
            day,
            index
          ) => {

            const total =
              realDonations
                .filter((d) => {

                  const date =
                    new Date(
                      d.created_at ||
                      d.date
                    );

                  return (
                    date.getDay() ===
                    index
                  );

                })

                .reduce(
                  (sum, d) =>
                    sum +
                    Number(
                      d.amount || 0
                    ),
                  0
                );

            return {

              name: day,

              value: total,

            };

          }
        );

      }

      /* ================================================= */
      /* ================= MONTH ========================= */
      /* ================================================= */

      return Array.from(
        { length: 31 },
        (_, day) => {

          const total =
            realDonations
              .filter((d) => {

                const date =
                  new Date(
                    d.created_at ||
                    d.date
                  );

                return (

                  date.getMonth() ===
                    now.getMonth() &&

                  date.getDate() ===
                    day + 1

                );

              })

              .reduce(
                (sum, d) =>
                  sum +
                  Number(
                    d.amount || 0
                  ),
                0
              );

          return {

            name: `${day + 1}`,

            value: total,

          };

        }
      );

    }, [
      filter,
      realDonations,
    ]);

  return (

    <div
      style={container(
        darkMode
      )}
    >

      {/* ================= HEADER ================= */}

      <div style={header}>

        <div>

          <h3
            style={title(
              darkMode
            )}
          >

            {t(
              "yourDonationTrend"
            )}

          </h3>

          <p
            style={subtitle(
              darkMode
            )}
          >

            {t("total")}:

            {" "}

            <strong>

              $
              {totalAmount.toFixed(
                2
              )}

            </strong>

          </p>

        </div>

        {/* ================= FILTER ================= */}

        <select
          style={select(
            darkMode
          )}
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
        >

          <option value="month">

            {t(
              "thisMonth"
            )}

          </option>

          <option value="week">

            {t(
              "thisWeek"
            )}

          </option>

          <option value="today">

            {t(
              "today"
            )}

          </option>

        </select>

      </div>

      {/* ================= CHART ================= */}

      <div style={chartWrapper}>

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >

            {/* GRID */}

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                darkMode
                  ? "#1e293b"
                  : "#e2e8f0"
              }
            />

            {/* GRADIENT */}

            <defs>

              <linearGradient
                id="greenGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            {/* X */}

            <XAxis
              dataKey="name"
              stroke={
                darkMode
                  ? "#94a3b8"
                  : "#64748b"
              }
              tick={{
                fontSize: 12,
              }}
            />

            {/* Y */}

            <YAxis
              stroke={
                darkMode
                  ? "#94a3b8"
                  : "#64748b"
              }
              tick={{
                fontSize: 12,
              }}
            />

            {/* TOOLTIP */}

            <Tooltip
              contentStyle={{
                borderRadius:
                  "12px",

                border: "none",

                background:
                  darkMode
                    ? "#0f172a"
                    : "#ffffff",

                color:
                  darkMode
                    ? "#ffffff"
                    : "#111827",

                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.15)",
              }}
            />

            {/* AREA */}

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#greenGradient)"
              dot={{
                r: 4,
                fill: "#22c55e",
              }}
              activeDot={{
                r: 6,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default DonationChartMyDonations;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = (
  darkMode
) => ({
  width: "100%",
  height: "320px",

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  padding: "20px",

  borderRadius: "22px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.06)",

  border: darkMode
    ? "1px solid #334155"
    : "1px solid #e2e8f0",

  display: "flex",

  flexDirection: "column",
});

const chartWrapper = {
  flex: 1,
  minHeight: 0,
};

const header = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "16px",
};

const title = (
  darkMode
) => ({
  margin: 0,

  fontSize: "18px",

  fontWeight: "700",

  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const subtitle = (
  darkMode
) => ({
  marginTop: "4px",

  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const select = (
  darkMode
) => ({
  padding: "8px 12px",

  borderRadius: "10px",

  border: darkMode
    ? "1px solid #334155"
    : "1px solid #e2e8f0",

  background: darkMode
    ? "#020617"
    : "#ffffff",

  color: darkMode
    ? "#e2e8f0"
    : "#111827",

  cursor: "pointer",

  outline: "none",
});