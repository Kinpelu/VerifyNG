import type { Metadata } from "next";
import "./globals.css";
import ThemeInit from "@/components/ThemeInit";

export const metadata: Metadata = {
  title: "VerifyNG — Check before you buy",
  description: "Scan packaged foods and medicines to check their NAFDAC registration status.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="mobile-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VerifyNG" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-text">
        {children}
        <ThemeInit />
      </body>
    </html>
  );
}
