import { Inter } from "next/font/google";
import { StoreProvider } from "./StoreProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { buildSeo } from "./lib/utils/buildSeo";
import { pageMetadata } from "./data/pagesMetadata";
import VisibilityHandler from "./components/Shared/VisibilityHandler/VisibilityHandler";
import { LanguageProvider } from "./contexts/LanguageContext";
import QueryProvider from "./providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

export const metadata = buildSeo({
  title: pageMetadata.main.title,
  description: pageMetadata.main.description,
  robotsFollow: true,
  robotsIndex: true,
  keywords: pageMetadata.main.keywords,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-LYKSZRTMBX" />
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MyFinishLine" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${inter.variable} [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*23)] antialiased bg-black`}
      >
        <VisibilityHandler />
        <QueryProvider>
          <StoreProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
