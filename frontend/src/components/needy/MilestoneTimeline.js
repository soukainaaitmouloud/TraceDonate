import React from "react";

import "./MilestoneTimeline.css";

import {
  FaCheckCircle,
  FaClock,
  FaHeartbeat,
  FaHospital,
  FaHandsHelping,
} from "react-icons/fa";

function MilestoneTimeline() {

  const milestones = [

    {
      id: 1,
      title: "Campaign Started",
      date: "12 Jan 2026",
      description:
        "Your fundraising campaign was successfully launched.",
      icon: <FaHandsHelping />,
      status: "completed",
    },

    {
      id: 2,
      title: "Medical Documents Verified",
      date: "14 Jan 2026",
      description:
        "Hospital and identity documents were approved.",
      icon: <FaCheckCircle />,
      status: "completed",
    },

    {
      id: 3,
      title: "First Treatment Completed",
      date: "20 Jan 2026",
      description:
        "The first treatment session was completed successfully.",
      icon: <FaHospital />,
      status: "completed",
    },

    {
      id: 4,
      title: "Recovery Monitoring",
      date: "Ongoing",
      description:
        "Doctors are monitoring recovery progress and medications.",
      icon: <FaHeartbeat />,
      status: "active",
    },

    {
      id: 5,
      title: "Final Recovery Goal",
      date: "Upcoming",
      description:
        "Expected final recovery and rehabilitation milestone.",
      icon: <FaClock />,
      status: "pending",
    },

  ];

  return (

    <div className="milestone-timeline">

      {/* HEADER */}

      <div className="timeline-header">

        <h2>
          Recovery Timeline
        </h2>

        <p>
          Follow the recovery journey and important milestones.
        </p>

      </div>

      {/* TIMELINE */}

      <div className="timeline-list">

        {milestones.map((item) => (

          <div
            key={item.id}
            className={`timeline-item ${item.status}`}
          >

            {/* LINE */}

            <div className="timeline-left">

              <div className="timeline-icon">
                {item.icon}
              </div>

              <div className="timeline-line" />

            </div>

            {/* CONTENT */}

            <div className="timeline-content">

              <div className="timeline-date">
                {item.date}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MilestoneTimeline;