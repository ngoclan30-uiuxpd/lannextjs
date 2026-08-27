import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lan Đinh — UI/UX Designer",
  description: "UI/UX Designer specializing in e-commerce experiences. I turn complex shopping journeys into intuitive, conversion-driving products.",
  keywords: ["product designer", "UX designer", "e-commerce design", "UI design", "design systems"],
  authors: [{ name: "Lan Đinh" }],
  openGraph: {
    title: "Lan Đinh — UI/UX Designer",
    description: "UI/UX Designer specializing in e-commerce experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lan Đinh — UI/UX Designer",
    description: "UI/UX Designer specializing in e-commerce experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="noise-texture" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
