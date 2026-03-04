import "./globals.css";

export const metadata = {
  title: "SPA Pathfinder — The SPA website, untangled",
  description: "Find what you need on the Speech Pathology Australia website. Search in plain English or browse by what you're trying to do.",
  openGraph: {
    title: "SPA Pathfinder",
    description: "The SPA website, untangled. Find CPD events, NDIS info, CPSP details, and more — fast.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SPA Pathfinder — The SPA website, untangled",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPA Pathfinder",
    description: "The SPA website, untangled.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
