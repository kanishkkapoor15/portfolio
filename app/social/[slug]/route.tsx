import { ImageResponse } from "next/og";
import { getArticle, DOMAIN_TONE } from "@/lib/research";

/**
 * Social graphics for LinkedIn, rendered by the same next/og pipeline as the
 * OpenGraph cards so brand values are identical rather than approximated.
 *
 * 1080x1350 is the 4:5 portrait ratio, which takes the most feed height on a
 * phone. Hit /social/<article-slug> and save the PNG.
 *
 * The bar data is read out of the article body rather than duplicated here, so
 * a figure can never drift from the piece it is advertising.
 */

const LIME_WASH = "#F6F4EC";
const PLASTER = "#FDFBF3";
const SOIL = "#3A2E26";
const MUD = "#6B5F54";
const LINEN = "#EDE9DB";
const BRASS = "#C99A2E";
const TERRACOTTA = "#D06A45";
const VERDANT = "#2E8B4F";

const TONE: Record<string, string> = {
  growth: VERDANT,
  brass: BRASS,
  clay: TERRACOTTA,
  slate: "#1E7A8C",
};

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const article = getArticle(slug);
  if (!article) return new Response("Not found", { status: 404 });

  const tone = DOMAIN_TONE[article.domain];

  // First stacked figure in the article becomes the chart on the card.
  const stack = article.body.find(
    (b): b is Extract<typeof b, { t: "viz" }> => b.t === "viz" && b.spec.kind === "stack",
  );
  const bars = stack && stack.spec.kind === "stack" ? stack.spec.bars : [];
  const max = bars.length ? Math.max(...bars.map((b) => Math.abs(b.value))) : 1;

  // Lead and counterpoint: the highest and lowest bars carry the whole hook.
  const top = bars.length ? bars[0] : null;
  const bottom = bars.length ? bars[bars.length - 1] : null;

  // The article's own pull quote, never a hardcoded one.
  const pull = article.body.find((b) => b.t === "pull");
  const quote = pull && pull.t === "pull" ? pull.text : article.dek;

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
        <div style={{ display: "flex", height: 20, background: tone.fill }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "56px 64px 44px 64px",
          }}
        >
          {/* Kicker */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", width: 16, height: 16, background: tone.fill }} />
            <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: tone.text }}>
              AGENTIC AI · BUILT ENVIRONMENT
            </div>
          </div>

          {/* Articles without a stacked figure lead on title and metrics. */}
          {!(top && bottom) && (
            <div style={{ display: "flex", flexDirection: "column", marginTop: 46, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 62,
                  fontWeight: 800,
                  color: SOIL,
                  letterSpacing: -2.5,
                  lineHeight: 1.06,
                }}
              >
                {article.title}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 52 }}>
                {article.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 20,
                      borderBottom: `3px solid ${LINEN}`,
                      paddingBottom: 18,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        fontSize: 58,
                        fontWeight: 800,
                        color: tone.fill,
                        letterSpacing: -2,
                        minWidth: 330,
                      }}
                    >
                      {m.value}
                    </div>
                    <div style={{ display: "flex", fontSize: 26, color: MUD }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The hook: two numbers in tension */}
          {top && bottom && (
            <div style={{ display: "flex", flexDirection: "column", marginTop: 46, gap: 26 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
                <div style={{ display: "flex", fontSize: 130, fontWeight: 800, color: VERDANT, letterSpacing: -6, lineHeight: 1 }}>
                  {top.value}%
                </div>
                <div style={{ display: "flex", fontSize: 27, color: SOIL, maxWidth: 520, lineHeight: 1.25, paddingTop: 42 }}>
                  of {top.label.toLowerCase()} can be handed to an agent
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
                <div style={{ display: "flex", fontSize: 130, fontWeight: 800, color: TERRACOTTA, letterSpacing: -6, lineHeight: 1 }}>
                  {bottom.value}%
                </div>
                <div style={{ display: "flex", fontSize: 27, color: SOIL, maxWidth: 520, lineHeight: 1.25, paddingTop: 42 }}>
                  of {bottom.label.toLowerCase()} can
                </div>
              </div>
            </div>
          )}

          {/* Chart */}
          {bars.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", marginTop: 52, flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                letterSpacing: 3,
                color: MUD,
                borderBottom: `3px solid ${LINEN}`,
                paddingBottom: 14,
                marginBottom: 22,
              }}
            >
              {stack && stack.spec.kind === "stack" ? stack.spec.unit.toUpperCase() : ""}
            </div>

            {bars.map((b) => (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", marginBottom: 17 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", fontSize: 23, color: SOIL }}>{b.label}</div>
                  <div style={{ display: "flex", fontSize: 23, fontWeight: 700, color: SOIL }}>
                    {b.value}%
                  </div>
                </div>
                <div style={{ display: "flex", height: 15, background: LINEN }}>
                  <div
                    style={{
                      display: "flex",
                      width: `${(Math.abs(b.value) / max) * 100}%`,
                      background: TONE[b.tone ?? "growth"],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          )}

          {/* The line worth stealing */}
          <div
            style={{
              display: "flex",
              borderLeft: `8px solid ${tone.fill}`,
              paddingLeft: 22,
              marginTop: 18,
              fontSize: 27,
              fontWeight: 700,
              color: SOIL,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            {quote}
          </div>

          {/* Byline */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              borderTop: `3px solid ${SOIL}`,
              paddingTop: 22,
              marginTop: 12,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: SOIL }}>
                Kanishk Kapoor
              </div>
              <div style={{ display: "flex", fontSize: 21, color: MUD, marginTop: 4 }}>
                Technical Accounts Manager, AI Institute · Dublin
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                color: PLASTER,
                background: SOIL,
                padding: "10px 16px",
              }}
            >
              kanishkkapoor.com
            </div>
          </div>
        </div>

        <div style={{ display: "flex", height: 20, background: BRASS }} />
      </div>
    ),
    { width: 1080, height: 1350 },
  );
}
