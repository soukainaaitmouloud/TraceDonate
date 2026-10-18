import React, {
  useRef,
  useState,
} from "react";

import "./MessageInput.css";

import {
  FaPaperPlane,
  FaImage,
  FaPaperclip,
  FaSmile,
  FaMicrophone,
  FaStop,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

function MessageInput() {

  const { t } =
    useTranslation();

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    typing,
    setTyping,
  ] = useState(false);

  const [
    recording,
    setRecording,
  ] = useState(false);

  const fileInputRef =
    useRef(null);

  const imageInputRef =
    useRef(null);

  /* ====================================== */
  /* SEND MESSAGE */
  /* ====================================== */

  const handleSend = () => {

    if (!message.trim())
      return;

    const newMessage = {

      id: Date.now(),

      text: message,

      sender: "me",

      time:
        new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
    };

    console.log(
      "REAL MESSAGE:",
      newMessage
    );

    /* LATER:
       send to backend/socket/firebase
    */

    setMessage("");

    setTyping(false);
  };

  /* ====================================== */
  /* ENTER SEND */
  /* ====================================== */

  const handleKeyDown = (
    e
  ) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend();
    }
  };

  /* ====================================== */
  /* FILE UPLOAD */
  /* ====================================== */

  const handleFileUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file)
      return;

    console.log(
      "FILE:",
      file
    );

    alert(
      `File selected: ${file.name}`
    );
  };

  /* ====================================== */
  /* IMAGE UPLOAD */
  /* ====================================== */

  const handleImageUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file)
      return;

    console.log(
      "IMAGE:",
      file
    );

    alert(
      `Image selected: ${file.name}`
    );
  };

  /* ====================================== */
  /* VOICE RECORD */
  /* ====================================== */

  const handleVoiceRecord =
    async () => {

      if (recording) {

        setRecording(false);

        alert(
          "Voice recording stopped"
        );

        return;
      }

      try {

        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        setRecording(true);

        alert(
          "Voice recording started"
        );

      } catch {

        alert(
          "Microphone permission denied"
        );
      }
    };

  return (

    <div className="message-input-wrapper">

      {/* ====================================== */}
      {/* HIDDEN FILE INPUTS */}
      {/* ====================================== */}

      <input
        type="file"
        ref={fileInputRef}
        style={{
          display: "none",
        }}
        onChange={
          handleFileUpload
        }
      />

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{
          display: "none",
        }}
        onChange={
          handleImageUpload
        }
      />

      {/* ====================================== */}
      {/* ACTIONS */}
      {/* ====================================== */}

      <div className="message-input-actions">

        {/* EMOJI */}

        <button
          className="icon-btn"
          title={t("emoji")}
          onClick={() =>
            alert(
              "Emoji picker coming soon 😀"
            )
          }
        >

          <FaSmile />

        </button>

        {/* FILE */}

        <button
          className="icon-btn"
          title={t(
            "attachFile"
          )}
          onClick={() =>
            fileInputRef.current.click()
          }
        >

          <FaPaperclip />

        </button>

        {/* IMAGE */}

        <button
          className="icon-btn"
          title={t(
            "sendImage"
          )}
          onClick={() =>
            imageInputRef.current.click()
          }
        >

          <FaImage />

        </button>

      </div>

      {/* ====================================== */}
      {/* INPUT */}
      {/* ====================================== */}

      <div className="message-input-box">

        <textarea
          className={`message-input ${
            typing
              ? "typing"
              : ""
          }`}
          placeholder={t(
            "typeMessage"
          )}
          value={message}
          rows={1}
          onChange={(e) => {

            setMessage(
              e.target.value
            );

            setTyping(
              e.target.value
                .length > 0
            );

          }}
          onKeyDown={
            handleKeyDown
          }
        />

        {typing && (

          <div className="typing-indicator">

            <span />

            <span />

            <span />

          </div>

        )}

      </div>

      {/* ====================================== */}
      {/* VOICE */}
      {/* ====================================== */}

      <button
        className={`voice-btn ${
          recording
            ? "recording"
            : ""
        }`}
        title={t(
          "voiceMessage"
        )}
        onClick={
          handleVoiceRecord
        }
      >

        {recording
          ? <FaStop />
          : <FaMicrophone />}

      </button>

      {/* ====================================== */}
      {/* SEND */}
      {/* ====================================== */}

      <button
        className={`send-btn ${
          message.trim()
            ? "active"
            : ""
        }`}
        onClick={handleSend}
      >

        <FaPaperPlane />

        <span>

          {t("send")}

        </span>

      </button>

    </div>

  );

}

export default MessageInput;