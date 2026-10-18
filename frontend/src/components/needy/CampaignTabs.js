// src/components/needy/CampaignTabs.js

import React, {
  useState,
} from "react";

import {
  FaHeart,
  FaStar,
  FaPlus,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import "./CampaignTabs.css";

function CampaignTabs() {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= ACTIVE TAB ==================== */
  /* ================================================= */

  const [
    activeTab,
    setActiveTab,
  ] = useState(
    "Overview"
  );

  /* ================================================= */
  /* ================= TAB CLICK ===================== */
  /* ================================================= */

  const handleTabClick =
    (tab) => {

      setActiveTab(tab);

      switch (tab) {

        case "Overview":

          history.push(
            "/my-campaign"
          );

          break;

        case "Updates":

          history.push(
            "/update-story"
          );

          break;

        case "Donations":

          history.push(
            "/donations-received"
          );

          break;

        case "Supporters":

          history.push(
            "/needy-messages"
          );

          break;

        case "Analytics":

          history.push(
            "/transparency-center"
          );

          break;

        default:
          break;

      }

    };

  /* ================================================= */
  /* ================= SEE ALL ======================= */
  /* ================================================= */

  const handleSeeAll =
    () => {

      history.push(
        "/update-story"
      );

    };

  /* ================================================= */
  /* ================= CREATE UPDATE ================= */
  /* ================================================= */

  const handleCreateUpdate =
    () => {

      history.push(
        "/update-story"
      );

    };

  return (

    <div className="campaign-tabs-wrapper">

      {/* ================================================= */}
      {/* ================= TABS ========================== */}
      {/* ================================================= */}

      <div className="campaign-tabs">

        <button
          className={`campaign-tab ${
            activeTab === "Overview"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabClick(
              "Overview"
            )
          }
        >

          {t("overview")}

        </button>

        <button
          className={`campaign-tab ${
            activeTab === "Updates"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabClick(
              "Updates"
            )
          }
        >

          {t("updates")}

        </button>

        <button
          className={`campaign-tab ${
            activeTab === "Donations"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabClick(
              "Donations"
            )
          }
        >

          {t("donations")}

        </button>

        <button
          className={`campaign-tab ${
            activeTab === "Supporters"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabClick(
              "Supporters"
            )
          }
        >

          {t("supporters")}

        </button>

        <button
          className={`campaign-tab ${
            activeTab === "Analytics"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabClick(
              "Analytics"
            )
          }
        >

          {t("analytics")}

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= GRID ========================== */}
      {/* ================================================= */}

      <div className="campaign-overview-grid">

        {/* ================================================= */}
        {/* ================= LEFT CARD ===================== */}
        {/* ================================================= */}

        <div className="campaign-progress-card">

          <h3>

            {t("campaignProgress")}

          </h3>

          <div className="progress-layout">

            {/* CIRCLE */}

            <div className="progress-circle">

              <div className="progress-inner">

                <h2>

                  64%

                </h2>

                <p>

                  {t("funded")}

                </p>

              </div>

            </div>

            {/* STATS */}

            <div className="progress-stats">

              <div className="progress-stat-row">

                <span>

                  {t("goalAmount")}

                </span>

                <strong>

                  $5,000

                </strong>

              </div>

              <div className="progress-stat-row">

                <span>

                  {t("raisedAmount")}

                </span>

                <strong className="green">

                  $3,200

                </strong>

              </div>

              <div className="progress-stat-row">

                <span>

                  {t("remainingAmount")}

                </span>

                <strong className="red">

                  $1,800

                </strong>

              </div>

              <div className="progress-stat-row">

                <span>

                  {t("daysLeft")}

                </span>

                <strong>

                  18 days

                </strong>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="campaign-progress-footer">

            <div>

              {t("keepGoing")}

              <FaHeart />

            </div>

            <FaStar />

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= RIGHT CARD ==================== */}
        {/* ================================================= */}

        <div className="recent-updates-card">

          <div className="recent-header">

            <h3>

              {t("recentUpdates")}

            </h3>

            <button
              onClick={handleSeeAll}
            >

              {t("seeAll")}

            </button>

          </div>

          {/* UPDATE 1 */}

          <div className="update-item">

            <img
              src="/images/update3.jpg"
              alt="update"
            />

            <div className="update-content">

              <div className="update-top">

                <h4>

                  {t("thankYouMessage")}

                </h4>

                <span>

                   {t("twoDaysAgo")}

                </span>

              </div>

              <p>

               {t("recentThankYouText")}

              </p>

            </div>

          </div>

          {/* UPDATE 2 */}

          <div className="update-item">

            <img
              src="/images/update2.jpg"
              alt="update"
            />

            <div className="update-content">

              <div className="update-top">

                <h4>

                  {t("treatmentUpdate")}

                </h4>

                <span>

                  {t("fiveDaysAgo")}

                </span>

              </div>

             <p>

  {t("recentTreatmentUpdateText")}

</p>

            </div>

          </div>

          {/* UPDATE 3 */}

          <div className="update-item">

            <img
              src="/images/update1.jpg"
              alt="update"
            />

            <div className="update-content">

              <div className="update-top">

                <h4>

                  {t("feelingBetter")}

                </h4>

               <span>

  {t("oneWeekAgo")}

</span>

              </div>

             <p>

  {t("recentRecoveryJourneyText")}

</p>

            </div>

          </div>

          {/* CREATE UPDATE */}

          <button
            className="create-update-btn"
            onClick={
              handleCreateUpdate
            }
          >

            <FaPlus />

            {t("createNewUpdate")}

          </button>

        </div>

      </div>

    </div>

  );

}

export default CampaignTabs;