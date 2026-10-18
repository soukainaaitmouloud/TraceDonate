// src/pages/CampaignQR.js

import React, {
  useState,
  useRef,
} from "react";

import Topbar
from "../components/Topbar";

import NeedyLayout
from "../layouts/NeedyLayout";

import {
  FaArrowLeft,
  FaDownload,
  FaShareAlt,
  FaCheckCircle,
  FaQrcode,
  FaHeart,
  FaLink,
  FaWhatsapp,
  FaFacebookF,
  FaTelegramPlane,
  FaCheck,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import html2canvas from "html2canvas";

import "./CampaignQR.css";

function CampaignQR({
  darkMode,
  setDarkMode,
}) {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  const qrRef =
    useRef(null);

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    shared,
    setShared,
  ] = useState(false);

  const campaignLink =
    `${window.location.origin}/my-campaign`;

  /* ================================================= */
  /* ================= COPY LINK ===================== */
  /* ================================================= */

  const handleCopy =
    async () => {

      try {

        await navigator.clipboard.writeText(
          campaignLink
        );

        setCopied(true);

        setTimeout(() => {

          setCopied(false);

        }, 2000);

      } catch (err) {

        console.log(err);

      }

    };

  /* ================================================= */
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    async () => {

      const shareData = {

        title:
          t("supportMyRecovery"),

        text:
          t("shareCampaignText"),

        url:
          campaignLink,

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
            campaignLink
          );

          setShared(true);

          setTimeout(() => {

            setShared(false);

          }, 2000);

        }

      } catch (err) {

        console.log(err);

      }

    };

  /* ================================================= */
  /* ================= DOWNLOAD ====================== */
  /* ================================================= */

  const handleDownload =
    async () => {

      if (!qrRef.current)
        return;

      try {

        const canvas =
          await html2canvas(
            qrRef.current
          );

        const image =
          canvas.toDataURL(
            "image/png"
          );

        const link =
          document.createElement(
            "a"
          );

        link.href =
          image;

        link.download =
          "campaign-qr.png";

        link.click();

      } catch (err) {

        console.log(err);

      }

    };

  /* ================================================= */
  /* ================= SOCIAL SHARE ================== */
  /* ================================================= */

  const handleSocialShare =
    (platform) => {

      let url = "";

      switch (platform) {

        case "whatsapp":

          url =
            `https://wa.me/?text=${encodeURIComponent(campaignLink)}`;

          break;

        case "facebook":

          url =
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignLink)}`;

          break;

        case "telegram":

          url =
            `https://t.me/share/url?url=${encodeURIComponent(campaignLink)}`;

          break;

        default:
          break;

      }

      window.open(
        url,
        "_blank"
      );

    };

  return (

    <NeedyLayout>

      <div
        className={
          darkMode
            ? "campaign-qr-page dark-mode"
            : "campaign-qr-page"
        }
      >

        {/* ================================================= */}
        {/* ================= TOPBAR ======================== */}
        {/* ================================================= */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ================================================= */}
        {/* ================= BG ============================ */}
        {/* ================================================= */}

        <div className="qr-bg-circle one"></div>
        <div className="qr-bg-circle two"></div>

        {/* ================================================= */}
        {/* ================= HEADER ======================== */}
        {/* ================================================= */}

        <div className="qr-header">

          <button
            className="qr-back-btn"
            onClick={() =>
              history.goBack()
            }
          >

            <FaArrowLeft />

          </button>

          <div>

            <p>

              {t("smartSharing")}

            </p>

            <h1>

              {t("campaignQR")}

            </h1>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= MAIN ========================== */}
        {/* ================================================= */}

        <div className="qr-layout">

          {/* ================================================= */}
          {/* ================= LEFT ========================== */}
          {/* ================================================= */}

          <div className="qr-left">

            <div className="qr-badge">

              <FaQrcode />

              {t("instantDonationAccess")}

            </div>

            <h2>

              {t("qrTitle")}

            </h2>

            <p>

              {t("qrDescription")}

            </p>

            {/* ================================================= */}
            {/* ================= ACTIONS ======================= */}
            {/* ================================================= */}

            <div className="qr-actions">

              <button
                className="download-btn"
                onClick={handleDownload}
              >

                <FaDownload />

                {t("downloadQR")}

              </button>

              <button
                className={`share-btn ${
                  shared
                    ? "shared"
                    : ""
                }`}
                onClick={handleShare}
              >

                {shared
                  ? (
                    <FaCheck />
                  )
                  : (
                    <FaShareAlt />
                  )}

                {shared
                  ? t("copied")
                  : t("shareCampaign")}

              </button>

            </div>

            {/* ================================================= */}
            {/* ================= LINK BOX ====================== */}
            {/* ================================================= */}

            <div className="qr-link-box">

              <div>

                <FaLink />

              </div>

              <span>

                {campaignLink}

              </span>

              <button
                onClick={handleCopy}
              >

                {copied
                  ? t("copied")
                  : t("copy")}

              </button>

            </div>

            {/* ================================================= */}
            {/* ================= SOCIALS ======================= */}
            {/* ================================================= */}

            <div className="qr-socials">

              <button
                onClick={() =>
                  handleSocialShare(
                    "whatsapp"
                  )
                }
              >

                <FaWhatsapp />

              </button>

              <button
                onClick={() =>
                  handleSocialShare(
                    "facebook"
                  )
                }
              >

                <FaFacebookF />

              </button>

              <button
                onClick={() =>
                  handleSocialShare(
                    "telegram"
                  )
                }
              >

                <FaTelegramPlane />

              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* ================= RIGHT ========================= */}
          {/* ================================================= */}

          <div className="qr-right">

            <div
              className="qr-card"
              ref={qrRef}
            >

              <div className="qr-card-top">

                <div className="verified">

                  <FaCheckCircle />

                  {t("verifiedCampaign")}

                </div>

              </div>

              {/* ================================================= */}
              {/* ================= QR =========================== */}
              {/* ================================================= */}

              <div className="qr-code-wrapper">

                <div className="fake-qr">

                  <div className="qr-box a"></div>
                  <div className="qr-box b"></div>
                  <div className="qr-box c"></div>
                  <div className="qr-box d"></div>
                  <div className="qr-box e"></div>
                  <div className="qr-box f"></div>
                  <div className="qr-box g"></div>
                  <div className="qr-box h"></div>

                </div>

              </div>

              {/* ================================================= */}
              {/* ================= INFO ========================= */}
              {/* ================================================= */}

              <h3>

                {t("supportMyRecovery")}

              </h3>

              <p>

                {t("scanToOpen")}

              </p>

              {/* ================================================= */}
              {/* ================= STATS ======================== */}
              {/* ================================================= */}

              <div className="qr-stats">

                <div>

                  <strong>

                    128

                  </strong>

                  <span>

                    {t("donors")}

                  </span>

                </div>

                <div>

                  <strong>

                    $3,200

                  </strong>

                  <span>

                    {t("raised")}

                  </span>

                </div>

                <div>

                  <strong>

                    64%

                  </strong>

                  <span>

                    {t("funded")}

                  </span>

                </div>

              </div>

              {/* ================================================= */}
              {/* ================= FOOTER ======================= */}
              {/* ================================================= */}

              <div className="qr-footer">

                <FaHeart />

                {t("thankSupport")}

              </div>

            </div>

          </div>

        </div>

      </div>

    </NeedyLayout>

  );

}

export default CampaignQR;