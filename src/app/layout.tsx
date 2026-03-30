import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GemCopy - AI Product Descriptions for Jewelers",
  description:
    "Turn GIA certificate data into compelling, SEO-optimized product descriptions that convert browsers into buyers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
