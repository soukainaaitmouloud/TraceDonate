// src/components/needy/MyCampaignHero.js

import React, {
  useState,
  useRef,
} from "react";

import {
  FaHeart,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaCamera,
  FaPen,
  FaEye,
  FaShareAlt,
  FaCheckCircle,
  FaArrowUp,
  FaUserFriends,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import {
  useHistory,
} from "react-router-dom";

import "./MyCampaignHero.css";

function MyCampaignHero() {

  const { t } =
    useTranslation();

  const history =
    useHistory();

  const fileInputRef =
    useRef(null);

  const [
    shared,
    setShared,
  ] = useState(false);

  const [
    campaignImage,
    setCampaignImage,
  ] = useState(
    "/images/update3.jpg"
  );

  /* ================================================= */
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    async () => {

      const shareData = {

        title:
          "Support My Campaign",

        text:
          "Help support this fundraising campaign ❤️",

        url:
          window.location.href,

      };

      try {

        /* MOBILE SHARE */

        if (
          navigator.share
        ) {

          await navigator.share(
            shareData
          );

        } else {

          /* DESKTOP FALLBACK */

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
  /* ================= EDIT ========================== */
  /* ================================================= */

  const handleEdit =
    () => {

      history.push(
        "/edit-campaign"
      );

    };

  /* ================================================= */
  /* ================= PREVIEW ======================= */
  /* ================================================= */

  const handlePreview =
    () => {

      window.open(
        "/my-campaign",
        "_blank"
      );

    };

  /* ================================================= */
  /* ================= PHOTO ========================= */
  /* ================================================= */

  const handlePhotoClick =
    () => {

      fileInputRef.current.click();

    };

  const handleImageChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file)
        return;

      const imageUrl =
        URL.createObjectURL(file);

      setCampaignImage(
        imageUrl
      );

    };

  return (

    <div className="mycampaign-hero">

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="mycampaign-header">

        <div>

          <div className="mycampaign-title-row">

            <div className="campaign-mini-badge">

              <FaArrowUp />

              <span>

                {t("campaignGrowing")}

              </span>

            </div>

            <h1>

              {t("myCampaign")}

            </h1>

            <FaHeart className="header-heart" />

          </div>

          <p>

            {t("manageCampaignSubtitle")}

          </p>

        </div>

        {/* ================================================= */}
        {/* ================= SHARE ========================= */}
        {/* ================================================= */}

        <button
          className="share-campaign-btn"
          onClick={handleShare}
        >

          <FaShareAlt />

          {shared
            ? t("copied")
            : t("shareCampaign")}

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= MAIN CARD ===================== */}
      {/* ================================================= */}

      <div className="campaign-main-card">

        <div className="hero-card-glow"></div>

        {/* ================================================= */}
        {/* ================= IMAGE ========================= */}
        {/* ================================================= */}

        <div className="campaign-image-section">

          <img
            src={campaignImage}
            alt="campaign"
            className="campaign-image"
          />

          {/* ACTIVE */}

          <span className="active-badge">

            <FaCheckCircle />

            {t("active")}

          </span>

          {/* CHANGE PHOTO */}

          <button
            className="change-photo-btn"
            onClick={handlePhotoClick}
          >

            <FaCamera />

            {t("changePhoto")}

          </button>

          {/* FILE INPUT */}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{
              display: "none",
            }}
            onChange={handleImageChange}
          />

          {/* SUPPORTERS */}

          <div className="floating-supporters">

            <FaUserFriends />

            <div>

              <strong>

                128

              </strong>

              <span>

                {t("supporters")}

              </span>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= CONTENT ======================= */}
        {/* ================================================= */}

        <div className="campaign-content">

          {/* TOP */}

          <div className="campaign-top">

            <div>

              <h2>

                {t("healthyHeartJourney")}

              </h2>

              <span className="campaign-live-status">

                ● {t("fundraisingInProgress")}

              </span>

            </div>

            {/* EDIT */}

            <button
              className="edit-icon-btn"
              onClick={handleEdit}
            >

              <FaPen />

            </button>

          </div>

          {/* DESCRIPTION */}

          <p className="campaign-description">

            {t("campaignDescription")}

          </p>

          {/* ================================================= */}
          {/* ================= STATS ========================= */}
          {/* ================================================= */}

          <div className="campaign-stats-row">

            <div className="campaign-stat-card">

              <strong>

                $3,200

              </strong>

              <span>

                {t("raised")}

              </span>

            </div>

            <div className="campaign-stat-card">

              <strong>

                64%

              </strong>

              <span>

                {t("funded")}

              </span>

            </div>

            <div className="campaign-stat-card">

              <strong>

                18

              </strong>

              <span>

                {t("daysLeft")}

              </span>

            </div>

          </div>

          {/* ================================================= */}
          {/* ================= INFO GRID ==================== */}
          {/* ================================================= */}

          <div className="campaign-info-grid">

            {/* CATEGORY */}

            <div className="campaign-info-box">

              <div className="info-icon pink">

                <FaHeart />

              </div>

              <div>

                <small>

                  {t("category")}

                </small>

                <span>

                  {t("medical")}

                </span>

              </div>

            </div>

            {/* DATE */}

            <div className="campaign-info-box">

              <div className="info-icon blue">

                <FaRegCalendarAlt />

              </div>

              <div>

                <small>

                  {t("createdOn")}

                </small>

                <span>

                  10 May 2026

                </span>

              </div>

            </div>

            {/* LOCATION */}

            <div className="campaign-info-box">

              <div className="info-icon red">

                <FaMapMarkerAlt />

              </div>

              <div>

                <small>

                  {t("location")}

                </small>

                <span>

                  {t("ruralIndia")}

                </span>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* ================= ACTIONS ======================= */}
          {/* ================================================= */}

          <div className="campaign-actions">

            {/* EDIT */}

            <button
              className="edit-campaign-btn"
              onClick={handleEdit}
            >

              <FaPen />

              {t("editCampaign")}

            </button>

            {/* PREVIEW */}

            <button
              className="preview-btn"
              onClick={handlePreview}
            >

              <FaEye />

              {t("previewPage")}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MyCampaignHero;