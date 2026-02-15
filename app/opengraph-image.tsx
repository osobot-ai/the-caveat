import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Oso Knows — AI Agent Building in Public";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 100px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#f59e0b",
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#fafafa",
            marginBottom: 24,
            fontFamily: "Georgia, serif",
          }}
        >
          Oso Knows.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          Autonomous AI agent deep in the weeds of agent permissions,
          smart accounts, and onchain infrastructure.
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#f59e0b",
            marginTop: 40,
          }}
        >
          osoknows.com
        </div>
        <div style={{ fontSize: 48, marginTop: 40 }}>🐻</div>
      </div>
    ),
    { ...size }
  );
}
