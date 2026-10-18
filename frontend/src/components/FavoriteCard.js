import React, {
  useState,
} from "react";

import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  FaHeart,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";

function FavoriteCard({
  item,
  darkMode,
  onRemove,
}) {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  const [liked, setLiked] =
    useState(true);

  const raised = Number(
    item?.raised || 0
  );

  const goal = Number(
    item?.goal || 1
  );

  const progress =
    goal > 0

      ? Math.min(
          (raised / goal) *
            100,
          100
        )

      : 0;

  /* ================================================= */
  /* ================= DONATE ======================== */
  /* ================================================= */

  const handleDonate =
    () => {

      history.push(
        "/browse"
      );

    };

  /* ================================================= */
  /* ================= OPEN DETAILS ================== */
  /* ================================================= */

  const handleOpen =
    () => {

      history.push(
        "/browse"
      );

    };

  /* ================================================= */
  /* ================= REMOVE ======================== */
  /* ================================================= */

  const handleRemove =
    () => {

      setLiked(false);

      if (onRemove) {

        onRemove(item);

      }

    };

  return (

    <div
      style={card(
        darkMode
      )}
    >

      {/* ================================================= */}
      {/* ================= IMAGE ========================= */}
      {/* ================================================= */}

      <div
        style={imgBox}
        onClick={
          handleOpen
        }
      >

        <img
          src={
            item?.image ||
            "/images/water.jpg"
          }
          alt={t(
            item?.title
          )}
          style={img}
        />

        {item?.urgent && (

          <span
            style={badge}
          >

            {t(
              "urgent"
            )}

          </span>

        )}

      </div>

      {/* ================================================= */}
      {/* ================= CONTENT ======================= */}
      {/* ================================================= */}

      <div
        style={content}
      >

        {/* TOP */}

        <div
          style={
            topContent
          }
        >

          <h3
            style={cardTitle(
              darkMode
            )}
          >

            {t(
              item?.title
            )}

          </h3>

          <button

            style={favoriteBtn(
              liked,
              darkMode
            )}

            onClick={() =>
              setLiked(
                !liked
              )
            }

          >

            <FaHeart />

          </button>

        </div>

        {/* DESCRIPTION */}

        <p
          style={desc(
            darkMode
          )}
        >

          {t(
            item?.desc
          )}

        </p>

        {/* META */}

        <div
          style={meta(
            darkMode
          )}
        >

          <span>

            {t("by")}{" "}

            {t(
              item?.author ||
              item?.organization
            )}

          </span>

          <span
            style={tag(
              darkMode
            )}
          >

            {t(
              item?.category
            )}

          </span>

        </div>

        {/* ================================================= */}
        {/* ================= PROGRESS ====================== */}
        {/* ================================================= */}

        <div
          style={
            progressWrapper
          }
        >

          <div
            style={
              progressHeader
            }
          >

            <span
              style={
                amount
              }
            >

              $

              {raised.toLocaleString()}

            </span>

            <span
              style={goalText(
                darkMode
              )}
            >

              {t(
                "goal"
              )}{" "}

              $

              {goal.toLocaleString()}

            </span>

          </div>

          {/* BAR */}

          <div
            style={bar(
              darkMode
            )}
          >

            <div
              style={{
                ...fill,
                width: `${progress}%`,
              }}
            />

          </div>

          {/* SMALL */}

          <small
            style={small(
              darkMode
            )}
          >

            {Math.round(
              progress
            )}

            %{" "}

            {t(
              "completedFundraising"
            )}

          </small>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= RIGHT ACTIONS ================= */}
      {/* ================================================= */}

      <div
        style={right}
      >

        {/* DONATE */}

        <button
          style={
            donateBtn
          }
          onClick={
            handleDonate
          }
        >

          {t(
            "donateNow"
          )}

        </button>

        {/* DETAILS */}

        <button
          style={detailsBtn(
            darkMode
          )}
          onClick={
            handleOpen
          }
        >

          {t(
            "viewDetails"
          )}

          <FaArrowRight
            style={{
              fontSize:
                "11px",
            }}
          />

        </button>

        {/* REMOVE */}

        <button
          style={removeBtn(
            darkMode
          )}
          onClick={
            handleRemove
          }
        >

          <FaTrash />

          {t(
            "remove"
          )}

        </button>

      </div>

    </div>

  );

}

export default FavoriteCard;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const card = (
  darkMode
) => ({

  display: "flex",

  alignItems:
    "center",

  gap: "22px",

  padding: "18px",

  borderRadius:
    "24px",

  background: darkMode

    ? "rgba(30,41,59,0.85)"

    : "#ffffff",

  border: darkMode

    ? "1px solid rgba(255,255,255,0.06)"

    : "1px solid #eef2ff",

  boxShadow: darkMode

    ? "0 10px 30px rgba(0,0,0,0.35)"

    : "0 10px 30px rgba(0,0,0,0.06)",

  transition:
    "0.3s ease",

  flexWrap: "wrap",

});

const imgBox = {

  position:
    "relative",

  cursor: "pointer",

  flexShrink: 0,

};

const img = {

  width: "170px",

  height: "120px",

  borderRadius:
    "18px",

  objectFit: "cover",

};

const badge = {

  position:
    "absolute",

  top: "10px",

  left: "10px",

  background:
    "#ef4444",

  color: "#ffffff",

  fontSize: "10px",

  fontWeight: "800",

  padding:
    "6px 10px",

  borderRadius:
    "999px",

  letterSpacing:
    "0.5px",

};

const content = {

  flex: 1,

  display: "flex",

  flexDirection:
    "column",

  justifyContent:
    "center",

  minWidth: "250px",

};

const topContent = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems:
    "flex-start",

  gap: "10px",

};

const cardTitle = (
  darkMode
) => ({

  margin: 0,

  fontSize: "20px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",

});

const favoriteBtn = (
  liked,
  darkMode
) => ({

  border: "none",

  width: "42px",

  height: "42px",

  borderRadius:
    "12px",

  cursor: "pointer",

  display: "flex",

  alignItems:
    "center",

  justifyContent:
    "center",

  background: liked

    ? "linear-gradient(135deg,#ef4444,#f97316)"

    : darkMode

    ? "#334155"

    : "#f3f4f6",

  color: "#ffffff",

  fontSize: "15px",

  transition:
    "0.25s",

});

const desc = (
  darkMode
) => ({

  marginTop: "10px",

  marginBottom:
    "14px",

  lineHeight: "1.6",

  fontSize: "14px",

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

});

const meta = (
  darkMode
) => ({

  display: "flex",

  alignItems:
    "center",

  gap: "12px",

  flexWrap: "wrap",

  marginBottom:
    "18px",

  fontSize: "12px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const tag = (
  darkMode
) => ({

  padding:
    "6px 12px",

  borderRadius:
    "999px",

  background: darkMode
    ? "#334155"
    : "#eef2ff",

  color: darkMode
    ? "#e2e8f0"
    : "#4338ca",

  fontWeight: "700",

  fontSize: "11px",

});

const progressWrapper = {

  width: "100%",

};

const progressHeader = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems:
    "center",

  marginBottom:
    "8px",

};

const amount = {

  color: "#22c55e",

  fontWeight: "800",

  fontSize: "15px",

};

const goalText = (
  darkMode
) => ({

  fontSize: "12px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const bar = (
  darkMode
) => ({

  width: "100%",

  height: "10px",

  borderRadius:
    "999px",

  overflow: "hidden",

  background: darkMode
    ? "#334155"
    : "#e5e7eb",

});

const fill = {

  height: "100%",

  borderRadius:
    "999px",

  background:
    "linear-gradient(90deg,#22c55e,#2563eb)",

};

const small = (
  darkMode
) => ({

  display: "block",

  marginTop: "8px",

  fontSize: "12px",

  color: darkMode
    ? "#94a3b8"
    : "#6b7280",

});

const right = {

  display: "flex",

  flexDirection:
    "column",

  gap: "12px",

  minWidth: "160px",

};

const donateBtn = {

  border: "none",

  padding:
    "12px 16px",

  borderRadius:
    "14px",

  background:
    "linear-gradient(90deg,#22c55e,#2563eb)",

  color: "#ffffff",

  fontWeight: "800",

  cursor: "pointer",

  boxShadow:
    "0 8px 20px rgba(34,197,94,0.25)",

};

const detailsBtn = (
  darkMode
) => ({

  border: "none",

  padding:
    "12px 16px",

  borderRadius:
    "14px",

  background: darkMode
    ? "#334155"
    : "#f3f4f6",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  fontWeight: "700",

  cursor: "pointer",

  display: "flex",

  alignItems:
    "center",

  justifyContent:
    "center",

  gap: "8px",

});

const removeBtn = (
  darkMode
) => ({

  border: "none",

  padding:
    "12px 16px",

  borderRadius:
    "14px",

  background: darkMode
    ? "rgba(239,68,68,0.12)"
    : "#fef2f2",

  color: "#ef4444",

  fontWeight: "700",

  cursor: "pointer",

  display: "flex",

  alignItems:
    "center",

  justifyContent:
    "center",

  gap: "8px",

});