import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useTranslation } from "react-i18next";

/* ================= MAP SOURCE ================= */

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ================= REGIONS ================= */

const regions = [
  {
    key: "asia",
    coords: [100, 35],
    color: "#22c55e",
    value: 45,
  },

  {
    key: "africa",
    coords: [20, 5],
    color: "#3b82f6",
    value: 20,
  },

  {
    key: "southAmerica",
    coords: [-60, -15],
    color: "#9333ea",
    value: 8,
  },

  {
    key: "europe",
    coords: [10, 50],
    color: "#f59e0b",
    value: 8,
  },
];
/* ================= COMPONENT ================= */

function ImpactMap({ darkMode = false }) {
  const { t } = useTranslation();
  return (
    <div style={card(darkMode)}>
      {/* HEADER */}
      <div style={header}>
        <h3 style={title(darkMode)}>
          {t("impactByRegion")}
        </h3>

        <p style={subtitle(darkMode)}>
          {t("impactMapDesc")}
        </p>
      </div>

      {/* CONTENT */}
      <div style={row}>
        {/* MAP */}
        <div style={mapWrapper}>
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{
              scale: 118,
            }}
            width={700}
            height={260}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {/* COUNTRIES */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: darkMode
                          ? "#1e293b"
                          : "#eef2f7",

                        stroke: darkMode
                          ? "#334155"
                          : "#dbe3ec",

                        strokeWidth: 0.4,
                        outline: "none",
                      },

                      hover: {
                        fill: "#86efac",
                        outline: "none",
                      },

                      pressed: {
                        fill: "#4ade80",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* MARKERS */}
            {regions.map((region, index) => (
              <Marker
                key={index}
                coordinates={region.coords}
              >
                <g>
                  {/* GLOW */}
                  <circle
                    r={8}
                    fill={region.color}
                    opacity={0.15}
                  />

                  {/* PULSE */}
                  <circle
                    r={4}
                    fill={region.color}
                    opacity={0.3}
                  >
                    <animate
                      attributeName="r"
                      from="4"
                      to="10"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />

                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* DOT */}
                  <circle
                    r={3}
                    fill={region.color}
                  />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* LEGEND */}
        <div style={legend}>
          {regions.map((region, index) => (
            <div
              key={index}
              style={legendRow(darkMode)}
            >
              <div
                style={{
                  ...dot,
                  background: region.color,
                }}
              />

              <span
                style={legendText(darkMode)}
              >
                {t(region.key)}
              </span>

              <span
                style={{
                  ...value,
                  color: region.color,
                }}
              >
                {region.value}+
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImpactMap;

/* ================= STYLES ================= */

const card = (darkMode) => ({
  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  padding: "20px",

  borderRadius: "22px",

  boxShadow: darkMode
    ? "0 10px 25px rgba(0,0,0,0.25)"
    : "0 8px 24px rgba(0,0,0,0.05)",

  overflow: "hidden",

  width: "100%",
});

const header = {
  marginBottom: "12px",
};

const title = (darkMode) => ({
  margin: 0,

  fontSize: "18px",

  fontWeight: "800",

  color: darkMode
    ? "#ffffff"
    : "#0f172a",
});

const subtitle = (darkMode) => ({
  marginTop: "4px",

  fontSize: "12px",

  color: darkMode
    ? "#94a3b8"
    : "#64748b",

  lineHeight: "1.4",
});

const row = {
  display: "flex",

  gap: "18px",

  alignItems: "center",

  justifyContent: "space-between",
};

const mapWrapper = {
  flex: 1,

  height: "210px",

  borderRadius: "18px",

  overflow: "hidden",
};

const legend = {
  width: "150px",

  display: "flex",

  flexDirection: "column",

  gap: "10px",
};

const legendRow = (darkMode) => ({
  display: "flex",

  alignItems: "center",

  gap: "10px",

  padding: "8px 10px",

  borderRadius: "12px",

  background: darkMode
    ? "#1e293b"
    : "#f8fafc",
});

const legendText = (darkMode) => ({
  color: darkMode
    ? "#ffffff"
    : "#0f172a",

  fontSize: "13px",

  fontWeight: "500",
});

const dot = {
  width: "10px",

  height: "10px",

  borderRadius: "50%",
};

const value = {
  marginLeft: "auto",

  fontWeight: "700",

  fontSize: "13px",
};