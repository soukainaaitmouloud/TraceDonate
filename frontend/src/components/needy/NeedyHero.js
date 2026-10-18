// src/components/needy/NeedyHero.js

import React, {
  useRef,
  useState,
  useEffect,
} from "react";

import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeart,
  FaShareAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import "./NeedyHero.css";

function NeedyHero() {

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= VIDEO ========================= */
  /* ================================================= */

  const videoRef =
    useRef(null);

  const [isPlaying, setIsPlaying] =
    useState(true);

  const [isMuted, setIsMuted] =
    useState(true);

  const [videoError, setVideoError] =
    useState(false);

  const [shared, setShared] =
    useState(false);

  /* ================================================= */
  /* ================= CAMPAIGN ====================== */
  /* ================================================= */

  const campaign = {

    name: "Riya",

    age: 8,

    location:
      t("ruralIndia"),

    raised: 3200,

    goal: 5000,

    supporters: 128,

    status:
      t("active"),

    story:
      t("riyaStory"),

  };

  const progress =
    Math.round(

      (campaign.raised /
        campaign.goal) * 100

    );

  /* ================================================= */
  /* ================= PLAY ========================= */
  /* ================================================= */

  const togglePlay =
    () => {

      if (!videoRef.current)
        return;

      if (isPlaying) {

        videoRef.current.pause();

      } else {

        videoRef.current.play();

      }

      setIsPlaying(
        !isPlaying
      );

    };

  /* ================================================= */
  /* ================= MUTE ========================= */
  /* ================================================= */

  const toggleMute =
    () => {

      if (!videoRef.current)
        return;

      videoRef.current.muted =
        !isMuted;

      setIsMuted(
        !isMuted
      );

    };

  /* ================================================= */
  /* ================= SHARE ======================== */
  /* ================================================= */

  const handleShare =
    async () => {

      try {

        if (navigator.share) {

          await navigator.share({

            title:
              t("supportRiya"),

            text:
              t("helpRiya"),

            url:
              window.location.href,

          });

        } else {

          await navigator.clipboard.writeText(
            window.location.href
          );

          alert(
            t("campaignCopied")
          );

        }

        setShared(true);

        setTimeout(() => {

          setShared(false);

        }, 2000);

      } catch (err) {

        console.log(err);

      }

    };

  /* ================================================= */
  /* ================= DONATE ======================= */
  /* ================================================= */

  const handleDonate =
    () => {

      alert(
        t("donateSoon")
      );

    };

  /* ================================================= */
  /* ================= AUTO PLAY ==================== */
  /* ================================================= */

  useEffect(() => {

    if (
      videoRef.current &&
      isPlaying
    ) {

      videoRef.current
        .play()
        .catch(() => {});

    }

  }, [isPlaying]);

  return (

    <div className="needy-hero">

      {/* ================================================= */}
      {/* ================= VIDEO ========================= */}
      {/* ================================================= */}

      <div className="hero-video-card">

        {!videoError ? (

          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onError={() =>
              setVideoError(true)
            }
          >

            <source
              src={
                process.env.PUBLIC_URL +
                "/videos/riya.mp4"
              }
              type="video/mp4"
            />

          </video>

        ) : (

          <div className="video-fallback">

            {t("videoUnavailable")}

          </div>

        )}

        <div className="video-dark"></div>

        {/* ================================================= */}
        {/* ================= URGENT ======================== */}
        {/* ================================================= */}

        <div className="urgent-badge">

          {t("urgentSurgeryNeeded")}

        </div>

        {/* ================================================= */}
        {/* ================= CONTROLS ====================== */}
        {/* ================================================= */}

        <div className="video-controls">

          <button
            className="play-btn"
            onClick={togglePlay}
          >

            {isPlaying
              ? <FaPause />
              : <FaPlay />}

          </button>

          <button
            className="mute-btn"
            onClick={toggleMute}
          >

            {isMuted
              ? <FaVolumeMute />
              : <FaVolumeUp />}

          </button>

        </div>

        {/* ================================================= */}
        {/* ================= FOOTER ======================== */}
        {/* ================================================= */}

        <div className="video-bottom">

          <div className="video-status">

            <span className="live-dot"></span>

            {isPlaying
              ? t("storyPlaying")
              : t("videoPaused")}

          </div>

          <span>
            01:24
          </span>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= CONTENT ======================= */}
      {/* ================================================= */}

      <div className="hero-middle">

        {/* STATUS */}

        <div className="campaign-status">

          ● {campaign.status}

          <span>

            {t("updatedHoursAgo")}

          </span>

        </div>

        {/* TITLE */}

        <div className="hero-title-row">

          <div>

            <h1 className="hero-main-title">

              {t("help")}{" "}

              {campaign.name}{" "}

              {t("receiveHeartSurgery")}

            </h1>

            <p className="hero-subtitle">

              {t("campaignSubtitle")}

            </p>

          </div>

          <FaHeart className="hero-heart" />

        </div>

        {/* STORY */}

        <div className="story-box">

          <p>
            {campaign.story}
          </p>

        </div>

        {/* ================================================= */}
        {/* ================= PROGRESS ====================== */}
        {/* ================================================= */}

        <div className="hero-progress-wrapper">

          <div className="hero-progress-top">

            <strong>

              $

              {campaign.raised.toLocaleString()}

            </strong>

            <span>

              {t("raisedOf")} $

              {campaign.goal.toLocaleString()}

              {" "}

              {t("goal")}

            </span>

          </div>

          <div className="hero-progress-bar">

            <div
              className="hero-progress-fill"
              style={{
                width:
                  `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= STATS ========================= */}
        {/* ================================================= */}

        <div className="hero-stats">

          <div className="hero-stat">

            <strong>
              {progress}%
            </strong>

            <span>
              {t("funded")}
            </span>

          </div>

          <div className="hero-stat">

            <strong>
              {campaign.supporters}
            </strong>

            <span>
              {t("supporters")}
            </span>

          </div>

          <div className="hero-stat">

            <strong>
              18
            </strong>

            <span>
              {t("daysLeft")}
            </span>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= TAGS ========================== */}
        {/* ================================================= */}

        <div className="hero-tags">

          <div className="hero-tag">

            ❤️ {t("heartDisease")}

          </div>

          <div className="hero-tag">

            <FaCalendarAlt />

            {campaign.age}{" "}

            {t("yearsOld")}

          </div>

          <div className="hero-tag">

            <FaMapMarkerAlt />

            {campaign.location}

          </div>

          <div className="hero-tag">

            <FaCheckCircle />

            {t("hospitalVerified")}

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= ACTIONS ======================= */}
        {/* ================================================= */}

        <div className="hero-actions">

          <button
            className="share-story-btn"
            onClick={handleShare}
          >

            <FaShareAlt />

            {shared
              ? t("campaignShared")
              : t("shareCampaign")}

          </button>

          <button
            className="donate-hero-btn"
            onClick={handleDonate}
          >

            {t("donateSupport")}

          </button>

        </div>

        {/* ================================================= */}
        {/* ================= QUOTE ========================= */}
        {/* ================================================= */}

        <div className="quote-box">

          {t("riyaQuote")}

          <span>

            — {campaign.name}

          </span>

        </div>

      </div>

    </div>

  );

}

export default NeedyHero;