import type { Metadata } from "next";
import Navbar from "../components/Application/Navbar/Navbar";
import AppHeader from "../components/Application/AppHeader/AppHeader";
import { Slide, ToastContainer } from "react-toastify";

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
    <div className="min-h-screen h-full">
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="min-h-screen pt-14 pb-[63px] bg-white rounded-tl-2xl rounded-tr-2xl">
          <div className="min-h-full ">{children}</div>
        </main>
        <Navbar />
      </div>
      <ToastContainer
        position="top-center"
        draggable
        transition={Slide}
        closeButton={false}
        className="z-110"
      />
    </div>
  );
}
