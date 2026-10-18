// src/components/needy/MyCampaignRightPanel.js

import React, {
  useState,
} from "react";

import {
  FaHeart,
  FaUserFriends,
  FaShareAlt,
  FaClock,
  FaCalendarAlt,
  FaShieldAlt,
  FaChevronRight,
  FaPen,
  FaImage,
  FaBroadcastTower,
  FaQrcode,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import "./MyCampaignRightPanel.css";

function MyCampaignRightPanel() {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  const [
    shared,
    setShared,
  ] = useState(false);

  /* ================================================= */
  /* ================= DONATE ======================== */
  /* ================================================= */

  const handleDonate =
    () => {

      history.push(
        "/donation-checkout"
      );

    };

  /* ================================================= */
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    async () => {

      const shareData = {

        title:
          t("supportMyRecovery"),

        text:
          t("shareCampaignText"),

        url:
          window.location.href,

      };

      try {

        if (
          navigator.share
        ) {

          await navigator.share(
            shareData
          );

        } else {

          await navigator.clipboard.writeText(
            shareData.url
          );

          setShared(true);

          setTimeout(() => {

            setShared(false);

          }, 2000);

        }

      } catch (err) {

        console.log(err);

      }

    };

  /* ================================================= */
  /* ================= QUICK ACTIONS ================= */
  /* ================================================= */

  const handleQuickAction =
    (type) => {

      switch (type) {

        case "story":

          history.push(
            "/update-story"
          );

          break;

        case "photos":

          history.push(
            "/campaign-gallery"
          );

          break;

        case "live":

          history.push(
            "/live-support"
          );

          break;

        case "share":

          handleShare();

          break;

        case "qr":

          history.push(
            "/campaign-qr"
          );

          break;

        case "edit":

          history.push(
            "/edit-campaign"
          );

          break;

        default:
          break;

      }

    };

  return (

    <div className="campaign-right-panel">

      {/* ================================================= */}
      {/* ================= SUPPORT CARD ================== */}
      {/* ================================================= */}

      <div className="support-card">

        {/* BADGE */}

        <div className="support-badge">

          <FaCheckCircle />

          {t("verifiedCampaign")}

        </div>

        {/* TITLE */}

        <h3>

          {t("supportMyRecovery")}

        </h3>

        {/* MONEY */}

        <div className="support-money">

          <h1>

            $3,200

          </h1>

          <span>

            {t("raisedGoal")}

          </span>

        </div>

        {/* PROGRESS */}

        <div className="support-progress">

          <div className="support-progress-fill"></div>

        </div>

        <div className="support-percent">

          64% {t("funded")}

        </div>

        {/* STATS */}

        <div className="support-stats">

          {/* SUPPORTERS */}

          <div className="support-stat">

            <FaUserFriends />

            <strong>

              128

            </strong>

            <span>

              {t("supporters")}

            </span>

          </div>

          {/* SHARES */}

          <div className="support-stat">

            <FaShareAlt />

            <strong>

              32

            </strong>

            <span>

              {t("shares")}

            </span>

          </div>

          {/* DAYS */}

          <div className="support-stat">

            <FaClock />

            <strong>

              18

            </strong>

            <span>

              {t("daysLeft")}

            </span>

          </div>

          {/* FUNDED */}

          <div className="support-stat">

            <FaCalendarAlt />

            <strong>

              64%

            </strong>

            <span>

              {t("funded")}

            </span>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="support-buttons">

          {/* DONATE */}

          <button
            className="donate-btn"
            onClick={handleDonate}
          >

            <FaHeart />

            {t("donateNow")}

          </button>

          {/* SHARE */}

          <button
            className={`share-btn ${
              shared
                ? "shared"
                : ""
            }`}
            onClick={handleShare}
          >

            <FaShareAlt />

            {shared
              ? t("copied")
              : t("shareMyStory")}

          </button>

        </div>

        {/* SAFE */}

        <div className="support-safe">

          <div>

            <FaShieldAlt />

            {t("secureDonationText")}

          </div>

          <FaChevronRight />

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= QUICK ACTIONS ================ */}
      {/* ================================================= */}

      <div className="quick-actions-card">

        {/* HEADER */}

        <div className="quick-top">

          <h3>

            {t("quickActions")}

          </h3>

          <span>

            {t("manageCampaign")}

          </span>

        </div>

        {/* GRID */}

        <div className="quick-actions-grid">

          {/* UPDATE STORY */}

          <div
            className="quick-box"
            onClick={() =>
              handleQuickAction(
                "story"
              )
            }
          >

            <FaPen className="blue" />

            <h4>

              {t("updateStory")}

            </h4>

            <p>

              {t("updateStoryText")}

            </p>

          </div>

          {/* ADD PHOTOS */}

          <div
            className="quick-box"
            onClick={() =>
              handleQuickAction(
                "photos"
              )
            }
          >

            <FaImage className="green" />

            <h4>

              {t("addPhotos")}

            </h4>

            <p>

              {t("addPhotosText")}

            </p>

          </div>

          {/* GO LIVE */}

          <div
            className="quick-box"
            onClick={() =>
              handleQuickAction(
                "live"
              )
            }
          >

            <FaBroadcastTower className="red" />

            <h4>

              {t("goLive")}

            </h4>

            <p>

              {t("goLiveText")}

            </p>

          </div>

          {/* SHARE */}

          <div
            className="quick-box"
            onClick={() =>
              handleQuickAction(
                "share"
              )
            }
          >

            <FaShareAlt className="blue" />

            <h4>

              {t("shareCampaign")}

            </h4>

            <p>

              {t("shareCampaignCardText")}

            </p>

          </div>

          {/* QR */}

          <div
            className="quick-box"
            onClick={() =>
              handleQuickAction(
                "qr"
              )
            }
          >

            <FaQrcode className="green" />

            <h4>

              {t("downloadQR")}

            </h4>

            <p>

              {t("downloadQRText")}

            </p>

          </div>

          {/* EDIT */}

          <div
            className="quick-box"
            onClick={() =>
              handleQuickAction(
                "edit"
              )
            }
          >

            <FaFileAlt className="blue" />

            <h4>

              {t("editDetails")}

            </h4>

            <p>

              {t("editDetailsText")}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MyCampaignRightPanel;