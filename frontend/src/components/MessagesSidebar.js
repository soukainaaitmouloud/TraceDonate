import React, {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  FaSearch,
  FaCheckDouble,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

function MessagesSidebar({
  darkMode,
  chats = [],
  selectedChat,
  setSelectedChat,
}) {

  const { t } =
    useTranslation();

  const [search, setSearch] =
    useState("");

  /* ================================================= */
  /* ================= HIDE SCROLLBAR ================ */
  /* ================================================= */

  useEffect(() => {

    const style =
      document.createElement(
        "style"
      );

    style.innerHTML = `
      .messages-list::-webkit-scrollbar {
        display: none;
      }
    `;

    document.head.appendChild(
      style
    );

    return () => {

      document.head.removeChild(
        style
      );

    };

  }, []);

  /* ================================================= */
  /* ================= FILTER ======================== */
  /* ================================================= */

  const filteredChats =
    useMemo(() => {

      return chats.filter(
        (chat) =>
          chat.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [search, chats]);

  return (

    <div
      style={container(
        darkMode
      )}
    >

      {/* HEADER */}

      <div style={header}>

        <div>

          <h2
            style={title(
              darkMode
            )}
          >

            {t(
              "messages"
            )}

          </h2>

          <p
            style={sub(
              darkMode
            )}
          >

            {filteredChats.length}{" "}

            {t(
              "activeChats"
            )}

          </p>

        </div>

        <div style={badge}>

          {
            filteredChats.length
          }

        </div>

      </div>

      {/* SEARCH */}

      <div
        style={
          searchWrapper(
            darkMode
          )
        }
      >

        <FaSearch
          style={searchIcon}
        />

        <input

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder={t(
            "searchMessages"
          )}

          style={searchInput(
            darkMode
          )}

        />

      </div>

      {/* CHAT LIST */}

      <div
        className="messages-list"
        style={list}
      >

        {filteredChats.map(
          (chat) => {

            const active =
              selectedChat?.id ===
              chat.id;

            return (

              <div

                key={chat.id}

                style={chatCard(
                  darkMode,
                  active
                )}

                onClick={() =>
                  setSelectedChat(
                    chat
                  )
                }

                onMouseEnter={(e) => {

                  if (!active) {

                    e.currentTarget.style.transform =
                      "translateY(-3px)";

                  }

                }}

                onMouseLeave={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(0)";

                }}

              >

                {/* AVATAR */}

                <div
                  style={
                    avatarWrap
                  }
                >

                  <img
                    src={chat.avatar}
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

                {/* INFO */}

                <div style={info}>

                  <div
                    style={
                      topRow
                    }
                  >

                    <h4
                      style={name(
                        darkMode
                      )}
                    >

                      {chat.name}

                    </h4>

                    <span
                      style={time(
                        darkMode
                      )}
                    >

                      {chat.time}

                    </span>

                  </div>

                  <div
                    style={
                      messageRow
                    }
                  >

                    <div
                      style={message(
                        darkMode
                      )}
                    >

                      <FaCheckDouble
                        style={
                          seenIcon
                        }
                      />

                      <span
                        style={
                          messageText
                        }
                      >

                        {chat.lastMessage ||
                          chat.message}

                      </span>

                    </div>

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

            );

          }
        )}

      </div>

    </div>

  );

}

export default MessagesSidebar;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = (
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

  borderRadius: "30px",

  padding: "24px",

  height: "100%",

  border: darkMode

    ? "1px solid rgba(255,255,255,0.05)"

    : "1px solid rgba(255,255,255,0.8)",

  boxShadow: darkMode

    ? `
      0 20px 60px rgba(0,0,0,0.35)
    `

    : `
      0 20px 60px rgba(15,23,42,0.08)
    `,

  overflow: "hidden",

});

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

};

const title = (
  darkMode
) => ({

  margin: 0,

  fontSize: "28px",

  fontWeight: "900",

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

const badge = {

  width: "38px",

  height: "38px",

  borderRadius: "50%",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#ffffff",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  fontWeight: "800",

  fontSize: "14px",

};

const searchWrapper = (
  darkMode
) => ({

  position: "relative",

  marginTop: "22px",

  marginBottom: "24px",

  background: darkMode
    ? "#020617"
    : "#ffffff",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",

});

const searchIcon = {

  position: "absolute",

  left: "16px",

  top: "50%",

  transform:
    "translateY(-50%)",

  color: "#94a3b8",

};

const searchInput = (
  darkMode
) => ({

  width: "100%",

  padding:
    "15px 16px 15px 46px",

  border: "none",

  background: "transparent",

  outline: "none",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  fontSize: "14px",

  boxSizing: "border-box",

});

const list = {

  display: "flex",

  flexDirection: "column",

  gap: "14px",

  maxHeight:
    "calc(100vh - 260px)",

  overflowY: "auto",

  paddingRight: "2px",

  scrollbarWidth: "none",

  msOverflowStyle: "none",

};

const chatCard = (
  darkMode,
  active
) => ({

  display: "flex",

  alignItems: "center",

  gap: "14px",

  padding: "16px",

  borderRadius: "24px",

  cursor: "pointer",

  transition:
    "all 0.25s ease",

  transform:
    active
      ? "scale(1.02)"
      : "scale(1)",

  background: active

    ? `
      linear-gradient(
        135deg,
        rgba(34,197,94,0.18),
        rgba(37,99,235,0.16)
      )
    `

    : darkMode

    ? "rgba(255,255,255,0.02)"

    : "rgba(255,255,255,0.65)",

  border: active

    ? "1px solid rgba(34,197,94,0.45)"

    : darkMode

    ? "1px solid rgba(255,255,255,0.04)"

    : "1px solid rgba(255,255,255,0.8)",

  boxShadow: active

    ? `
      0 10px 30px rgba(34,197,94,0.18)
    `

    : "none",

});

const avatarWrap = {
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

const info = {
  flex: 1,
  minWidth: 0,
};

const topRow = {
  display: "flex",
  justifyContent:
    "space-between",
};

const name = (
  darkMode
) => ({
  margin: 0,
  fontWeight: "800",
  color: darkMode
    ? "#fff"
    : "#111827",
});

const time = (
  darkMode
) => ({
  fontSize: "11px",
  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const messageRow = {
  display: "flex",
  justifyContent:
    "space-between",
  marginTop: "8px",
};

const message = (
  darkMode
) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: darkMode
    ? "#cbd5e1"
    : "#64748b",
});

const messageText = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const seenIcon = {
  color: "#22c55e",
  fontSize: "11px",
};

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
};