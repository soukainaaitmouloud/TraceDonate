 import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import { useTranslation } from "react-i18next";

import {
  FaHeart,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import FavoriteCard from "../components/FavoriteCard";

/* ✅ IMPORT NEW PANEL */

import FavoritesRightPanel from "../components/FavoritesRightPanel";

function Favorites({
  darkMode,
  setDarkMode,
}) {

  const { t } =
    useTranslation();

  const [openPanel, setOpenPanel] =
    useState(false);

  const [search, setSearch] =
    useState("");

  /* ================================================= */
  /* ================= FAVORITES ===================== */
  /* ================================================= */

  const [favorites, setFavorites] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            "favorites"
          );

        if (saved) {

          const parsed =
            JSON.parse(saved);

          return parsed.map(
            (item) => ({
              ...item,
              raised: Number(
                item?.raised || 0
              ),
              goal: Number(
                item?.goal || 0
              ),
            })
          );

        }

      } catch (error) {

        console.log(error);

      }

      return [];

    });

  /* ================================================= */
  /* ================= SAVE ========================== */
  /* ================================================= */

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);

  /* ================================================= */
  /* ================= BODY LOCK ===================== */
  /* ================================================= */

  useEffect(() => {

    document.body.style.overflow =
      openPanel
        ? "hidden"
        : "auto";

    return () => {

      document.body.style.overflow =
        "auto";

    };

  }, [openPanel]);

  /* ================================================= */
  /* ================= FILTER ======================== */
  /* ================================================= */

  const filteredFavorites =
    useMemo(() => {

      return favorites.filter(
        (item) => {

          const text =
            `${item?.title || ""} ${
              item?.desc || ""
            } ${
              item?.category || ""
            }`.toLowerCase();

          return text.includes(
            search.toLowerCase()
          );

        }
      );

    }, [favorites, search]);

  /* ================================================= */
  /* ================= REMOVE ======================== */
  /* ================================================= */

  const removeFavorite = (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        t(
          "removeFavoriteConfirm"
        )
      );

    if (!confirmDelete)
      return;

    const updated =
      favorites.filter(
        (item) =>
          item.id !== id
      );

    setFavorites(updated);

  };

  /* ================================================= */
  /* ================= DONATE ======================== */
  /* ================================================= */

  const handleDonate = (
    item
  ) => {

    alert(
      `${t(
        "thankYouSupport"
      )} "${t(item.title)}" 💚`
    );

  };

  /* ================================================= */
  /* ================= VIEW ========================== */
  /* ================================================= */

  const handleView = (
    item
  ) => {

    alert(
      `${t(
        "viewing"
      )}: ${t(item.title)}`
    );

  };

  return (

    <div style={container}>

      {/* SIDEBAR */}

      <Sidebar
        darkMode={darkMode}
      />

      {/* MAIN */}

      <div style={main(darkMode)}>

        {/* TOPBAR */}

        <Topbar
          darkMode={darkMode}
          setDarkMode={
            setDarkMode
          }
          onTogglePanel={() =>
            setOpenPanel(true)
          }
        />

        {/* CONTENT */}

        <div style={wrapper}>

          {/* HEADER */}

          <div style={header}>

            <div>

              <h2
                style={title(
                  darkMode
                )}
              >

                {t(
                  "myFavorites"
                )} 💚

              </h2>

              <p
                style={subtitle(
                  darkMode
                )}
              >

                {t(
                 "favoritesSubtitle"
                )}

              </p>

            </div>

            <button
              style={
                overviewButton
              }
              onClick={() =>
                setOpenPanel(true)
              }
            >

              {t(
                "openOverview"
              )}

            </button>

          </div>

          {/* TOP ROW */}

          <div style={topRow}>

            <div style={tabs}>

              <span
                style={
                  activeTab
                }
              >

                {t(
                  "savedRequests"
                )} (

                {
                  filteredFavorites.length
                }

                )

              </span>

            </div>

            <input
              type="text"
              placeholder={t(
                "searchFavorites"
              )}
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={searchInput(
                darkMode
              )}
            />

          </div>

          {/* EMPTY */}

          {filteredFavorites.length ===
          0 ? (

            <div
              style={emptyState(
                darkMode
              )}
            >

              <FaHeart
                size={50}
                color="#22c55e"
              />

              <h3>

                {t(
                  "noFavoritesFound"
                )}

              </h3>

              <p>

                {t(
                  "tryAnotherSearch"
                )}

              </p>

            </div>

          ) : (

            <div style={list}>

              {filteredFavorites.map(
                (item) => (

                  <div
                    key={item.id}
                    style={
                      favoriteWrapper
                    }
                  >

                    <FavoriteCard
                      item={item}
                      darkMode={
                        darkMode
                      }
                    />

                    <div
                      style={
                        cardActions
                      }
                    >

                      <button
                        style={
                          donateBtn
                        }
                        onClick={() =>
                          handleDonate(
                            item
                          )
                        }
                      >

                        <FaHeart />

                        {t(
                          "donate"
                        )}

                      </button>

                      <button
                        style={viewBtn}
                        onClick={() =>
                          handleView(
                            item
                          )
                        }
                      >

                        <FaExternalLinkAlt />

                        {t(
                          "view"
                        )}

                      </button>

                      <button
                        style={
                          removeBtn
                        }
                        onClick={() =>
                          removeFavorite(
                            item.id
                          )
                        }
                      >

                        <FaTrash />

                        {t(
                          "remove"
                        )}

                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

      {/* ✅ NEW PREMIUM PANEL */}

      <FavoritesRightPanel
        open={openPanel}
        onClose={() =>
          setOpenPanel(false)
        }
        darkMode={darkMode}
      />

    </div>

  );

}

export default Favorites;

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

  padding: "30px 50px",

  background: darkMode

    ? "linear-gradient(180deg,#020617,#0f172a)"

    : "linear-gradient(180deg,#f8fafc,#eef2ff)",

  minHeight: "100vh",

});

const wrapper = {

  maxWidth: "1100px",

  margin: "0 auto",

};

const header = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "20px",

};

const overviewButton = {

  padding: "12px 18px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(90deg,#16a34a,#059669)",

  color: "#fff",

  fontWeight: "700",

  cursor: "pointer",

};

const title = (
  darkMode
) => ({

  fontSize: "34px",

  fontWeight: "800",

  color: darkMode
    ? "#fff"
    : "#111827",

});

const subtitle = (
  darkMode
) => ({

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

});

const topRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginBottom: "25px",

};

const tabs = {

  display: "flex",

};

const activeTab = {

  color: "#22c55e",

  borderBottom:
    "3px solid #22c55e",

  paddingBottom: "8px",

  fontWeight: "700",

};

const searchInput = (
  darkMode
) => ({

  padding: "12px 16px",

  borderRadius: "12px",

  border: "none",

  outline: "none",

  width: "260px",

  background: darkMode
    ? "#1e293b"
    : "#ffffff",

  color: darkMode
    ? "#fff"
    : "#111827",

});

const list = {

  display: "flex",

  flexDirection: "column",

  gap: "24px",

};

const favoriteWrapper = {

  display: "flex",

  flexDirection: "column",

  gap: "12px",

};

const cardActions = {

  display: "flex",

  gap: "12px",

};

const donateBtn = {

  display: "flex",

  alignItems: "center",

  gap: "8px",

  border: "none",

  background:
    "linear-gradient(90deg,#16a34a,#059669)",

  color: "#fff",

  padding: "10px 16px",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: "700",

};

const viewBtn = {

  display: "flex",

  alignItems: "center",

  gap: "8px",

  border: "none",

  background: "#2563eb",

  color: "#fff",

  padding: "10px 16px",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: "700",

};

const removeBtn = {

  display: "flex",

  alignItems: "center",

  gap: "8px",

  border: "none",

  background: "#ef4444",

  color: "#fff",

  padding: "10px 16px",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: "700",

};

const emptyState = (
  darkMode
) => ({

  background: darkMode
    ? "#1e293b"
    : "#fff",

  padding: "60px",

  borderRadius: "24px",

  textAlign: "center",

  color: darkMode
    ? "#fff"
    : "#111827",

});