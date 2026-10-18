// src/components/needy/DocumentsVerification.js

import React from "react";

import {
  FaCheckCircle,
  FaShieldAlt,
  FaArrowRight,
  FaFileMedical,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import "./DocumentsVerification.css";

function DocumentsVerification() {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= DOCUMENTS ===================== */
  /* ================================================= */

  const docs = [

    {
      id: 1,

      title:
        t("medicalReport"),

      image:
        "/images/doc1.png",
    },

    {
      id: 2,

      title:
        t("doctorCertificate"),

      image:
        "/images/doc2.png",
    },

    {
      id: 3,

      title:
        t("hospitalEstimate"),

      image:
        "/images/doc3.png",
    },

    {
      id: 4,

      title:
        t("identityProof"),

      image:
        "/images/doc4.png",
    },
  ];

  /* ================================================= */
  /* ================= VIEW ALL ====================== */
  /* ================================================= */

  const handleViewAll =
    () => {

      history.push(
        "/documents-verification"
      );

    };

  /* ================================================= */
  /* ================= OPEN DOC ====================== */
  /* ================================================= */

  const handleOpenDocument =
    (doc) => {

      alert(

        `${doc.title} ${t("verifiedSuccessfully")}`

      );

    };

  return (

    <div className="documents-box">

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="documents-header">

        <h2>

          {t("documentsVerification")}

        </h2>

        <button
          onClick={handleViewAll}
        >

          {t("viewAll")}

          <FaArrowRight />

        </button>

      </div>

      {/* ================================================= */}
      {/* ================= GRID ========================== */}
      {/* ================================================= */}

      <div className="documents-grid">

        {docs.map((doc) => (

          <div
            className="doc-card"
            key={doc.id}
          >

            {/* IMAGE */}

            <img
              src={doc.image}
              alt={doc.title}
            />

            {/* VERIFIED */}

            <div className="verified-tag">

              <FaCheckCircle />

              {t("verified")}

            </div>

            {/* TITLE */}

            <p>
              {doc.title}
            </p>

            {/* ACTION */}

            <button
              className="open-doc-btn"
              onClick={() =>
                handleOpenDocument(doc)
              }
            >

              <FaFileMedical />

              {t("openDocument")}

            </button>

          </div>

        ))}

      </div>

      {/* ================================================= */}
      {/* ================= FOOTER ======================== */}
      {/* ================================================= */}

      <div className="documents-footer">

        <FaShieldAlt />

        <span>

          {t("documentsVerifiedText")}

        </span>

      </div>

    </div>

  );

}

export default DocumentsVerification;