import type { Metadata } from "next";
import { Allerta_Stencil, Montserrat } from "next/font/google";
import Navbar from "../components/Application/Navbar/Navbar";
import AppHeader from "../components/Application/AppHeader/AppHeader";
import { Slide, ToastContainer } from "react-toastify";
import "../globals.css";

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
        {/* <ThemeProvider
        attribute="data-theme" // Use data-theme instead of class
        defaultTheme="light"
        disableTransitionOnChange
      > */}
        <div className="h-full flex flex-col">
          <AppHeader />
          <div className="flex-1">{children}</div>
          <Navbar />
        </div>
        {/* </ThemeProvider> */}
        <ToastContainer
          position="top-center"
          draggable
          transition={Slide}
          closeButton={false}
        />
      </body>
    </html>
  );
}
