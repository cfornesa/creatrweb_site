import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creatrweb",
  description: "Identity-First IndieWeb Creative Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="me" href="https://instagram.com/creatrweb" />
        <link rel="me" href="https://x.com/creatrweb" />
        <link rel="me" href="https://www.tiktok.com/@creatrweb" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
