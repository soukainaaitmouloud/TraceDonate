// src/components/needy/CampaignOverview.js

import React, {
  useMemo,
} from "react";

import {
  FaExclamation,
  FaArrowRight,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import "./CampaignOverview.css";

function CampaignOverview() {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  const campaign = {

    title:
      t("heartSurgeryTreatment"),

    createdAt:
      "10 May 2026",

    goal: 5000,

    raised: 3200,

    status:
      t("fundraisingProgress"),

  };

  const remaining =
    campaign.goal -
    campaign.raised;

  const progress =
    useMemo(() => {

      return Math.round(

        (campaign.raised /
          campaign.goal) * 100

      );

    }, [
      campaign.goal,
      campaign.raised,
    ]);

  /* ================================================= */
  /* ================= VIEW DETAILS ================= */
  /* ================================================= */

  const handleView =
    () => {

      history.push(
        "/my-campaign"
      );

    };

  return (

    <div className="campaign-overview">

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="campaign-header">

        <div>

          <p className="overview-label">

            {t("recoveryCampaign")}

          </p>

          <h2>

            {t("campaignOverview")}

          </h2>

        </div>

        <button
          className="campaign-view-btn"
          onClick={handleView}
        >

          {t("viewDetails")}

          <FaArrowRight />

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= CARD ========================== */}
      {/* ================================================= */}

      <div className="campaign-card">

        {/* GLOW */}

        <div className="campaign-glow"></div>

        {/* ================================================= */}
        {/* ================= URGENT BADGE ================ */}
        {/* ================================================= */}

        <div className="urgent-badge">

          <FaExclamation />

          {t("urgentCase")}

        </div>

        {/* ================================================= */}
        {/* ================= TOP INFO ===================== */}
        {/* ================================================= */}

        <div className="campaign-top">

          <div className="campaign-info">

            <h3>

              {t("heart")}
              <br />

              {t("surgeryTreatment")}

            </h3>

            <p>

              <FaCalendarAlt />

              {t("createdOn")}{" "}

              {campaign.createdAt}

            </p>

          </div>

          <div className="goal-box">

            <span>

              {t("campaignGoal")}

            </span>

            <strong>

              $

              {campaign.goal.toLocaleString()}

            </strong>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= PROGRESS ===================== */}
        {/* ================================================= */}

        <div className="campaign-progress-area">

          <div className="campaign-progress-text">

            <div>

              <span>

                {t("raised")}

              </span>

              <strong className="raised">

                $

                {campaign.raised.toLocaleString()}

              </strong>

            </div>

            <div className="right-progress">

              <span>

                {t("remaining")}

              </span>

              <strong className="remaining">

                $

                {remaining.toLocaleString()}

              </strong>

            </div>

          </div>

          <div className="campaign-progress">

            <div
              className="campaign-progress-fill"
              style={{
                width:
                  `${progress}%`,
              }}
            />

          </div>

          <div className="progress-footer">

            <div className="progress-percent">

              {progress}%{" "}

              {t("funded")}

            </div>

            <div className="supporters-count">

              128{" "}

              {t("supporters")}

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= STATUS BUTTON ================ */}
        {/* ================================================= */}

        <div className="campaign-status-btn">

          <FaShieldAlt />

          {campaign.status}

        </div>

      </div>

    </div>

  );

}

export default CampaignOverview;