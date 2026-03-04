export const metadata = {
  title: "SPA Quick Finder — Navigate Speech Pathology Australia",
  description:
    "Skip the maze. Quickly find CPD events, NDIS resources, CPSP info, clinical guidelines and more on the Speech Pathology Australia website.",
  openGraph: {
    title: "SPA Quick Finder",
    description: "The fast way to find what you need on speechpathologyaustralia.org.au",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
