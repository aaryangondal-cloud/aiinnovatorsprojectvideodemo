import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GemCopy by Amipi",
    short_name: "GemCopy",
    description:
      "AI-powered product descriptions for independent jewelers. Built by Amipi INC.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#2c3b5b",
    orientation: "portrait",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/icon", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
