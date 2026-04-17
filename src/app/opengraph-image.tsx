import { ImageResponse } from "next/og";

export const alt = "GemCopy by Amipi - AI Product Descriptions for Jewelers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a2439 0%, #2c3b5b 60%, #3a4f7a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          fontFamily: "system-ui, sans-serif",
          color: "white",
          position: "relative",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#FED700",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2c3b5b",
              fontSize: 40,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            G
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            GemCopy by Amipi
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              background: "#FED700",
              color: "#2c3b5b",
              padding: "8px 18px",
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 700,
              alignSelf: "flex-start",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            For Independent Jewelers
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Turn GIA certificates into</div>
            <div
              style={{
                background: "linear-gradient(135deg, #FED700, #d4b300)",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              copy that actually sells.
            </div>
          </div>
        </div>

        {/* Bottom: callouts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            fontSize: 22,
            color: "#c9d0e0",
            fontWeight: 400,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#FED700", fontSize: 28 }}>•</span> 30-second listings
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#FED700", fontSize: 28 }}>•</span> GIA-grade accuracy
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#FED700", fontSize: 28 }}>•</span> Schema.org ready
          </div>
        </div>
      </div>
    ),
    size
  );
}
