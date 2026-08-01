import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kanishk Kapoor — AI agents for the built environment, Dublin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Retrofit palette — keep in step with app/globals.css */
const LIME_WASH = "#F6F4EC";
const PLASTER = "#FDFBF3";
const SOIL = "#3A2E26";
const MUD = "#6B5F54";
const VERDANT = "#2E8B4F";
const BRASS = "#C99A2E";
const TERRACOTTA = "#D06A45";

const stats = [
  { value: "30+", label: "Projects" },
  { value: "5M+", label: "Records" },
  { value: "IE / UK", label: "Clients" },
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: LIME_WASH,
          fontFamily: "sans-serif",
        }}
      >
        {/* Brass rule */}
        <div style={{ display: "flex", height: 14, background: BRASS }} />

        <div style={{ display: "flex", flex: 1 }}>
          {/* The pitch */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 60px",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ display: "flex", width: 12, height: 12, background: VERDANT }} />
              <div style={{ fontSize: 21, color: MUD, letterSpacing: 2 }}>DUBLIN, IRELAND</div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 80,
                fontWeight: 800,
                color: SOIL,
                letterSpacing: -3,
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              Kanishk Kapoor
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 35,
                fontWeight: 700,
                color: VERDANT,
                letterSpacing: -1,
                marginBottom: 20,
              }}
            >
              AI agents for the built environment
            </div>

            <div style={{ display: "flex", fontSize: 23, color: MUD, lineHeight: 1.4, maxWidth: 610 }}>
              Agents that read models, manuals and building telemetry — then act on them.
            </div>

            <div style={{ display: "flex", gap: 18, marginTop: 38 }}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "13px 21px",
                    background: PLASTER,
                    border: `3px solid ${SOIL}`,
                    boxShadow: `5px 5px 0 ${VERDANT}`,
                  }}
                >
                  <div style={{ fontSize: 29, fontWeight: 800, color: SOIL }}>{s.value}</div>
                  <div style={{ fontSize: 16, color: MUD }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Abstracted section through a building */}
          <div
            style={{
              display: "flex",
              width: 340,
              background: VERDANT,
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 34,
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  height: 60,
                  borderTop: `3px solid ${PLASTER}`,
                  opacity: 0.35 + i * 0.13,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 14,
                    height: 14,
                    background: i % 2 === 0 ? BRASS : TERRACOTTA,
                  }}
                />
                <div style={{ display: "flex", flex: 1, height: 3, background: PLASTER, opacity: 0.5 }} />
              </div>
            ))}
            <div style={{ display: "flex", marginTop: 20, fontSize: 17, color: PLASTER, letterSpacing: 1 }}>
              kanishkkapoor.com
            </div>
          </div>
        </div>

        <div style={{ display: "flex", height: 14, background: TERRACOTTA }} />
      </div>
    ),
    { ...size },
  );
}
