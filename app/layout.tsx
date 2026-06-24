import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://overide-nine.vercel.app"),
  title: "Overide — Private tools for advanced traders",
  description:
    "Lower fees. Faster execution. Dedicated infrastructure built for serious market participants.",
  openGraph: {
    title: "Overide — Private tools for advanced traders",
    description:
      "Lower fees. Faster execution. Dedicated infrastructure built for serious market participants.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
