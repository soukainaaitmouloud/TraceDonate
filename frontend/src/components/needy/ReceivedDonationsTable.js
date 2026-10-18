// src/components/needy/ReceivedDonationsTable.js

import React from "react";

import {
  FaCheckCircle,
  FaClock,
  FaEllipsisV,
  FaChevronDown,
  FaHeadset,
  FaEye,
  FaDownload,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import {
  useHistory,
} from "react-router-dom";

import "./ReceivedDonationsTable.css";

function ReceivedDonationsTable({
  darkMode,
}) {

  const { t } =
    useTranslation();

  const history =
    useHistory();

  /* ================================================= */
  /* ================= SUPPORT ======================= */
  /* ================================================= */

  const handleSupport =
    () => {

      history.push(
        "/messages"
      );

    };

  /* ================================================= */
  /* ================= OPEN ========================== */
  /* ================================================= */

  const handleOpen =
    (name) => {

      alert(
        `${t(
          "openingDonation"
        )}: ${name}`
      );

    };

  /* ================================================= */
  /* ================= DOWNLOAD ====================== */
  /* ================================================= */

  const handleDownload =
    (name) => {

      const text = `

${t(
  "donationReceipt"
)}

-------------------------

${t("donor")}: ${name}

${t(
  "generated"
)}:
${new Date().toLocaleDateString()}

`;

      const blob =
        new Blob(
          [text],
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

      link.href = url;

      link.download =
        "donation-receipt.txt";

      link.click();

    };

  /* ================================================= */
  /* ================= DATA ========================== */
  /* ================================================= */

  const donations = [

    {
      image:
        "/images/user1.jpg",

      name:
        "Aarav Mehta",

      email:
        "aarav.mehta@email.com",

      amount:
        "$2,500",

      date:
        "10 May 2026",

      time:
        "10:30 AM",

      messageKey:
        "donationMessage1",

      status:
        "completed",
    },

    {
      image:
        "/images/user2.jpg",

      name:
        "Priya Nair",

      email:
        "priya.nair@email.com",

      amount:
        "$1,000",

      date:
        "10 May 2026",

      time:
        "09:15 AM",

      messageKey:
        "donationMessage2",

      status:
        "completed",
    },

    {
      image:
        "/images/user3.jpg",

      name:
        "Rahul Verma",

      email:
        "rahul.verma@email.com",

      amount:
        "$5,000",

      date:
        "09 May 2026",

      time:
        "08:45 PM",

      messageKey:
        "donationMessage3",

      status:
        "completed",
    },

    {
      image:
        "/images/user4.jpg",

      name:
        "Sneha Kapoor",

      email:
        "sneha.kapoor@email.com",

      amount:
        "$750",

      date:
        "09 May 2026",

      time:
        "06:20 PM",

      messageKey:
        "donationMessage4",

      status:
        "completed",
    },

    {
      image:
        "/images/user1.jpg",

      name:
        "Vikram Singh",

      email:
        "vikram.singh@email.com",

      amount:
        "$3,000",

      date:
        "08 May 2026",

      time:
        "11:05 AM",

      messageKey:
        "donationMessage5",

      status:
        "completed",
    },

    {
      image:
        "/images/user2.jpg",

      name:
        "Neha Joshi",

      email:
        "neha.joshi@email.com",

      amount:
        "$1,500",

      date:
        "08 May 2026",

      time:
        "10:10 AM",

      messageKey:
        "donationMessage6",

      status:
        "pending",
    },

  ];

  return (

    <div
      className={`received-donations-wrapper ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================================================= */}
      {/* TABLE CARD */}
      {/* ================================================= */}

      <div className="received-donations-card">

        {/* HEADER */}

        <div className="received-header">

          <div>

            <h2>

              {t(
                "recentDonations"
              )}

            </h2>

            <p>

              {t(
                "trackLatestSupporters"
              )}

            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="received-table">

          {/* HEAD */}

          <div className="table-head">

            <span>
              {t("donor")}
            </span>

            <span>
              {t("amount")}
            </span>

            <span>
              {t("date")}
            </span>

            <span>
              {t("message")}
            </span>

            <span>
              {t("status")}
            </span>

            <span>
              {t("actions")}
            </span>

          </div>

          {/* ROWS */}

          {donations.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="table-row"
              >

                {/* DONOR */}

                <div className="donor-cell">

                  <img
                    src={item.image}
                    alt=""
                  />

                  <div>

                    <strong>

                      {item.name}

                    </strong>

                    <p>

                      {item.email}

                    </p>

                  </div>

                </div>

                {/* AMOUNT */}

                <div className="amount-cell">

                  {item.amount}

                </div>

                {/* DATE */}

                <div className="date-cell">

                  <strong>

                    {item.date}

                  </strong>

                  <p>

                    {item.time}

                  </p>

                </div>

                {/* MESSAGE */}

                <div className="message-cell">

                  {t(
                    item.messageKey
                  )}

                </div>

                {/* STATUS */}

                <div>

                  <div
                    className={`status ${
                      item.status
                    }`}
                  >

                    {
                      item.status ===
                      "completed"
                        ? (
                          <FaCheckCircle />
                        )
                        : (
                          <FaClock />
                        )
                    }

                    {
                      item.status ===
                      "completed"
                        ? t(
                            "completed"
                          )
                        : t(
                            "pending"
                          )
                    }

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="table-actions">

                  <button
                    className="table-btn"
                    onClick={() =>
                      handleOpen(
                        item.name
                      )
                    }
                  >

                    <FaEye />

                  </button>

                  <button
                    className="table-btn"
                    onClick={() =>
                      handleDownload(
                        item.name
                      )
                    }
                  >

                    <FaDownload />

                  </button>

                  <button className="table-btn">

                    <FaEllipsisV />

                  </button>

                </div>

              </div>

            )
          )}

        </div>

        {/* FOOTER */}

        <button className="view-all-btn">

          {t(
            "viewAllDonations"
          )}

          <FaChevronDown />

        </button>

      </div>

      {/* ================================================= */}
      {/* SUPPORT */}
      {/* ================================================= */}

      <div className="support-help-card">

        <div className="support-left">

          <div className="support-icon">

            <FaHeadset />

          </div>

          <div>

            <h3>

              {t(
                "needHelp"
              )}

            </h3>

            <p>

              {t(
                "supportDonationText"
              )}

            </p>

          </div>

        </div>

        <button
          className="contact-support-btn"
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

export default ReceivedDonationsTable;