import type { MetadataRoute } from "next";

const BASE = "https://aiinnovatorsprojectvideodemo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/auth",
    "/dashboard",
    "/pricing",
    "/marketplace",
    "/gemcopy-vs-chatgpt",
    "/gemcopy-vs-jasper",
    "/gemcopy-vs-copy-ai",
    "/gia-certificate-to-product-description",
    "/jewelry-seo-copy-for-shopify",
    "/resources",
    "/resources/vs1-clarity-explained",
    "/resources/gia-vs-hrd-vs-ags",
    "/resources/jewelry-copy-guide",
    "/data/jewelry-copy-benchmarks",
  ];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path.includes("-vs-") ? 0.9 : 0.7,
  }));
}
