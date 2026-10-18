
// src/components/needy/TransparencyRightPanel.js

import React, {
  useState,
} from "react";

import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaClock,
  FaUsers,
  FaFilePdf,
  FaReceipt,
  FaUniversity,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import toast from "react-hot-toast";

import "./TransparencyRightPanel.css";

function TransparencyRightPanel({
  darkMode,
}) {

  const { t } =
    useTranslation();

  // ================= FINANCES =================

  const finances = [

    {
      icon:
        <FaCheckCircle />,

      title:
        t(
          "donationsReceived"
        ),

      amount:
        "$245,680",

      green:
        true,
    },

    {
      icon:
        <FaMoneyBillWave />,

      title:
        t(
          "fundsUtilized"
        ),

      amount:
        "$198,450",

      green:
        true,
    },

    {
      icon:
        <FaClock />,

      title:
        t(
          "pendingInProgress"
        ),

      amount:
        "$47,230",

      orange:
        true,
    },

    {
      icon:
        <FaUsers />,

      title:
        t(
          "totalImpactCreated"
        ),

      amount:
        "124",

      purple:
        true,
    },

  ];

  // ================= DOCUMENTS =================

  const documents = [

    {
      icon:
        <FaFilePdf />,

      title:
        t(
          "medicalBills"
        ),

      count:
        t(
          "medicalBillsCount"
        ),

      file:
        "/documents/medical-bills.pdf",
    },

    {
      icon:
        <FaReceipt />,

      title:
        t(
          "expenseReceipts"
        ),

      count:
        t(
          "expenseReceiptsCount"
        ),

      file:
        "/documents/expense-receipts.pdf",
    },

    {
      icon:
        <FaUniversity />,

      title:
        t(
          "bankStatements"
        ),

      count:
        t(
          "bankStatementsCount"
        ),

      file:
        "/documents/bank-statements.pdf",
    },

  ];

  // ================= VIEW DOCUMENT =================

  const handleViewDocument =
    (file) => {

      window.open(
        file,
        "_blank"
      );

      toast.success(
        "Opening Document..."
      );

    };

  // ================= VIEW ALL =================

  const handleViewAll =
    () => {

      toast.success(
        "Opening All Documents"
      );

      window.open(
        "/documents",
        "_blank"
      );

    };

  return (

    <div
      className={`transparency-right-panel ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================================================= */}
      {/* FINANCIAL CARD */}
      {/* ================================================= */}

      <div
        className={`transparency-panel-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        <h2>

          {t(
            "financialTransparency"
          )}

        </h2>

        <p className="panel-subtitle">

          {t(
            "campaignBreakdown"
          )}

        </p>

        {/* FINANCIAL LIST */}

        <div className="financial-list">

          {finances.map(
            (
              item,
              i
            ) => (

              <div
                key={i}
                className="financial-item"
              >

                {/* LEFT */}

                <div className="financial-left">

                  <div
                    className={`financial-icon ${
                      item.green
                        ? "green"
                        : ""
                    } ${
                      item.orange
                        ? "orange"
                        : ""
                    } ${
                      item.purple
                        ? "purple"
                        : ""
                    }`}
                  >

                    {item.icon}

                  </div>

                  <span>

                    {item.title}

                  </span>

                </div>

                {/* AMOUNT */}

                <strong>

                  {item.amount}

                </strong>

              </div>

            )
          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* DOCUMENTS CARD */}
      {/* ================================================= */}

      <div
        className={`transparency-panel-card ${
          darkMode
            ? "dark"
            : ""
        }`}
      >

        <h2>

          {t(
            "documentsProof"
          )}

        </h2>

        <p className="panel-subtitle">

          {t(
            "financialDocumentsProofs"
          )}

        </p>

        {/* DOCUMENTS */}

        <div className="documents-list">

          {documents.map(
            (
              doc,
              i
            ) => (

              <div
                key={i}
                className="document-item"
              >

                {/* LEFT */}

                <div className="document-left">

                  <div className="document-icon">

                    {doc.icon}

                  </div>

                  <div className="document-content">

                    <strong>

                      {doc.title}

                    </strong>

                    <span>

                      {doc.count}

                    </span>

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  onClick={() =>
                    handleViewDocument(
                      doc.file
                    )
                  }
                >

                  <FaExternalLinkAlt />

                  {t(
                    "view"
                  )}

                </button>

              </div>

            )
          )}

        </div>

        {/* VIEW ALL */}

        <button
          className="view-all-docs"
          onClick={
            handleViewAll
          }
        >

          {t(
            "viewAllDocuments"
          )}

        </button>

      </div>

    </div>

  );

}

export default TransparencyRightPanel;
