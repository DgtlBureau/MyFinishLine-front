import type { Metadata } from "next";
import {
  Allerta_Stencil,
  Geist,
  Geist_Mono,
  Montserrat,
} from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/Application/Navbar/Navbar";
import AppHeader from "../components/Application/AppHeader/AppHeader";

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

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${montserrat.variable} ${allerta_stencil.variable} h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="h-full flex flex-col">
            <AppHeader />
            <div className="flex-1">{children}</div>
            <Navbar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
