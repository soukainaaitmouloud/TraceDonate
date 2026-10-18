import React from "react";

import {
  FaHeart,
  FaUserFriends,
  FaClock,
  FaThLarge,
  FaBriefcaseMedical,
  FaGraduationCap,
  FaExclamationTriangle,
  FaShoppingBag,
  FaWheelchair,
  FaEllipsisH,
} from "react-icons/fa";

import "./NeedyBrowseRequests.css";

/* ✅ USE PUBLIC IMAGES */

const requests = [
  {
    title: "Heart Surgery for Riya",
    image: "/images/medical.jpg",
    category: "Medical",
    raised: "$3,200",
    goal: "$5,000",
    progress: "64%",
    supporters: 128,
    days: 18,
    color: "medical",
    text:
      "I’m Riya, an 8-year-old girl diagnosed with congenital heart disease.",
  },

  {
    title: "Help Me Continue My Studies",
    image: "/images/school.jpg",
    category: "Education",
    raised: "$1,100",
    goal: "$2,000",
    progress: "55%",
    supporters: 76,
    days: 30,
    color: "education",
    text:
      "I want to continue my education but need help with books and fees.",
  },

  {
    title: "Help After House Fire",
    image: "/images/flood.jpg",
    category: "Emergency",
    raised: "$2,450",
    goal: "$4,000",
    progress: "61%",
    supporters: 95,
    days: 22,
    color: "emergency",
    text:
      "A fire broke out and we lost everything. Help us rebuild our home.",
  },

  {
    title: "Support for Daily Living",
    image: "/images/oldman.jpg",
    category: "Daily Needs",
    raised: "$650",
    goal: "$1,200",
    progress: "54%",
    supporters: 45,
    days: 15,
    color: "daily",
    text:
      "I need support for food, medicine and basic monthly needs.",
  },

  {
    title: "Wheelchair for Independent Living",
    image: "/images/school.jpg",
    category: "Disability",
    raised: "$1,700",
    goal: "$2,800",
    progress: "61%",
    supporters: 63,
    days: 20,
    color: "disability",
    text:
      "I need a wheelchair to continue my recovery journey independently.",
  },

  {
    title: "Kidney Treatment Support",
    image: "/images/medical.jpg",
    category: "Medical",
    raised: "$2,900",
    goal: "$4,500",
    progress: "64%",
    supporters: 112,
    days: 25,
    color: "medical",
    text:
      "I’m undergoing dialysis and need help for treatment and medicines.",
  },
];

function NeedyBrowseRequests() {

  return (

    <div className="browse-page">

      {/* HEADER */}

      <div className="browse-header">

        <div>

          <h1>Browse Requests</h1>

          <p>
            Discover people in need and support their recovery,
            education, emergencies and more.
          </p>

        </div>

        <button className="sort-btn">
          Most Recent
        </button>

      </div>

      {/* CATEGORY */}

      <div className="category-row">

        <button className="category-pill active">
          <FaThLarge />
          All Requests
        </button>

        <button className="category-pill">
          <FaBriefcaseMedical />
          Medical
        </button>

        <button className="category-pill">
          <FaGraduationCap />
          Education
        </button>

        <button className="category-pill">
          <FaExclamationTriangle />
          Emergency
        </button>

        <button className="category-pill">
          <FaShoppingBag />
          Daily Needs
        </button>

        <button className="category-pill">
          <FaWheelchair />
          Disability
        </button>

        <button className="category-pill">
          <FaEllipsisH />
          More
        </button>

      </div>

      <p className="results-count">
        142 requests found
      </p>

      {/* GRID */}

      <div className="requests-grid">

        {requests.map((item, index) => (

          <div
            className="request-card"
            key={index}
          >

            {/* IMAGE */}

            <div className="request-image-wrapper">

              <img
                src={item.image}
                alt={item.title}
                className="request-image"
              />

              <span className="verified-badge">
                Verified
              </span>

              <button className="favorite-btn">
                <FaHeart />
              </button>

              <span
                className={`category-badge ${item.color}`}
              >
                {item.category}
              </span>

            </div>

            {/* CONTENT */}

            <div className="request-content">

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              {/* PROGRESS */}

              <div className="request-progress-top">

                <span>
                  Raised <strong>{item.raised}</strong> of {item.goal}
                </span>

                <strong>{item.progress}</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: item.progress,
                  }}
                ></div>

              </div>

              {/* FOOTER */}

              <div className="request-footer">

                <span>
                  <FaUserFriends />
                  {item.supporters} Supporters
                </span>

                <span>
                  <FaClock />
                  {item.days} Days Left
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default NeedyBrowseRequests;