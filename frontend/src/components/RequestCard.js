import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { FaHeart } from "react-icons/fa";

import confetti from "canvas-confetti";

import PaymentModal from "./PaymentModal";

import { useTranslation } from "react-i18next";

function RequestCard({
  id,
  title,
  image,
  img,
  raised,
  goal,
  desc,
  darkMode,
  onDonate,
  urgent = false,
  author,
  category,
}) {
  const { t } =
    useTranslation();

  const [liked, setLiked] =
    useState(false);

  const [currentRaised, setCurrentRaised] =
    useState(() => {
      const savedRaised =
        JSON.parse(
          localStorage.getItem(
            "raisedAmounts"
          ) || "{}"
        );

      return (
        savedRaised[id] ||
        Number(raised) ||
        0
      );
    });

  const [showImpact, setShowImpact] =
    useState(false);

  const [lastAmount, setLastAmount] =
    useState(0);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [showPayment, setShowPayment] =
    useState(false);

  /* FAVORITES */

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        ) || "[]"
      );

    const exists = saved.some(
      (item) => item.id === id
    );

    setLiked(exists);
  }, [id]);

  /* SAVE RAISED */

  useEffect(() => {
    const storedRaised =
      JSON.parse(
        localStorage.getItem(
          "raisedAmounts"
        ) || "{}"
      );

    storedRaised[id] =
      currentRaised;

    localStorage.setItem(
      "raisedAmounts",
      JSON.stringify(
        storedRaised
      )
    );
  }, [id, currentRaised]);

  /* IMAGE */

  const finalImage = useMemo(() => {
    if (image?.startsWith("/"))
      return image;

    if (img?.startsWith("/"))
      return img;

    if (image)
      return `/images/${image}`;

    if (img)
      return `/images/${img}`;

    return `/images/${getImageByTitle(
      title
    )}`;
  }, [image, img, title]);

  /* PERCENT */

  const percent =
    goal > 0
      ? Math.min(
          100,
          Math.round(
            (currentRaised /
              goal) *
              100
          )
        )
      : 0;

  /* ANIMATIONS */

  useEffect(() => {
    if (
      !document.getElementById(
        "request-card-animation"
      )
    ) {
      const style =
        document.createElement(
          "style"
        );

      style.id =
        "request-card-animation";

      style.innerHTML = `
        @keyframes floatUp {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }

          100% {
            transform: translate(-50%, -120%) scale(1.4);
            opacity: 0;
          }
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `;

      document.head.appendChild(
        style
      );
    }
  }, []);

  /* FAVORITE */

  const toggleFavorite = () => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        ) || "[]"
      );

    const existsIndex =
      saved.findIndex(
        (item) =>
          item.id === id
      );

    if (existsIndex !== -1) {
      saved.splice(
        existsIndex,
        1
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(saved)
      );

      setLiked(false);

      return;
    }

    const favoriteItem = {
      id,
      title,
      image: finalImage,
      raised:
        currentRaised,
      goal,
      desc,
      author,
      category,
      urgent,
      savedAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "favorites",
      JSON.stringify([
        favoriteItem,
        ...saved,
      ])
    );

    setLiked(true);
  };

  /* DONATE */

  const handleDonationSuccess = (
    amount
  ) => {
    const numericAmount =
      Number(amount);

    const updatedRaised =
      currentRaised +
      numericAmount;

    setCurrentRaised(
      updatedRaised
    );

    setLastAmount(
      numericAmount
    );

    setShowImpact(true);

    setTimeout(() => {
      setShowImpact(false);
    }, 1500);

    setShowSuccess(true);

    const existingDonations =
      JSON.parse(
        localStorage.getItem(
          "donations"
        ) || "[]"
      );

    const newDonation = {
      id: Date.now(),
      requestId: id,
      title,
      amount:
        numericAmount,
      image: finalImage,
      created_at:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "donations",
      JSON.stringify([
        newDonation,
        ...existingDonations,
      ])
    );

    const raisedStorage =
      JSON.parse(
        localStorage.getItem(
          "raisedAmounts"
        ) || "{}"
      );

    raisedStorage[id] =
      updatedRaised;

    localStorage.setItem(
      "raisedAmounts",
      JSON.stringify(
        raisedStorage
      )
    );

    onDonate?.({
      id,
      title,
      amount:
        numericAmount,
      time: "Just now",
    });

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  return (
    <div
      style={card(darkMode)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      {showImpact && (
        <div style={impactStyle}>
          +${lastAmount} 💚
        </div>
      )}

      {/* IMAGE */}

      <div style={imgWrapper}>
        <img
          src={finalImage}
          alt={title}
          style={imageStyle}
          onError={(e) => {
            e.target.src =
              "/images/water.jpg";
          }}
        />

        {urgent && (
          <div style={badge}>
            {t("urgent")}
          </div>
        )}

        <FaHeart
          onClick={
            toggleFavorite
          }
          style={{
            ...heart,
            color: liked
              ? "#ef4444"
              : "#ffffff",

            transform: liked
              ? "scale(1.2)"
              : "scale(1)",
          }}
        />
      </div>

      {/* CONTENT */}

      <div style={content}>
        <h3
          style={titleStyle(
            darkMode
          )}
        >
         {t(title)}
        </h3>

        <p
          style={descStyle(
            darkMode
          )}
        >
          {t(desc)}
        </p>

        {/* META */}

        <div style={metaRow}>
          <span
            style={authorText(
              darkMode
            )}
          >
            {author ? t(author) : t("communityHelp")}
          </span>

          <span
            style={categoryTag}
          >
            {category ? t(category) : t("general")}
          </span>
        </div>

        {/* PROGRESS */}

        <div
          style={progressContainer(
            darkMode
          )}
        >
          <div
            style={{
              ...progressBar,
              width: `${percent}%`,
            }}
          />
        </div>

        {/* STATS */}

        <div style={stats}>
          <span
            style={raisedText}
          >
            $
            {currentRaised.toLocaleString()}
          </span>

          <span
            style={goalText(
              darkMode
            )}
          >
            {t("goal")} $
            {Number(
              goal
            ).toLocaleString()}
          </span>
        </div>

        {/* FUNDED */}

        <div style={percentText}>
          {percent}%{" "}
          {t("funded")}
        </div>

        {/* BUTTON */}

        <button
          style={button}
          onClick={() =>
            setShowPayment(
              true
            )
          }
        >
          ❤️{" "}
          {t(
            "donateNow"
          )}
        </button>
      </div>

      {/* PAYMENT */}

      {showPayment && (
        <PaymentModal
          requestId={id}
          darkMode={
            darkMode
          }
          onClose={() =>
            setShowPayment(
              false
            )
          }
          onSuccess={
            handleDonationSuccess
          }
        />
      )}

      {/* SUCCESS */}

      {showSuccess && (
        <div
          style={overlay}
          onClick={() =>
            setShowSuccess(
              false
            )
          }
        >
          <div
            style={successModal(
              darkMode
            )}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div
              style={
                checkCircle
              }
            >
              ✔
            </div>

            <h2>
              {t(
                "paymentSuccessful"
              )}
            </h2>

            <p>
              {t(
                "youDonated"
              )}{" "}
              <b>
                $
                {
                  lastAmount
                }
              </b>{" "}
              💚
            </p>

            <div
              style={receiptBox(
                darkMode
              )}
            >
              <p>
                ID: #
                {Math.random()
                  .toString(
                    36
                  )
                  .substring(
                    2,
                    8
                  )
                  .toUpperCase()}
              </p>

              <p>
                {new Date().toLocaleDateString()}
              </p>
            </div>

            <button
              style={
                successBtn
              }
              onClick={() =>
                setShowSuccess(
                  false
                )
              }
            >
              {t("done")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestCard;
/* ================= STYLES ================= */

const card = (darkMode) => ({
  background: darkMode
    ? "rgba(15,23,42,0.92)"
    : "#ffffff",

  borderRadius: "22px",

  overflow: "hidden",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",

  transition: "0.3s",

  display: "flex",

  flexDirection: "column",

  position: "relative",

  border: darkMode
    ? "1px solid #1e293b"
    : "1px solid #e2e8f0",
});

const imgWrapper = {
  position: "relative",

  height: "220px",
};

const imageStyle = {
  width: "100%",

  height: "100%",

  objectFit: "cover",
};

const badge = {
  position: "absolute",

  top: "14px",

  left: "14px",

  background: "#ef4444",

  color: "#fff",

  padding: "6px 12px",

  borderRadius: "999px",

  fontSize: "11px",

  fontWeight: "700",
};

const heart = {
  position: "absolute",

  top: "14px",

  right: "14px",

  fontSize: "20px",

  cursor: "pointer",

  transition: "0.3s",
};

const content = {
  padding: "18px",
};

const titleStyle = (
  darkMode
) => ({
  fontSize: "24px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#111827",

  marginBottom: "10px",
});

const descStyle = (
  darkMode
) => ({
  fontSize: "14px",

  lineHeight: "1.6",

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

  marginBottom: "16px",
});

const metaRow = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "16px",
};

const authorText = (
  darkMode
) => ({
  fontSize: "13px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",
});

const categoryTag = {
  background: "#dcfce7",

  color: "#166534",

  padding: "6px 12px",

  borderRadius: "999px",

  fontSize: "11px",

  fontWeight: "700",
};

const progressContainer = (
  darkMode
) => ({
  height: "10px",

  background: darkMode
    ? "#1e293b"
    : "#e5e7eb",

  borderRadius: "999px",

  overflow: "hidden",

  marginBottom: "12px",
});

const progressBar = {
  height: "100%",

  borderRadius: "999px",

  background:
    "linear-gradient(90deg,#22c55e,#2563eb)",
};

const stats = {
  display: "flex",

  justifyContent:
    "space-between",

  marginBottom: "10px",
};

const raisedText = {
  color: "#22c55e",

  fontWeight: "800",

  fontSize: "18px",
};

const goalText = (
  darkMode
) => ({
  color: darkMode
    ? "#94a3b8"
    : "#64748b",

  fontSize: "14px",
});

const percentText = {
  fontSize: "13px",

  color: "#2563eb",

  fontWeight: "700",

  marginBottom: "16px",
};

const button = {
  width: "100%",

  padding: "15px",

  borderRadius: "14px",

  border: "none",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "#fff",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "15px",
};

const impactStyle = {
  position: "absolute",

  top: "50%",

  left: "50%",

  transform:
    "translate(-50%, -50%)",

  color: "#22c55e",

  fontWeight: "800",

  fontSize: "28px",

  zIndex: 10,

  animation:
    "floatUp 1.5s forwards",
};

const overlay = {
  position: "fixed",

  inset: 0,

  background:
    "rgba(0,0,0,0.6)",

  display: "flex",

  justifyContent:
    "center",

  alignItems: "center",

  zIndex: 2000,
};

const successModal = (
  darkMode
) => ({
  background: darkMode
    ? "#020617"
    : "#fff",

  color: darkMode
    ? "#fff"
    : "#000",

  padding: "28px",

  borderRadius: "22px",

  textAlign: "center",

  width: "320px",

  animation:
    "fadeScale 0.3s ease",
});

const checkCircle = {
  width: "70px",

  height: "70px",

  borderRadius: "50%",

  background: "#22c55e",

  color: "#fff",

  display: "flex",

  alignItems: "center",

  justifyContent:
    "center",

  margin:
    "0 auto 16px",

  fontSize: "28px",
};

const receiptBox = (
  darkMode
) => ({
  background: darkMode
    ? "#0f172a"
    : "#f1f5f9",

  padding: "14px",

  marginTop: "16px",

  borderRadius: "12px",

  fontSize: "14px",
});

const successBtn = {
  marginTop: "18px",

  padding: "12px 22px",

  border: "none",

  borderRadius: "999px",

  background: "#22c55e",

  color: "#fff",

  cursor: "pointer",

  fontWeight: "700",
};

/* ================= IMAGE MATCHER ================= */

function getImageByTitle(
  title = ""
) {
  const lower =
    title.toLowerCase();

  if (
    lower.includes(
      "water"
    )
  ) {
    return "water.jpg";
  }

  if (
    lower.includes(
      "medical"
    )
  ) {
    return "medical.jpg";
  }

  if (
    lower.includes(
      "education"
    )
  ) {
    return "school.jpg";
  }

  if (
    lower.includes(
      "food"
    )
  ) {
    return "food.jpg";
  }

  return "water.jpg";
}