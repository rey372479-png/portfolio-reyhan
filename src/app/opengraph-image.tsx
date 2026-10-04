import { ImageResponse } from "next/og";

export const alt = "Portfolio M. Reyhan Purnomo Putra - Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f5f5f5",
          background:
            "linear-gradient(135deg, #080b11 0%, #101d32 58%, #173a62 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#79aaff",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          MR. <span style={{ color: "#f5f5f5" }}>PORTFOLIO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            M. Reyhan Purnomo Putra
          </div>
          <div style={{ marginTop: 24, color: "#c3d3e8", fontSize: 30 }}>
            Web Developer · Student Portfolio
          </div>
        </div>
        <div style={{ color: "#9bb2cf", fontSize: 22 }}>
          Pasuruan, Indonesia
        </div>
      </div>
    ),
    size,
  );
}