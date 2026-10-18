// src/components/needy/RecentDonations.js

import React, {
  useState,
} from "react";

import {
  FaHeart,
  FaArrowRight,
  FaCheckCircle,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import "./RecentDonations.css";

/* ================================================= */
/* ================= COMPONENT ===================== */
/* ================================================= */

function RecentDonations() {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  const [
    liked,
    setLiked,
  ] = useState({});

  const [
    saved,
    setSaved,
  ] = useState({});

  /* ================================================= */
  /* ================= DONATIONS ===================== */
  /* ================================================= */

  const donations = [

    {
      id: 1,

      name:
  t("donorName1"),

      amount:
        "$50",

      message:
        t("donationMessage1"),

      time:
        t("twoHoursAgo"),

      letter:
        "A",

      color:
        "purple",

      verified:
        true,
    },

    {
      id: 2,

      name:
  t("donorName2"),

      amount:
        "$100",

      message:
        t("donationMessage2"),

      time:
        t("oneDayAgo"),

      letter:
        "S",

      color:
        "yellow",

      verified:
        true,
    },

    {
      id: 3,

    name:
  t("donorName3"),

      amount:
        "$25",

      message:
        t("donationMessage3"),

      time:
        t("twoDaysAgo"),

      letter:
        "R",

      color:
        "red",
    },

    {
      id: 4,

      name:
  t("donorName4"),

      amount:
        "$75",

      message:
        t("donationMessage4"),

      time:
        t("threeDaysAgo"),

      letter:
        "P",

      color:
        "gold",
    },

    {
      id: 5,

      name:
  t("donorName5"),

      amount:
        "$200",

      message:
        t("donationMessage5"),

      time:
        t("fiveDaysAgo"),

      letter:
        "V",

      color:
        "cream",
    },

  ];

  /* ================================================= */
  /* ================= SEE ALL ======================= */
  /* ================================================= */

  const handleSeeAll =
    () => {

      history.push(
        "/donations-received"
      );

    };

  /* ================================================= */
  /* ================= OPEN DONATION ================= */
  /* ================================================= */

  const handleOpenDonation =
    (id) => {

      history.push(
        `/donations-received?id=${id}`
      );

    };

  /* ================================================= */
  /* ================= LIKE ========================== */
  /* ================================================= */

  const handleLike =
    (e, id) => {

      e.stopPropagation();

      setLiked(
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

      setSaved(
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
          `${item.name} donated ${item.amount}`,

        text:
          item.message,

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

    <div className="recent-donations-card">

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="recent-donations-header">

        <div>

          <p className="donation-label">

            {t("communitySupport")}

          </p>

          <h3>

            {t("recentDonations")}

          </h3>

        </div>

        <button
          className="see-all-btn"
          onClick={handleSeeAll}
        >

          {t("seeAll")}

          <FaArrowRight />

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= LIST ========================== */}
      {/* ================================================= */}

      <div className="donations-list">

        {donations.map((item) => (

          <div
            className="donation-item"
            key={item.id}
            onClick={() =>
              handleOpenDonation(item.id)
            }
          >

            {/* ================================================= */}
            {/* ================= AVATAR ======================== */}
            {/* ================================================= */}

            <div
              className={`donation-avatar ${item.color}`}
            >

              {item.letter}

            </div>

            {/* ================================================= */}
            {/* ================= CONTENT ======================= */}
            {/* ================================================= */}

            <div className="donation-content">

              <div className="donation-top">

                {/* LEFT SIDE */}

                <div className="donation-text-side">

                  <div className="donation-name-row">

                    <h4>

                      {item.name}

                    </h4>

                    {item.verified && (

                      <span className="verified-badge">

                        <FaCheckCircle />

                      </span>

                    )}

                  </div>

                  <p>

                    {item.message}

                  </p>

                </div>

                {/* RIGHT SIDE */}

                <strong className="donation-amount">

                  {item.amount}

                </strong>

              </div>

              {/* ================================================= */}
              {/* ================= FOOTER ======================= */}
              {/* ================================================= */}

              <div className="donation-footer">

                <span>

                  {item.time}

                </span>

                {/* ACTIONS */}

                <div className="donation-actions">

                  <button
                    className={`donation-action-btn ${
                      liked[item.id]
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

                  <button
                    className={`donation-action-btn ${
                      saved[item.id]
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

                  <button
                    className="donation-action-btn"
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

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentDonations;