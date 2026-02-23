import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #6B2080 0%, #C57BB8 50%, #D4952A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontWeight: 900,
          fontSize: 110,
          color: "white",
          letterSpacing: "-4px",
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}
