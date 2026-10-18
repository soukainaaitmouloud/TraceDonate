// src/pages/EditCampaign.js

import React, {
  useState,
} from "react";

import {
  FaArrowLeft,
  FaCamera,
  FaSave,
  FaHeart,
  FaBullseye,
  FaFileAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  useHistory,
} from "react-router-dom";

import "./EditCampaign.css";

function EditCampaign() {

  const history =
    useHistory();

  /* ================================================= */
  /* ================= FORM ========================== */
  /* ================================================= */

  const [
    form,
    setForm,
  ] = useState({

    title:
      "Support My Recovery Journey",

    goal:
      "5000",

    raised:
      "3200",

    location:
      "Mumbai, India",

    category:
      "Medical Recovery",

    description:
      "I am currently recovering from a major surgery and need your support for my treatment, medicines, and rehabilitation journey.",

  });

  const [
    saved,
    setSaved,
  ] = useState(false);

  /* ================================================= */
  /* ================= HANDLE CHANGE ================= */
  /* ================================================= */

  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value,

      });

    };

  /* ================================================= */
  /* ================= SAVE ========================== */
  /* ================================================= */

  const handleSave =
    () => {

      localStorage.setItem(
        "campaignData",
        JSON.stringify(form)
      );

      setSaved(true);

      setTimeout(() => {

        setSaved(false);

      }, 2500);

    };

  return (

    <div className="edit-campaign-page">

      {/* ================================================= */}
      {/* ================= BG ============================ */}
      {/* ================================================= */}

      <div className="edit-bg-circle one"></div>
      <div className="edit-bg-circle two"></div>

      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <div className="edit-header">

        <button
          className="edit-back-btn"
          onClick={() =>
            history.goBack()
          }
        >

          <FaArrowLeft />

        </button>

        <div>

          <p>

            Campaign Dashboard

          </p>

          <h1>

            Edit Campaign

          </h1>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= MAIN ========================== */}
      {/* ================================================= */}

      <div className="edit-layout">

        {/* ================================================= */}
        {/* ================= LEFT ========================== */}
        {/* ================================================= */}

        <div className="edit-form-card">

          {/* TITLE */}

          <div className="edit-top-badge">

            <FaCheckCircle />

            Verified Campaign

          </div>

          <h2>

            Update Your Campaign Details ❤️

          </h2>

          <p>

            Keep supporters informed with fresh,
            accurate, and inspiring campaign
            information.

          </p>

          {/* ================================================= */}
          {/* ================= INPUTS ======================== */}
          {/* ================================================= */}

          <div className="edit-form-grid">

            {/* TITLE */}

            <div className="edit-input-group full">

              <label>

                <FaHeart />

                Campaign Title

              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
              />

            </div>

            {/* GOAL */}

            <div className="edit-input-group">

              <label>

                <FaBullseye />

                Goal Amount

              </label>

              <input
                type="number"
                name="goal"
                value={form.goal}
                onChange={handleChange}
              />

            </div>

            {/* RAISED */}

            <div className="edit-input-group">

              <label>

                <FaHeart />

                Raised Amount

              </label>

              <input
                type="number"
                name="raised"
                value={form.raised}
                onChange={handleChange}
              />

            </div>

            {/* LOCATION */}

            <div className="edit-input-group">

              <label>

                <FaMapMarkerAlt />

                Location

              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
              />

            </div>

            {/* CATEGORY */}

            <div className="edit-input-group">

              <label>

                <FaFileAlt />

                Category

              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
              />

            </div>

            {/* DESCRIPTION */}

            <div className="edit-input-group full">

              <label>

                <FaFileAlt />

                Campaign Description

              </label>

              <textarea
                rows="6"
                name="description"
                value={form.description}
                onChange={handleChange}
              ></textarea>

            </div>

          </div>

          {/* ================================================= */}
          {/* ================= BUTTONS ====================== */}
          {/* ================================================= */}

          <div className="edit-actions">

            <button
              className="upload-btn"
            >

              <FaCamera />

              Upload Cover Photo

            </button>

            <button
              className={`save-btn ${
                saved
                  ? "saved"
                  : ""
              }`}
              onClick={handleSave}
            >

              <FaSave />

              {saved
                ? "Saved Successfully!"
                : "Save Changes"}

            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= RIGHT ========================= */}
        {/* ================================================= */}

        <div className="edit-preview-card">

          <div className="preview-image">

            <img
              src="/images/update1.jpg"
              alt="campaign"
            />

            <div className="preview-overlay">

              <span>

                Recovery Journey

              </span>

              <strong>

                {Math.floor(
                  (form.raised /
                    form.goal) *
                  100
                )}
                %
                Funded

              </strong>

            </div>

          </div>

          {/* CONTENT */}

          <div className="preview-content">

            <h3>

              {form.title}

            </h3>

            <p>

              {form.description}

            </p>

            {/* STATS */}

            <div className="preview-stats">

              <div>

                <strong>

                  ${form.raised}

                </strong>

                <span>

                  Raised

                </span>

              </div>

              <div>

                <strong>

                  ${form.goal}

                </strong>

                <span>

                  Goal

                </span>

              </div>

              <div>

                <strong>

                  {form.location}

                </strong>

                <span>

                  Location

                </span>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="preview-progress">

              <div
                className="preview-progress-fill"
                style={{
                  width:
                    `${Math.floor(
                      (form.raised /
                        form.goal) *
                      100
                    )}%`,
                }}
              ></div>

            </div>

            <div className="preview-percent">

              {Math.floor(
                (form.raised /
                  form.goal) *
                100
              )}
              %
              funded

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default EditCampaign;