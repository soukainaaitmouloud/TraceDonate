import React from "react";

import "./MessageBubble.css";

import {
  FaCheckDouble,
} from "react-icons/fa";

function MessageBubble({
  sender,
  text,
  time,
  name,
}) {

  const isMe =
    sender === "me";

  return (

    <div
      className={`message-row ${
        isMe
          ? "me"
          : "other"
      }`}
    >

      {/* AVATAR */}

      {!isMe && (

        <div className="message-avatar">

          {name
            ? name.charAt(0)
            : "S"}

        </div>

      )}

      {/* CONTENT */}

      <div className="message-content">

        {!isMe && (

          <div className="message-name">

            {name || "Supporter"}

          </div>

        )}

        {/* MESSAGE */}

        <div
          className={`message-bubble ${
            isMe
              ? "me-bubble"
              : "other-bubble"
          }`}
        >

          {/* GLOW */}

          <div className="bubble-glow" />

          {/* TEXT */}

          <p>

            {text}

          </p>

          {/* FOOTER */}

          <div className="message-footer">

            <span>

              {time}

            </span>

            {isMe && (

              <div className="message-status">

                <FaCheckDouble />

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default MessageBubble;