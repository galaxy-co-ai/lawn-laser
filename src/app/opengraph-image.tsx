import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Elite Lawn Care — Oklahoma City's top-rated lawn care & pest control";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a4a1c 0%, #2d6a2e 50%, #3a7d3b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Elite Lawn Care
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
            }}
          >
            Oklahoma City&apos;s Top-Rated Lawn Care &amp; Pest Control
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "8px 20px",
                color: "white",
                fontSize: "18px",
              }}
            >
              4.8 / 5.0 — 1700+ Reviews
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "8px 20px",
                color: "white",
                fontSize: "18px",
              }}
            >
              Inc. 5000 Honoree
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "8px 20px",
                color: "white",
                fontSize: "18px",
              }}
            >
              Since 2003
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
