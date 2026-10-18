// src/components/needy/DonationStats.js

import React from "react";

import {
  FaDonate,
  FaUsers,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import "./DonationStats.css";

function DonationStats({
  darkMode,
}) {

  const { t } =
    useTranslation();

  // ================= STATS =================

  const stats = [

    {
      icon: <FaDonate />,
      title: t(
        "totalDonations"
      ),
      value: "$245,680",
      sub: t(
        "allTimeDonations"
      ),
      color: "green",
    },

    {
      icon: <FaUsers />,
      title: t(
        "totalDonors"
      ),
      value: "128",
      sub: t(
        "peopleSupportedYou"
      ),
      color: "blue",
    },

    {
      icon: <FaCheckCircle />,
      title: t(
        "successfulDonations"
      ),
      value: "124",
      sub: t(
        "completedTransactions"
      ),
      color: "purple",
    },

    {
      icon: <FaClock />,
      title: t(
        "pendingDonations"
      ),
      value: "4",
      sub: t(
        "awaitingCompletion"
      ),
      color: "orange",
    },

  ];

  return (

    <div className="donation-stats">

      {stats.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className={`donation-stat-card ${
              darkMode
                ? "dark"
                : ""
            }`}
            style={{
              background:
                darkMode
                  ? "linear-gradient(135deg,#0f172a,#1e293b)"
                  : "linear-gradient(135deg,#ffffff,#f8fafc)",

              border:
                darkMode
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(226,232,240,0.9)",

              boxShadow:
                darkMode
                  ? "0 15px 40px rgba(0,0,0,0.45)"
                  : "0 15px 35px rgba(15,23,42,0.06)",

              transition:
                "0.3s ease",
            }}
          >

            {/* ================= GLOW ================= */}

            <div
              className={`card-glow ${item.color}`}
            />

            {/* ================= ICON ================= */}

            <div
              className={`donation-icon ${item.color}`}
            >

              {item.icon}

            </div>

            {/* ================= TEXT ================= */}

            <div className="donation-info">

              <h4
                style={{
                  color:
                    darkMode
                      ? "#cbd5e1"
                      : "#64748b",
                }}
              >

                {item.title}

              </h4>

              <h2
                style={{
                  color:
                    darkMode
                      ? "#ffffff"
                      : "#0f172a",
                }}
              >

                {item.value}

              </h2>

              <p
                style={{
                  color:
                    darkMode
                      ? "#94a3b8"
                      : "#94a3b8",
                }}
              >

                {item.sub}

              </p>

            </div>

          </div>

        )
      )}

    </div>

  );

}

export default DonationStats;