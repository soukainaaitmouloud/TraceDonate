import React from "react";

import "./NeedyMessagesSidebar.css";

import {
  FaPlus,
  FaSearch,
  FaSlidersH,
  FaThumbtack,
} from "react-icons/fa";

import {
  useTranslation,
} from "react-i18next";

import NeedyConversationItem from "./NeedyConversationItem";

function NeedyMessagesSidebar() {

  const { t } =
    useTranslation();

  const conversations = [

    {
      active: true,
      name: "Aarav Mehta",
      message: t("stayStrong"),
      time: t("time2mAgo"),
      unread: "1",
    },

    {
      name: "Sneha Patel",
      message: t("prayingRecovery"),
      time: t("time1hAgo"),
    },

    {
      name: "Rahul Verma",
      message: t("needAnything"),
      time: t("time3hAgo"),
    },

    {
      name: "Priya Singh",
      message: t("veryBrave"),
      time: t("yesterday"),
    },

    {
      name: "Vikram Joshi",
      message: t("keepFighting"),
      time: t("time2dAgo"),
    },

    {
      name: "Ananya Kapoor",
      message: t("sharedCampaign"),
      time: t("now"),
      unread: "3",
    },

  ];

  return (

    <div className="messages-sidebar">

      {/* HEADER */}

      <div className="messages-sidebar-header">

        <div>

          <h2>

            {t("messages")}

          </h2>

          <p>

            {t(
              "messagesSidebarSubtitle"
            )}

          </p>

        </div>

        <button className="new-chat-btn">

          <FaPlus />

        </button>

      </div>

      {/* SEARCH */}

      <div className="messages-search-wrapper">

        <div className="messages-search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder={t(
              "searchConversations"
            )}
          />

        </div>

        <button className="filter-btn">

          <FaSlidersH />

        </button>

      </div>

      {/* TABS */}

      <div className="messages-tabs">

        <button className="active">

          {t("all")}

        </button>

        <button>

          {t("unread")}

        </button>

        <button>

          {t("archived")}

        </button>

      </div>

      {/* PINNED */}

      <div className="messages-section-title">

        <FaThumbtack />

        <span>

          {t("pinned")}

        </span>

      </div>

      {/* CONVERSATIONS */}

      <div className="conversation-list">

        {conversations.map(
          (conversation, index) => (

            <NeedyConversationItem
              key={index}
              active={
                conversation.active
              }
              name={
                conversation.name
              }
              message={
                conversation.message
              }
              time={
                conversation.time
              }
              unread={
                conversation.unread
              }
            />

          )
        )}

      </div>

    </div>

  );

}

export default NeedyMessagesSidebar;