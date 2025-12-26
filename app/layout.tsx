import { Inter } from "next/font/google";
import { StoreProvider } from "./StoreProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { buildSeo } from "./lib/utils/buildSeo";
import { pageMetadata } from "./data/pagesMetadata";

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
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer />
        <GoogleTagManager gtmId="G-LYKSZRTMBX" />
      </head>
      <body
        className={`${inter.variable} [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*23)] antialiased bg-black`}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
