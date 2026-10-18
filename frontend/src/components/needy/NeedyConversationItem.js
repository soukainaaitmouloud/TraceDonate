import React from "react";

import "./NeedyConversationItem.css";

function NeedyConversationItem({
  name,
  message,
  time,
  unread,
  active,
}) {

  return (

    <div
      className={`conversation-item ${
        active
          ? "active"
          : ""
      }`}
    >

      {/* AVATAR */}

      <div className="conversation-avatar">

        {name.charAt(0)}

      </div>

      {/* CONTENT */}

      <div className="conversation-content">

        {/* TOP */}

        <div className="conversation-top">

          <h4>

            {name}

          </h4>

          <span>

            {time}

          </span>

        </div>

        {/* BOTTOM */}

        <div className="conversation-bottom">

          <p>

            {message}

          </p>

          {unread && (

            <div className="unread-badge">

              {unread}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default NeedyConversationItem;