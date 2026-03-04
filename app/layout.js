import "./globals.css";

export const metadata = {
  title: "SPA Pathfinder — The SPA website, untangled",
  description: "Find what you need on the Speech Pathology Australia website. Search in plain English or browse by what you're trying to do.",
  openGraph: {
    title: "SPA Pathfinder",
    description: "The SPA website, untangled. Find CPD events, NDIS info, CPSP details, and more — fast.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
