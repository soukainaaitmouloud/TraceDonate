// src/components/needy/SupportersFeed.js

import React from "react";

import {
  FaBullseye,
  FaArrowRight,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import "./SupportersFeed.css";

function SupportersFeed({
  darkMode,
}) {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= SUPPORTERS ==================== */
  /* ================================================= */

  const supporters = [

    {
      id: 1,

      name:
        t("anonymous"),

      amount:
        "$20",

      time:
        t("twoMinAgo"),

      image:
        "/images/user1.jpg",
    },

    {
      id: 2,

      name:
        "Sarah M.",

      amount:
        "$50",

      time:
        t("fifteenMinAgo"),

      image:
        "/images/user2.jpg",
    },

    {
      id: 3,

      name:
        "Aman Verma",

      amount:
        "$100",

      time:
        t("oneHourAgo"),

      image:
        "/images/user3.jpg",
    },

    {
      id: 4,

      name:
        "Priya N.",

      amount:
        "$25",

      time:
        t("twoHoursAgo"),

      image:
        "/images/user4.jpg",
    },
  ];

  /* ================================================= */
  /* ================= NAVIGATION ==================== */
  /* ================================================= */

  const handleViewAll =
    () => {

      history.push(
        "/donations-received"
      );

    };

  /* ================================================= */
  /* ================= SUPPORTER ===================== */
  /* ================================================= */

  const handleSupporterClick =
    (supporter) => {

      alert(

        `${supporter.name} ${t("donated")} ${supporter.amount}`

      );

    };

  /* ================================================= */
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    () => {

      if (
        navigator.share
      ) {

        navigator.share({

          title:
            "TraceDonate",

          text:
            t(
              "donationHope"
            ),

          url:
            window.location.href,
        });

      } else {

        navigator.clipboard.writeText(
          window.location.href
        );

        alert(
          t("linkCopied")
        );

      }

    };

  return (

    <div
      className={`supporters-feed ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="supporters-header">

        <div>

          <h2>

            {t(
              "recentSupporters"
            )}

          </h2>

          <p>

            {t(
              "everyDonationHelps"
            )}

          </p>

        </div>

        <button
          onClick={handleViewAll}
          className="view-all-top-btn"
        >

          {t("viewAll")}

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= LIST ========================== */}
      {/* ================================================= */}

      <div className="supporters-list">

        {supporters.map((item) => (

          <div
            className="supporter-item"
            key={item.id}
            onClick={() =>
              handleSupporterClick(item)
            }
          >

            {/* AVATAR */}

            <div className="supporter-avatar">

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="online-dot" />

            </div>

            {/* INFO */}

            <div className="supporter-info">

              <h4>

                {item.name}

              </h4>

              <p>

                <FaHeart />

                {t("donated")}{" "}

                {item.amount}

              </p>

            </div>

            {/* TIME */}

            <span className="support-time">

              {item.time}

            </span>

          </div>

        ))}

      </div>

      {/* ================================================= */}
      {/* ================= FOOTER BUTTON ================= */}
      {/* ================================================= */}

      <button
        className="see-all-btn"
        onClick={handleViewAll}
      >

        <div className="see-all-left">

          <FaBullseye />

          <span>

            {t(
              "seeAllSupporters"
            )}

          </span>

        </div>

        <FaArrowRight />

      </button>

      {/* ================================================= */}
      {/* ================= SHARE ========================= */}
      {/* ================================================= */}

      <button
        className="share-support-btn"
        onClick={handleShare}
      >

        <FaShareAlt />

        {t("shareCampaign")}

      </button>

      {/* ================================================= */}
      {/* ================= ILLUSTRATION ================== */}
      {/* ================================================= */}

      <div className="supporters-illustration">

        <img
          src="/images/support-hope.png"
          alt="Hope"
        />

        <p>

          {t(
            "donationHope"
          )}

        </p>

      </div>

    </div>

  );

}

export default SupportersFeed;