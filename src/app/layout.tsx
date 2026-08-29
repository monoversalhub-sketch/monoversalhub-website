import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const BASE_URL = "https://monoversalhub-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Monoversal Hub — Build Trust. Grow Faster.",
    template: "%s · Monoversal Hub",
  },
  description:
    "Monoversal Hub is the official site for Monoversal projects, including BOSS and SOVR.",
  openGraph: {
    title: "Monoversal Hub",
    description:
      "Monoversal Hub is the official site for Monoversal projects, including BOSS and SOVR.",
    url: BASE_URL,
    siteName: "Monoversal Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monoversal Hub",
    description:
      "Monoversal Hub is the official site for Monoversal projects, including BOSS and SOVR.",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body id="app-root">{children}</body>
    </html>
  );
}
