// src/pages/LiveSupport.js

import React, {
  useState,
  useEffect,
} from "react";

import {
  FaArrowLeft,
  FaVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaHeart,
  FaShareAlt,
  FaPaperPlane,
  FaUserFriends,
  FaCircle,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import "./LiveSupport.css";

function LiveSupport() {

  const history =
    useHistory();

  const [
    muted,
    setMuted,
  ] = useState(false);

  const [
    cameraOff,
    setCameraOff,
  ] = useState(false);

  const [
    liked,
    setLiked,
  ] = useState(false);

  const [
    viewers,
    setViewers,
  ] = useState(128);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    comments,
    setComments,
  ] = useState([

      {
        id: 1,
        name: "Sophia",
        text:
          "Stay strong ❤️",
      },

      {
        id: 2,
        name: "Daniel",
        text:
          "We are praying for you 🙏",
      },

      {
        id: 3,
        name: "Emma",
        text:
          "You got this 💚",
      },

    ]);

  /* ================================================= */
  /* ================= FAKE LIVE VIEWERS ============= */
  /* ================================================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setViewers(
          (prev) =>
            prev +
            Math.floor(
              Math.random() * 3
            )
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

  /* ================================================= */
  /* ================= SEND MESSAGE ================== */
  /* ================================================= */

  const handleSend =
    () => {

      if (
        !message.trim()
      )
        return;

      const newComment = {

        id:
          Date.now(),

        name:
          "You",

        text:
          message,

      };

      setComments(
        (prev) => [

          ...prev,

          newComment,

        ]
      );

      setMessage("");

    };

  /* ================================================= */
  /* ================= SHARE ========================= */
  /* ================================================= */

  const handleShare =
    async () => {

      const shareData = {

        title:
          "Join My Live Recovery Stream",

        text:
          "Watch and support my recovery journey ❤️",

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

          alert(
            "Live link copied!"
          );

        }

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="live-support-page">

      {/* ================================================= */}
      {/* ================= BACKGROUND ==================== */}
      {/* ================================================= */}

      <div className="live-bg-circle one"></div>
      <div className="live-bg-circle two"></div>

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="live-header">

        <button
          className="live-back-btn"
          onClick={() =>
            history.goBack()
          }
        >

          <FaArrowLeft />

        </button>

        <div>

          <p>

            Live Recovery Session

          </p>

          <h1>

            Live Support

          </h1>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= MAIN ========================== */}
      {/* ================================================= */}

      <div className="live-layout">

        {/* ================================================= */}
        {/* ================= VIDEO SIDE ==================== */}
        {/* ================================================= */}

        <div className="live-video-section">

          {/* VIDEO */}

          <div className="live-video-card">

            <img
              src="/images/update1.jpg"
              alt="live"
            />

            {/* LIVE BADGE */}

            <div className="live-badge">

              <FaCircle />

              LIVE

            </div>

            {/* VIEWERS */}

            <div className="live-viewers">

              <FaUserFriends />

              {viewers} Watching

            </div>

            {/* OVERLAY */}

            <div className="live-overlay">

              <h2>

                Recovery Progress Stream ❤️

              </h2>

              <p>

                Thank you everyone for
                supporting my journey

              </p>

            </div>

          </div>

          {/* CONTROLS */}

          <div className="live-controls">

            <button
              onClick={() =>
                setMuted(
                  !muted
                )
              }
            >

              {muted
                ? (
                  <FaMicrophoneSlash />
                )
                : (
                  <FaMicrophone />
                )}

            </button>

            <button
              onClick={() =>
                setCameraOff(
                  !cameraOff
                )
              }
            >

              {cameraOff
                ? (
                  <FaVideoSlash />
                )
                : (
                  <FaVideo />
                )}

            </button>

            <button
              className={`like-btn ${
                liked
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setLiked(
                  !liked
                )
              }
            >

              <FaHeart />

            </button>

            <button
              onClick={handleShare}
            >

              <FaShareAlt />

            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= CHAT SIDE ===================== */}
        {/* ================================================= */}

        <div className="live-chat-section">

          {/* TOP */}

          <div className="chat-top">

            <h3>

              Live Chat

            </h3>

            <span>

              {comments.length}
              {" "}
              Messages

            </span>

          </div>

          {/* COMMENTS */}

          <div className="chat-messages">

            {comments.map(
              (item) => (

                <div
                  className="chat-message"
                  key={item.id}
                >

                  <div className="chat-avatar">

                    {item.name[0]}

                  </div>

                  <div className="chat-content">

                    <strong>

                      {item.name}

                    </strong>

                    <p>

                      {item.text}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

          {/* INPUT */}

          <div className="chat-input-box">

            <input
              type="text"
              placeholder="Send support message..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key ===
                  "Enter"
                ) {

                  handleSend();

                }

              }}
            />

            <button
              onClick={handleSend}
            >

              <FaPaperPlane />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default LiveSupport;