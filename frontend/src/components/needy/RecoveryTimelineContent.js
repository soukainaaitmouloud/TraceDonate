// src/components/needy/RecoveryTimelineContent.js

import React, {
  useState,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import {
  FaClipboardCheck,
  FaHeart,
  FaHospital,
  FaBed,
  FaRunning,
  FaClock,
  FaTrophy,
} from "react-icons/fa";

/* ================================================= */
/* ================= ICONS ========================= */
/* ================================================= */

const iconsMap = {

  diagnosis:
    <FaClipboardCheck />,

  treatment:
    <FaHeart />,

  surgery:
    <FaHospital />,

  recovery:
    <FaBed />,

  rehab:
    <FaRunning />,

  followup:
    <FaClock />,

  goal:
    <FaTrophy />,
};

/* ================================================= */
/* ================= COMPONENT ===================== */
/* ================================================= */

function RecoveryTimelineContent({
  milestones,
}) {

  const {
    t,
  } = useTranslation();

  const [
    expandedIndex,
    setExpandedIndex,
  ] = useState(null);

  /* ================================================= */
  /* ================= TOGGLE ======================== */
  /* ================================================= */

  const toggleExpand =
    (index) => {

      setExpandedIndex(

        expandedIndex === index
          ? null
          : index

      );

    };

  return (

    <div className="recovery-timeline-content">

      {milestones.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className="timeline-card"
          >

            {/* ================================================= */}
            {/* ================= LEFT SIDE ===================== */}
            {/* ================================================= */}

            <div className="timeline-left">

              {/* ICON */}

              <div
                className={`icon-wrapper ${
                  item.statusType
                }`}
              >

                <span className="icon">

                  {
                    iconsMap[
                      item.icon
                    ]
                  }

                </span>

              </div>

              {/* LINE */}

              {index <
                milestones.length - 1 && (

                <div
                  className={`timeline-line ${
                    item.statusType
                  }`}
                >

                  <div className="timeline-line-fill" />

                </div>

              )}

            </div>

            {/* ================================================= */}
            {/* ================= RIGHT SIDE ==================== */}
            {/* ================================================= */}

            <div className="timeline-right">

              {/* HEADER */}

              <div className="timeline-card-header">

                <h4>

                  {item.title}

                </h4>

                <div
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: "10px",
                  }}
                >

                  {/* STATUS BADGE */}

                  <div
                    className={`status-badge ${
                      item.statusType
                    }`}
                  >

                    {item.status}

                  </div>

                  {/* EXPAND BUTTON */}

                  {item.extra && (

                    <button
                      className="expand-btn"
                      onClick={() =>
                        toggleExpand(
                          index
                        )
                      }
                    >

                      {expandedIndex ===
                      index

                        ? "▲"

                        : "▼"}

                    </button>

                  )}

                </div>

              </div>

              {/* DATE */}

              <span className="timeline-date">

                {item.date}

              </span>

              {/* DESCRIPTION */}

              <p className="timeline-description">

                {item.description}

              </p>

              {/* EXTRA */}

              {item.extra &&
                expandedIndex ===
                  index && (

                  <div className="timeline-extra">

                    {item.extra}

                  </div>

              )}

            </div>

          </div>

        )
      )}

    </div>

  );

}

export default RecoveryTimelineContent;