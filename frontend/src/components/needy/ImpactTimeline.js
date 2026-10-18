
// src/components/needy/ImpactTimeline.js

import React from "react";

import {
  FaHeart,
  FaUsers,
  FaSmile,
  FaCheckCircle,
  FaRegClock,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import "./ImpactTimeline.css";

function ImpactTimeline({
  darkMode,
}) {

  const { t } =
    useTranslation();

  const timeline = [

    {
      title:
        t(
          "campaignStarted"
        ),

      date:
        "01 May 2026",

      status:
        "done",
    },

    {
      title:
        t(
          "verificationCompleted"
        ),

      date:
        "03 May 2026",

      status:
        "done",
    },

    {
      title:
        t(
          "firstDonationReceived"
        ),

      date:
        "05 May 2026",

      status:
        "done",
    },

    {
      title:
        t(
          "medicalTreatmentStarted"
        ),

      date:
        "06 May 2026",

      status:
        "done",
    },

    {
      title:
        t(
          "ongoingRecovery"
        ),

      date:
        t(
          "inProgress"
        ),

      status:
        "progress",
    },

  ];

  return (

    <div
      className={`impact-wrapper ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      <div className="impact-timeline-grid">

        {/* ================= IMPACT ================= */}

        <div className="impact-card">

          <div className="impact-card-header">

            <h2>

              {t(
                "impactUpdates"
              )}

            </h2>

            <p>

              {t(
                "realImpactCreated"
              )}

            </p>

          </div>

          <div className="impact-stats">

            {/* CARD 1 */}

            <div className="impact-stat-box">

              <div className="impact-icon green">

                <FaHeart />

              </div>

              <span>

                {t(
                  "patientsHelped"
                )}

              </span>

              <h3>
                48
              </h3>

              <p>

                {t(
                  "medicalSupportProvided"
                )}

              </p>

            </div>

            {/* CARD 2 */}

            <div className="impact-stat-box">

              <div className="impact-icon blue">

                <FaUsers />

              </div>

              <span>

                {t(
                  "familiesSupported"
                )}

              </span>

              <h3>
                32
              </h3>

              <p>

                {t(
                  "familiesReceivedAssistance"
                )}

              </p>

            </div>

            {/* CARD 3 */}

            <div className="impact-stat-box">

              <div className="impact-icon purple">

                <FaSmile />

              </div>

              <span>

                {t(
                  "recoveryProgress"
                )}

              </span>

              <h3>
                82%
              </h3>

              <p>

                {t(
                  "towardsCompleteRecovery"
                )}

              </p>

            </div>

          </div>

        </div>

        {/* ================= TIMELINE ================= */}

        <div className="timeline-card">

          <div className="timeline-header">

            <h2>

              {t(
                "campaignTimeline"
              )}

            </h2>

            <p>

              {t(
                "keyMilestonesJourney"
              )}

            </p>

          </div>

          <div className="timeline-list">

            {timeline.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="timeline-item"
                >

                  <div className="timeline-left">

                    <div
                      className={`timeline-dot ${
                        item.status ===
                        "progress"
                          ? "progress"
                          : ""
                      }`}
                    >

                      {item.status ===
                      "progress"
                        ? <FaRegClock />
                        : <FaCheckCircle />}

                    </div>

                    <span>

                      {item.title}

                    </span>

                  </div>

                  <strong
                    className={
                      item.status ===
                      "progress"
                        ? "progress-text"
                        : ""
                    }
                  >

                    {item.date}

                  </strong>

                </div>

              )
            )}

          </div>

        </div>

        {/* ================= SUPPORT ================= */}

        <div className="support-banner">

          <div className="support-left">

            <div className="support-arrow">

              ›

            </div>

            <div>

              <h4>

                {t(
                  "haveQuestions"
                )}

              </h4>

              <p>

                {t(
                  "supportMessage"
                )}

              </p>

            </div>

          </div>

          <button>

            {t(
              "contactSupport"
            )}

          </button>

        </div>

      </div>

    </div>

  );

}

export default ImpactTimeline;

