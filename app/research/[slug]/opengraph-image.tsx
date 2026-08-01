import { ImageResponse } from "next/og";
import { ARTICLES, getArticle, DOMAIN_TONE } from "@/lib/research";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Agentic AI research for the built environment";

/** Prerender one card per article at build time rather than on demand. */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

/* RETROFIT palette. Satori cannot resolve CSS variables, so these are literal. */
const LIME_WASH = "#F6F4EC";
const PLASTER = "#FDFBF3";
const SOIL = "#3A2E26";
const MUD = "#6B5F54";
const BRASS = "#C99A2E";

/** Long headlines need to step down or they overflow the card. */
function titleSize(title: string) {
  if (title.length <= 52) return 64;
  if (title.length <= 70) return 56;
  return 48;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: LIME_WASH,
            fontSize: 56,
            fontWeight: 800,
            color: SOIL,
          }}
        >
          Kanishk Kapoor
        </div>
      ),
      { ...size },
    );
  }

  const tone = DOMAIN_TONE[article.domain];

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
        {/* Domain-coloured rule */}
        <div style={{ display: "flex", height: 16, background: tone.fill }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "44px 60px 36px 60px",
            justifyContent: "space-between",
          }}
        >
          {/* Domain + reading time */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", width: 16, height: 16, background: tone.fill }} />
            <div
              style={{
                display: "flex",
                fontSize: 21,
                letterSpacing: 2,
                color: tone.text,
                textTransform: "uppercase",
              }}
            >
              {article.domain}
            </div>
            <div style={{ display: "flex", fontSize: 21, color: MUD }}>
              · {article.readingMinutes} min read
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              fontSize: titleSize(article.title),
              fontWeight: 800,
              color: SOIL,
              letterSpacing: -2,
              lineHeight: 1.06,
              maxWidth: 1040,
            }}
          >
            {article.title}
          </div>

          {/* Headline metrics */}
          <div style={{ display: "flex", gap: 18 }}>
            {article.metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 24px",
                  background: PLASTER,
                  border: `3px solid ${SOIL}`,
                  boxShadow: `6px 6px 0 ${tone.fill}`,
                  minWidth: 210,
                }}
              >
                <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: SOIL }}>
                  {m.value}
                </div>
                <div style={{ display: "flex", fontSize: 17, color: MUD, marginTop: 4 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Byline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `3px solid #EDE9DB`,
              paddingTop: 20,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: SOIL }}>
                Kanishk Kapoor
              </div>
              <div style={{ display: "flex", fontSize: 18, color: MUD, marginTop: 2 }}>
                Technical Accounts Manager, AI Institute · Dublin
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 19, color: MUD, letterSpacing: 1 }}>
              kanishkkapoor.com
            </div>
          </div>
        </div>

        <div style={{ display: "flex", height: 16, background: BRASS }} />
      </div>
    ),
    { ...size },
  );
}
