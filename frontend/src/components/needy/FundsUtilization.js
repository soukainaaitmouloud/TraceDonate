
// src/components/needy/FundsUtilization.js

import React, {
  useEffect,
  useState,
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  FaArrowDown,
  FaArrowUp,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import toast from "react-hot-toast";

import "./FundsUtilization.css";

function FundsUtilization({
  darkMode,
}) {

  const { t } =
    useTranslation();

  // ================= STATES =================

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    utilizationData,
    setUtilizationData,
  ] = useState([]);

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  // ================= LOAD DATA =================

  useEffect(() => {

    setTimeout(() => {

      // ================= UTILIZATION =================

      setUtilizationData([

        {
          name:
            t(
              "medicalExpenses"
            ),

          value:
            60.4,

          amount:
            "$120,000",

          color:
            "#16a34a",
        },

        {
          name:
            t(
              "dailyNeeds"
            ),

          value:
            22.7,

          amount:
            "$45,000",

          color:
            "#4ade80",
        },

        {
          name:
            t(
              "travelStay"
            ),

          value:
            9.1,

          amount:
            "$18,000",

          color:
            "#86efac",
        },

        {
          name:
            t(
              "otherExpenses"
            ),

          value:
            7.8,

          amount:
            "$15,450",

          color:
            "#bbf7d0",
        },

      ]);

      // ================= TRANSACTIONS =================

      setTransactions([

        {
          title:
            t(
              "aaravDonation"
            ),

          date:
            t(
              "aaravDonationDate"
            ),

          amount:
            "$25,000",

          status:
            t(
              "completed"
            ),

          type:
            "income",
        },

        {
          title:
            t(
              "priyaDonation"
            ),

          date:
            t(
              "priyaDonationDate"
            ),

          amount:
            "$1,000",

          status:
            t(
              "completed"
            ),

          type:
            "income",
        },

        {
          title:
            t(
              "rahulDonation"
            ),

          date:
            t(
              "rahulDonationDate"
            ),

          amount:
            "$5,000",

          status:
            t(
              "completed"
            ),

          type:
            "income",
        },

        {
          title:
            t(
              "medicalExpensesTransaction"
            ),

          date:
            t(
              "medicalExpensesDate"
            ),

          amount:
            "$12,500",

          status:
            t(
              "paid"
            ),

          type:
            "expense",
        },

        {
          title:
            t(
              "travelExpenses"
            ),

          date:
            t(
              "travelExpensesDate"
            ),

          amount:
            "$2,300",

          status:
            t(
              "paid"
            ),

          type:
            "expense",
        },

      ]);

      setLoading(false);

    }, 900);

  }, [t]);

  // ================= VIEW ALL =================

  const handleViewAll =
    () => {

      toast.success(
        t(
          "recentTransactions"
        )
      );

    };

  // ================= LOADING =================

  if (loading) {

    return (

      <div
        style={{
          width: "100%",

          padding: "30px",

          textAlign: "center",

          fontSize: "18px",

          fontWeight: "700",

          color:
            darkMode
              ? "#ffffff"
              : "#0f172a",
        }}
      >

        Loading Financial Data...

      </div>

    );

  }

  return (

    <div
      className={`funds-wrapper ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================= LEFT ================= */}

      <div
        className={`funds-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        <div className="funds-card-header">

          <div>

            <h2>

              {t(
                "fundsUtilizationOverview"
              )}

            </h2>

            <p>

              {t(
                "trackFundsUsage"
              )}

            </p>

          </div>

        </div>

        <div className="funds-chart-content">

          {/* ================= CHART ================= */}

          <div className="funds-chart-box">

            <ResponsiveContainer
              width="100%"
              height={260}
            >

              <PieChart>

                <Pie
                  data={
                    utilizationData
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={104}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >

                  {utilizationData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          entry.color
                        }
                      />

                    )
                  )}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

            <div className="funds-chart-center">

              <h1>

                80.8%

              </h1>

              <span>

                {t(
                  "fundsUtilized"
                )}

              </span>

            </div>

          </div>

          {/* ================= LEGEND ================= */}

          <div className="funds-legend">

            {utilizationData.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="legend-item"
                >

                  <div className="legend-left">

                    <span
                      className="legend-dot"
                      style={{
                        background:
                          item.color,
                      }}
                    />

                    <div>

                      <strong>

                        {item.name}

                      </strong>

                      <p>

                        {item.amount}

                      </p>

                    </div>

                  </div>

                  <span className="legend-percent">

                    {item.value}%

                  </span>

                </div>

              )
            )}

          </div>

        </div>

        {/* ================= BOTTOM ================= */}

        <div className="funds-bottom">

          <span>

            {t(
              "totalUtilized"
            )}

          </span>

          <strong>

            $198,450

          </strong>

        </div>

      </div>

      {/* ================= RIGHT ================= */}

      <div
        className={`transactions-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        <div className="transactions-header">

          <div>

            <h2>

              {t(
                "recentTransactions"
              )}

            </h2>

            <p>

              {t(
                "latestCampaignTransactions"
              )}

            </p>

          </div>

          <button
            onClick={
              handleViewAll
            }
          >

            <FaExternalLinkAlt />

            {t(
              "viewAll"
            )}

          </button>

        </div>

        <div className="transactions-list">

          {transactions.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="transaction-item"
              >

                <div className="transaction-left">

                  <div
                    className={`transaction-icon ${
                      item.type ===
                      "income"
                        ? "green"
                        : "blue"
                    }`}
                  >

                    {item.type ===
                    "income"
                      ? <FaArrowDown />
                      : <FaArrowUp />}

                  </div>

                  <div>

                    <strong>

                      {item.title}

                    </strong>

                    <p>

                      {item.date}

                    </p>

                  </div>

                </div>

                <div className="transaction-right">

                  <h4>

                    {item.amount}

                  </h4>

                  <span
                    className={
                      item.type ===
                      "income"
                        ? "completed"
                        : "paid"
                    }
                  >

                    {item.status}

                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}

export default FundsUtilization;

