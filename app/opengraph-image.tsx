import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Kanishk Kapoor — AI Developer & Data Engineer";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050A14",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Cyan glow — top left */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%)",
            top: -200,
            left: -150,
          }}
        />

        {/* Purple glow — bottom right */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)",
            bottom: -200,
            right: -150,
          }}
        />

        {/* Emerald glow — center */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            zIndex: 1,
            padding: "0 60px",
          }}
        >
          {/* Logo badge */}
          <div
            style={{
              background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
              borderRadius: 20,
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              color: "white",
              fontWeight: 900,
              marginBottom: 28,
              boxShadow: "0 0 40px rgba(0,212,255,0.4)",
            }}
          >
            KK
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#F0F6FF",
              textAlign: "center",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              marginBottom: 16,
            }}
          >
            Kanishk Kapoor
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              background: "linear-gradient(90deg, #00D4FF, #7C3AED, #10B981)",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            AI Developer & Data Engineer
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 18,
              color: "#64748B",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            MSc Computing (Data Analytics) · Dublin City University · IBM · Medicidiom
          </div>

          {/* Skill tags */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 36,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["LLM Pipelines", "Agentic AI", "Apache Kafka", "Azure Databricks", "ML Engineer"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.25)",
                    borderRadius: 24,
                    padding: "8px 20px",
                    color: "#00D4FF",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </div>
              ),
            )}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 48,
              borderTop: "1px solid rgba(0,212,255,0.1)",
              paddingTop: 24,
            }}
          >
            {[
              { value: "30+",  label: "Projects"          },
              { value: "5M+",  label: "Records Processed" },
              { value: "99%+", label: "Pipeline Uptime"   },
              { value: "1:1",  label: "Expected MSc"      },
            ].map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#00D4FF" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#475569" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Domain */}
          <div
            style={{
              fontSize: 16,
              color: "#334155",
              marginTop: 24,
              letterSpacing: "1px",
            }}
          >
            kanishkkapoor.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
