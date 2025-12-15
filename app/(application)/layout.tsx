import type { Metadata } from "next";
import Navbar from "../components/Application/Navbar/Navbar";
import AppHeader from "../components/Application/AppHeader/AppHeader";
import { Slide, ToastContainer } from "react-toastify";
import { NextIntlClientProvider } from "next-intl";

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
    <div className="h-full">
      <div className="h-full flex flex-col">
        <AppHeader />
        <div className="min-h-screen h-full flex-1 bg-white rounded-tl-2xl rounded-tr-2xl">
          {children}
        </div>
        <Navbar />
      </div>
      <ToastContainer
        position="top-center"
        draggable
        transition={Slide}
        closeButton={false}
      />
    </div>
  );
}
