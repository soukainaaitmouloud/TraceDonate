import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import EmojiPicker from "emoji-picker-react";

import {
  FaPaperPlane,
  FaPhoneAlt,
  FaVideo,
  FaSmile,
  FaImage,
  FaMicrophone,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

function ChatWindow({
  darkMode,
  selectedChat,
  onSendMessage,
}) {

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= STATES ======================== */
  /* ================================================= */

  const [message, setMessage] =
    useState("");

  const [showEmoji,
    setShowEmoji] =
    useState(false);

  const [messages,
    setMessages] =
    useState(
      selectedChat?.messages || []
    );

  const fileInputRef =
    useRef(null);

  const messagesEndRef =
    useRef(null);

  /* ================================================= */
  /* ================= UPDATE CHAT =================== */
  /* ================================================= */

  useEffect(() => {

    setMessages(
      selectedChat?.messages || []
    );

  }, [selectedChat]);

  /* ================================================= */
  /* ================= AUTO SCROLL =================== */
  /* ================================================= */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );

  }, [messages]);

  /* ================================================= */
  /* ================= SEND ========================== */
  /* ================================================= */

  const handleSend =
    () => {

      if (
        !message.trim()
      ) return;

      const newMessage = {

        sender: "me",

        text: message,

        time:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

      };

      setMessages(
        (prev) => [
          ...prev,
          newMessage,
        ]
      );

      if (
        onSendMessage
      ) {

        onSendMessage(
          newMessage
        );

      }

      setMessage("");

    };

  /* ================================================= */
  /* ================= ENTER ========================= */
  /* ================================================= */

  const handleKeyDown =
    (e) => {

      if (
        e.key === "Enter"
      ) {

        handleSend();

      }

    };

  /* ================================================= */
  /* ================= EMOJI ========================= */
  /* ================================================= */

  const handleEmoji =
    (emojiData) => {

      setMessage(
        (prev) =>
          prev +
          emojiData.emoji
      );

    };

  /* ================================================= */
  /* ================= IMAGE ========================= */
  /* ================================================= */

  const handleImageUpload =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const imageUrl =
        URL.createObjectURL(
          file
        );

      const newMessage = {

        sender: "me",

        image: imageUrl,

        time:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

      };

      setMessages(
        (prev) => [
          ...prev,
          newMessage,
        ]
      );

    };

  /* ================================================= */
  /* ================= AUDIO ========================= */
  /* ================================================= */

  const handleAudioCall =
    () => {

      alert(
        `📞 ${t(
          "calling"
        )} ${selectedChat?.name}...`
      );

    };

  /* ================================================= */
  /* ================= VIDEO ========================= */
  /* ================================================= */

  const handleVideoCall =
    () => {

      alert(
        `🎥 ${t(
          "startingVideoCall"
        )} ${selectedChat?.name}...`
      );

    };

  return (

    <div
      style={container(
        darkMode
      )}
    >

      {/* HEADER */}

      <div
        style={header(
          darkMode
        )}
      >

        <div
          style={userRow}
        >

          <div
            style={
              avatarWrapper
            }
          >

            <img
              src={
                selectedChat?.avatar
              }
              alt=""
              style={
                avatar
              }
              onError={(e) => {
                e.target.src =
                  "/images/oldman.jpg";
              }}
            />

            {selectedChat?.online && (

              <div
                style={
                  onlineDot
                }
              />

            )}

          </div>

          <div
            style={userInfo}
          >

            <h3
              style={name(
                darkMode
              )}
            >

              {
                selectedChat?.name
              }

            </h3>

            <p
              style={
                status
              }
            >

              {selectedChat?.online

                ? `● ${t(
                    "online"
                  )}`

                : `● ${t(
                    "offline"
                  )}`}

            </p>

          </div>

        </div>

        <div
          style={actions}
        >

          <button
            style={
              iconBtn
            }
            onClick={
              handleAudioCall
            }
          >

            <FaPhoneAlt />

          </button>

          <button
            style={
              iconBtn
            }
            onClick={
              handleVideoCall
            }
          >

            <FaVideo />

          </button>

        </div>

      </div>

      {/* MESSAGES */}

      <div
        style={messagesArea(
          darkMode
        )}
      >

        {messages.map(
          (
            msg,
            index
          ) => (

            <div

              key={index}

              style={{
                display: "flex",

                justifyContent:

                  msg.sender ===
                  "me"

                    ? "flex-end"

                    : "flex-start",
              }}

            >

              <div
                style={bubble(
                  msg.sender ===
                    "me",
                  darkMode
                )}
              >

                {msg.text && (

                  <p
                    style={
                      bubbleText
                    }
                  >

                    {msg.text}

                  </p>

                )}

                {msg.image && (

                  <img
                    src={
                      msg.image
                    }
                    alt=""
                    style={{
                      width: "220px",
                      borderRadius:
                        "16px",
                      marginTop:
                        "10px",
                    }}
                  />

                )}

                <span
                  style={
                    bubbleTime
                  }
                >

                  {msg.time}

                </span>

              </div>

            </div>

          )
        )}

        <div
          ref={
            messagesEndRef
          }
        />

      </div>

      {/* EMOJI PICKER */}

      {showEmoji && (

        <div
          style={{
            position:
              "absolute",

            bottom: "100px",

            right: "30px",

            zIndex: 999,
          }}
        >

          <EmojiPicker
            onEmojiClick={
              handleEmoji
            }
            theme={
              darkMode
                ? "dark"
                : "light"
            }
          />

        </div>

      )}

      {/* INPUT */}

      <div
        style={inputRow(
          darkMode
        )}
      >

        {/* EMOJI */}

        <button
          style={smallBtn(
            darkMode
          )}

          onClick={() =>
            setShowEmoji(
              !showEmoji
            )
          }
        >

          <FaSmile />

        </button>

        {/* IMAGE */}

        <>
          <button
            style={smallBtn(
              darkMode
            )}

            onClick={() =>
              fileInputRef.current.click()
            }
          >

            <FaImage />

          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{
              display: "none",
            }}

            onChange={
              handleImageUpload
            }
          />
        </>

        {/* INPUT */}

        <input

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          onKeyDown={
            handleKeyDown
          }

          placeholder={t(
            "typeMessage"
          )}

          style={input(
            darkMode
          )}

        />

        {/* SEND */}

        {message.trim() ? (

          <button
            style={
              sendBtn
            }
            onClick={
              handleSend
            }
          >

            <FaPaperPlane />

          </button>

        ) : (

          <button
            style={micBtn}
          >

            <FaMicrophone />

          </button>

        )}

      </div>

    </div>

  );

}

export default ChatWindow;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = (
  darkMode
) => ({

  position: "relative",

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  borderRadius: "30px",

  height: "100%",

  display: "flex",

  flexDirection:
    "column",

  overflow: "hidden",

});

const header = (
  darkMode
) => ({

  padding: "20px 24px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  borderBottom: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid #e2e8f0",

});

const userRow = {

  display: "flex",

  alignItems: "center",

  gap: "14px",

};

const avatarWrapper = {
  position: "relative",
};

const avatar = {

  width: "60px",

  height: "60px",

  borderRadius: "50%",

  objectFit: "cover",

};

const onlineDot = {

  position: "absolute",

  right: "2px",

  bottom: "2px",

  width: "14px",

  height: "14px",

  borderRadius: "50%",

  background: "#22c55e",

  border: "2px solid white",

};

const userInfo = {};

const name = (
  darkMode
) => ({
  margin: 0,
  color: darkMode
    ? "#fff"
    : "#111827",
});

const status = {
  color: "#22c55e",
  fontSize: "13px",
};

const actions = {
  display: "flex",
  gap: "10px",
};

const iconBtn = {
  width: "50px",
  height: "50px",
  border: "none",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#fff",
  cursor: "pointer",
};

const messagesArea = (
  darkMode
) => ({
  flex: 1,
  padding: "24px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  background: darkMode
    ? "#020617"
    : "#f8fafc",
});

const bubble = (
  me,
  darkMode
) => ({
  maxWidth: "75%",
  padding: "16px",
  borderRadius: me
    ? "24px 24px 8px 24px"
    : "24px 24px 24px 8px",
  background: me
    ? "linear-gradient(135deg,#22c55e,#16a34a)"
    : darkMode
    ? "#1e293b"
    : "#ffffff",
  color: me
    ? "#fff"
    : darkMode
    ? "#fff"
    : "#111827",
});

const bubbleText = {
  margin: 0,
  lineHeight: 1.6,
};

const bubbleTime = {
  display: "block",
  marginTop: "8px",
  fontSize: "11px",
  opacity: 0.7,
};

const inputRow = (
  darkMode
) => ({
  padding: "20px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  borderTop: darkMode
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid #e2e8f0",
});

const input = (
  darkMode
) => ({
  flex: 1,
  padding: "15px",
  borderRadius: "16px",
  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",
  background: darkMode
    ? "#020617"
    : "#fff",
  color: darkMode
    ? "#fff"
    : "#111827",
  outline: "none",
});

const sendBtn = {
  width: "58px",
  height: "58px",
  border: "none",
  borderRadius: "18px",
  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#fff",
  cursor: "pointer",
};

const micBtn = {
  width: "58px",
  height: "58px",
  border: "none",
  borderRadius: "18px",
  background:
    "linear-gradient(135deg,#0ea5e9,#2563eb)",
  color: "#fff",
  cursor: "pointer",
};

const smallBtn = (
  darkMode
) => ({
  width: "50px",
  height: "50px",
  border: "none",
  borderRadius: "16px",
  background: darkMode
    ? "#1e293b"
    : "#f1f5f9",
  color: darkMode
    ? "#fff"
    : "#64748b",
  cursor: "pointer",
});