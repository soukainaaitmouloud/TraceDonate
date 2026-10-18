import React from "react";

import { useHistory } from "react-router-dom";

import {
  FaHeart,
  FaShieldAlt,
  FaFlag,
  FaArrowRight,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

function MessagesRightPanel({
  darkMode,
  chats = [],
}) {

  const history =
    useHistory();

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= DONATE ======================== */
  /* ================================================= */

  const handleDonateNow =
    () => {

      history.push(
        "/browse"
      );

    };

  return (

    <div style={panel}>

      {/* ================================================= */}
      {/* ================= ACTIVE CHATS ================== */}
      {/* ================================================= */}

      <div
        style={card(
          darkMode
        )}
      >

        {/* HEADER */}

        <div style={header}>

          <div>

            <h3
              style={cardTitle(
                darkMode
              )}
            >

              {t(
                "activeConversations"
              )}

            </h3>

            <p
              style={sub(
                darkMode
              )}
            >

              {chats.length}{" "}

              {t(
                "ongoingChats"
              )}

            </p>

          </div>

          <button
            style={
              viewAllBtn
            }
          >

            {t(
              "viewAll"
            )}

          </button>

        </div>

        {/* LIST */}

        <div style={chatList}>

          {chats
            .slice(0, 5)
            .map(
              (
                chat,
                index
              ) => (

                <div

                  key={index}

                  style={conversationRow(
                    darkMode
                  )}

                  onMouseEnter={(
                    e
                  ) => {

                    e.currentTarget.style.transform =
                      "translateY(-3px)";

                  }}

                  onMouseLeave={(
                    e
                  ) => {

                    e.currentTarget.style.transform =
                      "translateY(0)";

                  }}

                >

                  {/* AVATAR */}

                  <div
                    style={
                      avatarWrapper
                    }
                  >

                    <img
                      src={
                        chat.avatar
                      }
                      alt={
                        chat.name
                      }
                      style={
                        avatar
                      }
                      onError={(
                        e
                      ) => {

                        e.target.src =
                          "/images/oldman.jpg";

                      }}
                    />

                    {chat.online && (

                      <div
                        style={
                          onlineDot
                        }
                      />

                    )}

                  </div>

                  {/* CONTENT */}

                  <div
                    style={
                      chatContent
                    }
                  >

                    <div
                      style={
                        topRow
                      }
                    >

                      <h4
                        style={chatName(
                          darkMode
                        )}
                      >

                        {
                          chat.name
                        }

                      </h4>

                      <span
                        style={
                          time
                        }
                      >

                        {
                          chat.time
                        }

                      </span>

                    </div>

                    <div
                      style={
                        bottomRow
                      }
                    >

                      <p
                        style={messagePreview(
                          darkMode
                        )}
                      >

                        {chat.lastMessage ||
                          chat.message}

                      </p>

                      {chat.unread >
                        0 && (

                        <div
                          style={
                            unreadBadge
                          }
                        >

                          {
                            chat.unread
                          }

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              )
            )}

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= MESSAGE TIPS ================== */}
      {/* ================================================= */}

      <div
        style={card(
          darkMode
        )}
      >

        <h3
          style={cardTitle(
            darkMode
          )}
        >

          {t(
            "messageTips"
          )}

        </h3>

        {/* TIP */}

        <div style={tipRow}>

          <div style={tipIcon}>

            <FaHeart />

          </div>

          <div>

            <h4
              style={tipTitle(
                darkMode
              )}
            >

              {t(
                "beKindRespectful"
              )}

            </h4>

            <p
              style={
                tipText
              }
            >

              {t(
                "kindWordsHope"
              )}

            </p>

          </div>

        </div>

        {/* TIP */}

        <div style={tipRow}>

          <div style={tipIcon}>

            <FaShieldAlt />

          </div>

          <div>

            <h4
              style={tipTitle(
                darkMode
              )}
            >

              {t(
                "neverSharePersonalInfo"
              )}

            </h4>

            <p
              style={
                tipText
              }
            >

              {t(
                "keepSafetyFirst"
              )}

            </p>

          </div>

        </div>

        {/* TIP */}

        <div style={tipRow}>

          <div style={tipIcon}>

            <FaFlag />

          </div>

          <div>

            <h4
              style={tipTitle(
                darkMode
              )}
            >

              {t(
                "reportSuspiciousActivity"
              )}

            </h4>

            <p
              style={
                tipText
              }
            >

              {t(
                "helpKeepSafe"
              )}

            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= DONATION BANNER =============== */}
      {/* ================================================= */}

      <div

        style={bannerCard}

        onClick={
          handleDonateNow
        }

      >

      

        {/* OVERLAY */}

        <div
          style={
            bannerOverlay
          }
        >

          <h3
            style={
              bannerTitle
            }
          >

            {t(
              "changeLifeToday"
            )}

          </h3>

          <button
            style={
              bannerBtn
            }
          >

            {t(
              "donateNow"
            )}

            <FaArrowRight />

          </button>

        </div>

      </div>

    </div>

  );

}

export default MessagesRightPanel;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const panel = {

  display: "flex",

  flexDirection:
    "column",

  gap: "22px",

};

const card = (
  darkMode
) => ({

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(15,23,42,0.95),
        rgba(2,6,23,0.92)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.96),
        rgba(248,250,252,0.92)
      )
    `,

  backdropFilter:
    "blur(24px)",

  WebkitBackdropFilter:
    "blur(24px)",

  borderRadius: "28px",

  padding: "24px",

  border: darkMode

    ? "1px solid rgba(255,255,255,0.05)"

    : "1px solid rgba(255,255,255,0.9)",

  boxShadow: darkMode

    ? `
      0 20px 60px rgba(0,0,0,0.35)
    `

    : `
      0 20px 60px rgba(15,23,42,0.08)
    `,

});

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "18px",

};

const cardTitle = (
  darkMode
) => ({

  margin: 0,

  fontSize: "22px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",

});

const sub = (
  darkMode
) => ({

  marginTop: "6px",

  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

});

const viewAllBtn = {

  border: "none",

  background: "transparent",

  color: "#22c55e",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "13px",

};

const chatList = {

  display: "flex",

  flexDirection:
    "column",

  gap: "14px",

};

const conversationRow = (
  darkMode
) => ({

  display: "flex",

  gap: "14px",

  alignItems: "center",

  padding: "14px",

  borderRadius: "22px",

  transition:
    "0.25s ease",

  cursor: "pointer",

  background: darkMode

    ? "rgba(255,255,255,0.03)"

    : "rgba(255,255,255,0.65)",

  border: darkMode

    ? "1px solid rgba(255,255,255,0.04)"

    : "1px solid rgba(255,255,255,0.8)",

});

const avatarWrapper = {

  position: "relative",

  width: "58px",

  height: "58px",

  minWidth: "58px",

  borderRadius: "50%",

  overflow: "hidden",

};

const avatar = {

  width: "100%",

  height: "100%",

  objectFit: "cover",

};

const onlineDot = {

  position: "absolute",

  right: "2px",

  bottom: "2px",

  width: "13px",

  height: "13px",

  borderRadius: "50%",

  background: "#22c55e",

  border: "2px solid white",

  boxShadow:
    "0 0 12px rgba(34,197,94,0.7)",

};

const chatContent = {

  flex: 1,

  minWidth: 0,

};

const topRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  gap: "10px",

};

const bottomRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  gap: "10px",

  marginTop: "6px",

};

const chatName = (
  darkMode
) => ({

  margin: 0,

  fontSize: "15px",

  fontWeight: "700",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  overflow: "hidden",

  textOverflow: "ellipsis",

  whiteSpace: "nowrap",

});

const time = {

  fontSize: "11px",

  color: "#94a3b8",

  flexShrink: 0,

};

const messagePreview = (
  darkMode
) => ({

  margin: 0,

  fontSize: "13px",

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

  overflow: "hidden",

  textOverflow: "ellipsis",

  whiteSpace: "nowrap",

  flex: 1,

});

const unreadBadge = {

  minWidth: "24px",

  height: "24px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#fff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontSize: "11px",

  fontWeight: "800",

  flexShrink: 0,

  boxShadow:
    "0 8px 20px rgba(34,197,94,0.35)",

};

const tipRow = {

  display: "flex",

  gap: "14px",

  marginTop: "20px",

};

const tipIcon = {

  width: "42px",

  height: "42px",

  borderRadius: "16px",

  background:
    "rgba(34,197,94,0.12)",

  color: "#22c55e",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  flexShrink: 0,

};

const tipTitle = (
  darkMode
) => ({

  margin: 0,

  fontSize: "14px",

  fontWeight: "700",

  color: darkMode
    ? "#ffffff"
    : "#111827",

});

const tipText = {

  marginTop: "5px",

  fontSize: "13px",

  color: "#94a3b8",

  lineHeight: "1.6",

};

const bannerCard = {

  position: "relative",

  overflow: "hidden",

  borderRadius: "28px",

  minHeight: "190px",

  cursor: "pointer",

  padding: "30px",

  display: "flex",

  flexDirection: "column",

  justifyContent: "flex-end",

  background:
    "linear-gradient(135deg,#022c22,#064e3b,#065f46)",

  boxShadow:
    "0 20px 50px rgba(0,0,0,0.18)",

};

const bannerImage = {

  width: "100%",

  height: "100%",

  objectFit: "cover",

};

const bannerOverlay = {

  position: "absolute",

  inset: 0,

  background:
    "linear-gradient(to top,rgba(0,0,0,0.75),rgba(0,0,0,0.15))",

  display: "flex",

  flexDirection:
    "column",

  justifyContent:
    "flex-end",

  padding: "24px",

};

const bannerTitle = {

  margin: 0,

  color: "#ffffff",

  fontSize: "24px",

  fontWeight: "900",

};

const bannerBtn = {

  marginTop: "14px",

  width: "fit-content",

  border: "none",

  padding:
    "12px 18px",

  borderRadius: "14px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  fontWeight: "800",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  gap: "8px",

  boxShadow:
    "0 10px 24px rgba(34,197,94,0.35)",

};