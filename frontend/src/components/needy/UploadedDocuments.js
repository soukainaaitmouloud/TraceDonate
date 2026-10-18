// src/components/needy/UploadedDocuments.js

import React from "react";

import {
  FaIdCard,
  FaFileMedical,
  FaMapMarkerAlt,
  FaUniversity,
  FaDownload,
  FaUpload,
  FaShieldAlt,
  FaTrash,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import "./UploadedDocuments.css";


function UploadedDocuments({
  darkMode,
}) {

  const { t } =
    useTranslation();
   

  // ================= DOCUMENTS =================

  const documents = [

    {
      icon: <FaIdCard />,
      title: t("aadharCard"),
      type: t("identityProof"),
      date: t("uploadedDate"),
      status: t("verified"),
      statusClass: "verified",
      docId: "ID123456",
      iconClass: "green",
    },

    {
      icon: <FaFileMedical />,
      title: t("medicalReport"),
      type: t("medicalDocument"),
      date: t("uploadedDate"),
      status: t("verified"),
      statusClass: "verified",
      docId: "MED789012",
      iconClass: "blue",
    },

    {
      icon: <FaMapMarkerAlt />,
      title: t("addressProof"),
      type: t("addressVerification"),
      date: t("uploadedDate2"),
      status: t("pending"),
      statusClass: "pending",
      docId: "ADD345678",
      iconClass: "orange",
    },

    {
      icon: <FaUniversity />,
      title: t("bankStatement"),
      type: t("bankVerification"),
      date: t("requiredWithdrawals"),
      status: t("notUploaded"),
      statusClass: "inactive",
      docId: "",
      iconClass: "red",
    },

  ];

  // ================= DOWNLOAD =================

  const handleDownload =
    (doc) => {

      alert(
        `${t(
          "downloading"
        )} ${doc.title}`
      );

    };

  // ================= SUPPORT =================
const handleSupport =
  () => {

    alert(
      t("supportMessage")
    );

  };

  return (

    <div
      className={`uploaded-documents-wrapper ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================= DOCUMENTS CARD ================= */}

      <div className="uploaded-documents-card">

        {/* HEADER */}

        <div className="documents-header">

          <div>

            <h2>
              {t(
                "uploadedDocuments"
              )}
            </h2>

            <p>
              {t(
                "documentsSubtitle"
              )}
            </p>

          </div>

          <button className="upload-new-btn">

            <FaUpload />

            {t(
              "uploadNewDocument"
            )}

          </button>

        </div>

        {/* LIST */}

        <div className="documents-list">

          {documents.map(
            (
              doc,
              index
            ) => (

              <div
                className="document-row"
                key={index}
              >

                {/* LEFT */}

                <div className="document-left">

                  <div
                    className={`document-icon ${doc.iconClass}`}
                  >
                    {doc.icon}
                  </div>

                  <div className="document-info">

                    <div className="document-title-row">

                      <h3>
                        {doc.title}
                      </h3>

                      <span
                        className={`document-status ${doc.statusClass}`}
                      >
                        {doc.status}
                      </span>

                    </div>

                    <span className="document-type">

                      {doc.type}

                    </span>

                    <p>
                      {doc.date}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="document-right">

                  {doc.docId && (

                    <span className="document-id">

                      ID:
                      {" "}
                      {doc.docId}

                    </span>

                  )}

                  {doc.status ===
                  t(
                    "notUploaded"
                  ) ? (

                    <button
                      className="upload-now-btn"
                      onClick={() =>
                        alert(
                          t(
                            "uploadStarted"
                          )
                        )
                      }
                    >

                      <FaUpload />

                      {t(
                        "uploadNow"
                      )}

                    </button>

                  ) : (

                    <button
                      className="download-btn"
                      onClick={() =>
                        handleDownload(
                          doc
                        )
                      }
                    >

                      <FaDownload />

                    </button>

                  )}

                  <button
                    className="menu-btn"
                    onClick={() =>
                      alert(
                        t(
                          "documentRemoved"
                        )
                      )
                    }
                  >

                    <FaTrash />

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* ================= SUPPORT CARD ================= */}

      <div className="verification-support-card">

        <div className="support-left">

          <div className="support-icon">

            <FaShieldAlt />

          </div>

          <div>

            <h3>

              {t(
                "needHelpVerification"
              )}

            </h3>

            <p>

              {t(
                "supportSubtitle"
              )}

            </p>

          </div>

        </div>

        <button
          className="support-btn"
          onClick={
            handleSupport
          }
        >

          {t(
            "contactSupport"
          )}

        </button>

      </div>

    </div>

  );

}

export default UploadedDocuments;