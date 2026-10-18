
// src/pages/RecoveryTimeline.js

import React from "react";

import {
  useTranslation,
} from "react-i18next";

import {
  useHistory,
} from "react-router-dom";

import toast from "react-hot-toast";

import NeedyLayout from "../layouts/NeedyLayout";

import Topbar from "../components/Topbar";

import RecoveryTimelineContent from "../components/needy/RecoveryTimelineContent";

import "./RecoveryTimeline.css";

function RecoveryTimeline({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  const history =
    useHistory();

  // ================= TIMELINE DATA =================

  const milestones = [

    {
      title:
        t(
          "diagnosisAssessment"
        ),

      date:
        "10 May 2026",

      description:
        t(
          "diagnosisAssessmentDesc"
        ),

      status:
        t(
          "completed"
        ),

      icon:
        "diagnosis",
    },

    {
      title:
        t(
          "treatmentPlan"
        ),

      date:
        "15 May 2026",

      description:
        t(
          "treatmentPlanDesc"
        ),

      status:
        t(
          "completed"
        ),

      icon:
        "treatment",
    },

    {
      title:
        t(
          "surgeryCompleted"
        ),

      date:
        "28 May 2026",

      description:
        t(
          "surgeryCompletedDesc"
        ),

      status:
        t(
          "completed"
        ),

      icon:
        "surgery",
    },

    {
      title:
        t(
          "recoveryMonitoring"
        ),

      date:
        "28 May – 10 Jun 2026",

      description:
        t(
          "recoveryMonitoringDesc"
        ),

      status:
        t(
          "inProgress"
        ),

      extra:
        t(
          "supportRecoverySubtitle"
        ),

      icon:
        "recovery",
    },

  ];

  // ================= DOWNLOAD =================

  const handleDownload =
    () => {

      const content = `

${t("recoveryTimeline")}

--------------------------------

${milestones
  .map(
    (item) => `
${item.title}

${item.date}

${item.description}

Status: ${item.status}
`
  )
  .join("\n")}

`;

      const blob =
        new Blob(
          [content],
          {
            type:
              "text/plain",
          }
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href =
        url;

      link.download =
        "recovery-timeline.txt";

      link.click();

      toast.success(
        t(
          "downloadTimeline"
        )
      );

    };

  // ================= VIEW DOCUMENTS =================

  const handleViewDocuments =
    () => {

      toast.success(
        t(
          "documentsProof"
        )
      );

      history.push(
        "/transparency-center"
      );

    };

  return (

    <NeedyLayout>

      <div
        className={`timeline-page ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        {/* ================= TOPBAR ================= */}

        <Topbar
          darkMode={
            darkMode
          }
          setDarkMode={
            setDarkMode
          }
        />

        {/* ================= HEADER ================= */}

        <div className="timeline-header">

          <h1>

            {t(
              "recoveryTimeline"
            )}

          </h1>

        </div>

        {/* ================= DOWNLOAD BAR ================= */}

        <button
          className="timeline-download-bar"
          onClick={
            handleDownload
          }
        >

          {t(
            "downloadTimeline"
          )}

        </button>

        {/* ================= SUBTITLE ================= */}

        <p className="timeline-subtitle">

          {t(
            "recoveryJourneySubtitle"
          )}

        </p>

        {/* ================= INFO BOX ================= */}

        <div className="timeline-info-box">

          <span className="info-icon">

            ✔️

          </span>

          <div>

            <strong>

              {t(
                "supportRecoveryTitle"
              )}

            </strong>

            <p>

              {t(
                "supportRecoverySubtitle"
              )}

            </p>

          </div>

        </div>

        {/* ================= TIMELINE CONTENT ================= */}

        <RecoveryTimelineContent
          milestones={
            milestones
          }
          darkMode={
            darkMode
          }
        />

        {/* ================= FOOTER ================= */}

        <div className="timeline-footer">

          <button
            className="proofs-btn"
            onClick={
              handleViewDocuments
            }
          >

            {t(
              "viewAllDocuments"
            )}

          </button>

        </div>

      </div>

    </NeedyLayout>

  );

}

export default RecoveryTimeline;
