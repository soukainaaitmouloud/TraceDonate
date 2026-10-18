import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import { useTranslation } from "react-i18next";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import MessagesSidebar from "../components/MessagesSidebar";
import ChatWindow from "../components/ChatWindow";
import MessagesRightPanel from "../components/MessagesRightPanel";

function Messages({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  /* ================================================= */
  /* ================= PANEL ========================= */
  /* ================================================= */

  const [showPanel, setShowPanel] =
    useState(false);

  /* ================================================= */
  /* ================= LOCK BODY ===================== */
  /* ================================================= */

  useEffect(() => {

    document.body.style.overflow =
      showPanel
        ? "hidden"
        : "auto";

    return () => {

      document.body.style.overflow =
        "auto";

    };

  }, [showPanel]);

  /* ================================================= */
  /* ================= REAL CHATS ==================== */
  /* ================================================= */

  const chats = useMemo(
    () => [

      {
        id: 1,

        name: t(
          "riyaMother"
        ),

        avatar:
          "/images/oldman.jpg",

        online: true,

        lastMessage: t(
          "thankDonationShort"
        ),

        time: "10:31 AM",

        unread: 2,

        messages: [

          {
            sender: "them",

            text: t(
              "thankDonation"
            ),

            time: "10:30 AM",
          },

          {
            sender: "me",

            text: t(
              "youWelcome"
            ),

            time: "10:31 AM",
          },

        ],

      },

      {
        id: 2,

        name: t(
          "floodReliefTeam"
        ),

        avatar:
          "/images/flood.jpg",

        online: true,

        lastMessage: t(
          "familiesFood"
        ),

        time: "Yesterday",

        unread: 1,

        messages: [

          {
            sender: "them",

            text: t(
              "familiesFoodSupport"
            ),

            time: "9:15 AM",
          },

        ],

      },

      {
        id: 3,

        name: t(
          "educationSupport"
        ),

        avatar:
          "/images/school.jpg",

        online: true,

        lastMessage: t(
          "childrenSchool"
        ),

        time: "3h ago",

        unread: 0,

        messages: [

          {
            sender: "them",

            text: t(
              "childrenSchoolHelp"
            ),

            time: "2:45 PM",
          },

        ],

      },

      {
        id: 4,

        name: t(
          "medicalAidTeam"
        ),

        avatar:
          "/images/medical.jpg",

        online: false,

        lastMessage: t(
          "medicineDelivered"
        ),

        time: "1 day ago",

        unread: 0,

        messages: [

          {
            sender: "them",

            text: t(
              "medicineDelivered"
            ),

            time: "Yesterday",
          },

        ],

      },

      {
        id: 5,

        name: t(
          "cleanWaterProject"
        ),

        avatar:
          "/images/water.jpg",

        online: true,

        lastMessage: t(
          "newWells"
        ),

        time: "5m ago",

        unread: 3,

        messages: [

          {
            sender: "them",

            text: t(
              "newWellsSupport"
            ),

            time: "5m ago",
          },

        ],

      },

      {
        id: 6,

        name: t(
          "foodSupportTeam"
        ),

        avatar:
          "/images/food.jpg",

        online: true,

        lastMessage: t(
          "mealsDelivered"
        ),

        time: "Now",

        unread: 1,

        messages: [

          {
            sender: "them",

            text: t(
              "mealsDelivered"
            ),

            time: "Now",
          },

        ],

      },

    ],
    [t]
  );

  /* ================================================= */
  /* ================= SELECT CHAT =================== */
  /* ================================================= */

  const [selectedChatId,
    setSelectedChatId] =
    useState(1);

  const selectedChat =
    chats.find(
      (chat) =>
        chat.id ===
        selectedChatId
    ) || chats[0];

  /* ================================================= */
  /* ================= SEND MESSAGE ================== */
  /* ================================================= */

  const handleSendMessage =
    (message) => {

      console.log(
        "SEND:",
        message
      );

    };

  return (

    <div style={container}>

      {/* SIDEBAR */}

      <Sidebar
        darkMode={darkMode}
      />

      {/* MAIN */}

      <div
        style={main(
          darkMode
        )}
      >

        {/* TOPBAR */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={
            setDarkMode
          }
          onTogglePanel={() =>
            setShowPanel(
              (prev) => !prev
            )
          }
        />

        {/* HEADER */}

        <div
          style={pageHeader}
        >

          <h1
            style={title(
              darkMode
            )}
          >

            {t(
              "messages"
            )}

          </h1>

          <p
            style={subtitle(
              darkMode
            )}
          >

            {t(
              "messagesSubtitle"
            )}

          </p>

        </div>

        {/* CONTENT */}

        <div
          style={content}
        >

          {/* LEFT */}

          <div
            style={
              sidebarWrap
            }
          >

            <MessagesSidebar
              darkMode={
                darkMode
              }
              chats={chats}
              selectedChat={
                selectedChat
              }
              setSelectedChat={(
                chat
              ) =>
                setSelectedChatId(
                  chat.id
                )
              }
            />

          </div>

          {/* CENTER */}

          <div
            style={
              chatWrap
            }
          >

            <ChatWindow
              darkMode={
                darkMode
              }
              selectedChat={
                selectedChat
              }
              onSendMessage={
                handleSendMessage
              }
            />

          </div>

        </div>

        {/* OVERLAY */}

        <div
          onClick={() =>
            setShowPanel(false)
          }
          style={{
            ...overlay,

            opacity:
              showPanel
                ? 1
                : 0,

            pointerEvents:
              showPanel
                ? "auto"
                : "none",
          }}
        />

        {/* RIGHT PANEL */}

        <div
          style={{
            ...panel(
              darkMode
            ),

            transform:
              showPanel

                ? "translateX(0)"

                : "translateX(110%)",
          }}
        >

          <MessagesRightPanel
            darkMode={
              darkMode
            }
            chats={chats}
          />

        </div>

      </div>

    </div>

  );

}

export default Messages;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const container = {

  display: "grid",

  gridTemplateColumns:
    "230px 1fr",

  minHeight: "100vh",

};

const main = (
  darkMode
) => ({

  background: darkMode

    ? `
      linear-gradient(
        180deg,
        #020617,
        #0f172a
      )
    `

    : `
      linear-gradient(
        180deg,
        #f8fafc,
        #eef2ff
      )
    `,

  padding: "24px",

  minHeight: "100vh",

  position: "relative",

  overflow: "hidden",

});

const pageHeader = {

  marginTop: "10px",

  marginBottom: "22px",

};

const title = (
  darkMode
) => ({

  margin: 0,

  fontSize: "36px",

  fontWeight: "900",

  color: darkMode
    ? "#ffffff"
    : "#111827",

});

const subtitle = (
  darkMode
) => ({

  marginTop: "8px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

  fontSize: "15px",

});

const content = {

  display: "grid",

  gridTemplateColumns:
    "360px 1fr",

  gap: "22px",

  alignItems: "stretch",

  minHeight:
    "calc(100vh - 170px)",

};

const sidebarWrap = {

  minWidth: 0,

  height: "100%",

};

const chatWrap = {

  minWidth: 0,

  height: "100%",

};

const overlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(2,6,23,0.55)",

  backdropFilter:
    "blur(10px)",

  WebkitBackdropFilter:
    "blur(10px)",

  zIndex: 998,

  transition:
    "0.3s ease",

};

const panel = (
  darkMode
) => ({

  position: "fixed",

  top: 0,

  right: 0,

  width: "360px",

  maxWidth: "100%",

  height: "100vh",

  overflowY: "auto",

  padding: "22px",

  zIndex: 999,

  transition:
    "transform 0.35s ease",

  backdropFilter:
    "blur(24px)",

  WebkitBackdropFilter:
    "blur(24px)",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(7,18,38,0.96),
        rgba(15,23,42,0.92)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.96),
        rgba(248,250,252,0.92)
      )
    `,

  boxShadow: darkMode

    ? `
      -20px 0 80px rgba(0,0,0,0.55)
    `

    : `
      -20px 0 80px rgba(15,23,42,0.12)
    `,

  borderLeft: darkMode

    ? "1px solid rgba(255,255,255,0.05)"

    : "1px solid rgba(255,255,255,0.9)",

});