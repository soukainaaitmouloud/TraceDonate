// src/components/needy/DonationsRightPanel.js

import React from "react";

import {
  FaArrowTrendUp,
  FaShieldHeart,
  FaBolt,
  FaCircleCheck,
  FaUsers,
  FaHeadset,
} from "react-icons/fa6";

import {
  useTranslation,
} from "react-i18next";

import "./DonationsRightPanel.css";

function DonationsRightPanel({
  darkMode,
  onContactSupport,
}) {

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= DONORS ======================== */
  /* ================================================= */

  const donors = [

    {
      name:
        "Aarav Mehta",

      amount:
        "$25,000",

      image:
        "/images/user1.jpg",
    },

    {
      name:
        "Rahul Verma",

      amount:
        "$15,000",

      image:
        "/images/user2.jpg",
    },

    {
      name:
        "Vikram Singh",

      amount:
        "$10,000",

      image:
        "/images/user3.jpg",
    },

  ];

  return (

    <div
      className={`donations-right-panel ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================================================= */}
      {/* MONTHLY GROWTH */}
      {/* ================================================= */}

      <div
        className={`donations-side-card premium-mini-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        {/* GLOW */}

        <div className="mini-glow green" />

        {/* ICON */}

        <div className="mini-icon green">

          <FaArrowTrendUp />

        </div>

        {/* CONTENT */}

        <div>

          <span className="mini-label">

            {t(
              "monthlyGrowth"
            )}

          </span>

          <h2 className="mini-value">

            +32%

          </h2>

        </div>

      </div>

      {/* ================================================= */}
      {/* TOP DONORS */}
      {/* ================================================= */}

      <div
        className={`donations-side-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        {/* HEADER */}

        <div className="panel-header">

          <h3 className="panel-title">

            {t(
              "topDonors"
            )}

          </h3>

          <span className="panel-badge">

            3
            {" "}
            {t(
              "active"
            )}

          </span>

        </div>

        {/* DONORS */}

        <div className="top-donors-list">

          {donors.map(
            (
              donor,
              index
            ) => (

              <div
                key={index}
                className="top-donor-item"
              >

                {/* LEFT */}

                <div className="donor-left">

                  <img
                    src={donor.image}
                    alt={donor.name}
                  />

                  <div>

                    <span>

                      {donor.name}

                    </span>

                    <p>

                      {t(
                        "premiumSupporter"
                      )}

                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <strong>

                  {donor.amount}

                </strong>

              </div>

            )
          )}

        </div>

        {/* BUTTON */}

        <button
          className="view-donors-btn"
          onClick={() =>
            alert(
              t(
                "viewingTopDonors"
              )
            )
          }
        >

          <FaUsers />

          {t(
            "viewTopDonors"
          )}

        </button>

      </div>

      {/* ================================================= */}
      {/* IMPACT */}
      {/* ================================================= */}

      <div
        className={`donations-side-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        {/* HEADER */}

        <div className="panel-header">

          <h3 className="panel-title">

            {t(
              "donationImpact"
            )}

          </h3>

          <div className="impact-icon">

            <FaShieldHeart />

          </div>

        </div>

        {/* TEXT */}

        <p className="impact-text">

          {t(
            "campaignHelpingFamilies"
          )}

        </p>

        {/* PROGRESS */}

        <div className="impact-progress">

          <div className="impact-bar">

            <div className="impact-fill" />

          </div>

          <strong>

            82%

          </strong>

        </div>

        {/* BOTTOM */}

        <div className="impact-bottom">

          <span>

            {t(
              "goal"
            )}
            :
            {" "}
            $300,000

          </span>

          <span>

            $245,680
            {" "}
            {t(
              "raised"
            )}

          </span>

        </div>

      </div>

      {/* ================================================= */}
      {/* INSIGHTS */}
      {/* ================================================= */}

      <div
        className={`donations-side-card insights-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        {/* ITEM */}

        <div className="insight-item">

          <div className="insight-icon blue">

            <FaBolt />

          </div>

          <div>

            <h4>

              {t(
                "fastestGrowingCampaign"
              )}

            </h4>

            <p>

              +18%
              {" "}
              {t(
                "donorActivityWeek"
              )}

            </p>

          </div>

        </div>

        {/* ITEM */}

        <div className="insight-item">

          <div className="insight-icon green">

            <FaCircleCheck />

          </div>

          <div>

            <h4>

              {t(
                "verificationComplete"
              )}

            </h4>

            <p>

              {t(
                "trustedProfile"
              )}

            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* SUPPORT */}
      {/* ================================================= */}

      <div
        className={`donations-side-card support-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        {/* ICON */}

        <div className="support-icon">

          <FaHeadset />

        </div>

        {/* TITLE */}

        <h3>

          {t(
            "needHelp"
          )}

        </h3>

        {/* TEXT */}

        <p>

          {t(
            "supportTeamReady"
          )}

        </p>

        {/* BUTTON */}

        <button
          className="support-btn"
          onClick={
            onContactSupport
          }
        >

          {t(
            "contactSupport"
          )}

        </button>

      </div>

    </div>

  );

}

export default DonationsRightPanel;