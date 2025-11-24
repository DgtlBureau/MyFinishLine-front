import type { Metadata } from "next";
import {
  Allerta_Stencil,
  Geist,
  Geist_Mono,
  Montserrat,
  Stardos_Stencil,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/ChallengeContent/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrant",
  display: "swap",
  subsets: ["latin"],
});

const allerta_stencil = Allerta_Stencil({
  variable: "--font-allerta-stencil",
  weight: "400",
});

export const metadata: Metadata = {
  title: "MyFinishLine",
  description: "Combine sports and pleasure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${allerta_stencil.variable} ${geistSans.variable} ${geistMono.variable} [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*23)] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
