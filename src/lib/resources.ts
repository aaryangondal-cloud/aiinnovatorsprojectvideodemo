export interface ResourcePost {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  date: string;
}

export const RESOURCES: ResourcePost[] = [
  {
    slug: "vs1-clarity-explained",
    title: "VS1 Clarity Explained - and How to Describe It on a Product Page",
    description:
      "What VS1 really means on the GIA clarity scale, why it's the best value sweet spot, and how to describe it in jewelry product listings that buyers trust.",
    readingTime: "6 min read",
    date: "2026-04-01",
  },
  {
    slug: "gia-vs-hrd-vs-ags",
    title: "GIA vs HRD vs AGS: Which Certificate Should You Feature?",
    description:
      "A trade guide to the three major diamond grading labs, how their standards differ, and which certificate to emphasize in your product copy for different markets.",
    readingTime: "8 min read",
    date: "2026-03-20",
  },
  {
    slug: "jewelry-copy-guide",
    title: "Writing Jewelry Product Descriptions That Sell in 2026",
    description:
      "The complete guide: spec accuracy, emotional resonance, SEO structure, schema markup, and how independent jewelers can write 10x faster without losing quality.",
    readingTime: "12 min read",
    date: "2026-03-10",
  },
];
