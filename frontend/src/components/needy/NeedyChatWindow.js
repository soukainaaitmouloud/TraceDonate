import React from "react";

import {
  useTranslation,
} from "react-i18next";

import "./NeedyChatWindow.css";

import MessageBubble from "./MessageBubble";

import MessageInput from "./MessageInput";

import {
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";

function NeedyChatWindow({
  darkMode,
}) {

  const { t } =
    useTranslation();

  return (

    <div
      className={`chat-window ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* HEADER */}

      <div className="chat-header">

        <div className="chat-user-info">

          <div className="chat-user-avatar">

            A

          </div>

          <div className="chat-user-text">

            <div className="chat-user-top">

              <h3>

                Aarav Mehta

              </h3>

              <div className="verified-badge">

                <FaShieldAlt />

                <span>

                  {t(
                    "verified"
                  )}

                </span>

              </div>

            </div>

            <p>

              {t(
                "verifiedDonorSupport"
              )}

            </p>

          </div>

        </div>

        {/* PROFILE */}

        <button className="profile-btn">

          <FaUserCircle />

          <span>

            {t(
              "viewProfile"
            )}

          </span>

        </button>

      </div>

      {/* CHAT */}

      <div className="chat-messages">

        <MessageBubble
          sender="other"
          name={t(
            "supporter"
          )}
          text={t(
            "message1"
          )}
          time="10:30 AM"
        />

        <MessageBubble
          sender="me"
          text={t(
            "message2"
          )}
          time="10:32 AM"
        />

        <MessageBubble
          sender="other"
          name={t(
            "supporter"
          )}
          text={t(
            "message3"
          )}
          time="10:35 AM"
        />

        <MessageBubble
          sender="me"
          text={t(
            "message4"
          )}
          time="10:36 AM"
        />

      </div>

      {/* INPUT */}

      <MessageInput />

    </div>

  );

}

export default NeedyChatWindow;