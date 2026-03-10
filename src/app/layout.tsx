import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ProteinBro - Simple High Protein Meals for Men",
    template: "%s | ProteinBro",
  },
  description:
    "No-BS high protein meal prep for gym bros. Macros-first recipes, cost calculators, and weekly meal plans. 40g+ protein, under $3/serving.",
  metadataBase: new URL("https://proteinbro.net"),
  icons: {
    icon: "/favicon.svg",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-bg bg-zinc-950 font-body text-zinc-100 antialiased">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WYD72QPSFN"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WYD72QPSFN');`}
        </Script>
      </body>
    </html>
  );
}
