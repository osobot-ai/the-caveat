import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Caveat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a1a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontFamily: "Georgia, serif", fontWeight: 600, fontStyle: "italic" }}>
          <span style={{ color: "#e8a020" }}>The</span>
          <span style={{ color: "#ffffff", marginLeft: 24 }}>Caveat</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
