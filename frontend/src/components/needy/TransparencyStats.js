
// src/components/needy/TransparencyStats.js

import React, {
  useEffect,
  useState,
} from "react";

import {
  FaHandHoldingHeart,
  FaLock,
  FaUsers,
  FaClock,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import "./TransparencyStats.css";

function TransparencyStats({
  darkMode,
}) {

  const { t } =
    useTranslation();

  // ================= STATES =================

  const [
    stats,
    setStats,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ================= FETCH DATA =================

  useEffect(() => {

    setTimeout(() => {

      setStats([

        {
          icon:
            <FaHandHoldingHeart />,

          title:
            t(
              "totalDonationsReceived"
            ),

          value:
            "$245,680",

          subtitle:
            t(
              "fromDonors"
            ),

          color:
            "green",
        },

        {
          icon:
            <FaLock />,

          title:
            t(
              "totalFundsUtilized"
            ),

          value:
            "$198,450",

          subtitle:
            t(
              "fundsUtilizedPercent"
            ),

          color:
            "blue",
        },

        {
          icon:
            <FaUsers />,

          title:
            t(
              "totalImpactCreated"
            ),

          value:
            "124",

          subtitle:
            t(
              "livesImpacted"
            ),

          color:
            "purple",
        },

        {
          icon:
            <FaClock />,

          title:
            t(
              "fundsInProgress"
            ),

          value:
            "$47,230",

          subtitle:
            t(
              "fundsRemainingPercent"
            ),

          color:
            "orange",
        },

      ]);

      setLoading(false);

    }, 1200);

  }, [t]);

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

        Loading Statistics...

      </div>

    );

  }

  return (

    <div
      className={`transparency-stats ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {stats.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className={`transparency-card ${
              darkMode
                ? "dark"
                : ""
            }`}
          >

            {/* ================= ICON ================= */}

            <div
              className={`transparency-icon ${item.color}`}
            >

              {item.icon}

            </div>

            {/* ================= INFO ================= */}

            <div className="transparency-info">

              <h4>

                {item.title}

              </h4>

              <h2>

                {item.value}

              </h2>

              <p>

                {item.subtitle}

              </p>

            </div>

            {/* ================= GLOW ================= */}

            <div
              className={`card-glow ${item.color}`}
            />

          </div>

        )
      )}

    </div>

  );

}

export default TransparencyStats;

