import React, {
  useState,
  useEffect,
} from "react";

import {
  FaArrowLeft,
  FaEye,
  FaPaperPlane,
  FaImage,
  FaHeart,
  FaMapMarkerAlt,
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaRegCommentDots,
  FaEllipsisH,
  FaCheckCircle,
  FaShareAlt,
  FaSave,
} from "react-icons/fa";

import "./UpdateStory.css";

import {
  useTranslation,
} from "react-i18next";

function UpdateStoryForm({
  darkMode,
}) {

  const { t } =
    useTranslation();

  // ================= STATES =================

  const [title, setTitle] =
    useState("");

  const [story, setStory] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [category, setCategory] =
    useState(
      "medicalUpdate"
    );

  const [images, setImages] =
    useState([
      "/images/update1.jpg",
      "/images/update2.jpg",
      "/images/update3.jpg",
    ]);

  // ================= LOAD SAVED DATA =================

  useEffect(() => {

    const savedTitle =
      localStorage.getItem(
        "updateTitle"
      );

    const savedStory =
      localStorage.getItem(
        "updateStory"
      );

    const savedLocation =
      localStorage.getItem(
        "updateLocation"
      );

    const savedCategory =
      localStorage.getItem(
        "updateCategory"
      );

    const savedImages =
      localStorage.getItem(
        "updateImages"
      );

   setTitle(
  !savedTitle ||
  savedTitle === "defaultUpdateTitle"
    ? t("defaultUpdateTitle")
    : savedTitle
);

setStory(
  !savedStory ||
  savedStory === "defaultStory"
    ? t("defaultStory")
    : savedStory
);

setLocation(
  !savedLocation ||
  savedLocation === "defaultLocation"
    ? t("defaultLocation")
    : savedLocation
);

    if (savedCategory) {

      setCategory(
        savedCategory
      );

    }

    if (savedImages) {

      setImages(
        JSON.parse(savedImages)
      );

    }

  }, [t]);

  // ================= SAVE DRAFT =================

  const handleSaveDraft =
    () => {

      localStorage.setItem(
        "updateTitle",
        title
      );

      localStorage.setItem(
        "updateStory",
        story
      );

      localStorage.setItem(
        "updateLocation",
        location
      );

      localStorage.setItem(
        "updateCategory",
        category
      );

      localStorage.setItem(
        "updateImages",
        JSON.stringify(images)
      );

      alert(
        "✅ Draft Saved Successfully!"
      );

    };

  // ================= UPLOAD =================

  const handleImageUpload =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const imageUrl =
        URL.createObjectURL(file);

      setImages([
        ...images,
        imageUrl,
      ]);

    };

  // ================= REMOVE IMAGE =================

  const removeImage =
    (index) => {

      const updatedImages =
        [...images];

      updatedImages.splice(
        index,
        1
      );

      setImages(updatedImages);

    };

  // ================= PUBLISH =================

  const handlePublish =
    () => {

      alert(
        "✅ Update Published Successfully!"
      );

    };

  // ================= PREVIEW =================

  const handlePreview =
    () => {

      alert(
        "👀 Preview Updated!"
      );

    };

  return (

    <div
      className={`update-story-page ${
        darkMode
          ? "dark"
          : ""
      }`}
    >

      {/* ================= HEADER ================= */}

      <div className="update-header">

        <div>

          <button className="back-btn">

            <FaArrowLeft />

            {t(
              "backToCampaign"
            )}

          </button>

          <h1 className="update-title">

            <span>

              {t(
                "updateYourStory"
              )}

            </span>

            <span className="title-emoji">
              ✏️
            </span>

          </h1>

          <p>

            {t(
              "updateStorySubtitle"
            )}

          </p>

        </div>

        <div className="update-actions">

          {/* SAVE */}

          <button
            className="save-btn"
            onClick={
              handleSaveDraft
            }
          >

            <FaSave />

            {t("saveDraft")}

          </button>

          {/* PREVIEW */}

          <button
            className="preview-btn"
            onClick={
              handlePreview
            }
          >

            <FaEye />

            {t(
              "previewUpdate"
            )}

          </button>

          {/* PUBLISH */}

          <button
            className="publish-btn"
            onClick={
              handlePublish
            }
          >

            <FaPaperPlane />

            {t(
              "publishUpdate"
            )}

          </button>

        </div>

      </div>

      {/* ================= GRID ================= */}

      <div className="update-grid">

        {/* ================= LEFT ================= */}

        <div className="update-form-card">

          <h2>

            {t(
              "writeYourUpdate"
            )}

          </h2>

          {/* TITLE */}

          <label>

            {t(
              "updateTitle"
            )}

          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <div className="char-count">

            {title.length}/100

          </div>

          {/* STORY */}

          <label>

            {t(
              "yourStory"
            )}

          </label>

          {/* TOOLBAR */}

          <div className="editor-toolbar">

            <FaBold />

            <FaItalic />

            <FaUnderline />

            <div className="toolbar-divider" />

            <FaListUl />

            <FaListOl />

            <div className="toolbar-divider" />

            <FaLink />

            <FaImage />

          </div>

          {/* TEXTAREA */}

          <textarea
            className="editor-textarea"
            rows="11"
            value={story}
            onChange={(e) =>
              setStory(
                e.target.value
              )
            }
          />

          <div className="char-count bottom">

            {story.length}/2000

          </div>

          {/* ================= PHOTOS ================= */}

          <div className="upload-section">

            <h3>

              {t(
                "addPhotosVideos"
              )}

            </h3>

            <p className="upload-sub">

              {t(
                "photosHelp"
              )}

            </p>

            <div className="upload-grid">

              {/* UPLOAD */}

              <label className="upload-box">

                <FaImage />

                <span>

                  {t(
                    "uploadPhotoVideo"
                  )}

                </span>

                <small>

                  {t(
                    "uploadPhotoFormats"
                  )}

                </small>

                <input
                  type="file"
                  hidden
                  onChange={
                    handleImageUpload
                  }
                />

              </label>

              {/* IMAGES */}

              {images.map(
                (
                  img,
                  index
                ) => (

                  <div
                    className="upload-image"
                    key={index}
                  >

                    <button
                      className="remove-img"
                      onClick={() =>
                        removeImage(
                          index
                        )
                      }
                    >
                      ×
                    </button>

                    <img
                      src={img}
                      alt=""
                    />

                  </div>

                )
              )}

            </div>

          </div>

          {/* ================= CATEGORY ================= */}

          <div className="category-section">

            <h3>

              {t(
                "updateCategory"
              )}

            </h3>

            <div className="category-tags">

              {[
                "medicalUpdate",
                "treatmentUpdate",
                "personalUpdate",
                "gratitude",
              ].map((item) => (

                <button
                  key={item}
                  className={
                    category ===
                    item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(
                      item
                    )
                  }
                >

                  {t(item)}

                </button>

              ))}

            </div>

          </div>

          {/* ================= LOCATION ================= */}

          <div className="location-section">

            <div className="location-title">

              {t(
                "addLocation"
              )}

              <span>

                {t(
                  "optional"
                )}

              </span>

            </div>

            <div className="location-box">

              <FaMapMarkerAlt />

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="right-column">

          <div className="preview-card">

            <h2>

              {t(
                "updatePreview"
              )}

            </h2>

            <div className="preview-post">

              {/* USER */}

              <div className="preview-user">

                <div className="preview-user-left">

                  <img
                    src={images[0]}
                    alt=""
                  />

                  <div>

                    <strong>

                      {t(
                        "userName"
                      )}

                    </strong>

                    <span>

                      {t(
                        "twoMinutesAgo"
                      )}{" "}

                      •{" "}

                      {t(category)}

                    </span>

                  </div>

                </div>

                <FaEllipsisH className="dots-icon" />

              </div>

              {/* VERIFIED */}

              <div className="verified-badge">

                <FaCheckCircle />

                {t(
                  "verified"
                )}

              </div>

              {/* TITLE */}

              <h3>

                {title}

              </h3>

              {/* STORY */}

              <p>

                {story}

              </p>

              {/* IMAGES */}

              <div className="preview-images">

                {images.map(
                  (
                    img,
                    index
                  ) => (

                    <img
                      src={img}
                      key={index}
                      alt=""
                    />

                  )
                )}

              </div>

              {/* STATS */}

              <div className="preview-stats">

                <div>

                  <FaHeart />

                  128

                </div>

                <div>

                  <FaRegCommentDots />

                  32

                </div>

                <div>

                  <FaShareAlt />

                  16

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default UpdateStoryForm;