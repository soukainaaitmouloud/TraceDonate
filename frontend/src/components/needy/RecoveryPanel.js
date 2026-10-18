// src/components/needy/RecoveryPanel.js

import React, {
  useMemo,
  useState,
} from "react";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import {
  FaHeart,
  FaShareAlt,
  FaUserFriends,
  FaClock,
  FaChartPie,
  FaShieldAlt,
  FaWallet,
  FaCalendarAlt,
  FaPaperPlane,
  FaImages,
  FaCommentDots,
  FaCheckCircle,
  FaCopy,
  FaExternalLinkAlt,
  FaFileMedical,
} from "react-icons/fa";

import "./RecoveryPanel.css";

function RecoveryPanel() {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= STATES ======================== */
  /* ================================================= */

  const [donated, setDonated] =
    useState(false);

  const [shared, setShared] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  /* ================================================= */
  /* ================= MOCK DATA ===================== */
  /* ================================================= */

  const campaign = {

    id: "cmp_001",

    slug: "soukaina-recovery",

    title:
      t("supportMyRecovery"),

    raisedAmount: 3200,

    goalAmount: 5000,

    supporters: 128,

    shares: 32,

    daysLeft: 18,

    totalUpdates: 12,

    totalMedia: 18,

    thankYouMessages: 45,

    withdrawnAmount: 0,

    lastUpdated:
      t("twoDaysAgo"),

    verification: [

      t("medicalReportsVerified"),

      t("identityVerified"),

      t("hospitalDocumentsVerified"),

    ],

    expenses: [

      {
        category:
          t("hospitalSurgery"),

        percent: 60,

        color: "blue",
      },

      {
        category:
          t("medicines"),

        percent: 20,

        color: "green",
      },

      {
        category:
          t("testsDiagnosis"),

        percent: 10,

        color: "purple",
      },

      {
        category:
          t("transport"),

        percent: 5,

        color: "orange",
      },

      {
        category:
          t("others"),

        percent: 5,

        color: "red",
      },

    ],

  };

  /* ================================================= */
  /* ================= PROGRESS ====================== */
  /* ================================================= */

  const progress =
    useMemo(() => {

      return Math.round(

        (campaign.raisedAmount /
          campaign.goalAmount) *
          100

      );

    }, [
      campaign.raisedAmount,
      campaign.goalAmount,
    ]);

  /* ================================================= */
  /* ================= CAMPAIGN LINK ================= */
  /* ================================================= */

  const campaignLink =
    `${window.location.origin}/my-campaign`;

  /* ================================================= */
  /* ================= DONATE ======================== */
  /* ================================================= */

  const handleDonate = () => {

    setDonated(true);

    setTimeout(() => {

      setDonated(false);

      alert(
        t("donateSoon")
      );

    }, 800);

  };

  /* ================================================= */
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    async () => {

      try {

        if (navigator.share) {

          await navigator.share({

            title:
              campaign.title,

            text:
              t("shareRecoveryCampaign"),

            url:
              campaignLink,

          });

        } else {

          await navigator.clipboard.writeText(
            campaignLink
          );

          setCopied(true);

          alert(
            t("campaignCopied")
          );

          setTimeout(() => {

            setCopied(false);

          }, 2000);

        }

        setShared(true);

        setTimeout(() => {

          setShared(false);

        }, 2000);

      } catch (err) {

        console.error(
          "Share failed:",
          err
        );

      }

    };

  /* ================================================= */
  /* ================= PUBLIC PAGE =================== */
  /* ================================================= */

  const openPublicPage =
    () => {

      history.push(
        "/my-campaign"
      );

    };

  /* ================================================= */
  /* ================= DETAILS ======================= */
  /* ================================================= */

  const handleDetails =
    () => {

      history.push(
        "/transparency"
      );

    };

  /* ================================================= */
  /* ================= DONATION RECORDS ============== */
  /* ================================================= */

  const openDonationHistory =
    () => {

      history.push(
        "/donations-received"
      );

    };

  return (

    <aside
      className="recovery-panel"
    >

      {/* ================================================= */}
      {/* ================= SUPPORT ======================= */}
      {/* ================================================= */}

      <section className="support-card">

        <div className="support-top">

          <div>

            <p className="section-label">

              {t("recoveryCampaign")}

            </p>

            <h2>
              {campaign.title}
            </h2>

          </div>

          <button
            className="ghost-link"
            onClick={
              openPublicPage
            }
          >

            {t("publicPage")}

            <FaExternalLinkAlt />

          </button>

        </div>

        {/* ================= AMOUNT ================= */}

        <div className="support-amount">

          <span>

            $

            {campaign.raisedAmount.toLocaleString()}

          </span>

          <small>

            {t("raisedOf")} $

            {campaign.goalAmount.toLocaleString()}

            {" "}

            {t("goal")}

          </small>

        </div>

        {/* ================= PROGRESS ================= */}

        <div className="support-progress">

          <div
            className="support-progress-fill"
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

        {/* ================= STATS ================= */}

        <div className="support-stats">

          <div className="support-stat">

            <FaUserFriends />

            <h4>
              {campaign.supporters}
            </h4>

            <p>

              {t("supporters")}

            </p>

          </div>

          <div className="support-stat">

            <FaShareAlt />

            <h4>
              {campaign.shares}
            </h4>

            <p>

              {t("shares")}

            </p>

          </div>

          <div className="support-stat">

            <FaClock />

            <h4>
              {campaign.daysLeft}
            </h4>

            <p>

              {t("daysLeft")}

            </p>

          </div>

          <div className="support-stat">

            <FaChartPie />

            <h4>
              {progress}%
            </h4>

            <p>

              {t("funded")}

            </p>

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="support-buttons">

          <button
            className="donate-btn"
            onClick={
              handleDonate
            }
          >

            {donated ? (

              <>

                <FaCheckCircle />

                {t("redirecting")}

              </>

            ) : (

              <>

                <FaHeart />

                {t("donateNow")}

              </>

            )}

          </button>

          <button
            className="share-btn"
            onClick={
              handleShare
            }
          >

            {copied ? (

              <>

                <FaCopy />

                {t("copied")}

              </>

            ) : shared ? (

              <>

                <FaCheckCircle />

                {t("shared")}

              </>

            ) : (

              <>

                <FaShareAlt />

                {t("shareStory")}

              </>

            )}

          </button>

        </div>

        {/* ================= SECURITY ================= */}

        <div className="secure-box">

          <FaShieldAlt />

          <span>

            {t("verifiedTransparency")}

          </span>

        </div>

      </section>

      {/* ================================================= */}
      {/* ================= TRANSPARENCY ================== */}
      {/* ================================================= */}

      <section className="transparency-card">

        <div className="card-header">

          <div>

            <p className="section-label">

              {t("fundAllocation")}

            </p>

            <h2>

              {t("transparencyOverview")}

            </h2>

          </div>

          <button
            className="ghost-link"
            onClick={
              handleDetails
            }
          >

            {t("details")}

          </button>

        </div>

        <div className="transparency-content">

          {/* ================= CHART ================= */}

          <div className="circle-chart">

            <div className="circle-inner">

              <h3>
                100%
              </h3>

              <p>

                {t("transparent")}

              </p>

            </div>

          </div>

          {/* ================= LEGEND ================= */}

          <div className="legend-list">

            {campaign.expenses.map(
              (
                item,
                index
              ) => (

                <div
                  className="legend-item"
                  key={index}
                >

                  <span
                    className={`legend-color ${item.color}`}
                  />

                  <span>
                    {item.category}
                  </span>

                  <strong>
                    {item.percent}%
                  </strong>

                </div>

              )
            )}

          </div>

        </div>

        {/* ================= INFO ================= */}

        <div className="info-grid">

          <div className="info-box">

            <FaWallet />

            <div>

              <h4>

                {t("totalWithdrawn")}

              </h4>

              <p>

                {campaign.withdrawnAmount > 0
                  ? `$${campaign.withdrawnAmount}`
                  : t("notWithdrawnYet")}

              </p>

            </div>

          </div>

          <div className="info-box">

            <FaCalendarAlt />

            <div>

              <h4>

                {t("lastUpdated")}

              </h4>

              <p>
                {campaign.lastUpdated}
              </p>

            </div>

          </div>

        </div>

        {/* ================= VERIFICATION ================= */}

        <div className="verification-list">

          {campaign.verification.map(
            (
              item,
              index
            ) => (

              <div
                className="verification-item"
                key={index}
              >

                <FaFileMedical />

                <span>
                  {item}
                </span>

              </div>

            )
          )}

        </div>

        {/* ================= RECORDS ================= */}

        <button
          className="view-records-btn"
          onClick={
            openDonationHistory
          }
        >

          {t("viewDonationRecords")}

        </button>

      </section>

      {/* ================================================= */}
      {/* ================= ACTIVITY ====================== */}
      {/* ================================================= */}

      <section className="activity-card">

        <div className="card-header">

          <div>

            <p className="section-label">

              {t("engagement")}

            </p>

            <h2>

              {t("activitySummary")}

            </h2>

          </div>

        </div>

        <div className="activity-grid">

          <div className="activity-item purple-bg">

            <FaPaperPlane />

            <h4>
              {campaign.totalUpdates}
            </h4>

            <p>

              {t("updatesPosted")}

            </p>

          </div>

          <div className="activity-item green-bg">

            <FaImages />

            <h4>
              {campaign.totalMedia}
            </h4>

            <p>

              {t("photosVideos")}

            </p>

          </div>

          <div className="activity-item pink-bg">

            <FaHeart />

            <h4>
              {campaign.supporters}
            </h4>

            <p>

              {t("totalSupporters")}

            </p>

          </div>

          <div className="activity-item orange-bg">

            <FaCommentDots />

            <h4>
              {campaign.thankYouMessages}
            </h4>

            <p>

              {t("thankYouMessages")}

            </p>

          </div>

        </div>

        <div className="activity-footer">

          {t("activityFooter")}

        </div>

      </section>

    </aside>

  );

}

export default RecoveryPanel;