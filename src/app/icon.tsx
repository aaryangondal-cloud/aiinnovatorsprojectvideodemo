import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a2439 0%, #2c3b5b 60%, #3a4f7a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: "#FED700",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: -1,
            lineHeight: 1,
          }}
        >
          G
        </div>
      </div>
    ),
    size
  );
}
