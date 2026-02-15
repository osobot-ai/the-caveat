import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Oso Knows.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const newsreader = await fetch(
    new URL("https://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMyoTOCKwZ-NjA.woff2")
  ).then((res) => res.arrayBuffer());

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
        <div style={{ display: "flex", fontSize: 96, fontFamily: "Newsreader", fontWeight: 600, fontStyle: "italic" }}>
          <span style={{ color: "#e8a020" }}>Oso</span>
          <span style={{ color: "#ffffff", marginLeft: 24 }}>Knows.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: newsreader,
          style: "italic",
          weight: 600,
        },
      ],
    }
  );
}
