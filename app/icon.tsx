import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #6B2080 0%, #C57BB8 50%, #D4952A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontWeight: 900,
          fontSize: 20,
          color: "white",
          letterSpacing: "-1px",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)",
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}
