// src/components/needy/RecentUpdates.js

import React, {
  useState,
} from "react";

import {
  FaPlay,
  FaHeart,
  FaComment,
  FaImages,
  FaArrowRight,
  FaBookmark,
  FaShareAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import "./RecentUpdates.css";

function RecentUpdates() {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= STATES ======================== */
  /* ================================================= */

  const [
    likedCards,
    setLikedCards,
  ] = useState({});

  const [
    savedCards,
    setSavedCards,
  ] = useState({});

  /* ================================================= */
  /* ================= DATA ========================== */
  /* ================================================= */

  const updates = [

    {
      id: 1,

      title:
        t("thankYouMessage"),

      image:
        "/images/update1.jpg",

      time:
        t("twoDaysAgo"),

      text:
  t("recentThankYouText"),

      likes: 125,

      comments: 18,

      duration:
        "00:45",

      video: true,

      verified: true,
    },

    {
      id: 2,

      title:
        t("treatmentUpdate"),

      image:
        "/images/update2.jpg",

      time:
        t("fiveDaysAgo"),

      text:
       t("recentTreatmentUpdateText"),

      likes: 98,

      comments: 12,

      duration:
        "01:02",

      video: true,

      verified: true,
    },

    {
      id: 3,

      title:
        t("recoveryJourney"),

      image:
        "/images/update3.jpg",

      time:
        t("oneWeekAgo"),

      text:
        t("recentRecoveryJourneyText"),

      likes: 87,

      comments: 9,

      gallery: true,
    },
  ];

  /* ================================================= */
  /* ================= NAVIGATION ==================== */
  /* ================================================= */

  const handleViewAll =
    () => {

      history.push(
        "/update-story"
      );

    };

  const handleOpenUpdate =
    (id) => {

      history.push(
        `/update-story?id=${id}`
      );

    };

  /* ================================================= */
  /* ================= LIKE ========================== */
  /* ================================================= */

  const handleLike =
    (e, id) => {

      e.stopPropagation();

      setLikedCards(
        (prev) => ({

          ...prev,

          [id]:
            !prev[id],

        })
      );

    };

  /* ================================================= */
  /* ================= SAVE ========================== */
  /* ================================================= */

  const handleSave =
    (e, id) => {

      e.stopPropagation();

      setSavedCards(
        (prev) => ({

          ...prev,

          [id]:
            !prev[id],

        })
      );

    };

  /* ================================================= */
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    async (e, item) => {

      e.stopPropagation();

      const shareData = {

        title:
          item.title,

        text:
          item.text,

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

          alert(
            t("copied")
          );

        }

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="recent-updates">

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="updates-header">

        <div>

          <span className="updates-mini-badge">

            {t("latestStories")}

          </span>

          <h2>

            {t("recentUpdates")}

          </h2>

        </div>

        <button
          className="view-all-btn"
          onClick={handleViewAll}
        >

          {t("viewAll")}

          <FaArrowRight />

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= GRID ========================== */}
      {/* ================================================= */}

      <div className="updates-grid">

        {updates.map((item) => (

          <div
            className="update-card"
            key={item.id}
            onClick={() =>
              handleOpenUpdate(item.id)
            }
          >

            {/* IMAGE */}

            <div className="update-image-wrapper">

              <img
                src={item.image}
                alt={item.title}
                className="update-image"
              />

              {/* OVERLAY */}

              <div className="image-overlay"></div>

              {/* PLAY */}

              {item.video && (

                <div className="play-button">

                  <FaPlay />

                </div>

              )}

              {/* DURATION */}

              {item.duration && (

                <div className="video-duration">

                  {item.duration}

                </div>

              )}

              {/* GALLERY */}

              {item.gallery && (

                <div className="gallery-badge">

                  <FaImages />

                  <span>

                    5+

                  </span>

                </div>

              )}

              {/* VERIFIED */}

              {item.verified && (

                <div className="verified-badge">

                  <FaCheckCircle />

                  {t("verified")}

                </div>

              )}

              {/* ACTIONS */}

              <div className="update-actions">

                {/* LIKE */}

                <button
                  className={`action-btn ${
                    likedCards[item.id]
                      ? "liked"
                      : ""
                  }`}
                  onClick={(e) =>
                    handleLike(
                      e,
                      item.id
                    )
                  }
                >

                  <FaHeart />

                </button>

                {/* SAVE */}

                <button
                  className={`action-btn ${
                    savedCards[item.id]
                      ? "saved"
                      : ""
                  }`}
                  onClick={(e) =>
                    handleSave(
                      e,
                      item.id
                    )
                  }
                >

                  <FaBookmark />

                </button>

                {/* SHARE */}

                <button
                  className="action-btn"
                  onClick={(e) =>
                    handleShare(
                      e,
                      item
                    )
                  }
                >

                  <FaShareAlt />

                </button>

              </div>

            </div>

            {/* ================================================= */}
            {/* ================= CONTENT ======================= */}
            {/* ================================================= */}

            <div className="update-content">

              <div className="update-top-row">

                <span className="update-time">

                  {item.time}

                </span>

              </div>

              <h3>

                {item.title}

              </h3>

              <p>

                {item.text}

              </p>

              {/* FOOTER */}

              <div className="update-footer">

                <span>

                  <FaHeart />

                  {
                    likedCards[item.id]
                      ? item.likes + 1
                      : item.likes
                  }

                </span>

                <span>

                  <FaComment />

                  {item.comments}

                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentUpdates;