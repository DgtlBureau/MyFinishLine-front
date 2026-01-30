import Navbar from "../components/Application/Navbar/Navbar";
import AppHeader from "../components/Application/AppHeader/AppHeader";
import { Slide, ToastContainer } from "react-toastify";
import RedirectComponent from "../components/RedirectComponent/RedirectComponent";
import { buildSeo } from "../lib/utils/buildSeo";
import PageTransition from "../components/Application/PageTransition/PageTransition";
import { NotificationProvider } from "../contexts/NotificationContext";
import NotificationChecker from "../components/Application/NotificationChecker/NotificationChecker";

export const metadata = buildSeo({
  title: "MyFinishLine",
  description: "Combine sports and pleasure",
  robotsFollow: false,
  robotsIndex: false,
});

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationProvider>
      <NotificationChecker />
      <RedirectComponent />
      <div className="min-h-screen bg-gradient-to-b from-[#5170D5] via-[#8BA3E0] via-25% to-[#CEE9D8]">
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="min-h-screen pb-15.75 bg-transparent rounded-tl-2xl rounded-tr-2xl">
            <PageTransition>{children}</PageTransition>
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
    </NotificationProvider>
  );
}
