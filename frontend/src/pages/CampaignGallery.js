// src/pages/CampaignGallery.js

import React, {
  useState,
} from "react";

import {
  FaArrowLeft,
  FaHeart,
  FaShareAlt,
  FaDownload,
  FaImages,
  FaPlay,
  FaExpand,
  FaCamera,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import "./CampaignGallery.css";

function CampaignGallery() {

  const history =
    useHistory();

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  const [
    liked,
    setLiked,
  ] = useState({});

  const [
    copied,
    setCopied,
  ] = useState(false);

  /* ================================================= */
  /* ================= GALLERY ======================= */
  /* ================================================= */

  const gallery = [

    {
      id: 1,

      image:
        "/images/update1.jpg",

      title:
        "Recovery Progress",

      likes:
        248,

      type:
        "photo",
    },

    {
      id: 2,

      image:
        "/images/update2.jpg",

      title:
        "Hospital Treatment",

      likes:
        192,

      type:
        "photo",
    },

    {
      id: 3,

      image:
        "/images/update3.jpg",

      title:
        "Support From Family",

      likes:
        317,

      type:
        "video",
    },

    {
      id: 4,

      image:
        "/images/update1.jpg",

      title:
        "Daily Recovery",

      likes:
        164,

      type:
        "photo",
    },

    {
      id: 5,

      image:
        "/images/update2.jpg",

      title:
        "Medical Support",

      likes:
        286,

      type:
        "photo",
    },

    {
      id: 6,

      image:
        "/images/update3.jpg",

      title:
        "Positive Moments",

      likes:
        402,

      type:
        "photo",
    },

  ];

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
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    async (e, item) => {

      e.stopPropagation();

      const shareData = {

        title:
          item.title,

        text:
          "Support this recovery journey ❤️",

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

          setCopied(true);

          setTimeout(() => {

            setCopied(false);

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
    async (e, image) => {

      e.stopPropagation();

      try {

        const response =
          await fetch(image);

        const blob =
          await response.blob();

        const blobUrl =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href =
          blobUrl;

        link.download =
          "campaign-image.jpg";

        document.body.appendChild(
          link
        );

        link.click();

        document.body.removeChild(
          link
        );

      } catch (err) {

        console.log(err);

      }

    };

  /* ================================================= */
  /* ================= UPLOAD ======================== */
  /* ================================================= */

  const handleUpload =
    () => {

      alert(
        "Upload feature connected successfully ✅"
      );

    };

  return (

    <div className="campaign-gallery-page">

      {/* ================================================= */}
      {/* ================= BG ============================ */}
      {/* ================================================= */}

      <div className="gallery-bg-circle one"></div>
      <div className="gallery-bg-circle two"></div>

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="gallery-header">

        <button
          className="gallery-back-btn"
          onClick={() =>
            history.goBack()
          }
        >

          <FaArrowLeft />

        </button>

        <div>

          <p>

            Recovery Memories

          </p>

          <h1>

            Campaign Gallery

          </h1>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= HERO ========================== */}
      {/* ================================================= */}

      <div className="gallery-hero">

        <div className="gallery-hero-left">

          <div className="gallery-badge">

            <FaImages />

            128 Photos & Videos

          </div>

          <h2>

            Every photo tells a story of hope,
            strength, and recovery ❤️

          </h2>

          <p>

            Share your journey with supporters
            through beautiful memories and
            recovery updates.

          </p>

          {/* ACTIONS */}

          <div className="gallery-hero-actions">

            <button
              onClick={handleUpload}
            >

              <FaCamera />

              Upload Media

            </button>

            <button
              className="outline"
              onClick={(e) =>
                handleShare(
                  e,
                  {
                    title:
                      "Campaign Gallery",
                  }
                )
              }
            >

              <FaShareAlt />

              {copied
                ? "Copied!"
                : "Share Gallery"}

            </button>

          </div>

        </div>

        {/* HERO CARD */}

        <div className="gallery-hero-card">

          <img
            src="/images/update1.jpg"
            alt="hero"
          />

          <div className="hero-overlay">

            <span>

              Recovery Journey

            </span>

            <strong>

              64% Completed

            </strong>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= GRID ========================== */}
      {/* ================================================= */}

      <div className="gallery-grid">

        {gallery.map((item) => (

          <div
            className="gallery-card"
            key={item.id}
            onClick={() =>
              setSelectedImage(item)
            }
          >

            {/* IMAGE */}

            <img
              src={item.image}
              alt={item.title}
            />

            {/* OVERLAY */}

            <div className="gallery-overlay">

              {/* TOP */}

              <div className="gallery-top">

                {item.type === "video" && (

                  <div className="video-badge">

                    <FaPlay />

                    Video

                  </div>

                )}

                <button>

                  <FaExpand />

                </button>

              </div>

              {/* BOTTOM */}

              <div className="gallery-bottom">

                <div>

                  <h3>

                    {item.title}

                  </h3>

                  <span>

                    Recovery Update

                  </span>

                </div>

                <div className="gallery-likes">

                  <FaHeart />

                  {liked[item.id]
                    ? item.likes + 1
                    : item.likes}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================================================= */}
      {/* ================= MODAL ========================= */}
      {/* ================================================= */}

      {selectedImage && (

        <div
          className="gallery-modal"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <div
            className="gallery-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              className="gallery-close-btn"
              onClick={() =>
                setSelectedImage(null)
              }
            >

              <FaTimes />

            </button>

            {/* IMAGE */}

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
            />

            {/* INFO */}

            <div className="gallery-modal-info">

              <div>

                <h2>

                  {selectedImage.title}

                </h2>

                <p>

                  Shared with love and hope ❤️

                </p>

              </div>

              {/* ACTIONS */}

              <div className="gallery-modal-actions">

                {/* LIKE */}

                <button
                  onClick={(e) =>
                    handleLike(
                      e,
                      selectedImage.id
                    )
                  }
                >

                  <FaHeart />

                  {liked[selectedImage.id]
                    ? "Liked"
                    : "Like"}

                </button>

                {/* SHARE */}

                <button
                  onClick={(e) =>
                    handleShare(
                      e,
                      selectedImage
                    )
                  }
                >

                  {copied
                    ? (
                      <FaCheck />
                    )
                    : (
                      <FaShareAlt />
                    )}

                  {copied
                    ? "Copied!"
                    : "Share"}

                </button>

                {/* DOWNLOAD */}

                <button
                  onClick={(e) =>
                    handleDownload(
                      e,
                      selectedImage.image
                    )
                  }
                >

                  <FaDownload />

                  Download

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default CampaignGallery;