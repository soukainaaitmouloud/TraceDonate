// src/components/needy/DonationsOverview.js

import React, {
  useState,
  useMemo,
} from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  FaArrowTrendUp,
  FaCoins,
  FaChartLine,
} from "react-icons/fa6";

import {
  useTranslation,
} from "react-i18next";

import "./DonationsOverview.css";

function DonationsOverview({
  darkMode,
}) {

  const { t } =
    useTranslation();

  const [filter, setFilter] =
    useState("month");

  /* ================================================= */
  /* ================= DATA ========================== */
  /* ================================================= */

  const monthlyData = useMemo(
    () => [
      {
        name: t("jan"),
        amount: 0,
      },
      {
        name: t("feb"),
        amount: 0,
      },
      {
        name: t("mar"),
        amount: 0,
      },
      {
        name: t("apr"),
        amount: 0,
      },
      {
        name: t("may"),
        amount: 62000,
      },
      {
        name: t("jun"),
        amount: 0,
      },
      {
        name: t("jul"),
        amount: 0,
      },
      {
        name: t("aug"),
        amount: 0,
      },
      {
        name: t("sep"),
        amount: 0,
      },
      {
        name: t("oct"),
        amount: 0,
      },
      {
        name: t("nov"),
        amount: 0,
      },
      {
        name: t("dec"),
        amount: 0,
      },
    ],
    [t]
  );

  const weeklyData = useMemo(
    () => [
      {
        name: t("mon"),
        amount: 4000,
      },
      {
        name: t("tue"),
        amount: 8000,
      },
      {
        name: t("wed"),
        amount: 12000,
      },
      {
        name: t("thu"),
        amount: 9000,
      },
      {
        name: t("fri"),
        amount: 18000,
      },
      {
        name: t("sat"),
        amount: 14000,
      },
      {
        name: t("sun"),
        amount: 22000,
      },
    ],
    [t]
  );

  const todayData = useMemo(
    () => [
      {
        name: "8AM",
        amount: 1000,
      },
      {
        name: "10AM",
        amount: 3000,
      },
      {
        name: "12PM",
        amount: 5000,
      },
      {
        name: "2PM",
        amount: 7000,
      },
      {
        name: "4PM",
        amount: 6000,
      },
      {
        name: "6PM",
        amount: 9000,
      },
    ],
    [t]
  );

  /* ================================================= */
  /* ================= CURRENT DATA ================== */
  /* ================================================= */

  const currentData =
    filter === "week"
      ? weeklyData
      : filter === "today"
      ? todayData
      : monthlyData;

  /* ================================================= */
  /* ================= TOTAL ========================= */
  /* ================================================= */

  const total =
    currentData.reduce(
      (
        acc,
        item
      ) =>
        acc +
        item.amount,
      0
    );

  const highest =
    Math.max(
      ...currentData.map(
        (item) =>
          item.amount
      )
    );

  return (

    <div
      className={`donations-overview ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="overview-header">

        <div className="overview-title-row">

          <div className="overview-icon">

            <FaChartLine />

          </div>

          <div>

            <h2>

              {t(
                "donationGrowth"
              )}

            </h2>

            <p>

              {t(
                "trackDonationPerformance"
              )}

            </p>

          </div>

        </div>

        {/* FILTER */}

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
          className="overview-select"
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

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="overview-stats">

        {/* TOTAL */}

        <div className="overview-stat-card">

          <div className="stat-icon green">

            <FaCoins />

          </div>

          <div>

            <span>

              {t(
                "totalDonated"
              )}

            </span>

            <h3>

              $
              {total.toLocaleString()}

            </h3>

          </div>

        </div>

        {/* HIGHEST */}

        <div className="overview-stat-card">

          <div className="stat-icon blue">

            <FaArrowTrendUp />

          </div>

          <div>

            <span>

              {t(
                "highestDonation"
              )}

            </span>

            <h3>

              $
              {highest.toLocaleString()}

            </h3>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* CHART */}
      {/* ================================================= */}

      <div className="overview-chart">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={currentData}
          >

            {/* GRADIENT */}

            <defs>

              <linearGradient
                id="greenFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            {/* GRID */}

            <CartesianGrid
              strokeDasharray="5 5"
              stroke={
                darkMode
                  ? "rgba(255,255,255,0.08)"
                  : "#e2e8f0"
              }
            />

            {/* X */}

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{
                fill:
                  darkMode
                    ? "#cbd5e1"
                    : "#64748b",

                fontSize: 13,
              }}
            />

            {/* Y */}

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill:
                  darkMode
                    ? "#cbd5e1"
                    : "#64748b",

                fontSize: 13,
              }}
            />

            {/* TOOLTIP */}

            <Tooltip
              contentStyle={{
                borderRadius:
                  "18px",

                border: "none",

                background:
                  darkMode
                    ? "#0f172a"
                    : "#ffffff",

                color:
                  darkMode
                    ? "#ffffff"
                    : "#0f172a",

                boxShadow:
                  "0 18px 40px rgba(15,23,42,0.15)",
              }}

              formatter={(
                value
              ) => [
                `$${value}`,
                t(
                  "donations"
                ),
              ]}
            />

            {/* AREA */}

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#22c55e"
              strokeWidth={5}
              fill="url(#greenFill)"
              dot={{
                r: 5,
                fill: "#22c55e",
              }}
              activeDot={{
                r: 8,
                fill: "#16a34a",
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default DonationsOverview;