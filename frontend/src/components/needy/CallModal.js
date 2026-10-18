import React from "react";

import "./CallModal.css";

import {
  FaPhoneAlt,
  FaMicrophone,
  FaVideo,
  FaVolumeUp,
  FaTimes,
} from "react-icons/fa";

function CallModal({
  type = "audio",
  onClose,
}) {

  return (

    <div className="call-modal-overlay">

      <div className="call-modal">

        {/* CLOSE */}

        <button
          className="close-call-btn"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* USER */}

        <div className="call-user-section">

          <div className="call-avatar">
            A
          </div>

          <h2>
            Aarav Mehta
          </h2>

          <p>
            {type === "video"
              ? "Video Calling..."
              : "Audio Calling..."}
          </p>

        </div>

        {/* VIDEO AREA */}

        {type === "video" && (

          <div className="video-preview">

            <div className="remote-video">
              Remote Video
            </div>

            <div className="local-video">
              You
            </div>

          </div>

        )}

        {/* CONTROLS */}

        <div className="call-controls">

          <button className="control-btn">
            <FaMicrophone />
          </button>

          <button className="control-btn">
            <FaVolumeUp />
          </button>

          {type === "video" && (
            <button className="control-btn">
              <FaVideo />
            </button>
          )}

          <button
            className="end-call-btn"
            onClick={onClose}
          >
            <FaPhoneAlt />
          </button>

        </div>

      </div>

    </div>

  );

}

export default CallModal;