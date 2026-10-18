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

function DonationChartImpact({
  darkMode,
}) {
  console.log(
    "DONATION CHART REAL FILE"
  );

  const { t } =
    useTranslation();

  /* ================= FILTER ================= */

  const [filter, setFilter] =
    useState("month");

  /* ================= DONATIONS ================= */

  const realDonations =
    useMemo(() => {

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

    }, []);

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

      if (
        filter === "month"
      ) {

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

      }

      /* ================================================= */
      /* ================= ALL TIME ====================== */
      /* ================================================= */

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return months.map(
        (
          month,
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
                  date.getMonth() ===
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

            name: month,

            value: total,

          };

        }
      );

    }, [
      filter,
      realDonations,
    ]);

  /* ================= TOTAL ================= */

  const totalAmount =
    realDonations.reduce(
      (sum, d) =>
        sum +
        Number(
          d.amount || 0
        ),
      0
    );

  return (
    <div
      style={container(
        darkMode
      )}
    >

      {/* HEADER */}

      <div style={header}>

        <div>

          <h3
            style={title(
              darkMode
            )}
          >
            yourDonationTrend
          </h3>

          <p
            style={subtitle(
              darkMode
            )}
          >
            {t("total")}: $

            {totalAmount.toFixed(
              2
            )}

          </p>

        </div>

        {/* FILTER */}

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

          <option value="all">
            allTime
          </option>

        </select>

      </div>

      {/* CHART */}

      <div style={chartWrapper}>

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={chartData}
          >

            <defs>

              <linearGradient
                id="impactGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.4}
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                darkMode
                  ? "#1e293b"
                  : "#e2e8f0"
              }
            />

            <XAxis
              dataKey="name"
              stroke="#64748b"
            />

            <YAxis
              stroke="#64748b"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#impactGradient)"
              dot={{
                r: 3,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DonationChartImpact;

/* ================= STYLES ================= */

const container = (
  darkMode
) => ({
  width: "100%",
  height: "320px",
  background: darkMode
    ? "#0f172a"
    : "#ffffff",
  padding: "16px",
  borderRadius: "18px",
  display: "flex",
  flexDirection: "column",
});

const chartWrapper = {
  flex: 1,
};

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
  fontSize: "20px",
  fontWeight: "800",
  color: darkMode
    ? "#ffffff"
    : "#111827",
});

const subtitle = (
  darkMode
) => ({
  marginTop: "6px",
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const select = (
  darkMode
) => ({
  padding: "8px 12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  background: darkMode
    ? "#020617"
    : "#ffffff",
  color: darkMode
    ? "#ffffff"
    : "#111827",
});