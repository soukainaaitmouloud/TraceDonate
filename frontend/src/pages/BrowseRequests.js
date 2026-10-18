import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RequestCard from "../components/RequestCard";
import BrowseRightPanel from "../components/BrowseRightPanel";

function BrowseRequests({
  darkMode,
  setDarkMode,
}) {
  const { t } = useTranslation();

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const [showPanel, setShowPanel] =
    useState(false);

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  const [favorites, setFavorites] = useState(
    () => {
      const saved =
        localStorage.getItem("favorites");

      return saved ? JSON.parse(saved) : [];
    }
  );

  /* ================= FETCH ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      loadDemoData();
      return;
    }

    fetch("http://localhost:5000/all-requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          Array.isArray(data) &&
          data.length > 0
        ) {
          setRequests(data);
        } else {
          loadDemoData();
        }
      })
      .catch(() => {
        loadDemoData();
      });
  }, []);

  /* ================= DEMO DATA ================= */
const loadDemoData = () => {
  setRequests([
    {
      id: 1,
      title: "heartSurgery",
      image: "/images/medical.jpg",
      raised: 3200,
      goal: 5000,
      desc: "medicalAidDesc",
      author: "healthFoundation",
      category: "medical",
      urgent: true,
      createdAt: "2025-01-20",
    },

    {
      id: 2,
      title: "floodRelief",
      image: "/images/flood.jpg",
      raised: 7850,
      goal: 10000,
      desc: "floodReliefDesc",
      author: "helpingHandsOrg",
      category: "disasterRelief",
      urgent: true,
      createdAt: "2025-01-18",
    },

    {
      id: 3,
      title: "educationSupport",
      image: "/images/school.jpg",
      raised: 1150,
      goal: 3000,
      desc: "supportEducationDesc",
      author: "educationOrg",
      category: "education",
      urgent: false,
      createdAt: "2025-01-15",
    },

    {
      id: 4,
      title: "foodHelp",
      image: "/images/food.jpg",
      raised: 2600,
      goal: 4500,
      desc: "foodSupportDesc",
      author: "foodAidOrg",
      category: "hunger",
      urgent: false,
      createdAt: "2025-01-10",
    },
  ]);
};
    /* ================= SAVE FAVORITES ================= */

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  /* ================= LOCK SCROLL ================= */

  useEffect(() => {
    document.body.style.overflow =
      showPanel ? "hidden" : "auto";

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [showPanel]);

  /* ================= CATEGORIES ================= */

  const categories = useMemo(() => {
    const all = requests.map(
      (item) => item.category
    );

    return ["All", ...new Set(all)];
  }, [requests]);

  /* ================= FILTER ================= */

  const filteredRequests = useMemo(() => {
    let data = [...requests];

    /* SEARCH */

    data = data.filter((item) => {
    const text = `

  ${t(item.title)}

  ${t(item.desc)}

  ${t(item.category)}

`.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

    /* CATEGORY */

    if (categoryFilter !== "All") {
      data = data.filter(
        (item) =>
          item.category === categoryFilter
      );
    }

    /* SORT */

    if (sortBy === "Highest Raised") {
      data.sort(
        (a, b) => b.raised - a.raised
      );
    }

    if (sortBy === "Goal Amount") {
      data.sort((a, b) => b.goal - a.goal);
    }

    if (sortBy === "Newest") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return data;
  }, [
    requests,
    search,
    categoryFilter,
    sortBy,
  ]);

  /* ================= FAVORITES ================= */

  const isFavorite = (id) => {
    return favorites.some(
      (item) => item.id === id
    );
  };

  const toggleFavorite = (request) => {
    const exists = favorites.some(
      (item) => item.id === request.id
    );

    if (exists) {
      const updated = favorites.filter(
        (item) => item.id !== request.id
      );

      setFavorites(updated);

      return;
    }

    setFavorites((prev) => [
      ...prev,
      request,
    ]);
  };

  /* ================= DONATE ================= */

  const handleDonate = (request) => {
    alert(
      `${t(
        "thankYouSupport"
      )} "${t(request.title)}" 💚`
    );
  };

  /* ================= VIEW ================= */

  const handleView = (request) => {

  alert(

    `${t(
      "openingRequest"
    )} ${t(
      request.title
    )}`

  );

};

  return (
    <div style={container}>
      <Sidebar darkMode={darkMode} />

      {/* MAIN */}
      <div style={main(darkMode)}>
        <div style={wrapper}>
          <Topbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onTogglePanel={() =>
              setShowPanel(true)
            }
          />

          {/* HEADER */}
          <div style={header}>
            <div>
              <h2 style={title(darkMode)}>
                {t("browseRequests")}
              </h2>

              <p style={subtitle(darkMode)}>
                {t("browseSubtitle")}
              </p>
            </div>

            <div style={statsCard(darkMode)}>
              {filteredRequests.length}{" "}
              {t("requests")}
            </div>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder={t(
              "searchCauses"
            )}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={searchInput(darkMode)}
          />

          {/* FILTERS */}
          <div style={filtersBar}>
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              style={filter(darkMode)}
            >
              {categories.map((cat) => (
                <option
  key={cat}
  value={cat}
>

  {cat === "All"
    ? t("all")

    : t(cat)}

</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              style={filter(darkMode)}
            >
              <option>
                {t("newest")}
              </option>

              <option>
                {t("highestRaised")}
              </option>

              <option>
                {t("goalAmount")}
              </option>
            </select>
          </div>

          {/* EMPTY */}
          {filteredRequests.length === 0 ? (
            <div style={empty(darkMode)}>
              <h3>
                {t("noRequestsFound")}
              </h3>

              <p>
                {t(
                  "tryChangingFilters"
                )}
              </p>
            </div>
          ) : (
            <div style={grid}>
              {filteredRequests.map(
                (request) => (
                  <div
                    key={request.id}
                    style={cardWrapper}
                  >
                    <RequestCard
                      {...request}
                      darkMode={darkMode}
                    />

                    {/* ACTIONS */}
                    <div style={actions}>
                      <button
                        style={donateBtn}
                        onClick={() =>
                          handleDonate(
                            request
                          )
                        }
                      >
                        {t("donate")}
                      </button>

                      <button
                        style={viewBtn}
                        onClick={() =>
                          handleView(
                            request
                          )
                        }
                      >
                        {t("view")}
                      </button>

                      <button
                        style={
                          isFavorite(
                            request.id
                          )
                            ? favoriteActive
                            : favoriteBtn
                        }
                        onClick={() =>
                          toggleFavorite(
                            request
                          )
                        }
                      >
                        {isFavorite(
                          request.id
                        )
                          ? t("saved")
                          : t("save")}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {showPanel && (
        <div
          style={overlay}
          onClick={() =>
            setShowPanel(false)
          }
        >
         <div
  style={drawer(darkMode)}
  onClick={(e) =>
    e.stopPropagation()
  }
>

  {/* CLOSE BUTTON */}

  <button
    onClick={() =>
      setShowPanel(false)
    }
    style={closeBtn}
    onMouseEnter={(e) => {

      e.currentTarget.style.transform =
        "translateY(-3px) scale(1.06)";

      e.currentTarget.style.background =
        "linear-gradient(135deg,#ef4444,#dc2626)";

      e.currentTarget.style.boxShadow =
        "0 14px 36px rgba(239,68,68,0.35)";

    }}
    onMouseLeave={(e) => {

      e.currentTarget.style.transform =
        "translateY(0) scale(1)";

      e.currentTarget.style.background =
        "rgba(255,255,255,0.08)";

      e.currentTarget.style.boxShadow =
        "0 10px 26px rgba(0,0,0,0.22)";

    }}
  >

    ✕

  </button>

  <div style={drawerContent}>
              <BrowseRightPanel

  darkMode={darkMode}

  requests={requests}

  categoryFilter={
    categoryFilter
  }

  setCategoryFilter={
    setCategoryFilter
  }

/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowseRequests;

/* ================= STYLES ================= */

const container = {
  display: "grid",
  gridTemplateColumns: "230px 1fr",
  minHeight: "100vh",
};

const main = (darkMode) => ({
  padding: "30px",
  background: darkMode
    ? "#020617"
    : "#f1f5f9",
  color: darkMode ? "#fff" : "#000",
  transition: "0.3s",
});

const wrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "22px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const title = (darkMode) => ({
  fontSize: "28px",
  fontWeight: "800",
  color: darkMode ? "#fff" : "#111827",
  marginBottom: "6px",
});

const subtitle = (darkMode) => ({
  color: darkMode ? "#cbd5e1" : "#64748b",
});

const statsCard = (darkMode) => ({
  padding: "12px 18px",
  borderRadius: "14px",
  background: darkMode
    ? "#1e293b"
    : "#fff",
  fontWeight: "700",
});

const searchInput = (darkMode) => ({
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  outline: "none",
  background: darkMode
    ? "#1e293b"
    : "#fff",
  color: darkMode ? "#fff" : "#111827",
  fontSize: "14px",
});

const filtersBar = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const filter = (darkMode) => ({
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: darkMode
    ? "#1e293b"
    : "#fff",
  color: darkMode ? "#fff" : "#111827",
});

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",
  gap: "24px",
};

const cardWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const actions = {
  display: "flex",
  gap: "10px",
};

const donateBtn = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(90deg,#16a34a,#059669)",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const viewBtn = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const favoriteBtn = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "#e2e8f0",
  color: "#111827",
  fontWeight: "700",
  cursor: "pointer",
};

const favoriteActive = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "#dcfce7",
  color: "#166534",
  fontWeight: "700",
  cursor: "pointer",
};

const empty = (darkMode) => ({
  padding: "50px",
  borderRadius: "24px",
  background: darkMode
    ? "#1e293b"
    : "#fff",
  textAlign: "center",
});

/* ================= PREMIUM ANIMATIONS ================= */

if (
  typeof document !== "undefined" &&
  !document.getElementById(
    "browse-panel-animations"
  )
) {

  const style =
    document.createElement(
      "style"
    );

  style.id =
    "browse-panel-animations";

  style.innerHTML = `

    @keyframes slidePanel {

      0% {

        transform:
          translateX(100%);

        opacity: 0;

      }

      100% {

        transform:
          translateX(0);

        opacity: 1;

      }

    }

    @keyframes fadeOverlay {

      0% {

        opacity: 0;

      }

      100% {

        opacity: 1;

      }

    }

  `;

  document.head.appendChild(
    style
  );

}

/* ================= OVERLAY ================= */

const overlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(2,6,23,0.55)",

  backdropFilter:
    "blur(8px)",

  WebkitBackdropFilter:
    "blur(8px)",

  display: "flex",

  justifyContent: "flex-end",

  zIndex: 9999,

  animation:
    "fadeOverlay 0.35s ease",

};

/* ================= DRAWER ================= */

const drawer = (
  darkMode
) => ({

  width: "420px",

  height: "100vh",

  background: darkMode

    ? `
      linear-gradient(
        180deg,
        rgba(2,6,23,0.98),
        rgba(15,23,42,0.98)
      )
    `

    : `
      linear-gradient(
        180deg,
        rgba(255,255,255,0.96),
        rgba(248,250,252,0.94)
      )
    `,

  color:
    darkMode
      ? "#fff"
      : "#111827",

  backdropFilter:
    "blur(30px)",

  WebkitBackdropFilter:
    "blur(30px)",

  borderLeft:
    darkMode

      ? "1px solid rgba(255,255,255,0.06)"

      : "1px solid rgba(255,255,255,0.9)",

  boxShadow:
    "-30px 0 80px rgba(0,0,0,0.28)",

  overflowY: "auto",

  overflowX: "hidden",

  animation:
    "slidePanel 0.45s cubic-bezier(.4,2,.6,1)",

});

/* ================= DRAWER CONTENT ================= */

const drawerContent = {

  padding: "26px",

  minHeight: "100%",

  display: "flex",

  flexDirection: "column",

  gap: "24px",

  boxSizing: "border-box",

};
const closeBtn = {

  position: "absolute",

  top: "22px",

  right: "22px",

  width: "46px",

  height: "46px",

  border: "none",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(14px)",

  WebkitBackdropFilter:
    "blur(14px)",

  color: "#ffffff",

  fontSize: "18px",

  fontWeight: "800",

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  transition:
    "all 0.32s cubic-bezier(.4,2,.6,1)",

  boxShadow:
    "0 10px 26px rgba(0,0,0,0.22)",

  zIndex: 100,

};